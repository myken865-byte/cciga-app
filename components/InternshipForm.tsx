"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface InternshipFormStudent {
  id: number;
  name: string;
  programId: string;
  programName: string;
}

export default function InternshipForm({
  students,
  supervisors,
}: {
  students: InternshipFormStudent[];
  supervisors: { id: number; name: string }[];
}) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [hostOrganization, setHostOrganization] = useState("");
  const [hostAddress, setHostAddress] = useState("");
  const [hostSupervisorName, setHostSupervisorName] = useState("");
  const [hostSupervisorContact, setHostSupervisorContact] = useState("");
  const [internalSupervisorId, setInternalSupervisorId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const selectedStudent = students.find((s) => s.id === Number(studentId));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!studentId || !selectedStudent || !title.trim() || !hostOrganization.trim() || !startDate) {
      setError("Élève, titre, organisme d'accueil et date de début sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          programId: selectedStudent.programId,
          title: title.trim(),
          hostOrganization: hostOrganization.trim(),
          hostAddress: hostAddress.trim() || undefined,
          hostSupervisorName: hostSupervisorName.trim() || undefined,
          hostSupervisorContact: hostSupervisorContact.trim() || undefined,
          internalSupervisorId: internalSupervisorId || undefined,
          startDate,
          endDate: endDate || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Création impossible.");
        return;
      }
      setSuccess(true);
      setTitle("");
      setHostOrganization("");
      setHostAddress("");
      setHostSupervisorName("");
      setHostSupervisorContact("");
      setStartDate("");
      setEndDate("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (students.length === 0) {
    return <div className="empty-state">Aucun élève/étudiant dans l&apos;institution active.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5 sm:p-6">
      {success && <p className="rounded-md bg-success-bg px-3 py-2 text-sm text-success">Stage créé.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Élève / étudiant</span>
          <select className="input" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.programName}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Superviseur interne (optionnel)</span>
          <select className="input" value={internalSupervisorId} onChange={(e) => setInternalSupervisorId(e.target.value)}>
            <option value="">Aucun</option>
            {supervisors.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Titre du stage</span>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Organisme d&apos;accueil</span>
          <input className="input" value={hostOrganization} onChange={(e) => setHostOrganization(e.target.value)} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Adresse (optionnel)</span>
          <input className="input" value={hostAddress} onChange={(e) => setHostAddress(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Superviseur externe (optionnel)</span>
          <input className="input" value={hostSupervisorName} onChange={(e) => setHostSupervisorName(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Contact du superviseur externe</span>
          <input className="input" value={hostSupervisorContact} onChange={(e) => setHostSupervisorContact(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Date de début</span>
          <input type="date" className="input" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Date de fin (optionnel)</span>
          <input type="date" className="input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "Création…" : "Créer le stage"}
      </button>
    </form>
  );
}
