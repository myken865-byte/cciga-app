"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  maintenanceStatuses,
  maintenanceStatusLabels,
  maintenanceResourceTypeLabels,
  isValidMaintenanceTransition,
  type MaintenanceStatus,
  type MaintenanceResourceType,
} from "@/lib/maintenance";

export interface MaintenanceSummary {
  id: string;
  resourceType: string;
  resourceLabel: string;
  description: string;
  status: string;
  createdAt: string;
}

function Row({ item }: { item: MaintenanceSummary }) {
  const router = useRouter();
  const [status, setStatus] = useState(item.status);
  const [saving, setSaving] = useState(false);

  const nextOptions = maintenanceStatuses.filter(
    (s) => s === status || isValidMaintenanceTransition(status as MaintenanceStatus, s),
  );

  async function changeStatus(newStatus: string) {
    setStatus(newStatus);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/maintenance/${item.id}`, {
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
          {maintenanceResourceTypeLabels[item.resourceType as MaintenanceResourceType] ?? item.resourceType} —{" "}
          {item.resourceLabel}
        </p>
        <p className="text-xs text-muted">
          {item.description} · {item.createdAt}
        </p>
      </div>
      <select className="input !w-auto text-xs" value={status} disabled={saving} onChange={(e) => changeStatus(e.target.value)}>
        {nextOptions.map((s) => (
          <option key={s} value={s}>
            {maintenanceStatusLabels[s]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function MaintenanceList({ items }: { items: MaintenanceSummary[] }) {
  if (items.length === 0) {
    return <div className="empty-state">Aucune demande de maintenance.</div>;
  }
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Row key={item.id} item={item} />
      ))}
    </div>
  );
}
