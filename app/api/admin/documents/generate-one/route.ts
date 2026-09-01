import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { generateDocumentForStudent } from "@/lib/documents";

/**
 * Génération individuelle depuis le dossier élève (Prompt Maître "Module
 * Carnet/Bulletins", point 7) — même moteur que la génération par classe
 * (lib/documents.ts), jamais dupliqué.
 */
export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { studentId, programId, semesterId } = (await request.json().catch(() => null)) ?? {};
  if (!studentId || !programId || !semesterId) {
    return NextResponse.json({ error: "Élève, programme et période requis." }, { status: 400 });
  }

  const result = await generateDocumentForStudent(Number(studentId), programId, semesterId, session.userId);
  if (!result.created) {
    return NextResponse.json({ error: result.reason ?? "Bulletin non généré." }, { status: 400 });
  }

  return NextResponse.json({ id: result.documentId }, { status: 201 });
}
