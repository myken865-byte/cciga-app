"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SemesterOption {
  id: string;
  label: string;
}

export default function AppreciationForm({
  studentId,
  semesters,
  existing,
}: {
  studentId: number;
  semesters: SemesterOption[];
  existing: { semesterId: string; appreciation: string | null; conduct: string | null }[];
}) {
  const router = useRouter();
  const [semesterId, setSemesterId] = useState(semesters[0]?.id ?? "");
  const current = existing.find((e) => e.semesterId === semesterId);
  const [appreciation, setAppreciation] = useState(current?.appreciation ?? "");
  const [conduct, setConduct] = useState(current?.conduct ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  function onSemesterChange(id: string) {
    setSemesterId(id);
    const match = existing.find((e) => e.semesterId === id);
    setAppreciation(match?.appreciation ?? "");
    setConduct(match?.conduct ?? "");
    setSaved(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSaved(false);
    try {
      const res = await fetch("/api/appreciations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, semesterId, appreciation, conduct }),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (semesters.length === 0) {
    return null;
  }

  return (
    <form onSubmit={submit} className="space-y-2 rounded-lg border border-border bg-surface p-4 text-sm">
      <p className="font-semibold text-foreground">Appréciation &amp; conduite</p>
      <select className="input" value={semesterId} onChange={(e) => onSemesterChange(e.target.value)}>
        {semesters.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <textarea
        rows={2}
        className="input"
        placeholder="Appréciation du titulaire"
        value={appreciation}
        onChange={(e) => setAppreciation(e.target.value)}
      />
      <input
        className="input"
        placeholder="Conduite (ex. Très bien, Bien, Passable)"
        value={conduct}
        onChange={(e) => setConduct(e.target.value)}
      />
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-background disabled:opacity-50"
      >
        {submitting ? "Enregistrement…" : "Enregistrer"}
      </button>
      {saved && <span className="ml-2 text-emerald-600">Enregistré.</span>}
    </form>
  );
}
