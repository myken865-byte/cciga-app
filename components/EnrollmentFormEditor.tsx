"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import type { EnrollmentFormDocumentEntry, EnrollmentFormDocumentStatus } from "@/lib/enrollmentFormDocuments";
import { enrollmentFormDocumentStatuses, enrollmentFormDocumentStatusLabels } from "@/lib/enrollmentFormDocuments";
import {
  enrollmentFormStatuses,
  enrollmentFormStatusLabels,
  enrollmentFormStatusStyles,
  type EnrollmentFormStatus,
} from "@/lib/enrollmentFormStatus";
import { SEX_OPTIONS, FAMILY_STATUS_OPTIONS, PHONE_PATTERN } from "@/lib/enrollmentFieldOptions";
import DateField from "@/components/DateField";
import BackButton from "@/components/BackButton";
import RadioGroup from "@/components/RadioGroup";

interface FicheData {
  id: string;
  reference: string;
  status: string;
  programId: string | null;
  lastName: string;
  firstName: string;
  birthDateAndPlace: string;
  sex: string;
  fatherName: string;
  motherName: string;
  familyStatus: string;
  cin: string;
  cinIssuedDate: string;
  cinIssuedPlace: string;
  address: string;
  phone: string;
  email: string;
  photoUrl: string | null;
  emergencyContactName: string;
  emergencyContactEmail: string;
  emergencyContactPhone: string;
  documents: EnrollmentFormDocumentEntry[];
  declarationAccepted: boolean;
  inscriptionInfo: string;
  uniformInfo: string;
  versement1: string;
  versement2: string;
  versement3: string;
  studentUserId: number | null;
}

interface LookupUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  dob: string | null;
  address: string | null;
  photoUrl: string | null;
  ccigaId: string;
}

interface LookupSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string | null;
  address: string | null;
  studentUserId: number | null;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  pattern,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "tel" | "email";
  pattern?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <input className="input" type={type} pattern={pattern} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export default function EnrollmentFormEditor({
  fiche,
  programs,
}: {
  fiche: FicheData;
  programs: { id: string; name: string; duration: string }[];
}) {
  const router = useRouter();
  const [page, setPage] = useState<1 | 2>(1);
  const [f, setF] = useState(fiche);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  // Modifications non enregistrées (item 13) : distinct de `saved` — celui-ci
  // vaut déjà false au tout premier rendu, avant toute vraie modification.
  const [dirty, setDirty] = useState(false);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [docBusyIndex, setDocBusyIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [lookupBusy, setLookupBusy] = useState(false);
  const [lookupResults, setLookupResults] = useState<{ users: LookupUser[]; submissions: LookupSubmission[] } | null>(null);

  const selectedProgram = programs.find((p) => p.id === f.programId);
  const statusKey = (enrollmentFormStatuses as readonly string[]).includes(f.status) ? (f.status as EnrollmentFormStatus) : "brouillon";

  function set<K extends keyof FicheData>(key: K, value: FicheData[K]) {
    setF((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setDirty(true);
  }

  async function save(extra?: Partial<FicheData>) {
    setBusy(true);
    setError(null);
    const payload = { ...f, ...extra, documents: JSON.stringify((extra?.documents ?? f.documents)) };
    try {
      const res = await fetch(`/api/admin/fiches-inscription/${f.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      if (extra) setF((prev) => ({ ...prev, ...extra }));
      setSaved(true);
      setDirty(false);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setBusy(false);
    }
  }

  async function changeStatus(status: EnrollmentFormStatus) {
    await save({ status });
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Photo : JPG ou PNG uniquement.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Photo trop volumineuse (4 Mo maximum).");
      return;
    }
    setPhotoBusy(true);
    setError(null);
    try {
      const blob = await upload(`fiche-inscription-photos/${crypto.randomUUID()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/fiches-inscription/photo/upload",
      });
      await fetch(`/api/admin/fiches-inscription/${f.id}/photo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl: blob.url }),
      });
      set("photoUrl", blob.url);
      router.refresh();
    } catch {
      setError("Échec du téléversement de la photo.");
    } finally {
      setPhotoBusy(false);
    }
  }

  async function removePhoto() {
    setPhotoBusy(true);
    await fetch(`/api/admin/fiches-inscription/${f.id}/photo`, { method: "DELETE" });
    set("photoUrl", null);
    setPhotoBusy(false);
    router.refresh();
  }

  function setDocStatus(index: number, status: EnrollmentFormDocumentStatus) {
    const next = f.documents.map((d, i) => (i === index ? { ...d, status } : d));
    set("documents", next);
    save({ documents: next });
  }

  async function handleDocUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      setError("Pièce : PDF, JPG ou PNG uniquement.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Fichier trop volumineux (8 Mo maximum).");
      return;
    }
    setDocBusyIndex(index);
    setError(null);
    try {
      const blob = await upload(`fiche-inscription-documents/${crypto.randomUUID()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/fiches-inscription/documents/upload",
      });
      const next = f.documents.map((d, i) =>
        i === index ? { ...d, fileUrl: blob.url, fileName: file.name, status: "fourni" as EnrollmentFormDocumentStatus } : d,
      );
      set("documents", next);
      await save({ documents: next });
    } catch {
      setError("Échec du téléversement du document.");
    } finally {
      setDocBusyIndex(null);
    }
  }

  async function runLookup() {
    if (query.trim().length < 2) return;
    setLookupBusy(true);
    try {
      const res = await fetch(`/api/admin/fiches-inscription/lookup?q=${encodeURIComponent(query.trim())}`);
      const json = await res.json();
      setLookupResults(json);
    } finally {
      setLookupBusy(false);
    }
  }

  function applyUser(u: LookupUser) {
    setF((prev) => ({
      ...prev,
      firstName: prev.firstName || u.name.split(" ").slice(1).join(" ") || u.name,
      lastName: prev.lastName || u.name.split(" ")[0] || "",
      phone: prev.phone || u.phone || "",
      email: prev.email || u.email || "",
      address: prev.address || u.address || "",
      birthDateAndPlace: prev.birthDateAndPlace || (u.dob ? u.dob.slice(0, 10) : ""),
      studentUserId: u.id,
    }));
    if (u.photoUrl && !f.photoUrl) {
      fetch(`/api/admin/fiches-inscription/${f.id}/photo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoUrl: u.photoUrl }),
      }).then(() => {
        set("photoUrl", u.photoUrl);
        router.refresh();
      });
    }
    save({ studentUserId: u.id });
    setLookupResults(null);
    setQuery("");
  }

  function applySubmission(s: LookupSubmission) {
    setF((prev) => ({
      ...prev,
      firstName: prev.firstName || s.firstName,
      lastName: prev.lastName || s.lastName,
      phone: prev.phone || s.phone || "",
      email: prev.email || s.email || "",
      address: prev.address || s.address || "",
      birthDateAndPlace: prev.birthDateAndPlace || (s.dob ? s.dob.slice(0, 10) : ""),
      studentUserId: s.studentUserId,
    }));
    save({ studentUserId: s.studentUserId });
    setLookupResults(null);
    setQuery("");
  }

  return (
    <div>
      <BackButton fallbackHref="/admin/fiches-inscription" label="Fiches d'inscription" confirmIfUnsaved={dirty} />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fiche d&apos;inscription</h1>
          <p className="font-mono text-sm text-muted">{f.reference}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${enrollmentFormStatusStyles[statusKey]}`}>
            {enrollmentFormStatusLabels[statusKey]}
          </span>
          <a href={`/api/admin/fiches-inscription/${f.id}/pdf`} target="_blank" rel="noreferrer" className="btn-secondary text-xs">
            Voir / PDF
          </a>
          <a href={`/api/admin/fiches-inscription/${f.id}/pdf`} download className="btn-secondary text-xs">
            Imprimer
          </a>
        </div>
      </div>

      {/* Pas de double saisie */}
      <div className="card mb-6 p-4">
        <p className="section-label mb-2">Candidat déjà connu de CCIGA App ?</p>
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="Rechercher par nom, e-mail ou téléphone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runLookup()}
          />
          <button type="button" onClick={runLookup} disabled={lookupBusy} className="btn-secondary text-sm">
            {lookupBusy ? "…" : "Rechercher"}
          </button>
        </div>
        {f.studentUserId && <p className="mt-2 text-xs font-semibold text-emerald-700">✓ Dossier élève lié (id {f.studentUserId})</p>}
        {lookupResults && (
          <div className="mt-3 space-y-1">
            {lookupResults.users.length === 0 && lookupResults.submissions.length === 0 && (
              <p className="text-xs text-muted">Aucun résultat.</p>
            )}
            {lookupResults.users.map((u) => (
              <button
                key={`u-${u.id}`}
                type="button"
                onClick={() => applyUser(u)}
                className="block w-full rounded-md border border-border px-3 py-2 text-left text-xs hover:bg-background"
              >
                <span className="font-semibold text-foreground">{u.name}</span> — {u.ccigaId} — compte existant
              </button>
            ))}
            {lookupResults.submissions.map((s) => (
              <button
                key={`s-${s.id}`}
                type="button"
                onClick={() => applySubmission(s)}
                className="block w-full rounded-md border border-border px-3 py-2 text-left text-xs hover:bg-background"
              >
                <span className="font-semibold text-foreground">
                  {s.firstName} {s.lastName}
                </span>{" "}
                — candidature déjà soumise
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setPage(1)}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${page === 1 ? "bg-primary text-white" : "border border-border bg-surface text-muted"}`}
        >
          Page 1 — Fiche d&apos;inscription
        </button>
        <button
          type="button"
          onClick={() => setPage(2)}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${page === 2 ? "bg-primary text-white" : "border border-border bg-surface text-muted"}`}
        >
          Page 2 — Engagement et résumé
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      {page === 1 ? (
        <div className="card space-y-6 p-6">
          {/* En-tête */}
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
            <label className="block max-w-md flex-1">
              <span className="mb-1 block text-xs font-semibold text-muted">À la formation</span>
              <select className="input" value={f.programId ?? ""} onChange={(e) => set("programId", e.target.value || null)}>
                <option value="">— Sélectionner —</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {programs.length === 0 && (
                <span className="mt-1 block text-xs text-warning">PROGRAMMES PROFESSIONNELS OFFICIELS À COMPLÉTER</span>
              )}
            </label>

            <div className="flex flex-col items-center gap-2">
              <span className="section-label">Photo</span>
              {f.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.photoUrl} alt="" className="h-28 w-24 rounded-md border border-border object-cover" />
              ) : (
                <div className="flex h-28 w-24 items-center justify-center rounded-md border-2 border-dashed border-border text-[10px] text-muted">
                  PHOTO
                </div>
              )}
              <div className="flex gap-2">
                <label className="btn-secondary !min-h-0 cursor-pointer !py-1 text-xs">
                  {photoBusy ? "…" : f.photoUrl ? "Remplacer" : "Importer"}
                  <input type="file" accept="image/jpeg,image/png" className="hidden" disabled={photoBusy} onChange={handlePhoto} />
                </label>
                {f.photoUrl && (
                  <button type="button" onClick={removePhoto} disabled={photoBusy} className="text-xs font-semibold text-danger hover:underline">
                    Retirer
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* État civil */}
          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">État civil</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nom" value={f.lastName} onChange={(v) => set("lastName", v)} />
              <Field label="Prénoms" value={f.firstName} onChange={(v) => set("firstName", v)} />
              <Field label="Date et lieu de naissance" value={f.birthDateAndPlace} onChange={(v) => set("birthDateAndPlace", v)} />
              <RadioGroup label="Sexe" name="sex" value={f.sex} onChange={(v) => set("sex", v)} options={SEX_OPTIONS} />
              <Field label="Fils de" value={f.fatherName} onChange={(v) => set("fatherName", v)} />
              <Field label="Et de" value={f.motherName} onChange={(v) => set("motherName", v)} />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Situation de famille</span>
                <select className="input" value={f.familyStatus} onChange={(e) => set("familyStatus", e.target.value)}>
                  <option value="">— À COMPLÉTER —</option>
                  {FAMILY_STATUS_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-3 gap-2 sm:col-span-2">
                <Field label="CIN" value={f.cin} onChange={(v) => set("cin", v)} />
                <DateField label="Délivrée le" value={f.cinIssuedDate} onChange={(v) => set("cinIssuedDate", v)} />
                <Field label="À" value={f.cinIssuedPlace} onChange={(v) => set("cinIssuedPlace", v)} />
              </div>
              <Field label="Adresse géographique" value={f.address} onChange={(v) => set("address", v)} />
              <Field label="Téléphone" type="tel" pattern={PHONE_PATTERN} value={f.phone} onChange={(v) => set("phone", v)} />
              <Field label="Adresse électronique du candidat" type="email" value={f.email} onChange={(v) => set("email", v)} />
            </div>
          </div>

          {/* Personne à contacter */}
          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
              Personne à contacter en cas de nécessité
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nom et prénoms" value={f.emergencyContactName} onChange={(v) => set("emergencyContactName", v)} />
              <Field label="Téléphone" type="tel" pattern={PHONE_PATTERN} value={f.emergencyContactPhone} onChange={(v) => set("emergencyContactPhone", v)} />
              <Field label="Adresse électronique" type="email" value={f.emergencyContactEmail} onChange={(v) => set("emergencyContactEmail", v)} />
            </div>
          </div>

          {/* Pièces fournies */}
          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">Pièces fournies</h2>
            <div className="space-y-2">
              {f.documents.map((d, i) => (
                <div key={d.label} className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
                  <span className="text-sm text-foreground">
                    {i + 1}. {d.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {d.fileUrl && (
                      <a href={d.fileUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                        {d.fileName ?? "Voir"}
                      </a>
                    )}
                    <label className="btn-secondary !min-h-0 cursor-pointer !py-1 text-xs">
                      {docBusyIndex === i ? "…" : "Téléverser"}
                      <input
                        type="file"
                        accept="application/pdf,image/jpeg,image/png"
                        className="hidden"
                        disabled={docBusyIndex === i}
                        onChange={(e) => handleDocUpload(e, i)}
                      />
                    </label>
                    <select className="input !min-h-0 !w-auto !py-1 text-xs" value={d.status} onChange={(e) => setDocStatus(i, e.target.value as EnrollmentFormDocumentStatus)}>
                      {enrollmentFormDocumentStatuses.map((s) => (
                        <option key={s} value={s}>
                          {enrollmentFormDocumentStatusLabels[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card space-y-6 p-6">
          {/* Déclaration */}
          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">Déclaration du candidat</h2>
            <p className="mb-3 text-sm text-foreground">
              Moi, <span className="font-semibold">{f.firstName} {f.lastName}</span>, soussigné(e), certifie l&apos;exactitude
              des informations fournies à CCIGA. Je m&apos;engage à respecter le règlement et la discipline de l&apos;établissement.
            </p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={f.declarationAccepted} onChange={(e) => set("declarationAccepted", e.target.checked)} />
              Certifié par le candidat
            </label>
          </div>

          {/* Résumé */}
          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">Résumé</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Option</span>
                <input className="input" value={selectedProgram?.name ?? ""} disabled />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Durée</span>
                <input className="input" value={selectedProgram?.duration ?? ""} disabled />
              </label>
              <Field
                label="Inscription (À COMPLÉTER si non défini)"
                value={f.inscriptionInfo}
                onChange={(v) => set("inscriptionInfo", v)}
                placeholder="À COMPLÉTER"
              />
              <Field label="Uniforme (À COMPLÉTER si non défini)" value={f.uniformInfo} onChange={(v) => set("uniformInfo", v)} placeholder="À COMPLÉTER" />
              <Field label="Versement 1" value={f.versement1} onChange={(v) => set("versement1", v)} placeholder="À COMPLÉTER" />
              <Field label="Versement 2" value={f.versement2} onChange={(v) => set("versement2", v)} placeholder="À COMPLÉTER" />
              <Field label="Versement 3" value={f.versement3} onChange={(v) => set("versement3", v)} placeholder="À COMPLÉTER" />
            </div>
            <p className="mt-3 rounded-md border-l-4 border-accent-vivid bg-accent/5 px-3 py-2 text-xs text-foreground">
              N.B. : Le 1er versement doit être versé dès la rentrée. Les stages et les séminaires sont obligatoires.
            </p>
          </div>

          {/* Signatures */}
          <div className="grid gap-8 pt-6 sm:grid-cols-2">
            <div>
              <p className="mb-8 text-xs font-bold uppercase text-primary">L&apos;étudiant</p>
              <div className="border-t border-foreground/40 pt-1 text-center text-xs text-muted">Signature</div>
            </div>
            <div>
              <p className="mb-8 text-xs font-bold uppercase text-primary">L&apos;administration CCIGA</p>
              <div className="border-t border-foreground/40 pt-1 text-center text-xs text-muted">Signature</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => save()} disabled={busy} className="btn-primary text-sm">
          {busy ? "Enregistrement…" : saved ? "Enregistré ✓" : "Enregistrer"}
        </button>
        {statusKey !== "a_verifier" && (
          <button type="button" onClick={() => changeStatus("a_verifier")} disabled={busy} className="btn-secondary text-sm">
            Marquer à vérifier
          </button>
        )}
        {statusKey !== "validee" && (
          <button type="button" onClick={() => changeStatus("validee")} disabled={busy} className="btn-secondary text-sm">
            Valider
          </button>
        )}
        {statusKey !== "incomplet" && (
          <button type="button" onClick={() => changeStatus("incomplet")} disabled={busy} className="text-xs text-muted hover:underline">
            Marquer incomplète
          </button>
        )}
        {statusKey !== "archivee" ? (
          <button
            type="button"
            onClick={() => {
              if (confirm("Archiver cette fiche ?")) changeStatus("archivee");
            }}
            disabled={busy}
            className="text-xs text-muted hover:underline"
          >
            Archiver
          </button>
        ) : (
          <button type="button" onClick={() => changeStatus("a_verifier")} disabled={busy} className="btn-secondary text-sm">
            Désarchiver (remettre à vérifier)
          </button>
        )}
      </div>
      {statusKey === "validee" && !f.studentUserId && (
        <p className="mt-3 text-xs text-warning">
          Badge à finaliser — information manquante : liez cette fiche à un dossier élève (ci-dessus) pour générer le badge automatiquement.
        </p>
      )}
      {statusKey === "validee" && f.studentUserId && (
        <a href={`/admin/dossier/${f.studentUserId}`} className="btn-primary mt-3 inline-block text-sm">
          Voir le dossier
        </a>
      )}
    </div>
  );
}
