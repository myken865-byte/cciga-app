"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { schools } from "@/data/schools";
import type { Program } from "@/lib/content";
import { niveauList, niveauLabels, type Niveau } from "@/lib/niveaux";
import { requiredAdmissionDocuments as requiredDocuments } from "@/lib/admission-documents";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

interface DocumentEntry {
  label: string;
  fileUrl: string | null;
  fileName: string | null;
}

type FormData = {
  school: string;
  niveau: string;
  programSlug: string;
  level: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  documents: DocumentEntry[];
};

const initialData: FormData = {
  school: "",
  niveau: "",
  programSlug: "",
  level: "",
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phone: "",
  address: "",
  documents: requiredDocuments.map((label) => ({ label, fileUrl: null, fileName: null })),
};

const baseSteps = [
  { id: "ecole", label: "École" },
  { id: "programme", label: "Programme" },
  { id: "informations", label: "Informations" },
  { id: "documents", label: "Documents" },
  { id: "recapitulatif", label: "Récapitulatif" },
] as const;

export default function CandidatureForm({ programs }: { programs: Program[] }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [uploadingLabel, setUploadingLabel] = useState<string | null>(null);
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

  const isEcoleClassique = data.school === "ecole-classique";
  const steps = isEcoleClassique
    ? [baseSteps[0], { id: "niveau" as const, label: "Niveau" }, ...baseSteps.slice(1)]
    : baseSteps;
  const currentStepId = steps[step]?.id;

  const availablePrograms = useMemo(
    () =>
      programs.filter(
        (p) =>
          p.school === data.school &&
          (!isEcoleClassique || p.niveau === data.niveau),
      ),
    [data.school, data.niveau, isEcoleClassique, programs],
  );

  const selectedProgram = programs.find((p) => p.slug === data.programSlug);
  const selectedSchool = schools.find((s) => s.slug === data.school);

  function canProceed() {
    if (currentStepId === "ecole") return !!data.school;
    if (currentStepId === "niveau") return !!data.niveau;
    if (currentStepId === "programme") return !!data.programSlug;
    if (currentStepId === "informations")
      return !!(data.firstName && data.lastName && data.email && data.phone);
    return true;
  }

  function next() {
    setError(null);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleFileSelect(label: string, file: File | undefined) {
    if (!file) return;
    setUploadErrors((e) => ({ ...e, [label]: "" }));

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadErrors((e) => ({ ...e, [label]: "Format non accepté (PDF, JPG ou PNG uniquement)." }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadErrors((e) => ({ ...e, [label]: "Fichier trop volumineux (8 Mo maximum)." }));
      return;
    }

    setUploadingLabel(label);
    try {
      const blob = await upload(`admission-documents/${crypto.randomUUID()}-${file.name}`, file, {
        access: "private",
        handleUploadUrl: "/api/admission/upload",
      });
      setData((d) => ({
        ...d,
        documents: d.documents.map((doc) =>
          doc.label === label ? { ...doc, fileUrl: blob.url, fileName: file.name } : doc,
        ),
      }));
    } catch {
      setUploadErrors((e) => ({ ...e, [label]: "Échec du téléversement. Veuillez réessayer." }));
    } finally {
      setUploadingLabel(null);
    }
  }

  function removeDocument(label: string) {
    setData((d) => ({
      ...d,
      documents: d.documents.map((doc) => (doc.label === label ? { ...doc, fileUrl: null, fileName: null } : doc)),
    }));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue. Veuillez réessayer.");
        return;
      }
      setConfirmationId(json.id);
    } catch {
      setError("Impossible de soumettre la candidature. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmationId) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <div className="mb-3 text-4xl">✅</div>
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Candidature soumise avec succès
        </h2>
        <p className="mb-4 text-muted">
          Votre numéro de référence est{" "}
          <span className="font-mono font-semibold text-primary">{confirmationId}</span>.
          L&apos;administration du CCIGA examinera votre dossier et vous contactera
          par email ou téléphone.
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-8 flex flex-wrap gap-2 text-xs font-medium">
        {steps.map(({ id, label }, i) => (
          <li
            key={id}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
              i === step
                ? "bg-primary text-white"
                : i < step
                  ? "bg-accent/20 text-primary-dark"
                  : "bg-background text-muted"
            }`}
          >
            <span>{i + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-border bg-surface p-6">
        {currentStepId === "ecole" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Choisissez une entité
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {schools.map((school) => (
                <button
                  key={school.slug}
                  type="button"
                  onClick={() =>
                    setData((d) => ({ ...d, school: school.slug, niveau: "", programSlug: "" }))
                  }
                  className={`rounded-lg border p-4 text-left transition ${
                    data.school === school.slug
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <p className="font-semibold text-foreground">{school.name}</p>
                  <p className="mt-1 text-sm text-muted">{school.tagline}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStepId === "niveau" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Choisissez un niveau</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {niveauList.map((niveau: Niveau) => (
                <button
                  key={niveau}
                  type="button"
                  onClick={() =>
                    setData((d) => ({ ...d, niveau, programSlug: "" }))
                  }
                  className={`rounded-lg border p-4 text-left transition ${
                    data.niveau === niveau
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <p className="font-semibold text-foreground">{niveauLabels[niveau]}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStepId === "programme" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Choisissez un programme — {selectedSchool?.name}
              {isEcoleClassique && data.niveau
                ? ` (${niveauLabels[data.niveau as Niveau]})`
                : ""}
            </h2>
            {availablePrograms.length === 0 ? (
              <p className="text-muted">Aucun programme disponible pour cette entité pour le moment.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {availablePrograms.map((program) => (
                  <button
                    key={program.slug}
                    type="button"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        programSlug: program.slug,
                        level: program.level,
                      }))
                    }
                    className={`rounded-lg border p-4 text-left transition ${
                      data.programSlug === program.slug
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <p className="font-semibold text-foreground">{program.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      {program.level} · {program.duration}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {currentStepId === "informations" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Vos informations</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Prénom *">
                <input
                  className="input"
                  value={data.firstName}
                  onChange={(e) => setData((d) => ({ ...d, firstName: e.target.value }))}
                />
              </Field>
              <Field label="Nom *">
                <input
                  className="input"
                  value={data.lastName}
                  onChange={(e) => setData((d) => ({ ...d, lastName: e.target.value }))}
                />
              </Field>
              <Field label="Date de naissance">
                <input
                  type="date"
                  className="input"
                  value={data.dob}
                  onChange={(e) => setData((d) => ({ ...d, dob: e.target.value }))}
                />
              </Field>
              <Field label="Téléphone *">
                <input
                  type="tel"
                  className="input"
                  value={data.phone}
                  onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                />
              </Field>
              <Field label="Email *">
                <input
                  type="email"
                  className="input"
                  value={data.email}
                  onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                />
              </Field>
              <Field label="Adresse">
                <input
                  className="input"
                  value={data.address}
                  onChange={(e) => setData((d) => ({ ...d, address: e.target.value }))}
                />
              </Field>
            </div>
          </div>
        )}

        {currentStepId === "documents" && (
          <div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Documents requis</h2>
            <p className="mb-4 text-sm text-muted">
              Téléversez chaque document ci-dessous (PDF, JPG ou PNG, 8 Mo maximum). Vos fichiers sont
              envoyés directement et de façon sécurisée vers notre espace de stockage privé — seule
              l&apos;administration du CCIGA peut y accéder.
            </p>
            <div className="space-y-3">
              {data.documents.map((doc) => (
                <div key={doc.label} className="rounded-md border border-border p-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-foreground">{doc.label}</span>
                    {doc.fileUrl ? (
                      <span className="flex items-center gap-2 text-emerald-600">
                        ✓ {doc.fileName}
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.label)}
                          className="text-xs text-muted underline hover:text-foreground"
                        >
                          Retirer
                        </button>
                      </span>
                    ) : uploadingLabel === doc.label ? (
                      <span className="text-muted">Envoi en cours…</span>
                    ) : (
                      <label className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-xs font-medium text-primary hover:border-primary">
                        Choisir un fichier
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => handleFileSelect(doc.label, e.target.files?.[0])}
                        />
                      </label>
                    )}
                  </div>
                  {uploadErrors[doc.label] && (
                    <p className="mt-1 text-xs text-red-600">{uploadErrors[doc.label]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStepId === "recapitulatif" && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Récapitulatif</h2>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <Summary label="École" value={selectedSchool?.name ?? "—"} />
              {isEcoleClassique && (
                <Summary
                  label="Niveau"
                  value={data.niveau ? niveauLabels[data.niveau as Niveau] : "—"}
                />
              )}
              <Summary label="Programme" value={selectedProgram?.name ?? "—"} />
              <Summary label="Nom complet" value={`${data.firstName} ${data.lastName}`} />
              <Summary label="Email" value={data.email} />
              <Summary label="Téléphone" value={data.phone} />
              <Summary
                label="Documents fournis"
                value={
                  data.documents.some((d) => d.fileUrl)
                    ? data.documents
                        .filter((d) => d.fileUrl)
                        .map((d) => d.label)
                        .join(", ")
                    : "Aucun"
                }
              />
            </dl>
            {error && (
              <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground disabled:opacity-40"
          >
            Précédent
          </button>
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={!canProceed()}
              className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-40"
            >
              Suivant
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-primary-dark hover:bg-accent-light disabled:opacity-40"
            >
              {submitting ? "Envoi…" : "Soumettre la candidature"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
