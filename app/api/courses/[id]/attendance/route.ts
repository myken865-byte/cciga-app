import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { hasRole } from "@/lib/roles";
import { isAttendanceStatus, ATTENDANCE_ALERT_THRESHOLD } from "@/lib/attendance";
import { notifyAdmins } from "@/lib/notifications";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({ where: { id } });
  if (!course) {
    return NextResponse.json({ error: "Cours introuvable." }, { status: 404 });
  }

  const isAdmin = hasRole(session.roles, "ADMIN");
  const isCourseTeacher = course.teacherId === session.userId;
  if (!isAdmin && !isCourseTeacher) {
    return NextResponse.json({ error: "Non autorisé pour ce cours." }, { status: 403 });
  }

  const { date, records } = (await request.json()) ?? {};
  if (!date || !Array.isArray(records) || records.length === 0) {
    return NextResponse.json({ error: "Date et présences requises." }, { status: 400 });
  }

  const attendanceDate = new Date(date);
  const alertedStudents: { id: number; name: string }[] = [];

  for (const record of records) {
    const studentId = Number(record?.studentId);
    const status = record?.status;
    if (!Number.isInteger(studentId) || !isAttendanceStatus(status)) continue;

    await prisma.attendance.upsert({
      where: { courseId_studentId_date: { courseId: id, studentId, date: attendanceDate } },
      create: { courseId: id, studentId, date: attendanceDate, status },
      update: { status },
    });

    if (status === "absent") {
      const absenceCount = await prisma.attendance.count({
        where: { courseId: id, studentId, status: "absent" },
      });
      if (absenceCount === ATTENDANCE_ALERT_THRESHOLD) {
        const student = await prisma.user.findUnique({ where: { id: studentId } });
        if (student) alertedStudents.push({ id: student.id, name: student.name });
      }
    }
  }

  for (const student of alertedStudents) {
    await notifyAdmins({
      type: "attendance_alert",
      title: "Alerte absentéisme",
      body: `${student.name} a atteint ${ATTENDANCE_ALERT_THRESHOLD} absences pour ${course.name}.`,
    });
  }

  return NextResponse.json({ ok: true });
}
