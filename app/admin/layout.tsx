import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminNav from "@/components/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  const notifications = session
    ? await prisma.notification.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    : [];

  return (
    <div className="min-h-screen bg-background">
      {session && (
        <AdminNav
          name={session.name}
          notifications={notifications.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))}
        />
      )}
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">{children}</div>
    </div>
  );
}
