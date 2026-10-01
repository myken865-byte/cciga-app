import { prisma } from "@/lib/db";
import { parseRoles, hasAnyRole, type Role } from "@/lib/roles";

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

/**
 * Same shape as notifyProgramStudents but scoped to every program of a given
 * institution rather than a single program — used when a Seminar (which has
 * no single Program) opens registrations for its whole school.
 */
export async function notifySchoolStudents(school: string, data: NotificationInput) {
  const students = await prisma.user.findMany({ where: { program: { school } }, select: { id: true } });
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

/**
 * Generalization of notifyAdmins to an arbitrary role list — used by the
 * student messaging/requests routes (mandat "Messagerie étudiant + Demandes
 * administratives", 2026-09-12) to notify every staff account holding one of
 * the roles authorized for a given service, since roles are stored as a JSON
 * string on User and can't be filtered in the query itself (same constraint
 * notifyAdmins already works around).
 */
export async function notifyRoles(roles: Role[], data: NotificationInput) {
  const users = await prisma.user.findMany({ select: { id: true, roles: true } });
  const matches = users.filter((u) => hasAnyRole(parseRoles(u.roles), roles));
  if (matches.length === 0) return;
  await prisma.notification.createMany({
    data: matches.map((m) => ({ userId: m.id, ...data })),
  });
}
