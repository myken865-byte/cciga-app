"use client";

import { useState } from "react";
import { parentDemoStudent } from "@/lib/parentDemoData";
import {
  studentDemoEnvironments,
  studentDemoNotifications,
  studentDemoCalendar,
} from "@/lib/studentDemoData";
import {
  BookIcon,
  CalendarIcon,
  ClipboardIcon,
  DocumentIcon,
  BellIcon,
  ChatIcon,
  ClockIcon,
  DoorIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@/components/icons";

const attendanceLabels: Record<string, { label: string; badge: string }> = {
  present: { label: "Présent(e)", badge: "badge-success" },
  absent: { label: "Absent(e)", badge: "badge-danger" },
  retard: { label: "Retard", badge: "badge-warning" },
  justifie: { label: "Justifié", badge: "badge-info" },
};

const homeworkLabels: Record<string, { label: string; badge: string }> = {
  a_faire: { label: "À faire", badge: "badge-neutral" },
  en_cours: { label: "En cours", badge: "badge-info" },
  remis: { label: "Remis", badge: "badge-success" },
  en_retard: { label: "En retard", badge: "badge-danger" },
  corrige: { label: "Corrigé", badge: "badge-success" },
};

const examLabels: Record<string, { label: string; badge: string }> = {
  a_venir: { label: "À venir", badge: "badge-neutral" },
  resultats_disponibles: { label: "Résultats disponibles", badge: "badge-success" },
};

const chapterLabels: Record<string, { label: string; badge: string }> = {
  termine: { label: "Terminé", badge: "badge-success" },
  en_cours: { label: "En cours", badge: "badge-info" },
  a_venir: { label: "À venir", badge: "badge-neutral" },
};

const notificationLabels: Record<string, string> = {
  important: "badge-warning",
  normal: "badge-info",
};

function DemoTag() {
  return <span className="badge badge-warning">DEMO</span>;
}

export default function StudentDigitalClassroom() {
  const [envKey, setEnvKey] = useState<(typeof studentDemoEnvironments)[number]["key"]>("classique");
  const env = studentDemoEnvironments.find((e) => e.key === envKey)!;

  return (
    <div className="mx-auto max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 pb-20 pt-6 lg:px-6">
      <div className="empty-state mb-6 !border-solid !border-warning !bg-warning-bg !text-left">
        <p className="mb-1 font-bold text-warning">DONNÉES DE DÉMONSTRATION</p>
        <p className="text-foreground">
          Aperçu DEV/TEST de votre salle de classe numérique personnelle. Aucune donnée réelle : seules les
          notes déjà publiées seraient affichées, jamais un brouillon. Dès qu&apos;une vraie inscription sera
          active, cette démonstration disparaît automatiquement.
        </p>
      </div>

      {/* Identité */}
      <div className="card mb-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="section-label mb-1">Bonjour <DemoTag /></p>
            <h2 className="text-xl font-bold text-foreground">{parentDemoStudent.name}</h2>
            <p className="text-sm text-muted">{env.identite.classeValeur} · {env.identite.contexte}</p>
          </div>
          <span className="badge badge-success">Inscrit(e)</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="stat-tile">
            <p className="section-label mb-1">Matricule</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.matricule}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Année académique</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.anneeAcademique}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">{env.identite.classeLabel}</p>
            <p className="text-sm font-semibold text-foreground">{env.identite.classeValeur}</p>
          </div>
        </div>
      </div>

      {/* Trois environnements */}
      <p className="section-label mb-2">Choisir un environnement</p>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {studentDemoEnvironments.map((e) => (
          <button
            key={e.key}
            onClick={() => setEnvKey(e.key)}
            className={`card p-4 text-left transition-colors ${
              envKey === e.key ? "border-primary bg-primary/5" : "card-interactive"
            }`}
          >
            <DoorIcon className="mb-2 h-6 w-6 text-primary" />
            <p className="font-semibold text-foreground">{e.label}</p>
            <p className="mt-0.5 text-xs text-muted">{e.identite.classeValeur}</p>
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted">
        {env.breadcrumb.map((b, i) => (
          <span key={b} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>›</span>}
            {b}
          </span>
        ))}
      </div>

      {/* Emploi du temps */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" /> Emploi du temps <DemoTag />
        </h2>
        <ul className="divide-y divide-row-divider overflow-hidden rounded-lg border border-border">
          {env.emploiDuTemps.map((c, i) => (
            <li key={i} className="flex items-center justify-between gap-3 bg-surface px-3.5 py-2.5 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{c.matiere}</p>
                <p className="text-xs text-muted">{c.enseignant} · {c.salle}</p>
              </div>
              <span className="badge badge-info shrink-0">{c.jour} {c.heure}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Mes cours / salle de classe numérique */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <BookIcon className="h-4 w-4" /> Mes cours <DemoTag />
        </h2>
        <div className="space-y-2">
          {env.cours.map((c) => (
            <details key={c.nom} className="card overflow-hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3.5 text-sm font-semibold text-foreground">
                <span className="min-w-0 truncate">{c.nom}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="badge badge-info">{c.progression}%</span>
                  <ChevronDownIcon />
                </span>
              </summary>
              <div className="border-t border-border p-3.5 text-sm">
                <p className="mb-3 text-muted">Enseignant : {c.enseignant}</p>
                <p className="section-label mb-2">Chapitres</p>
                <ul className="mb-3 space-y-1.5">
                  {c.chapitres.map((ch) => (
                    <li key={ch.titre} className="flex items-center justify-between gap-2">
                      <span className="text-foreground">{ch.titre}</span>
                      <span className={`badge ${chapterLabels[ch.statut].badge}`}>{chapterLabels[ch.statut].label}</span>
                    </li>
                  ))}
                </ul>
                {c.ressources.length > 0 && (
                  <>
                    <p className="section-label mb-2">Ressources</p>
                    <ul className="mb-3 list-inside list-disc space-y-1 text-muted">
                      {c.ressources.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}
                {c.annonces.length > 0 && (
                  <>
                    <p className="section-label mb-2">Annonces</p>
                    <ul className="space-y-1 text-muted">
                      {c.annonces.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Présence */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <UsersIcon className="h-4 w-4" /> Présence <DemoTag />
        </h2>
        <div className="mb-3 grid grid-cols-3 gap-3">
          <div className="stat-tile">
            <p className="section-label mb-1">Présences</p>
            <p className="text-lg font-bold text-foreground">{env.presence.totaux.presents}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Absences</p>
            <p className="text-lg font-bold text-foreground">{env.presence.totaux.absences}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Retards</p>
            <p className="text-lg font-bold text-foreground">{env.presence.totaux.retards}</p>
          </div>
        </div>
        <ul className="divide-y divide-row-divider overflow-hidden rounded-lg border border-border">
          {env.presence.historique.map((h, i) => (
            <li key={i} className="flex items-center justify-between bg-surface px-3.5 py-2.5 text-sm">
              <span className="text-foreground">{h.date} — {h.cours}</span>
              <span className={`badge ${attendanceLabels[h.statut].badge}`}>{attendanceLabels[h.statut].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Devoirs */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4" /> Devoirs / Travaux <DemoTag />
        </h2>
        <ul className="space-y-2">
          {env.devoirs.map((d) => (
            <li key={d.titre} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{d.titre}</p>
                <p className="text-xs text-muted">{d.cours} · Échéance {d.echeance}</p>
              </div>
              <span className={`badge shrink-0 ${homeworkLabels[d.etat].badge}`}>{homeworkLabels[d.etat].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Examens */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClockIcon className="h-4 w-4" /> Examens / Évaluations <DemoTag />
        </h2>
        <ul className="divide-y divide-row-divider overflow-hidden rounded-lg border border-border">
          {env.examens.map((ex) => (
            <li key={ex.titre} className="flex items-center justify-between gap-3 bg-surface px-3.5 py-2.5 text-sm">
              <div>
                <p className="font-medium text-foreground">{ex.titre}</p>
                <p className="text-xs text-muted">{ex.cours} · {ex.date}</p>
              </div>
              <span className={`badge shrink-0 ${examLabels[ex.statut].badge}`}>{examLabels[ex.statut].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Notes */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4" /> Notes publiées <DemoTag />
        </h2>
        <ul className="space-y-2">
          {env.notes.map((n, i) => (
            <li key={i} className="card p-3.5 text-sm">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="font-medium text-foreground">{n.cours} — {n.evaluation}</span>
                <span className="badge badge-info">{n.note}/{n.max}</span>
              </div>
              <p className="text-xs text-muted">{n.date}{n.feedback ? ` · ${n.feedback}` : ""}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Carnet 4 périodes (École Classique uniquement) */}
      {env.carnet && (
        <section className="card mb-4 p-5 sm:p-6">
          <h2 className="section-label mb-3 flex items-center gap-1.5">
            <BookIcon className="h-4 w-4" /> Carnet scolaire — 4 périodes <DemoTag />
          </h2>
          <div className="space-y-2">
            {env.carnet.map((p) => (
              <details key={p.periode} className="card overflow-hidden" open={p.statut === "publie"}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3.5 text-sm font-semibold text-foreground">
                  <span>{p.periode}</span>
                  <span className="flex items-center gap-2">
                    {p.statut === "publie" ? (
                      <span className="badge badge-info">{p.moyenne.toFixed(1)}/100</span>
                    ) : (
                      <span className="badge badge-neutral">À COMPLÉTER</span>
                    )}
                    <ChevronDownIcon />
                  </span>
                </summary>
                <div className="border-t border-border p-3.5">
                  {p.matieres.length === 0 ? (
                    <div className="empty-state">Notes non encore publiées pour cette période.</div>
                  ) : (
                    <ul className="space-y-1.5 text-sm">
                      {p.matieres.map((m) => (
                        <li key={m.matiere} className="flex items-center justify-between gap-2">
                          <span className="text-foreground">{m.matiere}</span>
                          <span className="flex items-center gap-2">
                            <span className="font-semibold text-primary">{m.note}/{m.max}</span>
                            <span className="hidden text-xs text-muted sm:inline">{m.appreciation}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Documents */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <DocumentIcon className="h-4 w-4" /> Documents et ressources <DemoTag />
        </h2>
        <ul className="space-y-2">
          {env.documents.map((d) => (
            <li key={d.nom} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <span className="font-medium text-foreground">{d.nom}</span>
              <span className="badge badge-neutral">{d.categorie}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-4 h-px bg-border" />
      <p className="section-label mb-3">Global — tous environnements</p>

      {/* Calendrier */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" /> Calendrier personnel <DemoTag />
        </h2>
        <ul className="divide-y divide-row-divider overflow-hidden rounded-lg border border-border">
          {studentDemoCalendar.map((c) => (
            <li key={c.titre} className="flex items-center justify-between gap-3 bg-surface px-3.5 py-2.5 text-sm">
              <div>
                <p className="font-medium text-foreground">{c.titre}</p>
                <p className="text-xs text-muted">{c.date}</p>
              </div>
              <span className="badge badge-neutral">{c.type}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Notifications */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <BellIcon className="h-4 w-4" /> Notifications <DemoTag />
        </h2>
        <ul className="space-y-2">
          {studentDemoNotifications.map((n) => (
            <li key={n.titre} className="card flex items-start justify-between gap-3 p-3.5 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-foreground">{n.titre}</p>
                <p className="text-xs text-muted">{n.corps}</p>
              </div>
              <span className={`badge shrink-0 ${notificationLabels[n.etat]}`}>{n.etat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Communication */}
      <section className="card p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ChatIcon className="h-4 w-4" /> Communication
        </h2>
        <div className="empty-state">
          Espace de communication avec vos enseignants et l&apos;Administration — architecture prête,
          fonctionnalité à activer dans une prochaine phase. Aucune messagerie fictive n&apos;a été créée.
        </div>
      </section>
    </div>
  );
}
