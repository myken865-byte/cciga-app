import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { resolveBulletinAccess } from "@/lib/bulletinAccess";
import { formatCcigaId } from "@/lib/cciga-id";
import { formatDocumentReference } from "@/lib/document-reference";
import { generateVerificationQrDataUri } from "@/lib/qr";
import { academicDecisionLabels } from "@/lib/universiteGrades";
import { schoolToSector } from "@/lib/branding";
import { getDocumentLogoDataUri } from "@/lib/pdf/logo";
import BulletinDocument from "@/lib/pdf/BulletinDocument";
import ReleveDocument from "@/lib/pdf/ReleveDocument";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();

  const doc = await prisma.academicDocument.findUnique({
    where: { id },
    include: { student: true, program: true, semester: { include: { academicYear: true } } },
  });
  if (!doc) {
    return new Response("Document introuvable.", { status: 404 });
  }

  const { targetId } = await resolveBulletinAccess(session, doc.studentId);
  if (targetId !== doc.studentId) {
    return new Response("Non autorisé.", { status: 403 });
  }

  const snapshot = JSON.parse(doc.snapshotData) as {
    courseFinals: { courseId: string; courseName: string; finalGrade: number | null; weight: number }[];
    average: number | null;
    decision: keyof typeof academicDecisionLabels;
    rank: number | null;
    rankingEnabled: boolean;
    absences: number;
    retards: number;
    appreciation: string | null;
    conduct: string | null;
    periodLabel: string;
  };

  const reference = formatDocumentReference(doc.id, doc.type as "bulletin_periode" | "releve_semestre");
  const publishedLabel = doc.publishedAt
    ? `Publié le ${doc.publishedAt.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}`
    : "";
  const origin = new URL(request.url).origin;
  const qrDataUri = await generateVerificationQrDataUri(`${origin}/verify/${doc.id}`);
  const logoBase64 = getDocumentLogoDataUri(schoolToSector(doc.program.school));

  let buffer: Buffer;
  if (doc.type === "releve_semestre") {
    const courses = await prisma.course.findMany({
      where: { id: { in: snapshot.courseFinals.map((c) => c.courseId) } },
      select: { id: true, retakeOfCourseId: true },
    });
    const retakeIds = new Set(courses.filter((c) => c.retakeOfCourseId).map((c) => c.id));

    buffer = await renderToBuffer(
      ReleveDocument({
        logoBase64,
        studentName: doc.student.name,
        ccigaId: formatCcigaId(doc.student.id),
        programName: doc.program.name,
        periodLabel: snapshot.periodLabel,
        courseFinals: snapshot.courseFinals.map((c) => ({
          courseName: c.courseName,
          weight: c.weight,
          finalGrade: c.finalGrade,
          retake: retakeIds.has(c.courseId),
        })),
        average: snapshot.average,
        decisionLabel: academicDecisionLabels[snapshot.decision],
        rank: snapshot.rank,
        rankingEnabled: snapshot.rankingEnabled,
        isDraft: false,
        reference,
        publishedLabel,
        qrDataUri,
      }),
    );
  } else {
    buffer = await renderToBuffer(
      BulletinDocument({
        logoBase64,
        studentName: doc.student.name,
        ccigaId: formatCcigaId(doc.student.id),
        programName: doc.program.name,
        periodLabel: snapshot.periodLabel,
        courseFinals: snapshot.courseFinals.map((c) => ({
          courseName: c.courseName,
          weight: c.weight,
          finalGrade: c.finalGrade,
        })),
        average: snapshot.average,
        decisionLabel: academicDecisionLabels[snapshot.decision],
        rank: snapshot.rank,
        rankingEnabled: snapshot.rankingEnabled,
        absences: snapshot.absences,
        retards: snapshot.retards,
        appreciation: snapshot.appreciation,
        conduct: snapshot.conduct,
        isDraft: false,
        reference,
        publishedLabel,
        qrDataUri,
      }),
    );
  }

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${reference}.pdf"`,
    },
  });
}
