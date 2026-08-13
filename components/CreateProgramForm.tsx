"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { School } from "@/lib/content";

export default function CreateProgramForm({ schools }: { schools: School[] }) {
  const router = useRouter();
  const [school, setSchool] = useState<string>(schools[0]?.slug ?? "");
  const [faculty, setFaculty] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [tuitionFee, setTuitionFee] = useState("");
  const [conditionsText, setConditionsText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const admissionConditions = conditionsText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const res = await fetch("/api/admin/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school,
          faculty,
          name,
          level,
          duration,
          description,
          tuitionFee: tuitionFee ? Number(tuitionFee) : 0,
          admissionConditions,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setCreated(json.slug);
      setFaculty("");
      setName("");
      setLevel("");
      setDuration("");
      setDescription("");
      setTuitionFee("");
      setConditionsText("");
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
        <p className="mb-4 font-semibold text-foreground">Programme créé — {created}</p>
        <button
          onClick={() => setCreated(null)}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background"
        >
          Créer un autre programme
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Créer un programme</h2>

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
          <input required className="input" value={level} onChange={(e) => setLevel(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Durée</span>
          <input required className="input" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </label>
      </div>

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
          placeholder={"Diplôme requis\nEntretien d'admission"}
        />
      </label>

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Création…" : "Créer le programme"}
      </button>
    </form>
  );
}
