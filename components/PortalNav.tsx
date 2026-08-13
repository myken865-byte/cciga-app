import Link from "next/link";
import { roleLabels, type Role } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import LogoutButton from "@/components/LogoutButton";
import NotificationBell, { type NotificationItem } from "@/components/NotificationBell";

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
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <div className="text-sm">
          <span className="font-semibold text-foreground">{name}</span>
          <span className="ml-2 font-mono text-muted">{formatCcigaId(userId)}</span>
          <span className="ml-2 text-muted">
            ({roles.map((r) => roleLabels[r]).join(", ")})
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <NotificationBell notifications={notifications} />
          <Link href="/mon-espace" className="text-primary hover:underline">
            Mon espace
          </Link>
          <LogoutButton className="rounded-md border border-border px-3 py-1.5 text-foreground hover:bg-background" />
        </div>
      </div>
    </div>
  );
}
