import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { roleLabels, rolePortalPath } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import LogoutButton from "@/components/LogoutButton";

export default async function MonEspacePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Mon espace CCIGA
          </p>
          <h1 className="mb-1 text-3xl font-bold text-foreground">Bonjour {session.name}</h1>
          <p className="font-mono text-sm text-muted">{formatCcigaId(session.userId)}</p>
        </div>
        <LogoutButton className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground hover:bg-surface" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {session.roles.map((role) => (
          <Link
            key={role}
            href={rolePortalPath[role]}
            className="rounded-lg border border-border bg-surface p-6 transition hover:border-primary hover:shadow-md"
          >
            <h2 className="mb-1 font-semibold text-primary">{roleLabels[role]}</h2>
            <span className="text-sm text-muted">Accéder →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
