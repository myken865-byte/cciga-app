"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { seminarStatuses, seminarStatusLabels, seminarStatusBadge, type SeminarStatus } from "@/lib/seminars";

export interface SeminarDetailData {
  id: string;
  title: string;
  theme: string | null;
  speaker: string | null;
  location: string | null;
  startAt: string;
  endAt: string | null;
  status: string;
  registrationOpen: boolean;
  registrationCount: number;
  isRegistered: boolean;
}

export default function SeminarDetail({
  seminar,
  canManage,
  canRegister,
}: {
  seminar: SeminarDetailData;
  canManage: boolean;
  canRegister: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(seminar.status);
  const [statusSaving, setStatusSaving] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function changeStatus(newStatus: string) {
    setStatus(newStatus);
    setStatusSaving(true);
    try {
      const res = await fetch(`/api/seminars/${seminar.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setStatusSaving(false);
    }
  }

  async function register() {
    setRegistering(true);
    setError(null);
    try {
      const res = await fetch(`/api/seminars/${seminar.id}/register`, { method: "POST" });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Inscription impossible.");
        return;
      }
      router.refresh();
    } finally {
      setRegistering(false);
    }
  }

  async function unregister() {
    setRegistering(true);
    setError(null);
    try {
      const res = await fetch(`/api/seminars/${seminar.id}/register`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setRegistering(false);
    }
  }

  return (
    <div className="card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          {seminar.theme && <p className="section-label mb-1">{seminar.theme}</p>}
          <h2 className="text-lg font-bold text-foreground">{seminar.title}</h2>
          <p className="text-sm text-muted">
            {seminar.startAt}
            {seminar.location ? ` · ${seminar.location}` : ""}
            {seminar.speaker ? ` · ${seminar.speaker}` : ""}
          </p>
        </div>
        {canManage ? (
          <select
            className="input !w-auto text-sm"
            value={status}
            disabled={statusSaving}
            onChange={(e) => changeStatus(e.target.value)}
          >
            {seminarStatuses.map((s) => (
              <option key={s} value={s}>
                {seminarStatusLabels[s]}
              </option>
            ))}
          </select>
        ) : (
          <span className={`badge ${seminarStatusBadge[status as SeminarStatus]}`}>
            {seminarStatusLabels[status as SeminarStatus] ?? status}
          </span>
        )}
      </div>

      {canManage && <p className="mb-4 text-sm text-muted">{seminar.registrationCount} inscrit(s).</p>}

      {error && <p className="mb-3 rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      {canRegister &&
        (seminar.isRegistered ? (
          <button onClick={unregister} disabled={registering} className="btn-secondary text-sm">
            {registering ? "…" : "Annuler mon inscription"}
          </button>
        ) : (
          <button
            onClick={register}
            disabled={registering || !seminar.registrationOpen || status === "clos" || status === "termine"}
            className="btn-primary text-sm"
          >
            {registering ? "…" : "S'inscrire"}
          </button>
        ))}
    </div>
  );
}
