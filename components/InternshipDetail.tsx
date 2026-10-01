"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  internshipStatuses,
  internshipStatusLabels,
  internshipStatusBadge,
  internshipAttendanceStatuses,
  internshipAttendanceStatusLabels,
  type InternshipStatus,
  type InternshipAttendanceStatus,
} from "@/lib/internships";

export interface InternshipDetailData {
  id: string;
  title: string;
  hostOrganization: string;
  hostAddress: string | null;
  hostSupervisorName: string | null;
  hostSupervisorContact: string | null;
  internalSupervisorName: string | null;
  startDate: string;
  endDate: string | null;
  status: string;
  evaluationScore: number | null;
  evaluationComment: string | null;
  student: { name: string };
  attendances: { id: string; date: string; status: string }[];
}

export default function InternshipDetail({ internship, canManage }: { internship: InternshipDetailData; canManage: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState(internship.status);
  const [statusSaving, setStatusSaving] = useState(false);
  const [evalScore, setEvalScore] = useState(internship.evaluationScore?.toString() ?? "");
  const [evalComment, setEvalComment] = useState(internship.evaluationComment ?? "");
  const [evalSaving, setEvalSaving] = useState(false);
  const [attDate, setAttDate] = useState("");
  const [attStatus, setAttStatus] = useState<InternshipAttendanceStatus>("present");
  const [attSaving, setAttSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function changeStatus(newStatus: string) {
    setStatus(newStatus);
    setStatusSaving(true);
    try {
      const res = await fetch(`/api/internships/${internship.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setStatusSaving(false);
    }
  }

  async function saveEvaluation(e: React.FormEvent) {
    e.preventDefault();
    setEvalSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/internships/${internship.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          evaluationScore: evalScore === "" ? null : Number(evalScore),
          evaluationComment: evalComment.trim() || null,
        }),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Enregistrement impossible.");
        return;
      }
      router.refresh();
    } finally {
      setEvalSaving(false);
    }
  }

  async function addAttendance(e: React.FormEvent) {
    e.preventDefault();
    if (!attDate) return;
    setAttSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/internships/${internship.id}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: attDate, status: attStatus }),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Enregistrement impossible.");
        return;
      }
      setAttDate("");
      router.refresh();
    } finally {
      setAttSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="card p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">{internship.title}</h2>
            <p className="text-sm text-muted">
              {internship.student.name} · {internship.hostOrganization}
            </p>
          </div>
          {canManage ? (
            <select
              className="input !w-auto text-sm"
              value={status}
              disabled={statusSaving}
              onChange={(e) => changeStatus(e.target.value)}
            >
              {internshipStatuses.map((s) => (
                <option key={s} value={s}>
                  {internshipStatusLabels[s]}
                </option>
              ))}
            </select>
          ) : (
            <span className={`badge ${internshipStatusBadge[status as InternshipStatus]}`}>
              {internshipStatusLabels[status as InternshipStatus] ?? status}
            </span>
          )}
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase text-muted">Période</dt>
            <dd className="text-foreground">
              {internship.startDate} {internship.endDate ? `→ ${internship.endDate}` : "(en cours)"}
            </dd>
          </div>
          {internship.hostAddress && (
            <div>
              <dt className="text-xs uppercase text-muted">Adresse</dt>
              <dd className="text-foreground">{internship.hostAddress}</dd>
            </div>
          )}
          {internship.hostSupervisorName && (
            <div>
              <dt className="text-xs uppercase text-muted">Superviseur externe</dt>
              <dd className="text-foreground">
                {internship.hostSupervisorName}
                {internship.hostSupervisorContact ? ` · ${internship.hostSupervisorContact}` : ""}
              </dd>
            </div>
          )}
          {internship.internalSupervisorName && (
            <div>
              <dt className="text-xs uppercase text-muted">Superviseur interne</dt>
              <dd className="text-foreground">{internship.internalSupervisorName}</dd>
            </div>
          )}
        </dl>

        {(internship.evaluationScore !== null || internship.evaluationComment) && (
          <div className="mt-4 rounded-md bg-background p-3 text-sm">
            <p className="text-xs uppercase text-muted">Évaluation</p>
            {internship.evaluationScore !== null && (
              <p className="font-medium text-foreground">{internship.evaluationScore}/100</p>
            )}
            {internship.evaluationComment && <p className="text-foreground">{internship.evaluationComment}</p>}
          </div>
        )}
      </div>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      {canManage && (
        <form onSubmit={saveEvaluation} className="card space-y-3 p-5 sm:p-6">
          <h3 className="section-label">Évaluation</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Note (/100)</span>
              <input
                type="number"
                min={0}
                max={100}
                className="input"
                value={evalScore}
                onChange={(e) => setEvalScore(e.target.value)}
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Commentaire</span>
            <textarea className="input" rows={3} value={evalComment} onChange={(e) => setEvalComment(e.target.value)} />
          </label>
          <button type="submit" disabled={evalSaving} className="btn-secondary text-sm">
            {evalSaving ? "Enregistrement…" : "Enregistrer l'évaluation"}
          </button>
        </form>
      )}

      <div className="card p-5 sm:p-6">
        <h3 className="section-label mb-3">Présence</h3>
        {internship.attendances.length === 0 ? (
          <p className="text-sm text-muted">Aucune présence enregistrée.</p>
        ) : (
          <ul className="mb-4 space-y-1 text-sm">
            {internship.attendances.map((a) => (
              <li key={a.id} className="flex items-center justify-between">
                <span className="text-foreground">{a.date}</span>
                <span className="text-muted">
                  {internshipAttendanceStatusLabels[a.status as InternshipAttendanceStatus] ?? a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
        {canManage && (
          <form onSubmit={addAttendance} className="flex flex-wrap items-end gap-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Date</span>
              <input type="date" className="input" value={attDate} onChange={(e) => setAttDate(e.target.value)} required />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Statut</span>
              <select
                className="input"
                value={attStatus}
                onChange={(e) => setAttStatus(e.target.value as InternshipAttendanceStatus)}
              >
                {internshipAttendanceStatuses.map((s) => (
                  <option key={s} value={s}>
                    {internshipAttendanceStatusLabels[s]}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={attSaving} className="btn-secondary text-sm">
              {attSaving ? "Ajout…" : "Ajouter"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
