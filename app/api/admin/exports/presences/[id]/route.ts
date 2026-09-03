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
      attendances: { include: { student: true }, orderBy: { date: "desc" } },
    },
  });
  if (!course) {
    return new Response("Cours introuvable.", { status: 404 });
  }

  const rows = course.attendances.map((a) => ({
    ccigaId: formatCcigaId(a.studentId),
    eleve: a.student.name,
    date: a.date.toLocaleDateString("fr-FR"),
    statut: a.status,
  }));

  const buffer = await buildWorkbookBuffer([
    {
      name: "Présences",
      columns: [
        { header: "CCIGA ID", key: "ccigaId", width: 18 },
        { header: "Élève", key: "eleve", width: 28 },
        { header: "Date", key: "date", width: 14 },
        { header: "Statut", key: "statut", width: 16 },
      ],
      rows,
    },
  ]);

  return new Response(new Uint8Array(buffer), {
    headers: excelResponseHeaders(`presences-${course.name.replace(/[^\w-]+/g, "_")}.xlsx`),
  });
}
