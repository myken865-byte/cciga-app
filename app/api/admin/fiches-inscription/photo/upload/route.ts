import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireSecretariatSession } from "@/lib/auth";

// Émet le jeton client Vercel Blob pour la photo de la fiche d'inscription
// (upload direct depuis le navigateur — voir components/EnrollmentFormEditor.tsx
// `handlePhoto`, qui appelle `upload(..., { handleUploadUrl: "/api/admin/fiches-inscription/photo/upload" })`).
// L'écriture réelle en base (EnrollmentForm.photoUrl) se fait ensuite via le
// PATCH explicite du composant sur [id]/photo — cette route ne fait qu'autoriser
// l'upload, jamais de son propre chef.
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
        allowedContentTypes: ["image/jpeg", "image/png"],
        maximumSizeInBytes: 4 * 1024 * 1024,
        addRandomSuffix: false,
      }),
      onUploadCompleted: async () => {
        // Rien à faire ici : l'éditeur PATCH explicitement [id]/photo juste
        // après l'upload pour enregistrer l'URL sur la fiche.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
