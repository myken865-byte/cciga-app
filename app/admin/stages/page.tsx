import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole, hasRole, parseRoles } from "@/lib/roles";
import { isInternshipStaff } from "@/lib/internshipAccess";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import InternshipForm, { type InternshipFormStudent } from "@/components/InternshipForm";
import InternshipList, { type InternshipSummary } from "@/components/InternshipList";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ChatIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = { title: "Stages" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AdminStagesPage() {
  const session = await getSession();
  const isStaff = Boolean(session && isInternshipStaff(session));
  // Un TEACHER "pur" (aucun autre rôle institutionnel) atteint cette page
  // sans jamais choisir d'institution (proxy.ts `isPureTeacher`) — il ne
  // voit que les stages où il est désigné superviseur interne, jamais le
  // formulaire de création (réservé au personnel, voir isInternshipStaff).
  const isTeacherSupervisor = Boolean(session && hasRole(session.roles, "TEACHER"));
  const activeSchool = isStaff ? await getActiveSchoolOrAll() : null;

  const [students, teachers, internships] = isStaff && activeSchool
    ? await Promise.all([
        prisma.user.findMany({
          where: {
            programId: { not: null },
            program: activeSchool === "toutes" ? undefined : { school: activeSchool },
          },
          include: { program: true },
          orderBy: { name: "asc" },
        }),
        prisma.user.findMany({ orderBy: { name: "asc" } }),
        prisma.internship.findMany({
          where: activeSchool === "toutes" ? {} : { program: { school: activeSchool } },
          include: { student: true },
          orderBy: { startDate: "desc" },
        }),
      ])
    : isTeacherSupervisor && session
      ? [
          [],
          [],
          await prisma.internship.findMany({
            where: { internalSupervisorId: session.userId },
            include: { student: true },
            orderBy: { startDate: "desc" },
          }),
        ]
      : [[], [], []];

  const formStudents: InternshipFormStudent[] = students
    .filter((s) => hasRole(parseRoles(s.roles), "STUDENT") && s.program)
    .map((s) => ({ id: s.id, name: s.name, programId: s.programId!, programName: s.program!.name }));

  const supervisors = teachers
    .filter((t) => hasAnyRole(parseRoles(t.roles), ["TEACHER"]))
    .map((t) => ({ id: t.id, name: t.name }));

  const summaries: InternshipSummary[] = internships.map((i) => ({
    id: i.id,
    title: i.title,
    hostOrganization: i.hostOrganization,
    status: i.status,
    startDate: formatDate(i.startDate),
    studentName: i.student.name,
  }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Vie scolaire" title="Stages" />
      <p className="mb-6 text-sm text-muted">
        {isStaff
          ? "Créer, suivre et évaluer les stages des élèves/étudiants."
          : "Stages que vous supervisez en tant qu'enseignant référent."}
      </p>
      {isStaff && (
        <div className="mb-6">
          <InternshipForm students={formStudents} supervisors={supervisors} />
        </div>
      )}
      <AdminCard title="Stages en cours" icon={ChatIcon}>
        <InternshipList internships={summaries} basePath="/admin/stages" />
      </AdminCard>
    </AdminShell>
  );
}
