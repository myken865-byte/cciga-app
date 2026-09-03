import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireAdminSession } from "@/lib/auth";

// Émet le jeton client Vercel Blob pour la photo de badge — même mécanisme
// que app/api/admin/fiches-inscription/photo/upload/route.ts. Upload direct
// depuis le navigateur (components/BadgeManager.tsx `handlePhoto`) ; l'écriture
// réelle en base (User.photoUrl) se fait ensuite via le PATCH explicite sur
// /api/admin/badges/photo, jamais de son propre chef ici.
export async function POST(request: Request): Promise<NextResponse> {
  const session = await requireAdminSession();
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
        // Rien à faire ici : BadgeManager PATCH explicitement /api/admin/badges/photo
        // juste après l'upload pour enregistrer l'URL.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
