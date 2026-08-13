"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StudentOption {
  id: number;
  name: string;
}

interface AssignmentOption {
  id: string;
  title: string;
}

export default function RecordGradeForm({
  courseId,
  students,
  assignments,
}: {
  courseId: string;
  students: StudentOption[];
  assignments: AssignmentOption[];
}) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.id.toString() ?? "");
  const [assignmentId, setAssignmentId] = useState("");
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/courses/${courseId}/grades`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(studentId),
          assignmentId: assignmentId || undefined,
          score: Number(score),
          comment,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setScore("");
      setComment("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (students.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-2 font-semibold text-foreground">Enregistrer une note</h2>
        <p className="text-sm text-muted">
          Aucun étudiant n&apos;est encore inscrit au programme de ce cours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Enregistrer une note</h2>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Étudiant</span>
        <select className="input" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Devoir (optionnel)</span>
        <select className="input" value={assignmentId} onChange={(e) => setAssignmentId(e.target.value)}>
          <option value="">Note générale du cours</option>
          {assignments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Note (sur 100)</span>
        <input
          required
          type="number"
          step="0.01"
          className="input"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Commentaire</span>
        <input className="input" value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Enregistrement…" : "Enregistrer la note"}
      </button>
    </form>
  );
}
