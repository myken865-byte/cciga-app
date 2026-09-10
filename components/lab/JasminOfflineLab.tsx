"use client";

import { useEffect, useRef, useState } from "react";
import {
  cacheHasUrl,
  cacheNameFor,
  cacheResource,
  deleteCache,
  readCachedResource,
} from "@/lib/lab/jasminOfflineCache";
import {
  addProgressEvent,
  clearAllLabData,
  deletePackageRecord,
  getAllProgress,
  getPackageRecord,
  getSyncQueue,
  savePackageRecord,
  updateSyncQueueItem,
  type PackageRecord,
  type ProgressEvent as LabProgressEvent,
  type SyncQueueItem,
} from "@/lib/lab/jasminOfflineDb";
import { validateManifest, verifyResourceChecksum, type LabManifest } from "@/lib/lab/jasminManifestValidator";
import { JASMIN_DEMO_STUDENT_ID } from "@/lib/lab/jasminLabConstants";

const FICTIONAL_STUDENT_ID = JASMIN_DEMO_STUDENT_ID;
const MANIFEST_URLS = {
  valid: "/lab-jasmin-offline/manifest.json",
  corrupted: "/lab-jasmin-offline/manifest-corrupted-demo.json",
  incomplete: "/lab-jasmin-offline/manifest-incomplete-demo.json",
  incompatible: "/lab-jasmin-offline/manifest-incompatible-demo.json",
} as const;

type ManifestKind = keyof typeof MANIFEST_URLS;

function nowIso() {
  return new Date().toISOString();
}

function newIdempotencyKey() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `evt-${Date.now()}-${Math.random()}`;
}

export default function JasminOfflineLab() {
  // Valeur fixe identique serveur/client pour éviter un mismatch d'hydratation
  // (navigator.onLine diffère entre le rendu SSR et le navigateur réel) —
  // corrigée juste après montage dans le useEffect ci-dessous.
  const [online, setOnline] = useState(true);
  const [simulateOffline, setSimulateOffline] = useState(false);
  const [simulateQuotaError, setSimulateQuotaError] = useState(false);

  const [manifest, setManifest] = useState<LabManifest | null>(null);
  const [manifestErrors, setManifestErrors] = useState<string[]>([]);
  const [manifestKind, setManifestKind] = useState<ManifestKind>("valid");

  const [log, setLog] = useState<string[]>([]);
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(0);
  const [downloadTotal, setDownloadTotal] = useState(0);
  const abortRef = useRef(false);

  const [packageRecord, setPackageRecord] = useState<PackageRecord | null>(null);
  const [progress, setProgress] = useState<LabProgressEvent[]>([]);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);
  const [storageEstimate, setStorageEstimate] = useState<string>("");

  // Garde anti-répétition — mandat "Phase 3.1 — correction événements locaux
  // anormalement répétés" (2026-09-09). Un appui rapide/répété (double-tap,
  // rebond tactile WebView Android) déclenchait autant d'écritures
  // IndexedDB distinctes que de clics, chacune avec un idempotencyKey neuf
  // et donc légitimement acceptée par le serveur — ce n'est pas un défaut
  // d'idempotence côté serveur (qui a fonctionné exactement comme prévu),
  // c'est l'absence de protection côté UI contre la création de l'événement
  // lui-même.
  //
  // Le verrou RÉEL est `blockedActivitiesRef` (une ref, lue/écrite de façon
  // synchrone, AVANT tout await) : un state React seul ne suffit pas ici,
  // React peut regrouper plusieurs mises à jour d'état et ne re-rendre
  // qu'une fois — deux clics arrivant avant ce re-rendu liraient encore
  // tous les deux l'ancienne valeur "non bloquée" (fermeture obsolète) et
  // passeraient tous les deux la garde. La ref, elle, change immédiatement.
  // `blockedActivities` (state) ne sert plus qu'à l'affichage — désactiver
  // visuellement le bouton — et peut légitimement accuser un léger retard.
  const [activityInFlight, setActivityInFlight] = useState<string | null>(null);
  const [blockedActivities, setBlockedActivities] = useState<Record<string, boolean>>({});
  const blockedActivitiesRef = useRef<Record<string, boolean>>({});
  const ACTIVITY_COOLDOWN_MS = 1500;

  const effectiveOffline = simulateOffline || !online;

  function appendLog(line: string) {
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${line}`]);
  }

  async function refreshLocalState() {
    const [pkg, prog, queue] = await Promise.all([
      getPackageRecord("colors-around-me"),
      getAllProgress("colors-around-me"),
      getSyncQueue(),
    ]);
    setPackageRecord(pkg ?? null);
    setProgress(prog);
    setSyncQueue(queue);
    return { pkg: pkg ?? null, prog, queue };
  }

  useEffect(() => {
    // Lecture ponctuelle de systèmes externes (IndexedDB, quota de stockage)
    // après montage — pas de boucle de rendu, lu une seule fois au chargement
    // (même justification que le pattern déjà établi dans AdminNav.tsx).
    //
    // Mandat "Phase 3.1 — cohérence journal/persistance" (2026-09-10) : le
    // journal affiché (`log`) n'a jamais été persistant — volontaire, ce
    // n'est qu'un flux d'événements de LA session en cours, pas un
    // historique durable (celui-ci vit réellement dans IndexedDB). Mais
    // après une fermeture/réouverture, le journal revenait vide alors que
    // les compteurs de progression/file affichaient des données bien réelles
    // — décalage source de confusion, corrigé ici en reconstruisant une
    // ligne de reprise à partir de l'état persistant relu, sans créer de
    // nouveau mécanisme de stockage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshLocalState().then(({ pkg, prog, queue }) => {
      const pending = queue.filter((q) => q.syncStatus !== "synced").length;
      if (pkg || prog.length > 0 || queue.length > 0) {
        appendLog(
          `Reprise après (ré)ouverture — données locales retrouvées : ${pkg ? `paquet v${pkg.version} présent` : "aucun paquet"}, ${prog.length} activité(s) enregistrée(s), ${pending} événement(s) en attente de synchronisation sur ${queue.length} au total.`,
        );
      }
    });
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then((est) => {
        setStorageEstimate(`${Math.round((est.usage ?? 0) / 1024)} Ko utilisés / ${Math.round((est.quota ?? 0) / 1024 / 1024)} Mo quota`);
      });
    }
    setOnline(navigator.onLine);
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  async function loadManifest(kind: ManifestKind) {
    setManifestKind(kind);
    appendLog(`Chargement du manifeste "${kind}"…`);
    try {
      const cacheName = manifest ? cacheNameFor(manifest.unitId, manifest.version) : cacheNameFor("colors-around-me", "1.0.0");
      let json: unknown;
      if (effectiveOffline) {
        const cached = await readCachedResource(cacheName, MANIFEST_URLS[kind]);
        if (!cached) {
          appendLog("Hors-ligne et manifeste non présent en cache — impossible de charger.");
          setManifest(null);
          setManifestErrors(["Hors-ligne : ce manifeste n'a jamais été mis en cache."]);
          return;
        }
        json = await cached.json();
      } else {
        const res = await fetch(MANIFEST_URLS[kind]);
        json = await res.json();
      }
      const result = validateManifest(json);
      setManifestErrors(result.errors);
      if (result.ok) {
        setManifest(json as LabManifest);
        // Formulation volontairement distincte de "fichiers intacts" — ce
        // stade ne vérifie QUE la structure du manifeste (champs requis,
        // format des checksums déclarés, cohérence des références). Les
        // checksums ne sont comparés aux fichiers réels qu'au téléchargement
        // (voir handleDownload) — un manifeste "corrupted" passe donc bien
        // ici (sa structure est valide, seule sa valeur déclarée est fausse)
        // puis est rejeté plus loin, jamais accepté comme paquet utilisable.
        appendLog(
          `Manifeste "${kind}" bien formé (structure valide) — unité "${(json as LabManifest).unitTitle}", ${(json as LabManifest).resources.length} ressources. Fichiers vérifiés au téléchargement.`,
        );
      } else {
        setManifest(null);
        appendLog(`Manifeste "${kind}" REJETÉ : ${result.errors.join(" | ")}`);
      }
    } catch (err) {
      setManifest(null);
      setManifestErrors([err instanceof Error ? err.message : String(err)]);
      appendLog(`Erreur de chargement du manifeste : ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async function handleDownload(interruptAfter?: number) {
    if (!manifest) return;
    if (effectiveOffline) {
      appendLog("Téléchargement refusé : hors-ligne.");
      return;
    }
    setDownloading(true);
    abortRef.current = false;
    const cacheName = cacheNameFor(manifest.unitId, manifest.version);
    const manifestUrl = MANIFEST_URLS[manifestKind];
    setDownloadTotal(manifest.resources.length + 1); // +1 pour le manifeste lui-même
    let done = 0;

    const manifestAlready = await cacheHasUrl(cacheName, manifestUrl);
    if (!manifestAlready) {
      const r = await cacheResource(cacheName, manifestUrl);
      if (r.ok) appendLog("✓ manifest.json mis en cache.");
      else appendLog(`✗ échec cache manifest.json : ${r.error}`);
    }
    done += 1;
    setDownloadDone(done);

    for (const resource of manifest.resources) {
      if (abortRef.current) {
        appendLog(`⏸ Téléchargement interrompu volontairement après ${done} ressource(s).`);
        setDownloading(false);
        return;
      }
      const url = `/lab-jasmin-offline/${resource.path}`;
      const already = await cacheHasUrl(cacheName, url);
      if (already) {
        appendLog(`↻ ${resource.path} déjà en cache — ignoré (reprise de téléchargement).`);
        done += 1;
        setDownloadDone(done);
        continue;
      }
      if (simulateQuotaError) {
        appendLog(`✗ ${resource.path} — QuotaExceededError simulé (stockage insuffisant).`);
        setSimulateQuotaError(false);
        setDownloading(false);
        return;
      }
      const result = await cacheResource(cacheName, url);
      if (!result.ok) {
        appendLog(`✗ ${resource.path} — échec réseau : ${result.error}`);
        setDownloading(false);
        return;
      }
      const cached = await readCachedResource(cacheName, url);
      const blob = cached ? await cached.blob() : null;
      const checksumOk = blob ? await verifyResourceChecksum(blob, resource.checksum) : false;
      if (!checksumOk) {
        appendLog(`✗ ${resource.path} — checksum invalide, fichier rejeté (corruption détectée).`);
        await deleteCache(cacheName); // ne conserve pas un paquet partiellement corrompu
        setDownloading(false);
        return;
      }
      appendLog(`✓ ${resource.path} téléchargé et vérifié (${resource.sizeBytes} o).`);
      done += 1;
      setDownloadDone(done);

      if (interruptAfter !== undefined && done >= interruptAfter) {
        appendLog(`⏸ Interruption simulée programmée atteinte (${done}/${manifest.resources.length + 1}).`);
        setDownloading(false);
        return;
      }
    }

    const record: PackageRecord = {
      unitId: manifest.unitId,
      version: manifest.version,
      status: "downloaded",
      downloadedAt: nowIso(),
      resourceCount: manifest.resources.length,
      totalSizeBytes: manifest.totalSizeBytes,
    };
    await savePackageRecord(record);
    appendLog(`✅ Unité "${manifest.unitTitle}" entièrement téléchargée et disponible hors-ligne.`);
    await refreshLocalState();
    setDownloading(false);
  }

  async function handleCompleteActivity(activityId: string, outcome: "completed" | "to_review") {
    if (!manifest) return;

    // Verrou synchrone (ref) — lu ET posé avant tout `await`, donc immunisé
    // contre le regroupement de rendus React (voir commentaire plus haut).
    if (blockedActivitiesRef.current[activityId]) return;
    blockedActivitiesRef.current[activityId] = true;
    setActivityInFlight(activityId);
    setBlockedActivities((prev) => ({ ...prev, [activityId]: true }));
    try {
      const event: LabProgressEvent = {
        idempotencyKey: newIdempotencyKey(),
        studentIdFictif: FICTIONAL_STUDENT_ID,
        unitId: manifest.unitId,
        activityId,
        outcome,
        localDate: nowIso(),
      };
      await addProgressEvent(event);
      appendLog(`Activité "${activityId}" enregistrée localement (${outcome}).`);
      await refreshLocalState();
    } finally {
      setActivityInFlight(null);
      setTimeout(() => {
        blockedActivitiesRef.current[activityId] = false;
        setBlockedActivities((prev) => ({ ...prev, [activityId]: false }));
      }, ACTIVITY_COOLDOWN_MS);
    }
  }

  async function handleSync() {
    if (effectiveOffline) {
      appendLog("Synchronisation refusée : hors-ligne (comportement attendu, pas d'erreur fatale).");
      return;
    }
    const queue = await getSyncQueue();
    const pending = queue.filter((q) => q.syncStatus !== "synced");
    if (pending.length === 0) {
      appendLog("Rien à synchroniser.");
      return;
    }
    appendLog(`Synchronisation de ${pending.length} événement(s)…`);
    try {
      const res = await fetch("/api/lab/jasmin-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: pending.map((p) => ({ ...p, actionType: "activity_completed" })) }),
      });
      const data = (await res.json()) as { results: { idempotencyKey: string; status: string }[] };
      for (const item of pending) {
        const result = data.results.find((r) => r.idempotencyKey === item.idempotencyKey);
        if (result?.status === "accepted" || result?.status === "duplicate") {
          await updateSyncQueueItem({ ...item, syncStatus: "synced", attempts: item.attempts + 1, lastError: null });
          appendLog(`  → ${item.activityId} : ${result.status === "duplicate" ? "déjà connu côté serveur (doublon évité)" : "accepté"}.`);
        } else {
          await updateSyncQueueItem({ ...item, attempts: item.attempts + 1, lastError: "rejected" });
          appendLog(`  → ${item.activityId} : REJETÉ.`);
        }
      }
    } catch (err) {
      appendLog(`Échec de synchronisation : ${err instanceof Error ? err.message : String(err)}.`);
    }
    await refreshLocalState();
  }

  async function handleReplayForDuplicateTest() {
    const queue = await getSyncQueue();
    const lastSynced = [...queue].reverse().find((q) => q.syncStatus === "synced");
    if (!lastSynced) {
      appendLog("Aucun événement déjà synchronisé à rejouer.");
      return;
    }
    appendLog(`Test doublon : renvoi de l'événement déjà synchronisé "${lastSynced.idempotencyKey.slice(0, 8)}…"`);
    const res = await fetch("/api/lab/jasmin-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: [{ ...lastSynced, actionType: "activity_completed" }] }),
    });
    const data = (await res.json()) as { results: { status: string }[] };
    appendLog(`  → serveur répond : "${data.results[0]?.status}" (attendu : "duplicate").`);
  }

  async function handleDeletePackage() {
    if (!manifest) return;
    const cacheName = cacheNameFor(manifest.unitId, manifest.version);
    await deleteCache(cacheName);
    await deletePackageRecord(manifest.unitId);
    appendLog("Média supprimé du cache local. Progression conservée (vérifiable ci-dessous).");
    await refreshLocalState();
  }

  async function handleFullReset() {
    await clearAllLabData();
    if (manifest) await deleteCache(cacheNameFor(manifest.unitId, manifest.version));
    setManifest(null);
    setLog([]);
    setDownloadDone(0);
    setDownloadTotal(0);
    await refreshLocalState();
    appendLog("Réinitialisation complète du prototype.");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-5 sm:py-6 lg:px-6">
      <div className="mb-4 rounded-2xl border-[3px] border-accent bg-primary-dark px-5 py-4 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-light">
          Prototype technique interne — non public
        </p>
        <h1 className="mt-1 text-xl font-extrabold uppercase tracking-wide sm:text-2xl">
          Jasmine Kindergarten — Laboratoire Offline
        </h1>
        <p className="mt-1.5 text-sm text-white/80">
          Unité de démonstration « Colors Around Me » — données fictives uniquement.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-3.5 text-sm">
        <span className={`rounded-full px-3 py-1 font-semibold ${effectiveOffline ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
          {effectiveOffline ? "● Hors-ligne" : "● En ligne"}
        </span>
        <span className="text-muted">navigator.onLine = {String(online)}</span>
        <label className="ml-auto flex items-center gap-2">
          <input type="checkbox" checked={simulateOffline} onChange={(e) => setSimulateOffline(e.target.checked)} />
          Simuler hors-ligne
        </label>
      </div>

      <section className="mb-4 rounded-xl border border-border bg-surface p-3.5 sm:p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-dark">1. Manifeste</h2>
        <div className="mb-3 flex flex-wrap gap-2">
          {(Object.keys(MANIFEST_URLS) as ManifestKind[]).map((kind) => (
            <button
              key={kind}
              onClick={() => void loadManifest(kind)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${manifestKind === kind && manifest ? "border-primary bg-primary text-white" : "border-border bg-white text-foreground"}`}
            >
              {kind}
            </button>
          ))}
        </div>
        {manifest ? (
          // Ambre volontairement — PAS vert (mandat "Phase 3.1 — clarté
          // corrupted", 2026-09-10) : le vert signale un succès complet,
          // or à ce stade seule la STRUCTURE a été vérifiée, jamais le
          // contenu des fichiers. Un manifeste "corrupted" passe ce stade
          // avec la même couleur que "valid" — seul le résultat réel du
          // téléchargement (§2, vert "✅ … téléchargée") doit apparaître en
          // vert, jamais celui-ci.
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            <p className="font-semibold">
              ⚠ Manifeste structurellement valide — « {manifest.unitTitle} » v{manifest.version} —{" "}
              {manifest.resources.length} ressources, {manifest.totalSizeBytes} o.
            </p>
            <p className="mt-1 text-xs text-amber-800">
              Corruption éventuelle des fichiers détectable uniquement au téléchargement (vérification checksum
              individuelle) — ceci ne confirme pas encore que le paquet est utilisable.
            </p>
          </div>
        ) : manifestErrors.length > 0 ? (
          <ul className="list-disc pl-5 text-sm text-red-600">
            {manifestErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">Aucun manifeste chargé.</p>
        )}
      </section>

      <section className="mb-4 rounded-xl border border-border bg-surface p-3.5 sm:p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-dark">2. Téléchargement</h2>
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            disabled={!manifest || downloading || effectiveOffline}
            onClick={() => void handleDownload()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Télécharger l&apos;unité
          </button>
          <button
            disabled={!manifest || downloading || effectiveOffline}
            onClick={() => void handleDownload(3)}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Télécharger avec interruption simulée (après 3)
          </button>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={simulateQuotaError} onChange={(e) => setSimulateQuotaError(e.target.checked)} />
            Simuler stockage insuffisant (prochain fichier)
          </label>
        </div>
        {downloadTotal > 0 && (
          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full bg-accent transition-all" style={{ width: `${(downloadDone / downloadTotal) * 100}%` }} />
          </div>
        )}
        <p className="text-xs text-muted">{storageEstimate}</p>
        {packageRecord && (
          <p className="mt-2 text-sm text-emerald-700">
            ✓ Paquet local présent : v{packageRecord.version}, {packageRecord.resourceCount} ressources, téléchargé le{" "}
            {new Date(packageRecord.downloadedAt).toLocaleString("fr-FR")}.
          </p>
        )}
        {packageRecord && (
          <button onClick={() => void handleDeletePackage()} className="mt-2 text-xs font-semibold text-red-600 underline">
            Supprimer le média téléchargé (garder la progression)
          </button>
        )}
      </section>

      <section className="mb-4 rounded-xl border border-border bg-surface p-3.5 sm:p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-dark">3. Activités (fictives)</h2>
        {manifest ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {manifest.vocabulary.map((item) => (
              <div key={item.id} className="rounded-lg border border-border bg-white p-2 text-center">
                <div className="mx-auto mb-1 h-10 w-10 rounded-full" style={{ background: "#fdf8ec" }} />
                <p className="text-xs font-medium text-foreground">{item.word}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Charge un manifeste valide d&apos;abord.</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            disabled={!manifest || activityInFlight !== null || blockedActivities.recognition}
            onClick={() => void handleCompleteActivity("recognition", "completed")}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {activityInFlight === "recognition" ? "Enregistrement…" : "Compléter « reconnaissance » (hors-ligne OK)"}
          </button>
          <button
            disabled={!manifest || activityInFlight !== null || blockedActivities.matching}
            onClick={() => void handleCompleteActivity("matching", "completed")}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {activityInFlight === "matching" ? "Enregistrement…" : "Compléter « association » (hors-ligne OK)"}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          Les boutons se réactivent après {ACTIVITY_COOLDOWN_MS / 1000} s — évite qu&apos;un appui rapide/répété
          n&apos;enregistre plusieurs fois la même activité.
        </p>
        {progress.length > 0 && (
          <p className="mt-2 text-sm text-emerald-700">
            ✓ {progress.length} activité(s) enregistrée(s) localement (persistent après fermeture/réouverture).
          </p>
        )}
      </section>

      <section className="mb-4 rounded-xl border border-border bg-surface p-3.5 sm:p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-dark">4. Synchronisation</h2>
        <p className="mb-2 text-xs text-muted">
          File locale : {syncQueue.filter((q) => q.syncStatus !== "synced").length} en attente / {syncQueue.length} au total.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            disabled={effectiveOffline || syncQueue.length === 0}
            onClick={() => void handleSync()}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Synchroniser maintenant
          </button>
          <button
            disabled={effectiveOffline}
            onClick={() => void handleReplayForDuplicateTest()}
            className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Rejouer un événement déjà envoyé (test doublon)
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-3.5 sm:p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-dark">5. Journal du test</h2>
        <div className="max-h-72 min-h-32 overflow-y-auto overflow-x-hidden rounded-lg bg-[#0f2d52] p-3 font-mono text-xs text-white">
          {log.length === 0 ? (
            <p className="text-white/50">En attente d&apos;événements… (vide pour l&apos;instant)</p>
          ) : (
            log.map((l, i) => (
              <p key={i} className="break-words">
                {l}
              </p>
            ))
          )}
        </div>
        <button onClick={() => void handleFullReset()} className="mt-3 text-xs font-semibold text-red-600 underline">
          Réinitialiser complètement le prototype
        </button>
      </section>
    </div>
  );
}
