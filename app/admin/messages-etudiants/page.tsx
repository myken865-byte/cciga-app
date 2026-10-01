import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hasAnyRole, hasRole } from "@/lib/roles";
import { getActiveSchoolOrAll } from "@/lib/institutionContext";
import {
  studentConversationServices,
  studentConversationServiceRoles,
  type StudentConversationService,
} from "@/lib/studentConversations";
import { isAnyStudentConversationStaff } from "@/lib/studentConversationAccess";
import StudentConversationList, { type StudentConversationSummary } from "@/components/StudentConversationList";
import { AdminShell, AdminTitleBand, AdminCard } from "@/components/AdminPremium";
import { ChatIcon } from "@/components/icons";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = { title: "Messagerie étudiants" };

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function AdminMessagerieEtudiantsPage() {
  const session = await getSession();
  const authorized = Boolean(session && isAnyStudentConversationStaff(session));

  // "enseignant" : seul le TEACHER assigné voit ses propres fils (jamais
  // tout le corps enseignant) — ADMIN/SUPER_ADMIN gardent la supervision
  // via les autres services. Les autres services suivent le même filtre que
  // demandes-parents : le rôle de l'agent doit couvrir le service.
  const allowedServices: StudentConversationService[] = session
    ? studentConversationServices.filter(
        (s) => s !== "enseignant" && hasAnyRole(session.roles, studentConversationServiceRoles[s]),
      )
    : [];
  const isTeacher = Boolean(session && hasRole(session.roles, "TEACHER"));

  const activeSchool = authorized ? await getActiveSchoolOrAll() : null;

  // Un TEACHER "pur" (aucun autre rôle institutionnel) n'a jamais à choisir
  // d'institution pour cette page (proxy.ts `isPureTeacher`) — ses propres
  // fils "enseignant" restent visibles même sans `activeSchool`. Les
  // services institutionnels, eux, restent strictement conditionnés à une
  // institution active choisie.
  const orConditions: object[] = [];
  if (allowedServices.length && activeSchool) {
    orConditions.push({
      service: { in: allowedServices },
      ...(activeSchool === "toutes" ? {} : { student: { program: { school: activeSchool } } }),
    });
  }
  if (isTeacher) {
    orConditions.push({ service: "enseignant", staffId: session!.userId });
  }

  const conversations =
    authorized && session && orConditions.length
      ? await prisma.studentConversation.findMany({
          where: { OR: orConditions },
          include: { student: true, messages: { select: { authorId: true, readByStaff: true } } },
          orderBy: { updatedAt: "desc" },
        })
      : [];

  const summaries: StudentConversationSummary[] = conversations.map((c) => ({
    id: c.id,
    subject: c.subject,
    service: c.service,
    updatedAt: formatDate(c.updatedAt),
    counterpartName: c.student.name,
    unread: c.messages.some((m) => m.authorId !== session!.userId && !m.readByStaff),
  }));

  return (
    <AdminShell>
      <BackButton fallbackHref="/admin/centre-de-commandement" />
      <AdminTitleBand eyebrow="CCIGA — Guichet institutionnel" title="Messagerie étudiants" />
      <p className="mb-6 text-sm text-muted">Conversations initiées par les élèves/étudiants, routées vers votre service.</p>
      <AdminCard title="Conversations reçues" icon={ChatIcon}>
        <StudentConversationList conversations={summaries} basePath="/admin/messages-etudiants" />
      </AdminCard>
    </AdminShell>
  );
}
