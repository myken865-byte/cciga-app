import { cookies } from "next/headers";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminNav from "@/components/AdminNav";
import { SCHOOL_COOKIE, isSchoolKey, ALL_SCHOOLS_VALUE, type SchoolKey } from "@/lib/institutions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  const [notifications, cookieStore] = await Promise.all([
    session
      ? prisma.notification.findMany({
          where: { userId: session.userId },
          orderBy: { createdAt: "desc" },
          take: 20,
        })
      : Promise.resolve([]),
    cookies(),
  ]);

  const rawSchool = cookieStore.get(SCHOOL_COOKIE)?.value;
  const activeSchool: SchoolKey | "toutes" | null = isSchoolKey(rawSchool)
    ? rawSchool
    : rawSchool === ALL_SCHOOLS_VALUE
      ? "toutes"
      : null;

  return (
    <div className="min-h-screen bg-background">
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
        <div className="mx-auto max-w-[1600px] px-4 py-10 lg:px-8">{children}</div>
      )}
    </div>
  );
}
