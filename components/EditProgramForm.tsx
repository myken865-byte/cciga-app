"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { School, Program } from "@/lib/content";
import { niveauList, niveauLabels, type Niveau } from "@/lib/niveaux";
import { teacherModelList, teacherModelLabels, type TeacherModel } from "@/lib/teacherModel";

interface Teacher {
  id: number;
  name: string;
}

export default function EditProgramForm({
  program,
  schools,
  teachers,
}: {
  program: Program;
  schools: School[];
  teachers: Teacher[];
}) {
  const router = useRouter();
  const [school, setSchool] = useState<string>(program.school);
  const [faculty, setFaculty] = useState(program.faculty);
  const [name, setName] = useState(program.name);
  const [level, setLevel] = useState(program.level);
  const [niveau, setNiveau] = useState<Niveau | "">(program.niveau ?? "");
  const [teacherModel, setTeacherModel] = useState<TeacherModel | "">(program.teacherModel ?? "");
  const [titulaireId, setTitulaireId] = useState(program.titulaireId ? String(program.titulaireId) : "");
  const isEcoleClassique = school === "ecole-classique";
  const [duration, setDuration] = useState(program.duration);
  const [description, setDescription] = useState(program.description);
  const [tuitionFee, setTuitionFee] = useState(String(program.tuitionFee));
  const [conditionsText, setConditionsText] = useState(program.admissionConditions.join("\n"));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      const admissionConditions = conditionsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const res = await fetch(`/api/admin/programs/${program.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school,
          faculty,
          name,
          level: isEcoleClassique && niveau ? niveauLabels[niveau] : level,
          niveau: isEcoleClassique ? niveau || undefined : undefined,
          teacherModel: isEcoleClassique ? teacherModel || undefined : undefined,
          titulaireId: isEcoleClassique && teacherModel === "titulaire" ? titulaireId || undefined : undefined,
          duration,
          description,
          tuitionFee: Number(tuitionFee) || 0,
          admissionConditions,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Modifier le programme</h2>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">École</span>
        <select className="input" value={school} onChange={(e) => setSchool(e.target.value)}>
          {schools.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Faculté / Filière</span>
        <input required className="input" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Nom du programme</span>
        <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Niveau</span>
          {isEcoleClassique ? (
            <select
              required
              className="input"
              value={niveau}
              onChange={(e) => setNiveau(e.target.value as Niveau)}
            >
              <option value="">Choisir…</option>
              {niveauList.map((n) => (
                <option key={n} value={n}>
                  {niveauLabels[n]}
                </option>
              ))}
            </select>
          ) : (
            <input required className="input" value={level} onChange={(e) => setLevel(e.target.value)} />
          )}
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Durée</span>
          <input required className="input" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </label>
      </div>

      {isEcoleClassique && (
        <div className="rounded-md border border-border bg-background p-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Modèle d&apos;enseignement</span>
            <select
              className="input"
              value={teacherModel}
              onChange={(e) => {
                setTeacherModel(e.target.value as TeacherModel);
                setTitulaireId("");
              }}
            >
              <option value="">Choisir…</option>
              {teacherModelList.map((tm) => (
                <option key={tm} value={tm}>
                  {teacherModelLabels[tm]}
                </option>
              ))}
            </select>
          </label>

          {teacherModel === "titulaire" && (
            <label className="mt-3 block text-sm">
              <span className="mb-1 block font-medium text-foreground">Titulaire de classe</span>
              <select className="input" value={titulaireId} onChange={(e) => setTitulaireId(e.target.value)}>
                <option value="">Aucun (à assigner)</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-xs text-muted">
                Le titulaire est automatiquement responsable de toutes les matières de cette classe ; le
                changer réaffecte tous les cours existants.
              </span>
            </label>
          )}
        </div>
      )}

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

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Frais de scolarité (HTG)</span>
        <input
          type="number"
          min="0"
          className="input"
          value={tuitionFee}
          onChange={(e) => setTuitionFee(e.target.value)}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">
          Conditions d&apos;admission (une par ligne)
        </span>
        <textarea
          rows={3}
          className="input"
          value={conditionsText}
          onChange={(e) => setConditionsText(e.target.value)}
        />
      </label>

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {saved && (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Modifications enregistrées.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );
}
