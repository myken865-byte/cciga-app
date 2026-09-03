import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";
import { schoolLabels, isSchoolKey } from "@/lib/institutions";
import { buildWorkbookBuffer, excelResponseHeaders } from "@/lib/excelExport";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const users = await prisma.user.findMany({
    include: { program: true },
    orderBy: { name: "asc" },
  });
  const students = users.filter((u) => hasRole(parseRoles(u.roles), "STUDENT"));

  const rows = students.map((s) => ({
    ccigaId: formatCcigaId(s.id),
    nom: s.name,
    email: s.email,
    programme: s.program?.name ?? "—",
    ecole: isSchoolKey(s.program?.school) ? schoolLabels[s.program!.school] : (s.program?.school ?? "—"),
    actif: s.active ? "Oui" : "Non",
  }));

  const buffer = await buildWorkbookBuffer([
    {
      name: "Élèves",
      columns: [
        { header: "CCIGA ID", key: "ccigaId", width: 18 },
        { header: "Nom", key: "nom", width: 28 },
        { header: "Email", key: "email", width: 28 },
        { header: "Programme", key: "programme", width: 24 },
        { header: "École", key: "ecole", width: 20 },
        { header: "Actif", key: "actif", width: 10 },
      ],
      rows,
    },
  ]);

  return new Response(new Uint8Array(buffer), {
    headers: excelResponseHeaders("eleves.xlsx"),
  });
}
