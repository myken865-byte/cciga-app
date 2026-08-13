import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getProgramBySlug, getSchoolBySlug } from "@/lib/content";
import { computeAdmissionStatus } from "@/lib/admission-documents";
import { admissionStatusLabels } from "@/lib/admission-status";
import { notifyAdmins } from "@/lib/notifications";

export async function POST(request: Request) {
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

  const documentList: string[] = Array.isArray(documents) ? documents : [];
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
