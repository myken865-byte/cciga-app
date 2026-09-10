"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import type { ClassicEnrollmentSibling } from "@/lib/classicEnrollmentSiblings";
import {
  enrollmentFormDocumentStatuses,
  enrollmentFormDocumentStatusLabels,
  type ClassicEnrollmentDocumentEntry,
  type EnrollmentFormDocumentStatus,
} from "@/lib/classicEnrollmentDocuments";
import {
  enrollmentFormStatuses,
  enrollmentFormStatusLabels,
  enrollmentFormStatusStyles,
  type EnrollmentFormStatus,
} from "@/lib/enrollmentFormStatus";
import { niveauList, niveauLabels, type Niveau } from "@/lib/niveaux";
import { SEX_OPTIONS, FAMILY_STATUS_OPTIONS, BLOOD_TYPE_OPTIONS, LIVES_WITH_OPTIONS, PHONE_PATTERN } from "@/lib/enrollmentFieldOptions";
import DateField, { todayIsoDate } from "@/components/DateField";
import RadioGroup from "@/components/RadioGroup";
import BackButton from "@/components/BackButton";

interface FicheData {
  id: string;
  reference: string;
  status: string;
  programId: string | null;

  registrationDate: string;
  schoolLevel: string;
  previousSchool: string;
  adminCode: string;

  lastName: string;
  firstName: string;
  birthPlaceCity: string;
  birthPlaceDept: string;
  birthDate: string;
  sex: string;
  bloodType: string;
  livesWith: string;
  religion: string;
  addressNumber: string;
  addressStreet: string;
  addressCity: string;
  addressPostalCode: string;
  addressZone: string;
  photoUrl: string | null;

  familyStatus: string;
  fatherName: string;
  fatherProfession: string;
  fatherOccupation: string;
  fatherEmail: string;
  fatherPhone: string;
  fatherNif: string;
  fatherCin: string;

  motherName: string;
  motherProfession: string;
  motherOccupation: string;
  motherEmail: string;
  motherPhone: string;
  motherNif: string;
  motherCin: string;

  guardianName: string;
  guardianProfession: string;
  guardianOccupation: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianNif: string;
  guardianCin: string;

  vaccinesUpToDate: boolean | null;
  longTermMedication: boolean | null;
  medicationDetails: string;

  siblings: ClassicEnrollmentSibling[];
  documents: ClassicEnrollmentDocumentEntry[];

  declarationAccepted: boolean;
  studentUserId: number | null;

  academicYearId: string | null;
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

function TriBool({ label, value, onChange }: { label: string; value: boolean | null; onChange: (v: boolean | null) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <select
        className="input"
        value={value === null ? "" : value ? "oui" : "non"}
        onChange={(e) => onChange(e.target.value === "" ? null : e.target.value === "oui")}
      >
        <option value="">— À COMPLÉTER —</option>
        <option value="oui">Oui</option>
        <option value="non">Non</option>
      </select>
    </label>
  );
}

export default function ClassicEnrollmentFormEditor({
  fiche,
  programs,
  academicYears,
}: {
  fiche: FicheData;
  programs: { id: string; name: string; niveau: Niveau | null }[];
  academicYears: { id: string; label: string; isActive: boolean }[];
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
  const [query, setQuery] = useState("");
  const [lookupBusy, setLookupBusy] = useState(false);
  const [lookupResults, setLookupResults] = useState<{ users: LookupUser[]; submissions: LookupSubmission[] } | null>(null);
  // Formulaire intelligent (item 23) : masquée par défaut, la section n'est
  // ouverte que si un responsable différent existe déjà en base ou si
  // l'utilisateur répond "Oui" explicitement.
  const [showGuardian, setShowGuardian] = useState(() => Boolean(fiche.guardianName || fiche.guardianPhone || fiche.guardianEmail));

  // Niveau -> Classe (item 9-10) : le niveau sélectionné (schoolLevel, déjà
  // un champ existant) filtre les classes réellement configurées pour ce
  // niveau. Aucun niveau choisi -> toutes les classes restent visibles.
  const filteredPrograms = useMemo(
    () => (f.schoolLevel ? programs.filter((p) => p.niveau === f.schoolLevel) : programs),
    [programs, f.schoolLevel],
  );

  const statusKey = (enrollmentFormStatuses as readonly string[]).includes(f.status) ? (f.status as EnrollmentFormStatus) : "brouillon";

  function set<K extends keyof FicheData>(key: K, value: FicheData[K]) {
    setF((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setDirty(true);
  }

  async function save(extra?: Partial<FicheData>) {
    setBusy(true);
    setError(null);
    const payload = {
      ...f,
      ...extra,
      siblings: JSON.stringify(extra?.siblings ?? f.siblings),
      documents: JSON.stringify(extra?.documents ?? f.documents),
    };
    try {
      const res = await fetch(`/api/admin/inscriptions-ecole-classique/${f.id}`, {
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
      const blob = await upload(`inscription-ecole-classique-photos/${crypto.randomUUID()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/inscriptions-ecole-classique/photo/upload",
      });
      await fetch(`/api/admin/inscriptions-ecole-classique/${f.id}/photo`, {
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
    await fetch(`/api/admin/inscriptions-ecole-classique/${f.id}/photo`, { method: "DELETE" });
    set("photoUrl", null);
    setPhotoBusy(false);
    router.refresh();
  }

  function addSibling() {
    set("siblings", [...f.siblings, { firstName: "", birthDate: "", school: "" }]);
  }

  function updateSibling(index: number, patch: Partial<ClassicEnrollmentSibling>) {
    set(
      "siblings",
      f.siblings.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    );
  }

  function removeSibling(index: number) {
    set(
      "siblings",
      f.siblings.filter((_, i) => i !== index),
    );
  }

  // Pièces d'inscription : liste librement éditable (item 5 du prompt
  // maître de finalisation) — aucune liste officielle EC n'étant confirmée,
  // le secrétariat ajoute lui-même les pièces réellement exigées au lieu
  // d'une liste fixe inventée.
  function addDocument() {
    set("documents", [...f.documents, { label: "", status: "non_fourni" }]);
  }

  function updateDocument(index: number, patch: Partial<ClassicEnrollmentDocumentEntry>) {
    set(
      "documents",
      f.documents.map((d, i) => (i === index ? { ...d, ...patch } : d)),
    );
  }

  function removeDocument(index: number) {
    set(
      "documents",
      f.documents.filter((_, i) => i !== index),
    );
  }

  async function runLookup() {
    if (query.trim().length < 2) return;
    setLookupBusy(true);
    try {
      const res = await fetch(`/api/admin/inscriptions-ecole-classique/lookup?q=${encodeURIComponent(query.trim())}`);
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
      studentUserId: u.id,
    }));
    if (u.photoUrl && !f.photoUrl) {
      fetch(`/api/admin/inscriptions-ecole-classique/${f.id}/photo`, {
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
      studentUserId: s.studentUserId,
    }));
    save({ studentUserId: s.studentUserId });
    setLookupResults(null);
    setQuery("");
  }

  return (
    <div>
      <BackButton
        fallbackHref="/admin/inscriptions-ecole-classique"
        label="Fiches d'inscription — École Classique"
        confirmIfUnsaved={dirty}
      />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fiche d&apos;inscription — École Classique</h1>
          <p className="font-mono text-sm text-muted">{f.reference}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${enrollmentFormStatusStyles[statusKey]}`}>
            {enrollmentFormStatusLabels[statusKey]}
          </span>
          <a href={`/api/admin/inscriptions-ecole-classique/${f.id}/pdf`} target="_blank" rel="noreferrer" className="btn-secondary text-xs">
            Voir / PDF
          </a>
          <a href={`/api/admin/inscriptions-ecole-classique/${f.id}/pdf`} download className="btn-secondary text-xs">
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
                — candidature déjà soumise{s.studentUserId ? " (compte déjà créé)" : ""}
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
          Page 1 — Enfant et administration
        </button>
        <button
          type="button"
          onClick={() => setPage(2)}
          className={`rounded-md px-4 py-2 text-sm font-semibold ${page === 2 ? "bg-primary text-white" : "border border-border bg-surface text-muted"}`}
        >
          Page 2 — Responsables, santé, fratrie
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      {page === 1 ? (
        <div className="card space-y-6 p-6">
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
            <label className="block max-w-md flex-1">
              <span className="mb-1 block text-xs font-semibold text-muted">
                DE la classe {f.schoolLevel && <span className="font-normal text-muted">— {niveauLabels[f.schoolLevel as Niveau]}</span>}
              </span>
              <select className="input" value={f.programId ?? ""} onChange={(e) => set("programId", e.target.value || null)}>
                <option value="">— Sélectionner —</option>
                {filteredPrograms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {filteredPrograms.length === 0 && <span className="mt-1 block text-xs text-warning">CLASSES OFFICIELLES À COMPLÉTER</span>}
            </label>

            <div className="flex flex-col items-center gap-2">
              <span className="section-label">Photo de l&apos;élève</span>
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

          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
              Cadre réservé à l&apos;administration
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <DateField label="Date d'inscription" value={f.registrationDate} onChange={(v) => set("registrationDate", v)} />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Niveau scolaire</span>
                <select
                  className="input"
                  value={f.schoolLevel}
                  onChange={(e) => {
                    const niveau = e.target.value;
                    set("schoolLevel", niveau);
                    const current = programs.find((p) => p.id === f.programId);
                    if (niveau && current && current.niveau !== niveau) set("programId", null);
                  }}
                >
                  <option value="">— Sélectionner —</option>
                  {niveauList.map((n) => (
                    <option key={n} value={n}>
                      {niveauLabels[n]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Année scolaire</span>
                <select className="input" value={f.academicYearId ?? ""} onChange={(e) => set("academicYearId", e.target.value || null)}>
                  <option value="">— Sélectionner —</option>
                  {academicYears.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.label}
                      {y.isActive ? " (active)" : ""}
                    </option>
                  ))}
                </select>
                {academicYears.length === 0 && <span className="mt-1 block text-xs text-warning">ANNÉES SCOLAIRES À CONFIGURER</span>}
              </label>
              <Field label="Dernière école fréquentée" value={f.previousSchool} onChange={(v) => set("previousSchool", v)} />
              <Field label="Code" value={f.adminCode} onChange={(v) => set("adminCode", v)} />
            </div>
          </div>

          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
              Renseignements de l&apos;enfant
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nom de famille" value={f.lastName} onChange={(v) => set("lastName", v)} />
              <Field label="Prénom" value={f.firstName} onChange={(v) => set("firstName", v)} />
              <Field label="Lieu de naissance — Ville" value={f.birthPlaceCity} onChange={(v) => set("birthPlaceCity", v)} />
              <Field label="Lieu de naissance — Département" value={f.birthPlaceDept} onChange={(v) => set("birthPlaceDept", v)} />
              <DateField label="Date de naissance" value={f.birthDate} onChange={(v) => set("birthDate", v)} max={todayIsoDate()} />
              <RadioGroup label="Sexe" name="sex" value={f.sex} onChange={(v) => set("sex", v)} options={SEX_OPTIONS} />
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Groupe sanguin</span>
                <select className="input" value={f.bloodType} onChange={(e) => set("bloodType", e.target.value)}>
                  <option value="">— À COMPLÉTER —</option>
                  {BLOOD_TYPE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">L&apos;enfant réside</span>
                <select className="input" value={f.livesWith} onChange={(e) => set("livesWith", e.target.value)}>
                  <option value="">— À COMPLÉTER —</option>
                  {LIVES_WITH_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Religion" value={f.religion} onChange={(v) => set("religion", v)} />
            </div>
            <p className="mb-2 mt-4 text-xs font-semibold text-muted">Adresse détaillée</p>
            <div className="grid gap-3 sm:grid-cols-5">
              <Field label="N°" value={f.addressNumber} onChange={(v) => set("addressNumber", v)} />
              <Field label="Rue" value={f.addressStreet} onChange={(v) => set("addressStreet", v)} />
              <Field label="Ville" value={f.addressCity} onChange={(v) => set("addressCity", v)} />
              <Field label="Code postal" value={f.addressPostalCode} onChange={(v) => set("addressPostalCode", v)} />
              <Field label="Zone" value={f.addressZone} onChange={(v) => set("addressZone", v)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="card space-y-6 p-6">
          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
              Renseignements des responsables légaux
            </h2>
            <label className="mb-3 block max-w-xs">
              <span className="mb-1 block text-xs font-semibold text-muted">Situation familiale</span>
              <select className="input" value={f.familyStatus} onChange={(e) => set("familyStatus", e.target.value)}>
                <option value="">— À COMPLÉTER —</option>
                {FAMILY_STATUS_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>

            <p className="mb-2 text-xs font-bold uppercase text-muted">Informations du père</p>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <Field label="Nom et Prénom du père" value={f.fatherName} onChange={(v) => set("fatherName", v)} />
              <Field label="Profession" value={f.fatherProfession} onChange={(v) => set("fatherProfession", v)} />
              <Field label="Occupation actuelle" value={f.fatherOccupation} onChange={(v) => set("fatherOccupation", v)} />
              <Field label="Email" type="email" value={f.fatherEmail} onChange={(v) => set("fatherEmail", v)} />
              <Field label="Téléphone" type="tel" pattern={PHONE_PATTERN} value={f.fatherPhone} onChange={(v) => set("fatherPhone", v)} />
              <div className="grid grid-cols-2 gap-2">
                <Field label="NIF" value={f.fatherNif} onChange={(v) => set("fatherNif", v)} />
                <Field label="CIN" value={f.fatherCin} onChange={(v) => set("fatherCin", v)} />
              </div>
            </div>

            <p className="mb-2 text-xs font-bold uppercase text-muted">Informations de la mère</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nom et Prénom de la mère" value={f.motherName} onChange={(v) => set("motherName", v)} />
              <Field label="Profession" value={f.motherProfession} onChange={(v) => set("motherProfession", v)} />
              <Field label="Occupation actuelle" value={f.motherOccupation} onChange={(v) => set("motherOccupation", v)} />
              <Field label="Email" type="email" value={f.motherEmail} onChange={(v) => set("motherEmail", v)} />
              <Field label="Téléphone" type="tel" pattern={PHONE_PATTERN} value={f.motherPhone} onChange={(v) => set("motherPhone", v)} />
              <div className="grid grid-cols-2 gap-2">
                <Field label="NIF" value={f.motherNif} onChange={(v) => set("motherNif", v)} />
                <Field label="CIN" value={f.motherCin} onChange={(v) => set("motherCin", v)} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-1 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
              Personne responsable si différente des parents
            </h2>
            <div className="mb-3 mt-2">
              <RadioGroup
                label="Un responsable différent des parents est-il désigné ?"
                name="hasGuardian"
                value={showGuardian ? "oui" : "non"}
                onChange={(v) => {
                  const next = v === "oui";
                  setShowGuardian(next);
                  if (!next) {
                    save({
                      guardianName: "",
                      guardianProfession: "",
                      guardianOccupation: "",
                      guardianEmail: "",
                      guardianPhone: "",
                      guardianNif: "",
                      guardianCin: "",
                    });
                  }
                }}
                options={[
                  { value: "non", label: "Non" },
                  { value: "oui", label: "Oui" },
                ]}
              />
            </div>
            {showGuardian && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nom et Prénom" value={f.guardianName} onChange={(v) => set("guardianName", v)} />
                <Field label="Profession" value={f.guardianProfession} onChange={(v) => set("guardianProfession", v)} />
                <Field label="Occupation actuelle" value={f.guardianOccupation} onChange={(v) => set("guardianOccupation", v)} />
                <Field label="Email" type="email" value={f.guardianEmail} onChange={(v) => set("guardianEmail", v)} />
                <Field label="Téléphone" type="tel" pattern={PHONE_PATTERN} value={f.guardianPhone} onChange={(v) => set("guardianPhone", v)} />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="NIF" value={f.guardianNif} onChange={(v) => set("guardianNif", v)} />
                  <Field label="CIN" value={f.guardianCin} onChange={(v) => set("guardianCin", v)} />
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
              Informations de santé administratives
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <TriBool label="Vaccin à jour" value={f.vaccinesUpToDate} onChange={(v) => set("vaccinesUpToDate", v)} />
              <TriBool label="Usage de médicament(s) longue durée" value={f.longTermMedication} onChange={(v) => set("longTermMedication", v)} />
            </div>
            {f.longTermMedication && (
              <div className="mt-3">
                <Field label="Précisez / indiquez pour quel cas" value={f.medicationDetails} onChange={(v) => set("medicationDetails", v)} />
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">La fratrie</h2>
            <p className="mb-3 text-xs text-muted">Précisez les prénoms, la date de naissance et les écoles fréquentées.</p>
            <div className="space-y-2">
              {f.siblings.map((s, i) => (
                <div key={i} className="grid gap-2 rounded-md border border-border p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
                  <Field label="Prénoms" value={s.firstName} onChange={(v) => updateSibling(i, { firstName: v })} />
                  <DateField label="Date de naissance" value={s.birthDate} onChange={(v) => updateSibling(i, { birthDate: v })} max={todayIsoDate()} />
                  <Field label="Écoles fréquentées" value={s.school} onChange={(v) => updateSibling(i, { school: v })} />
                  <button type="button" onClick={() => removeSibling(i)} className="mt-5 self-start text-xs font-semibold text-danger hover:underline">
                    Retirer
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addSibling} className="btn-secondary mt-3 text-xs">
              + Ajouter un frère / une sœur
            </button>
          </div>

          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
              Pièces d&apos;inscription
            </h2>
            {f.documents.length === 0 && (
              <p className="mb-3 text-xs text-warning">À COMPLÉTER — LISTE OFFICIELLE DES PIÈCES REQUISE</p>
            )}
            <div className="space-y-2">
              {f.documents.map((d, i) => (
                <div key={i} className="grid gap-2 rounded-md border border-border p-3 sm:grid-cols-[1fr_auto_auto]">
                  <Field label="Pièce" value={d.label} onChange={(v) => updateDocument(i, { label: v })} />
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-muted">Statut</span>
                    <select
                      className="input !w-auto"
                      value={d.status}
                      onChange={(e) => updateDocument(i, { status: e.target.value as EnrollmentFormDocumentStatus })}
                    >
                      {enrollmentFormDocumentStatuses.map((s) => (
                        <option key={s} value={s}>
                          {enrollmentFormDocumentStatusLabels[s]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={() => removeDocument(i)} className="mt-5 self-start text-xs font-semibold text-danger hover:underline">
                    Retirer
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addDocument} className="btn-secondary mt-3 text-xs">
              + Ajouter une pièce
            </button>
          </div>

          <div>
            <h2 className="mb-3 border-b border-primary/20 pb-1 text-sm font-bold uppercase tracking-wide text-primary">Certification</h2>
            <p className="mb-3 text-sm text-foreground">Je certifie sur l&apos;honneur l&apos;exactitude des renseignements ci-dessus.</p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={f.declarationAccepted} onChange={(e) => set("declarationAccepted", e.target.checked)} />
              Certifié
            </label>
          </div>

          <div className="grid gap-8 pt-6 sm:grid-cols-2">
            <div>
              <p className="mb-8 text-xs font-bold uppercase text-primary">Signature</p>
              <div className="border-t border-foreground/40 pt-1 text-center text-xs text-muted">Parent / Tuteur</div>
            </div>
            <div>
              <p className="mb-8 text-xs font-bold uppercase text-primary">L&apos;administration CCIGA</p>
              <div className="border-t border-foreground/40 pt-1 text-center text-xs text-muted">Signature — Validation</div>
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
