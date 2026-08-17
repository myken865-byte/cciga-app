import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSecretariatSession } from "@/lib/auth";
import type { AdmissionDocumentEntry } from "@/lib/admission-documents";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; index: string }> },
) {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id, index } = await params;
  const submission = await prisma.admissionSubmission.findUnique({ where: { id } });
  if (!submission) {
    return NextResponse.json({ error: "Candidature introuvable." }, { status: 404 });
  }

  const documents: AdmissionDocumentEntry[] = JSON.parse(submission.documents || "[]");
  const doc = documents[Number(index)];
  if (!doc || !doc.fileUrl) {
    return NextResponse.json({ error: "Document introuvable." }, { status: 404 });
  }

  const blob = await get(doc.fileUrl, { access: "private" });
  if (!blob || blob.statusCode !== 200) {
    return NextResponse.json({ error: "Document introuvable dans le stockage." }, { status: 404 });
  }

  return new Response(blob.stream, {
    headers: {
      "Content-Type": blob.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${doc.fileName ?? "document"}"`,
    },
  });
}
