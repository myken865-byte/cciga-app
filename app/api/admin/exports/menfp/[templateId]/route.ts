import { requireAdminSession } from "@/lib/auth";
import { getMenfpTemplate } from "@/lib/exports/menfpAdapter";
import { buildWorkbookBuffer, excelResponseHeaders } from "@/lib/excelExport";

export async function GET(_request: Request, { params }: { params: Promise<{ templateId: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { templateId } = await params;
  const template = getMenfpTemplate(templateId);
  if (!template) {
    return new Response(
      "Aucun gabarit officiel MENFP n'est configuré pour cet export. L'établissement doit d'abord fournir le " +
        "gabarit officiel (colonnes exactes, ordre, libellés) avant que cet export ne soit disponible.",
      { status: 501 },
    );
  }

  // Point d'extension : quand un gabarit est enregistré, les données à lui
  // passer restent à charger ici selon ses besoins propres (non définis tant
  // qu'aucun gabarit officiel n'existe — voir lib/exports/menfpAdapter.ts).
  const rows = template.buildRows(null);

  const buffer = await buildWorkbookBuffer([
    {
      name: template.label.slice(0, 31),
      columns: template.columns,
      rows,
    },
  ]);

  return new Response(new Uint8Array(buffer), {
    headers: excelResponseHeaders(`menfp-${templateId}.xlsx`),
  });
}
