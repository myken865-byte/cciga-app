import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireSecretariatSession } from "@/lib/auth";

// Même schéma que photo/upload/route.ts, pour les pièces justificatives
// (extrait de naissance, photos d'identité, CIN — voir
// lib/enrollmentFormDocuments.ts) téléversées depuis
// components/EnrollmentFormEditor.tsx `handleDocUpload`. PDF, JPG ou PNG.
export async function POST(request: Request): Promise<NextResponse> {
  const session = await requireSecretariatSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["application/pdf", "image/jpeg", "image/png"],
        maximumSizeInBytes: 8 * 1024 * 1024,
        addRandomSuffix: false,
      }),
      onUploadCompleted: async () => {
        // Rien à faire ici : l'éditeur enregistre lui-même le document
        // (URL, nom, statut "fourni") via PATCH sur [id] juste après l'upload.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
