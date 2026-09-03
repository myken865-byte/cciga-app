import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminNav from "@/components/AdminNav";
import NavigationTracker from "@/components/NavigationTracker";
import { SCHOOL_COOKIE, isSchoolKey, ALL_SCHOOLS_VALUE } from "@/lib/institutions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  const notifications = session
    ? await prisma.notification.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      })
    : [];

  const cookieStore = await cookies();
  const rawSchool = cookieStore.get(SCHOOL_COOKIE)?.value;
  const activeSchool = rawSchool === ALL_SCHOOLS_VALUE ? ALL_SCHOOLS_VALUE : isSchoolKey(rawSchool) ? rawSchool : null;

  return (
    <div className="min-h-screen bg-background">
      <NavigationTracker />
      {session ? (
        <AdminNav
          name={session.name}
          roles={session.roles}
          notifications={notifications.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() }))}
          activeSchool={activeSchool}
        >
          {children}
        </AdminNav>
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">{children}</div>
      )}
    </div>
  );
}
