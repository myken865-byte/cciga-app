/**
 * Portail Élève/Étudiant — agrégation des données d'un apprenant, dérivée
 * entièrement des données existantes (inscription validée + compte lié +
 * institution/programme connus). Aucune table "Portal" : ce module ne fait
 * que lire, dans le même esprit que app/admin/dossier/[id]/page.tsx, mais
 * scopé à l'utilisateur de la session plutôt qu'à un [id] admin.
 */
import { cache } from "react";
import { prisma } from "@/lib/db";
import { getSchoolBySlug } from "@/lib/content";
import type { SchoolKey } from "@/lib/institutions";

/**
 * Mémoïsée par requête (React `cache`) — chaque page du portail élève/
 * étudiant appelle cette fonction indépendamment de app/portail/etudiant/layout.tsx
 * (qui l'appelle déjà pour construire la sidebar), sans qu'aucune ne
 * connaisse le résultat déjà calculé par l'autre. Sans ce cache, chaque
 * navigation exécutait deux fois l'intégralité des ~16 requêtes Prisma
 * batchées ci-dessous (une fois pour le layout, une fois pour la page) —
 * trouvé lors de l'audit final A→Z (2026-09-12). `cache()` déduplique tout
 * appel avec le même userId le temps d'une seule requête serveur ; il ne
 * fuite jamais entre deux requêtes/utilisateurs différents.
 */
export const getLearnerPortalContext = cache(async function getLearnerPortalContext(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { program: true, badge: true },
  });
  if (!user) return null;

  const school = user.program ? getSchoolBySlug(user.program.school) : undefined;
  const schoolKey = (user.program?.school as SchoolKey | undefined) ?? undefined;

  const [
    classicEnrollmentForm,
    proEnrollmentForm,
    paymentsAgg,
    recentPayments,
    courses,
    assignmentsRaw,
    grades,
    attendances,
    academicDocuments,
    bookLoans,
    notifications,
    conversations,
    studentRequests,
    internships,
    seminarRegistrations,
    openSeminars,
    activeYear,
  ] = await Promise.all([
    schoolKey === "ecole-classique"
      ? prisma.classicEnrollmentForm.findFirst({
          where: { studentUserId: userId },
          orderBy: { updatedAt: "desc" },
        })
      : Promise.resolve(null),
    schoolKey === "ecole-professionnelle" || schoolKey === "universite"
      ? prisma.enrollmentForm.findFirst({
          where: { studentUserId: userId },
          orderBy: { updatedAt: "desc" },
        })
      : Promise.resolve(null),
    prisma.payment.aggregate({ where: { studentId: userId }, _sum: { amount: true } }),
    prisma.payment.findMany({ where: { studentId: userId }, orderBy: { paidAt: "desc" }, take: 10 }),
    user.programId
      ? prisma.course.findMany({ where: { programId: user.programId }, include: { teacher: true } })
      : Promise.resolve([]),
    user.programId
      ? prisma.assignment.findMany({
          where: { course: { programId: user.programId } },
          include: {
            // Mission "Portail Parent — Phase P1" (2026-09-13), objectif B :
            // le nom de l'enseignant est affiché sur la page Devoirs du
            // parent — ajout additif, ne change rien pour les appelants
            // existants qui n'utilisent pas course.teacher.
            course: { include: { teacher: true } },
            submissions: { where: { studentId: userId } },
            grades: { where: { studentId: userId } },
          },
          orderBy: { dueDate: "desc" },
        })
      : Promise.resolve([]),
    prisma.grade.findMany({
      where: { studentId: userId },
      include: { course: true, evaluationCategory: true, assignment: true },
      orderBy: { recordedAt: "desc" },
    }),
    prisma.attendance.findMany({
      where: { studentId: userId },
      // Mission "Portail Parent — Phase P1" (2026-09-13), objectif C :
      // enseignant affiché sur la page Présence du parent — additif.
      include: { course: { include: { teacher: true } } },
      orderBy: { date: "desc" },
    }),
    prisma.academicDocument.findMany({
      where: { studentId: userId, status: "publie" },
      orderBy: { generatedAt: "desc" },
    }),
    prisma.bookLoan.findMany({
      where: { borrowerId: userId },
      include: { book: true },
      orderBy: { borrowedAt: "desc" },
    }),
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.studentConversation.findMany({
      where: { studentId: userId },
      include: { staff: true, messages: { select: { readByStudent: true, authorId: true } } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.studentRequest.findMany({
      where: { studentId: userId },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.internship.findMany({
      where: { studentId: userId },
      include: { internalSupervisor: true },
      orderBy: { startDate: "desc" },
    }),
    prisma.seminarRegistration.findMany({
      where: { studentId: userId },
      include: { seminar: true },
      orderBy: { registeredAt: "desc" },
    }),
    schoolKey
      ? prisma.seminar.findMany({
          where: { school: schoolKey, status: "ouvert", registrationOpen: true },
          orderBy: { startAt: "asc" },
        })
      : Promise.resolve([]),
    prisma.academicYear.findFirst({ where: { isActive: true }, select: { label: true } }),
  ]);

  const paid = paymentsAgg._sum.amount ?? 0;
  const fee = user.program?.tuitionFee ?? 0;
  const balance = fee - paid;

  const publishedGrades = grades.filter((g) => g.publishedAt);
  const examGrades = publishedGrades.filter((g) =>
    /examen|contrôle|controle|partiel/i.test(g.evaluationCategory?.name ?? ""),
  );

  const pendingAssignments = assignmentsRaw.filter((a) => a.submissions.length === 0 && a.grades.length === 0);
  const submittedAssignments = assignmentsRaw.filter((a) => a.submissions.length > 0 || a.grades.length > 0);

  const attendanceTotal = attendances.length;
  const absences = attendances.filter((a) => a.status === "absent").length;
  const retards = attendances.filter((a) => a.status === "retard").length;
  const presenceRate = attendanceTotal > 0 ? Math.round(((attendanceTotal - absences) / attendanceTotal) * 100) : null;

  const activeLoans = bookLoans.filter((l) => !l.returnedAt);

  const unreadConversations = conversations.filter((c) =>
    c.messages.some((m) => m.authorId !== userId && !m.readByStudent),
  );
  const lastConversation = conversations[0] ?? null;
  const pendingRequests = studentRequests.filter((r) => r.status !== "validee" && r.status !== "rejetee");
  const lastUpdatedRequest = studentRequests[0] ?? null;

  const registeredSeminarIds = new Set(seminarRegistrations.map((r) => r.seminarId));
  const availableSeminars = openSeminars.filter((s) => !registeredSeminarIds.has(s.id));
  const activeInternships = internships.filter((i) => i.status === "planifie" || i.status === "en_cours");

  return {
    user,
    school,
    schoolKey,
    academicYearLabel: activeYear?.label ?? null,
    enrollmentForm: classicEnrollmentForm ?? proEnrollmentForm,
    enrollmentFormKind: classicEnrollmentForm ? ("classique" as const) : proEnrollmentForm ? ("standard" as const) : null,
    badge: user.badge,
    finance: { paid, fee, balance, recentPayments },
    courses,
    assignments: { all: assignmentsRaw, pending: pendingAssignments, submitted: submittedAssignments },
    grades: { all: grades, published: publishedGrades, exams: examGrades },
    attendance: { all: attendances, total: attendanceTotal, absences, retards, presenceRate },
    documents: academicDocuments,
    library: { loans: bookLoans, active: activeLoans },
    notifications,
    messages: {
      all: conversations,
      unreadCount: unreadConversations.length,
      last: lastConversation,
    },
    requests: {
      all: studentRequests,
      pendingCount: pendingRequests.length,
      lastUpdated: lastUpdatedRequest,
    },
    internships: {
      all: internships,
      active: activeInternships,
    },
    seminars: {
      registrations: seminarRegistrations,
      available: availableSeminars,
    },
  };
});

export type LearnerPortalContext = NonNullable<Awaited<ReturnType<typeof getLearnerPortalContext>>>;
