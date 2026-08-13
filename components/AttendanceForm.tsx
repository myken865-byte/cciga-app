"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { attendanceStatuses, attendanceStatusLabels, type AttendanceStatus } from "@/lib/attendance";

interface StudentOption {
  id: number;
  name: string;
}

export default function AttendanceForm({
  courseId,
  students,
}: {
  courseId: string;
  students: StudentOption[];
}) {
  const router = useRouter();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [statuses, setStatuses] = useState<Record<number, AttendanceStatus>>(
    Object.fromEntries(students.map((s) => [s.id, "present" as AttendanceStatus])),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/courses/${courseId}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          records: students.map((s) => ({ studentId: s.id, status: statuses[s.id] })),
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

  if (students.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-2 font-semibold text-foreground">Présences</h2>
        <p className="text-sm text-muted">
          Aucun étudiant n&apos;est encore inscrit au programme de ce cours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Marquer les présences</h2>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Date</span>
        <input
          type="date"
          required
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <div className="space-y-2">
        {students.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-foreground">{s.name}</span>
            <select
              className="input w-auto"
              value={statuses[s.id]}
              onChange={(e) =>
                setStatuses((st) => ({ ...st, [s.id]: e.target.value as AttendanceStatus }))
              }
            >
              {attendanceStatuses.map((status) => (
                <option key={status} value={status}>
                  {attendanceStatusLabels[status]}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {saved && (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Présences enregistrées.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Enregistrement…" : "Enregistrer les présences"}
      </button>
    </form>
  );
}
