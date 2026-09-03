"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LeaveRow {
  id: string;
  type: string;
  status: string;
}

const statusBadge: Record<string, string> = {
  soumis: "badge-warning",
  approuve: "badge-success",
  rejete: "badge-danger",
};

export default function LeaveRequestReview({ leaveRequests }: { leaveRequests: LeaveRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function decide(leaveId: string, status: "approuve" | "rejete") {
    setBusyId(leaveId);
    await fetch(`/api/admin/employees/leave`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leaveId, status }),
    });
    setBusyId(null);
    router.refresh();
  }

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {leaveRequests.map((l) => (
        <div key={l.id} className="flex items-center gap-1">
          <span className={`badge ${statusBadge[l.status] ?? "badge-neutral"}`}>
            {l.type} — {l.status}
          </span>
          {l.status === "soumis" && (
            <>
              <button
                onClick={() => decide(l.id, "approuve")}
                disabled={busyId === l.id}
                className="rounded-md border border-success px-1.5 py-0.5 text-[11px] font-semibold text-success hover:bg-success-bg"
              >
                Approuver
              </button>
              <button
                onClick={() => decide(l.id, "rejete")}
                disabled={busyId === l.id}
                className="rounded-md border border-danger px-1.5 py-0.5 text-[11px] font-semibold text-danger hover:bg-danger-bg"
              >
                Rejeter
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
