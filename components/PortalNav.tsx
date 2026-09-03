import Link from "next/link";
import { roleLabels, type Role } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import LogoutButton from "@/components/LogoutButton";
import NotificationBell, { type NotificationItem } from "@/components/NotificationBell";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function PortalNav({
  name,
  userId,
  roles,
  notifications,
}: {
  name: string;
  userId: number;
  roles: Role[];
  notifications: NotificationItem[];
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {initials(name)}
          </div>
          <div className="min-w-0 text-sm leading-tight">
            <p className="truncate font-semibold text-foreground">{name}</p>
            <p className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
              <span className="font-mono">{formatCcigaId(userId)}</span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>{roles.map((r) => roleLabels[r]).join(", ")}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <NotificationBell notifications={notifications} />
          <Link
            href="/mon-espace"
            className="rounded-md px-3 py-1.5 font-medium text-primary hover:bg-primary/5"
          >
            Mon espace
          </Link>
          <LogoutButton className="btn-secondary !min-h-0 !py-1.5" />
        </div>
      </div>
    </div>
  );
}
