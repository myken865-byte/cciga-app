/**
 * Data access layer for site content.
 *
 * Every page reads content through these functions instead of importing
 * /data or Prisma directly. Programs, news, events and FAQ are now backed
 * by the database (see project vision, section 5-6: the admin creates
 * content once, it's published on the site automatically) — this is the
 * file that changed when that swap happened, exactly as planned in the
 * original comment here.
 */
import { schools, getSchoolBySlug as _getSchoolBySlug, type School, type SchoolSlug } from "@/data/schools";
import { getDirection as _getDirection, type StaffMember } from "@/data/staff";
import { prisma } from "@/lib/db";
import type {
  Program as PrismaProgram,
  News as PrismaNews,
  Event as PrismaEvent,
  Faq as PrismaFaq,
} from "@/lib/generated/prisma/client";

export type { School, SchoolSlug, StaffMember };

import type { Niveau } from "@/lib/niveaux";
export type { Niveau } from "@/lib/niveaux";
export { niveauList, niveauLabels } from "@/lib/niveaux";
import type { TeacherModel } from "@/lib/teacherModel";
export type { TeacherModel } from "@/lib/teacherModel";
export { teacherModelList, teacherModelLabels } from "@/lib/teacherModel";
import type { ProgramType, ProgramStatus } from "@/lib/universite";
export type { ProgramType, ProgramStatus } from "@/lib/universite";
export {
  programTypeList,
  programTypeLabels,
  programStatusList,
  programStatusLabels,
  isPubliclyVisible,
  usesAuthorizationWorkflow,
  usesGradeWorkflow,
} from "@/lib/universite";

export interface Program {
  id: string;
  slug: string;
  school: SchoolSlug;
  faculty: string;
  academicFacultyId: string | null;
  name: string;
  level: string;
  niveau: Niveau | null;
  teacherModel: TeacherModel | null;
  titulaireId: number | null;
  programType: ProgramType | null;
  programStatus: ProgramStatus | null;
  authorizationRef: string | null;
  authorizationDate: string | null;
  authorizationDocumentRef: string | null;
  passingGrade: number | null;
  rankingEnabled: boolean;
  skillsTargeted: string[];
  practicalWork: string | null;
  internship: string | null;
  certification: string | null;
  duration: string;
  description: string;
  admissionConditions: string[];
  tuitionFee: number;
}

function mapProgram(row: PrismaProgram): Program {
  return {
    id: row.id,
    slug: row.slug,
    school: row.school as SchoolSlug,
    faculty: row.faculty,
    academicFacultyId: row.academicFacultyId ?? null,
    name: row.name,
    level: row.level,
    niveau: (row.niveau as Niveau | null) ?? null,
    teacherModel: (row.teacherModel as TeacherModel | null) ?? null,
    titulaireId: row.titulaireId ?? null,
    programType: (row.programType as ProgramType | null) ?? null,
    programStatus: (row.programStatus as ProgramStatus | null) ?? null,
    authorizationRef: row.authorizationRef ?? null,
    authorizationDate: row.authorizationDate ? row.authorizationDate.toISOString().slice(0, 10) : null,
    authorizationDocumentRef: row.authorizationDocumentRef ?? null,
    passingGrade: row.passingGrade ?? null,
    rankingEnabled: row.rankingEnabled,
    skillsTargeted: JSON.parse(row.skillsTargeted || "[]"),
    practicalWork: row.practicalWork ?? null,
    internship: row.internship ?? null,
    certification: row.certification ?? null,
    duration: row.duration,
    description: row.description,
    admissionConditions: JSON.parse(row.admissionConditions || "[]"),
    tuitionFee: row.tuitionFee,
  };
}

export function getSchools(): School[] {
  return schools;
}

export function getSchoolBySlug(slug: string): School | undefined {
  return _getSchoolBySlug(slug);
}

export async function getPrograms(): Promise<Program[]> {
  const rows = await prisma.program.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(mapProgram);
}

export async function getProgramsBySchool(school: SchoolSlug): Promise<Program[]> {
  const rows = await prisma.program.findMany({
    where: { school },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapProgram);
}

export async function getProgramsByNiveau(niveau: Niveau): Promise<Program[]> {
  const rows = await prisma.program.findMany({
    where: { school: "ecole-classique", niveau },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapProgram);
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  const row = await prisma.program.findUnique({ where: { slug } });
  return row ? mapProgram(row) : undefined;
}

export async function getProgramById(id: string): Promise<Program | undefined> {
  const row = await prisma.program.findUnique({ where: { id } });
  return row ? mapProgram(row) : undefined;
}

export interface FacultyItem {
  id: string;
  name: string;
}

export async function getFaculties(school: SchoolSlug): Promise<FacultyItem[]> {
  const rows = await prisma.faculty.findMany({ where: { school }, orderBy: { name: "asc" } });
  return rows.map((f) => ({ id: f.id, name: f.name }));
}

/** Only programs that are Autorisé with both authorization and justificatif references — safe for public display. */
export async function getPublicUniversitePrograms(): Promise<Program[]> {
  const rows = await prisma.program.findMany({
    where: {
      school: "universite",
      programStatus: "autorise",
      authorizationRef: { not: null },
      authorizationDocumentRef: { not: null },
    },
    orderBy: { name: "asc" },
  });
  return rows.map(mapProgram);
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
}

function mapNews(row: PrismaNews): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date.toISOString().slice(0, 10),
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
  };
}

export async function getNews(): Promise<NewsItem[]> {
  const rows = await prisma.news.findMany({ orderBy: { date: "desc" } });
  return rows.map(mapNews);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const row = await prisma.news.findUnique({ where: { slug } });
  return row ? mapNews(row) : undefined;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

function mapEvent(row: PrismaEvent): EventItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date.toISOString().slice(0, 10),
    location: row.location,
    description: row.description,
  };
}

export async function getEvents(): Promise<EventItem[]> {
  const rows = await prisma.event.findMany({ orderBy: { date: "asc" } });
  return rows.map(mapEvent);
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

function mapFaq(row: PrismaFaq): FaqItem {
  return { id: row.id, question: row.question, answer: row.answer };
}

export async function getFaq(): Promise<FaqItem[]> {
  const rows = await prisma.faq.findMany({ orderBy: { order: "asc" } });
  return rows.map(mapFaq);
}

export function getDirection(): StaffMember[] {
  return _getDirection();
}
