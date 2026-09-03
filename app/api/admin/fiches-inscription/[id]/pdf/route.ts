import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import { formatEnrollmentFormReference } from "@/lib/enrollmentFormReference";
import { parseEnrollmentFormDocuments } from "@/lib/enrollmentFormDocuments";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import FicheInscriptionDocument from "@/lib/pdf/FicheInscriptionDocument";

export const runtime = "nodejs";

async function toDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:${contentType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireSecretariatSession();
  if (!session) {
    return new Response("Non autorisé.", { status: 401 });
  }

  const { id } = await params;
  const form = await prisma.enrollmentForm.findUnique({ where: { id }, include: { program: true } });
  if (!form) {
    return new Response("Fiche introuvable.", { status: 404 });
  }

  const reference = formatEnrollmentFormReference(form.id);
  const documents = parseEnrollmentFormDocuments(form.documents);
  const photoBase64 = form.photoUrl ? await toDataUri(form.photoUrl) : null;
  // EPS = École Professionnelle : seul logo institutionnel disponible pour
  // ce secteur (voir lib/branding.ts) — pas de second logo EPS distinct sous
  // public/branding/, donc epsLogoBase64 reste null plutôt qu'inventé.
  const logoBase64 = getDocumentLogoDataUri("PROFESSIONNELLE");
  const generatedLabel = `Généré le ${new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}`;
  const declarationDateLabel = form.declarationDate
    ? form.declarationDate.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
    : "";

  const buffer = await renderToBuffer(
    FicheInscriptionDocument({
      logoBase64,
      epsLogoBase64: null,
      ficheNumber: reference,
      formationLabel: form.program?.name ?? "",
      photoBase64,
      lastName: form.lastName,
      firstName: form.firstName,
      birthDateAndPlace: form.birthDateAndPlace ?? "",
      sex: form.sex ?? "",
      fatherName: form.fatherName ?? "",
      motherName: form.motherName ?? "",
      familyStatus: form.familyStatus ?? "",
      cin: form.cin ?? "",
      cinIssuedDate: form.cinIssuedDate ?? "",
      cinIssuedPlace: form.cinIssuedPlace ?? "",
      address: form.address ?? "",
      phone: form.phone ?? "",
      email: form.email ?? "",
      emergencyContactName: form.emergencyContactName ?? "",
      emergencyContactEmail: form.emergencyContactEmail ?? "",
      emergencyContactPhone: form.emergencyContactPhone ?? "",
      documents: documents.map((d) => ({ label: d.label, status: d.status })),
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      declarationAccepted: form.declarationAccepted,
      declarationDateLabel,
      option: form.program?.name ?? "",
      inscriptionInfo: form.inscriptionInfo ?? "",
      duration: form.program?.duration ?? "",
      uniformInfo: form.uniformInfo ?? "",
      versement1: form.versement1 ?? "",
      versement2: form.versement2 ?? "",
      versement3: form.versement3 ?? "",
      generatedLabel,
    }),
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reference}.pdf"`,
    },
  });
}
