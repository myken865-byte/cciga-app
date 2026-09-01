import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getProgramBySlug, getSchoolBySlug } from "@/lib/content";
import {
  computeAdmissionStatus,
  requiredAdmissionDocuments,
  type AdmissionDocumentEntry,
} from "@/lib/admission-documents";
import { admissionStatusLabels } from "@/lib/admission-status";
import { notifyAdmins } from "@/lib/notifications";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

function isValidDocumentEntry(d: unknown): d is AdmissionDocumentEntry {
  if (!d || typeof d !== "object") return false;
  const entry = d as Record<string, unknown>;
  if (typeof entry.label !== "string" || !requiredAdmissionDocuments.includes(entry.label)) return false;
  if (entry.fileUrl !== null && typeof entry.fileUrl !== "string") return false;
  if (entry.fileName !== null && typeof entry.fileName !== "string") return false;
  if (typeof entry.fileUrl === "string") {
    try {
      const parsed = new URL(entry.fileUrl);
      if (!parsed.hostname.endsWith(".blob.vercel-storage.com")) return false;
    } catch {
      return false;
    }
  }
  return true;
}

export async function POST(request: Request) {
  if (isRateLimited(`admission-submit:${getClientKey(request)}`, { max: 5, windowMs: 60_000 })) {
    return NextResponse.json(
      { error: "Trop de soumissions. Merci de patienter avant de réessayer." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const {
    school,
    programSlug,
    firstName,
    lastName,
    dob,
    email,
    phone,
    address,
    documents,
  } = body ?? {};

  if (!school || !getSchoolBySlug(school)) {
    return NextResponse.json({ error: "École invalide." }, { status: 400 });
  }
  const program = programSlug ? await getProgramBySlug(programSlug) : undefined;
  if (!program) {
    return NextResponse.json({ error: "Programme invalide." }, { status: 400 });
  }
  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json(
      { error: "Veuillez remplir tous les champs obligatoires." },
      { status: 400 },
    );
  }

  if (!Array.isArray(documents) || !documents.every(isValidDocumentEntry)) {
    return NextResponse.json({ error: "Documents invalides." }, { status: 400 });
  }
  const documentList: AdmissionDocumentEntry[] = documents;
  const reference = `CCIGA-${Date.now().toString(36).toUpperCase()}`;
  const status = computeAdmissionStatus(documentList);

  const submission = await prisma.admissionSubmission.create({
    data: {
      reference,
      school,
      programSlug,
      firstName,
      lastName,
      dob: dob ?? "",
      email,
      phone,
      address: address ?? "",
      documents: JSON.stringify(documentList),
      status,
    },
  });

  await notifyAdmins({
    type: "admission_new",
    title: "Nouvelle candidature",
    body: `${firstName} ${lastName} — ${program.name} (${admissionStatusLabels[status]})`,
  });

  return NextResponse.json({ id: submission.reference }, { status: 201 });
}
