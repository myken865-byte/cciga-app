import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ObservationsPanel from "@/components/ObservationsPanel";
import ParentMessageThread from "@/components/ParentMessageThread";

export const dynamic = "force-dynamic";

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

export default async function TitulaireClassePage({
  params,
}: {
  params: Promise<{ programId: string }>;
}) {
  const { programId } = await params;
  const session = await getSession();
  if (!session) notFound();

  const program = await prisma.program.findUnique({
    where: { id: programId },
    include: { students: { orderBy: { name: "asc" } } },
  });

  if (!program || program.titulaireId !== session.userId) {
    notFound();
  }

  const studentIds = program.students.map((s) => s.id);

  const [observations, messages] = await Promise.all([
    prisma.observation.findMany({
      where: { studentId: { in: studentIds } },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.parentMessage.findMany({
      where: { studentId: { in: studentIds } },
      include: { sender: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const observationsByStudent = new Map<number, typeof observations>();
  for (const o of observations) {
    const list = observationsByStudent.get(o.studentId) ?? [];
    list.push(o);
    observationsByStudent.set(o.studentId, list);
  }

  const messagesByStudent = new Map<number, typeof messages>();
  for (const m of messages) {
    const list = messagesByStudent.get(m.studentId) ?? [];
    list.push(m);
    messagesByStudent.set(m.studentId, list);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <Link href="/portail/enseignant" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Mon portail
      </Link>
      <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-accent">Ma classe</p>
      <h1 className="mb-8 text-2xl font-bold text-foreground">{program.name}</h1>

      {program.students.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-muted">
          Aucun élève inscrit dans cette classe pour le moment.
        </p>
      ) : (
        <div className="space-y-8">
          {program.students.map((student) => (
            <div key={student.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">{student.name}</h2>
                <Link
                  href={`/portail/bulletin?student=${student.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  Voir le bulletin →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ObservationsPanel
                  studentId={student.id}
                  canAdd
                  observations={(observationsByStudent.get(student.id) ?? []).map((o) => ({
                    id: o.id,
                    body: o.body,
                    authorName: o.author.name,
                    createdAt: formatDate(o.createdAt),
                  }))}
                />
                <ParentMessageThread
                  studentId={student.id}
                  canSend={Boolean(student.parentId)}
                  disabledReason={
                    student.parentId
                      ? undefined
                      : "Aucun parent n'est encore lié à ce compte élève — impossible d'envoyer un message."
                  }
                  messages={(messagesByStudent.get(student.id) ?? []).map((m) => ({
                    id: m.id,
                    body: m.body,
                    senderName: m.sender.name,
                    isSelf: m.senderId === session.userId,
                    createdAt: formatDate(m.createdAt),
                  }))}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
