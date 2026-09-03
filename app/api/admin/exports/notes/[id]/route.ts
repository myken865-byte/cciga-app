import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { formatCcigaId } from "@/lib/cciga-id";
import { buildWorkbookBuffer, excelResponseHeaders } from "@/lib/excelExport";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      grades: { include: { student: true }, orderBy: { recordedAt: "desc" } },
    },
  });
  if (!course) {
    return new Response("Cours introuvable.", { status: 404 });
  }

  const rows = course.grades.map((g) => ({
    ccigaId: formatCcigaId(g.studentId),
    eleve: g.student.name,
    note: g.score,
    statut: g.status ?? "—",
    commentaire: g.comment ?? "",
    dateEnregistrement: g.recordedAt.toLocaleDateString("fr-FR"),
  }));

  const buffer = await buildWorkbookBuffer([
    {
      name: "Notes",
      columns: [
        { header: "CCIGA ID", key: "ccigaId", width: 18 },
        { header: "Élève", key: "eleve", width: 28 },
        { header: "Note", key: "note", width: 10 },
        { header: "Statut", key: "statut", width: 16 },
        { header: "Commentaire", key: "commentaire", width: 30 },
        { header: "Enregistré le", key: "dateEnregistrement", width: 16 },
      ],
      rows,
    },
  ]);

  return new Response(new Uint8Array(buffer), {
    headers: excelResponseHeaders(`notes-${course.name.replace(/[^\w-]+/g, "_")}.xlsx`),
  });
}
