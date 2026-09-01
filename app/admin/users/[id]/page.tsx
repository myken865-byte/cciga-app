import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { parseRoles, hasRole, roleLabels } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { getPrograms } from "@/lib/content";
import EditUserForm from "@/components/EditUserForm";
import GenerateBadgeButton from "@/components/GenerateBadgeButton";
import { GenerateOneButton } from "@/components/BulletinRowActions";
import { computePeriodReadiness } from "@/lib/documents";
import { getActiveSchool } from "@/lib/institutionContext";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

const badgeStatusLabels: Record<string, string> = {
  actif: "Actif",
  a_finaliser: "À finaliser",
  perdu: "Perdu",
  remplace: "Remplacé",
  inactif: "Inactif",
};

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) notFound();

  const session = await getSession();
  const isSuperAdmin = hasRole(session?.roles ?? [], "SUPER_ADMIN");
  const activeSchool = await getActiveSchool();

  const [user, allPrograms, badge] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, include: { program: true } }),
    getPrograms(),
    prisma.badge.findUnique({ where: { userId } }),
  ]);
  if (!user) notFound();
  const roles = parseRoles(user.roles);
  const isStudent = hasRole(roles, "STUDENT");
  const isParent = hasRole(roles, "PARENT");

  // Le sélecteur de programme ne propose jamais une autre institution que
  // celle active — sauf le propre programme déjà assigné à cet utilisateur,
  // pour ne pas le faire disparaître silencieusement du formulaire.
  const programs = activeSchool
    ? allPrograms.filter((p) => p.school === activeSchool || p.id === user.programId)
    : allPrograms;

  // Parents proposables au lien élève<->parent : scopés à l'institution
  // active comme le reste du dossier (même règle que partout ailleurs).
  const parentCandidates = isStudent
    ? (
        await prisma.user.findMany({
          select: { id: true, name: true, roles: true },
          orderBy: { name: "asc" },
        })
      ).filter((u) => hasRole(parseRoles(u.roles), "PARENT"))
    : [];

  let dossier: {
    parent: { id: number; name: string } | null;
    children: { id: number; name: string }[];
    attendanceStats: { present: number; absent: number; retard: number; excuse: number };
    recentGrades: { id: string; score: number; courseName: string; recordedAt: Date }[];
    documents: { id: string; type: string; generatedAt: Date; periodLabel: string }[];
    observations: { id: string; body: string; createdAt: Date; authorName: string }[];
  } | null = null;

  if (isStudent || isParent) {
    const [parent, children] = await Promise.all([
      user.parentId
        ? prisma.user.findUnique({ where: { id: user.parentId }, select: { id: true, name: true } })
        : Promise.resolve(null),
      isParent
        ? prisma.user.findMany({ where: { parentId: user.id }, select: { id: true, name: true } })
        : Promise.resolve([]),
    ]);

    const attendanceStats = { present: 0, absent: 0, retard: 0, excuse: 0 };
    let recentGrades: { id: string; score: number; courseName: string; recordedAt: Date }[] = [];
    let documents: { id: string; type: string; generatedAt: Date; periodLabel: string }[] = [];
    let observations: { id: string; body: string; createdAt: Date; authorName: string }[] = [];

    if (isStudent) {
      const [attendances, grades, docs, obs] = await Promise.all([
        prisma.attendance.findMany({ where: { studentId: user.id }, select: { status: true } }),
        prisma.grade.findMany({
          where: { studentId: user.id },
          include: { course: { select: { name: true } } },
          orderBy: { recordedAt: "desc" },
          take: 5,
        }),
        prisma.academicDocument.findMany({
          where: { studentId: user.id, supersededBy: null },
          include: { semester: { include: { academicYear: true } } },
          orderBy: { generatedAt: "desc" },
        }),
        prisma.observation.findMany({
          where: { studentId: user.id },
          include: { author: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        }),
      ]);
      for (const a of attendances) {
        if (a.status === "present") attendanceStats.present += 1;
        else if (a.status === "absent") attendanceStats.absent += 1;
        else if (a.status === "retard") attendanceStats.retard += 1;
        else if (a.status === "excuse") attendanceStats.excuse += 1;
      }
      recentGrades = grades.map((g) => ({
        id: g.id,
        score: g.score,
        courseName: g.course.name,
        recordedAt: g.recordedAt,
      }));
      documents = docs.map((d) => ({
        id: d.id,
        type: d.type,
        generatedAt: d.generatedAt,
        periodLabel: d.semester ? `${d.semester.academicYear.label} — ${d.semester.name}` : "—",
      }));
      observations = obs.map((o) => ({
        id: o.id,
        body: o.body,
        createdAt: o.createdAt,
        authorName: o.author.name,
      }));
    }

    dossier = { parent, children, attendanceStats, recentGrades, documents, observations };
  }

  // Bulletins non encore générés (item 7, "Générer/Voir le bulletin" depuis
  // le dossier) : une période sans document courant pour ce programme, avec
  // son statut réel — jamais un bulletin final généré silencieusement avec
  // des notes manquantes.
  let pendingPeriods: {
    semesterId: string;
    periodLabel: string;
    ready: boolean;
    missing: string[];
  }[] = [];
  if (isStudent && user.programId) {
    const [existingDocSemesterIds, coursePeriods] = await Promise.all([
      prisma.academicDocument
        .findMany({ where: { studentId: user.id, programId: user.programId, supersededBy: null }, select: { semesterId: true } })
        .then((rows) => new Set(rows.map((r) => r.semesterId).filter((s): s is string => !!s))),
      prisma.course.findMany({
        where: { programId: user.programId, semesterId: { not: null } },
        select: { semesterId: true, semester: { select: { name: true, academicYear: { select: { label: true } } } } },
        distinct: ["semesterId"],
      }),
    ]);
    const candidatePeriods = coursePeriods.filter((c) => c.semesterId && !existingDocSemesterIds.has(c.semesterId));
    pendingPeriods = await Promise.all(
      candidatePeriods.map(async (c) => {
        const readiness = await computePeriodReadiness(user.programId!, c.semesterId!);
        const own = readiness.find((r) => r.studentId === user.id);
        return {
          semesterId: c.semesterId!,
          periodLabel: c.semester ? `${c.semester.academicYear.label} — ${c.semester.name}` : "—",
          ready: own?.ready ?? false,
          missing: [...new Set((own?.missing ?? []).map((m) => m.categoryName))],
        };
      }),
    );
  }

  return (
    <div>
      <Link href="/admin/users" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Tous les comptes
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {user.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background text-xs text-muted">
              Photo
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="font-mono text-sm text-muted">
              Matricule {formatCcigaId(user.id)} · {user.email}
            </p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {roles.map((r) => (
                <span key={r} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {roleLabels[r]}
                </span>
              ))}
              {!user.active && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                  Archivé
                </span>
              )}
            </div>
          </div>
        </div>
        {isStudent && (
          <div className="flex flex-wrap gap-2">
            <Link href={`/portail/bulletin?student=${user.id}`} className="btn-secondary !min-h-0 !py-1.5 text-xs">
              Bulletin / Palmarès
            </Link>
            <Link href={`/admin/finance/${user.id}`} className="btn-secondary !min-h-0 !py-1.5 text-xs">
              Situation financière
            </Link>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-5">
            <h2 className="mb-3 font-semibold text-foreground">Badge</h2>
            {badge ? (
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-muted">N° {badge.badgeNumber}</span>
                  <span
                    className={`badge ${badge.status === "actif" ? "badge-success" : badge.status === "a_finaliser" ? "badge-warning" : "badge-neutral"}`}
                  >
                    {badgeStatusLabels[badge.status] ?? badge.status}
                  </span>
                </div>
                {badge.status === "a_finaliser" && (
                  <p className="mb-3 text-xs text-amber-700">
                    Classe/programme non assigné — le badge passera automatiquement à « Actif » dès qu&apos;une
                    classe ou un programme sera assigné dans ce dossier.
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Link href={`/admin/badges/${badge.id}/print`} className="btn-secondary !min-h-0 !py-1.5 text-xs">
                    Aperçu
                  </Link>
                  <a href={`/api/badges/${badge.id}/pdf`} className="btn-secondary !min-h-0 !py-1.5 text-xs">
                    Télécharger PDF (recto/verso)
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-3 text-sm text-muted">
                  Aucun badge généré. Photo, identité, matricule, classe et année scolaire sont récupérées
                  automatiquement du dossier — aucune saisie manuelle nécessaire.
                </p>
                <GenerateBadgeButton userId={user.id} />
              </div>
            )}
          </div>

          {isStudent && (
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-foreground">Scolarité</h2>
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted">Classe / Niveau</dt>
                  <dd className="font-medium text-foreground">{user.program?.name ?? "Non assigné"}</dd>
                </div>
                <div>
                  <dt className="text-muted">Parent / tuteur</dt>
                  <dd className="font-medium text-foreground">
                    {dossier?.parent ? (
                      <Link href={`/admin/users/${dossier.parent.id}`} className="text-primary hover:underline">
                        {dossier.parent.name}
                      </Link>
                    ) : (
                      "Aucun"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Date de naissance</dt>
                  <dd className="font-medium text-foreground">{user.dob ? formatDate(user.dob) : "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted">Téléphone</dt>
                  <dd className="font-medium text-foreground">{user.phone ?? "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-muted">Adresse</dt>
                  <dd className="font-medium text-foreground">{user.address ?? "—"}</dd>
                </div>
              </dl>
            </div>
          )}

          {isParent && (
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-foreground">Enfants liés</h2>
              {dossier && dossier.children.length > 0 ? (
                <ul className="space-y-1 text-sm">
                  {dossier.children.map((c) => (
                    <li key={c.id}>
                      <Link href={`/admin/users/${c.id}`} className="text-primary hover:underline">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted">Aucun enfant lié pour le moment.</p>
              )}
            </div>
          )}

          {isStudent && dossier && (
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-foreground">Présence</h2>
              <div className="grid grid-cols-4 gap-3 text-center text-sm">
                <div>
                  <p className="text-lg font-bold text-emerald-600">{dossier.attendanceStats.present}</p>
                  <p className="text-muted">Présent</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-red-600">{dossier.attendanceStats.absent}</p>
                  <p className="text-muted">Absent</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">{dossier.attendanceStats.retard}</p>
                  <p className="text-muted">Retard</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-600">{dossier.attendanceStats.excuse}</p>
                  <p className="text-muted">Excusé</p>
                </div>
              </div>
            </div>
          )}

          {isStudent && dossier && (
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-foreground">Notes récentes</h2>
              {dossier.recentGrades.length === 0 ? (
                <p className="text-sm text-muted">Aucune note enregistrée.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {dossier.recentGrades.map((g) => (
                    <li key={g.id} className="flex items-center justify-between border-t border-border pt-2 first:border-0 first:pt-0">
                      <span className="text-foreground">{g.courseName}</span>
                      <span className="font-semibold text-foreground">
                        {g.score}/100 <span className="font-normal text-muted">· {formatDate(g.recordedAt)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {isStudent && pendingPeriods.length > 0 && (
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-foreground">Bulletins à générer</h2>
              <ul className="space-y-2 text-sm">
                {pendingPeriods.map((p) => (
                  <li key={p.semesterId} className="flex items-center justify-between border-t border-border pt-2 first:border-0 first:pt-0">
                    <span className="text-foreground">{p.periodLabel}</span>
                    {p.ready ? (
                      <GenerateOneButton studentId={user.id} programId={user.programId!} semesterId={p.semesterId} />
                    ) : (
                      <span className="text-xs text-amber-700">
                        BULLETIN EN ATTENTE - NOTES MANQUANTES{p.missing.length > 0 ? ` (${p.missing.join(", ")})` : ""}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isStudent && dossier && (
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-foreground">Bulletins publiés — historique</h2>
              {dossier.documents.length === 0 ? (
                <p className="text-sm text-muted">Aucun bulletin publié pour le moment.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {dossier.documents.map((d) => (
                    <li key={d.id} className="flex items-center justify-between border-t border-border pt-2 first:border-0 first:pt-0">
                      <span className="text-foreground">{d.periodLabel}</span>
                      <div className="flex items-center gap-2">
                        <a href={`/api/documents/${d.id}/pdf`} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                          Voir / PDF
                        </a>
                        <span className="text-xs text-muted">({formatDate(d.generatedAt)})</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {isStudent && dossier && (
            <div className="card p-5">
              <h2 className="mb-3 font-semibold text-foreground">Discipline / remarques pédagogiques</h2>
              {dossier.observations.length === 0 ? (
                <p className="text-sm text-muted">Aucune remarque enregistrée.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {dossier.observations.map((o) => (
                    <li key={o.id} className="border-t border-border pt-2 first:border-0 first:pt-0">
                      <p className="text-foreground">{o.body}</p>
                      <p className="text-xs text-muted">
                        {o.authorName} · {formatDate(o.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div>
          <EditUserForm
            userId={user.id}
            initialName={user.name}
            initialRoles={roles}
            initialProgramId={user.programId}
            initialPhotoUrl={user.photoUrl}
            initialDob={user.dob ? user.dob.toISOString().slice(0, 10) : null}
            initialPhone={user.phone}
            initialAddress={user.address}
            initialActive={user.active}
            initialParentId={user.parentId}
            parents={parentCandidates}
            programs={programs}
            isSuperAdmin={isSuperAdmin}
            isSelf={session?.userId === user.id}
          />
        </div>
      </div>
    </div>
  );
}
