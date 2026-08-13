import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import PortalNav from "@/components/PortalNav";

export default async function PortailLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  const notifications = session
    ? await prisma.notification.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    : [];

  return (
    <div>
      {session && (
        <PortalNav
          name={session.name}
          userId={session.userId}
          roles={session.roles}
          notifications={notifications.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))}
        />
      )}
      {children}
    </div>
  );
}
