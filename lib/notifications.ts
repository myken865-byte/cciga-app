import { prisma } from "@/lib/db";
import { parseRoles, hasAnyRole } from "@/lib/roles";

interface NotificationInput {
  type: string;
  title: string;
  body: string;
}

export async function createNotification(userId: number, data: NotificationInput) {
  await prisma.notification.create({ data: { userId, ...data } });
}

export async function notifyProgramStudents(programId: string, data: NotificationInput) {
  const students = await prisma.user.findMany({ where: { programId }, select: { id: true } });
  if (students.length === 0) return;
  await prisma.notification.createMany({
    data: students.map((s) => ({ userId: s.id, ...data })),
  });
}

export async function notifyAdmins(data: NotificationInput) {
  const users = await prisma.user.findMany({ select: { id: true, roles: true } });
  // hasAnyRole (not hasRole): "ADMIN" and "SUPER_ADMIN" are distinct role
  // strings, so a SUPER_ADMIN-only account must still be matched here.
  const admins = users.filter((u) => hasAnyRole(parseRoles(u.roles), ["ADMIN", "SUPER_ADMIN"]));
  if (admins.length === 0) return;
  await prisma.notification.createMany({
    data: admins.map((a) => ({ userId: a.id, ...data })),
  });
}
