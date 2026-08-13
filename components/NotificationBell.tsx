"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NotificationBell({
  notifications: initial,
  dark = false,
}: {
  notifications: NotificationItem[];
  dark?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initial);

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function markRead(id: string) {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await fetch(`/api/notifications/${id}/read`, { method: "POST" });
    router.refresh();
  }

  async function markAllRead() {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
    await fetch("/api/notifications/read-all", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative flex h-8 w-8 items-center justify-center rounded-md ${
          dark ? "text-white/80 hover:bg-white/10" : "text-foreground hover:bg-background"
        }`}
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-primary-dark">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-border bg-surface shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs font-medium text-primary hover:underline">
                Tout marquer comme lu
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted">Aucune notification.</p>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => !n.read && markRead(n.id)}
                  className={`block w-full border-b border-border px-4 py-3 text-left last:border-0 ${
                    n.read ? "bg-surface" : "bg-primary/5"
                  } hover:bg-background`}
                >
                  <div className="mb-0.5 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{n.title}</span>
                    {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
                  </div>
                  <p className="text-xs text-muted">{n.body}</p>
                  <p className="mt-1 text-[11px] text-muted">{formatDate(n.createdAt)}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
