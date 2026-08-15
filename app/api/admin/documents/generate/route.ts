import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { generateDocumentsForPeriod } from "@/lib/documents";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { programId, semesterId } = (await request.json()) ?? {};
  if (!programId || !semesterId) {
    return NextResponse.json({ error: "Programme et période requis." }, { status: 400 });
  }

  const created = await generateDocumentsForPeriod(programId, semesterId, session.userId);

  return NextResponse.json({ ok: true, created });
}
