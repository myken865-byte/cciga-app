"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  logisticsRequestStatuses,
  logisticsRequestStatusLabels,
  logisticsUrgencyLabels,
  isValidLogisticsTransition,
  type LogisticsRequestStatus,
  type LogisticsUrgency,
} from "@/lib/logisticsRequests";

export interface LogisticsRequestSummary {
  id: string;
  resourceLabel: string;
  quantity: number | null;
  urgency: string;
  status: string;
  createdAt: string;
}

function Row({ item }: { item: LogisticsRequestSummary }) {
  const router = useRouter();
  const [status, setStatus] = useState(item.status);
  const [saving, setSaving] = useState(false);

  const nextOptions = logisticsRequestStatuses.filter(
    (s) => s === status || isValidLogisticsTransition(status as LogisticsRequestStatus, s),
  );

  async function changeStatus(newStatus: string) {
    setStatus(newStatus);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/demandes-logistiques/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card flex flex-wrap items-center justify-between gap-3 p-3.5 text-sm">
      <div className="min-w-0">
        <p className="font-medium text-foreground">
          {item.resourceLabel}
          {item.quantity ? ` ×${item.quantity}` : ""}
        </p>
        <p className="text-xs text-muted">
          {logisticsUrgencyLabels[item.urgency as LogisticsUrgency] ?? item.urgency} · {item.createdAt}
        </p>
      </div>
      <select className="input !w-auto text-xs" value={status} disabled={saving} onChange={(e) => changeStatus(e.target.value)}>
        {nextOptions.map((s) => (
          <option key={s} value={s}>
            {logisticsRequestStatusLabels[s]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function LogisticsRequestList({ items }: { items: LogisticsRequestSummary[] }) {
  if (items.length === 0) {
    return <div className="empty-state">Aucune demande logistique.</div>;
  }
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Row key={item.id} item={item} />
      ))}
    </div>
  );
}
