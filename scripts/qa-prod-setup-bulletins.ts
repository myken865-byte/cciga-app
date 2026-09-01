import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.production", override: true });

import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const pw = "QaTest#2026!";
  const hash = await bcrypt.hash(pw, 10);

  let year = await prisma.academicYear.findFirst({ where: { label: "2026-2027" } });
  if (!year) {
    year = await prisma.academicYear.create({
      data: { label: "2026-2027", startDate: new Date("2026-09-01"), endDate: new Date("2027-06-30"), isActive: true },
    });
  }
  let semester = await prisma.semester.findFirst({ where: { academicYearId: year.id, name: "Semestre 1" } });
  if (!semester) {
    semester = await prisma.semester.create({ data: { academicYearId: year.id, name: "Semestre 1", order: 1 } });
  }
  console.log("semesterId=" + semester.id);

  // Ecole Classique: pick any Ecole Classique program with a course
  const classiqueProgram = await prisma.program.findFirst({
    where: { school: "ecole-classique" },
    include: { courses: true },
  });
  if (!classiqueProgram) throw new Error("no ecole-classique program found");
  await prisma.program.update({ where: { id: classiqueProgram.id }, data: { rankingEnabled: true, passingGrade: 60 } });

  let classiqueCourse = classiqueProgram.courses[0];
  if (!classiqueCourse) {
    classiqueCourse = await prisma.course.create({
      data: { programId: classiqueProgram.id, name: "QA Cours Classique", description: "QA test", semesterId: semester.id, coefficient: 2 },
    });
  } else {
    await prisma.course.update({ where: { id: classiqueCourse.id }, data: { semesterId: semester.id, coefficient: 2 } });
  }
  let classiqueCategory = await prisma.evaluationCategory.findFirst({ where: { courseId: classiqueCourse.id } });
  if (!classiqueCategory) {
    classiqueCategory = await prisma.evaluationCategory.create({ data: { courseId: classiqueCourse.id, name: "Examen", weightPercent: 100 } });
  }
  console.log("classiqueProgramId=" + classiqueProgram.id, "classiqueCourseId=" + classiqueCourse.id, "classiqueCategoryId=" + classiqueCategory.id);

  const classiqueTeacher = await prisma.user.upsert({
    where: { email: "qa.classteacher@cciga.test" },
    update: { passwordHash: hash },
    create: { email: "qa.classteacher@cciga.test", passwordHash: hash, roles: JSON.stringify(["TEACHER"]), name: "QA Prof Classique" },
  });
  await prisma.course.update({ where: { id: classiqueCourse.id }, data: { teacherId: classiqueTeacher.id } });

  const classiqueStudent = await prisma.user.upsert({
    where: { email: "qa.classstudent@cciga.test" },
    update: { passwordHash: hash, programId: classiqueProgram.id },
    create: { email: "qa.classstudent@cciga.test", passwordHash: hash, roles: JSON.stringify(["STUDENT"]), name: "QA Eleve Classique", programId: classiqueProgram.id },
  });
  console.log("classiqueTeacherId=" + classiqueTeacher.id, "classiqueStudentId=" + classiqueStudent.id);

  // Universite
  const uniProgram = await prisma.program.findFirst({ where: { school: "universite" }, include: { courses: true } });
  if (!uniProgram) throw new Error("no universite program found");
  await prisma.program.update({ where: { id: uniProgram.id }, data: { rankingEnabled: true, passingGrade: 60 } });

  const uniCourse = await prisma.course.create({
    data: { programId: uniProgram.id, name: "QA Cours Test Prod", description: "QA test course", semesterId: semester.id, credits: 3 },
  });
  const uniCategory = await prisma.evaluationCategory.create({ data: { courseId: uniCourse.id, name: "Examen final", weightPercent: 100 } });
  console.log("uniProgramId=" + uniProgram.id, "uniCourseId=" + uniCourse.id, "uniCategoryId=" + uniCategory.id);

  const uniTeacher = await prisma.user.upsert({
    where: { email: "qa.uniteacher.prod@cciga.test" },
    update: { passwordHash: hash },
    create: { email: "qa.uniteacher.prod@cciga.test", passwordHash: hash, roles: JSON.stringify(["TEACHER"]), name: "QA Prof Universite Prod" },
  });
  await prisma.course.update({ where: { id: uniCourse.id }, data: { teacherId: uniTeacher.id } });

  const uniStudent = await prisma.user.upsert({
    where: { email: "qa.unistudent.prod@cciga.test" },
    update: { passwordHash: hash, programId: uniProgram.id },
    create: { email: "qa.unistudent.prod@cciga.test", passwordHash: hash, roles: JSON.stringify(["STUDENT"]), name: "QA Etudiant Universite Prod", programId: uniProgram.id },
  });
  console.log("uniTeacherId=" + uniTeacher.id, "uniStudentId=" + uniStudent.id);

  const officer = await prisma.user.upsert({
    where: { email: "qa.officer.prod@cciga.test" },
    update: { passwordHash: hash },
    create: { email: "qa.officer.prod@cciga.test", passwordHash: hash, roles: JSON.stringify(["ACADEMIC_OFFICER"]), name: "QA Responsable Academique Prod" },
  });
  console.log("officerId=" + officer.id);

  const admin = await prisma.user.upsert({
    where: { email: "qa.admin.prod@cciga.test" },
    update: { passwordHash: hash },
    create: { email: "qa.admin.prod@cciga.test", passwordHash: hash, roles: JSON.stringify(["ADMIN"]), name: "QA Admin Prod" },
  });
  console.log("adminId=" + admin.id);

  console.log("password=" + pw);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
