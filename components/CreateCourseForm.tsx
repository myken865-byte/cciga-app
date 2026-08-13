"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Program } from "@/lib/content";
import { dayLabels } from "@/lib/schedule";

interface Teacher {
  id: number;
  name: string;
}

export default function CreateCourseForm({
  programs,
  teachers,
}: {
  programs: Program[];
  teachers: Teacher[];
}) {
  const router = useRouter();
  const [programId, setProgramId] = useState(programs[0]?.id ?? "");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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
          teacherId: teacherId || undefined,
          dayOfWeek: dayOfWeek === "" ? undefined : Number(dayOfWeek),
          startTime: startTime || undefined,
          endTime: endTime || undefined,
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
        <select className="input" value={programId} onChange={(e) => setProgramId(e.target.value)}>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
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

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={submitting || programs.length === 0}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Création…" : "Créer le cours"}
      </button>
    </form>
  );
}
