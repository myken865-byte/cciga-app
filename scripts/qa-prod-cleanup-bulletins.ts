import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.production", override: true });

import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const qaEmails = [
    "qa.classteacher@cciga.test",
    "qa.classstudent@cciga.test",
    "qa.uniteacher.prod@cciga.test",
    "qa.unistudent.prod@cciga.test",
    "qa.officer.prod@cciga.test",
    "qa.admin.prod@cciga.test",
  ];
  const qaUsers = await prisma.user.findMany({ where: { email: { in: qaEmails } } });
  const qaUserIds = qaUsers.map((u) => u.id);
  console.log("QA users found:", qaUsers.map((u) => u.email));

  // Documents generated for QA students
  const docs = await prisma.academicDocument.findMany({ where: { studentId: { in: qaUserIds } } });
  for (const doc of docs) {
    // clear self-referencing FK before delete
    await prisma.academicDocument.updateMany({ where: { previousVersionId: doc.id }, data: { previousVersionId: null } });
  }
  const delDocs = await prisma.academicDocument.deleteMany({ where: { studentId: { in: qaUserIds } } });
  console.log("Deleted AcademicDocument rows:", delDocs.count);

  const delAppr = await prisma.studentAppreciation.deleteMany({ where: { studentId: { in: qaUserIds } } });
  console.log("Deleted StudentAppreciation rows:", delAppr.count);

  // QA courses (created for this round's testing)
  const qaCourseNames = ["QA Cours Classique", "QA Cours Test Prod"];
  const qaCourses = await prisma.course.findMany({ where: { name: { in: qaCourseNames } } });
  for (const c of qaCourses) {
    await prisma.grade.deleteMany({ where: { courseId: c.id } });
    await prisma.evaluationCategory.deleteMany({ where: { courseId: c.id } });
    await prisma.attendance.deleteMany({ where: { courseId: c.id } });
  }
  const delCourses = await prisma.course.deleteMany({ where: { name: { in: qaCourseNames } } });
  console.log("Deleted QA courses:", delCourses.count);

  // Any remaining grades directly tied to QA users (defensive)
  const delGrades = await prisma.grade.deleteMany({ where: { studentId: { in: qaUserIds } } });
  console.log("Deleted remaining grades:", delGrades.count);

  const delAudit = await prisma.auditLog.deleteMany({ where: { actorId: { in: qaUserIds } } });
  console.log("Deleted audit log rows:", delAudit.count);

  const delNotif = await prisma.notification.deleteMany({ where: { userId: { in: qaUserIds } } });
  console.log("Deleted notifications:", delNotif.count);

  const delUsers = await prisma.user.deleteMany({ where: { id: { in: qaUserIds } } });
  console.log("Deleted QA users:", delUsers.count);

  // Semester/AcademicYear created for this round (2026-2027 / Semestre 1) - only if nothing else references them
  const semester = await prisma.semester.findFirst({ where: { name: "Semestre 1" }, include: { academicYear: true } });
  if (semester) {
    const remainingCourses = await prisma.course.count({ where: { semesterId: semester.id } });
    const remainingDocs = await prisma.academicDocument.count({ where: { semesterId: semester.id } });
    if (remainingCourses === 0 && remainingDocs === 0) {
      await prisma.semester.delete({ where: { id: semester.id } });
      console.log("Deleted QA semester:", semester.id);
      const yearId = semester.academicYearId;
      const remainingSemesters = await prisma.semester.count({ where: { academicYearId: yearId } });
      if (remainingSemesters === 0) {
        await prisma.academicYear.delete({ where: { id: yearId } });
        console.log("Deleted QA academic year:", yearId);
      }
    } else {
      console.log("Semester still in use, not deleted:", semester.id, { remainingCourses, remainingDocs });
    }
  }

  console.log("Cleanup complete.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
