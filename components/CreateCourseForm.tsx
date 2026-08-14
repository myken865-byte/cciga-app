"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Program } from "@/lib/content";
import { dayLabels } from "@/lib/schedule";
import ProgramSelect from "@/components/ProgramSelect";

interface Teacher {
  id: number;
  name: string;
}

interface SemesterOption {
  id: string;
  label: string;
}

export default function CreateCourseForm({
  programs,
  teachers,
  semesters,
}: {
  programs: Program[];
  teachers: Teacher[];
  semesters?: SemesterOption[];
}) {
  const router = useRouter();
  const [programId, setProgramId] = useState(programs[0]?.id ?? "");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const selectedProgram = programs.find((p) => p.id === programId);
  const isTitulaireModel = selectedProgram?.teacherModel === "titulaire";
  const isUniversite = selectedProgram?.school === "universite";
  const titulaireName = isTitulaireModel
    ? teachers.find((t) => t.id === selectedProgram?.titulaireId)?.name
    : undefined;
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [credits, setCredits] = useState("");
  const [coefficient, setCoefficient] = useState("");
  const [groupLabel, setGroupLabel] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          name,
          code,
          description,
          teacherId: isTitulaireModel ? undefined : teacherId || undefined,
          dayOfWeek: dayOfWeek === "" ? undefined : Number(dayOfWeek),
          startTime: startTime || undefined,
          endTime: endTime || undefined,
          semesterId: isUniversite ? semesterId || undefined : undefined,
          credits: isUniversite ? credits || undefined : undefined,
          coefficient: isUniversite ? coefficient || undefined : undefined,
          groupLabel: isUniversite ? groupLabel || undefined : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setCreated(true);
      setName("");
      setCode("");
      setDescription("");
      setTeacherId("");
      setDayOfWeek("");
      setStartTime("");
      setEndTime("");
      setSemesterId("");
      setCredits("");
      setCoefficient("");
      setGroupLabel("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (created) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="mb-2 text-2xl">✅</p>
        <p className="mb-4 font-semibold text-foreground">Cours créé</p>
        <button
          onClick={() => setCreated(false)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background"
        >
          Créer un autre cours
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Créer un cours</h2>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Programme</span>
        <ProgramSelect programs={programs} value={programId} onChange={setProgramId} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Nom du cours</span>
        <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Code (optionnel)</span>
        <input className="input" value={code} onChange={(e) => setCode(e.target.value)} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Description</span>
        <textarea
          required
          rows={3}
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {isTitulaireModel ? (
        <div className="rounded-md border border-border bg-background p-3 text-sm">
          <span className="block font-medium text-foreground">Enseignant</span>
          {titulaireName ? (
            <span className="text-muted">
              {titulaireName} (titulaire de la classe — assigné automatiquement à toutes les matières)
            </span>
          ) : (
            <span className="text-red-600">
              Aucun titulaire n&apos;est assigné à cette classe. Assignez-en un depuis la fiche du programme
              avant de créer un cours.
            </span>
          )}
        </div>
      ) : (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Enseignant</span>
          <select className="input" value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
            <option value="">Aucun enseignant assigné</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <div>
        <span className="mb-1 block text-sm font-medium text-foreground">
          Créneau hebdomadaire (optionnel)
        </span>
        <div className="grid grid-cols-3 gap-2">
          <select
            className="input"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
          >
            <option value="">Jour</option>
            {dayLabels.map((label, i) => (
              <option key={label} value={i}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="time"
            className="input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {isUniversite && (
        <div className="space-y-3 rounded-md border border-border bg-background p-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Semestre</span>
            <select className="input" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}>
              <option value="">Aucun</option>
              {semesters?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Crédits</span>
              <input type="number" min="0" className="input" value={credits} onChange={(e) => setCredits(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Coefficient</span>
              <input type="number" min="0" step="0.1" className="input" value={coefficient} onChange={(e) => setCoefficient(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Groupe</span>
              <input className="input" placeholder="Ex. Groupe A" value={groupLabel} onChange={(e) => setGroupLabel(e.target.value)} />
            </label>
          </div>
        </div>
      )}

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={submitting || programs.length === 0 || (isTitulaireModel && !titulaireName)}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Création…" : "Créer le cours"}
      </button>
    </form>
  );
}
