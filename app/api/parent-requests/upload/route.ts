import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/lib/auth";
import { hasAnyRole } from "@/lib/roles";

// Émet le jeton client Vercel Blob pour la pièce jointe d'une demande parent
// (upload direct depuis le navigateur — voir components/ParentRequestForm.tsx
// `handleFile`, qui appelle `upload(..., { handleUploadUrl: "/api/parent-requests/upload" })`).
// Même schéma que app/api/admin/fiches-inscription/documents/upload/route.ts,
// mais réservé au rôle PARENT. L'URL retournée est envoyée telle quelle dans
// le POST /api/parent-requests qui suit — cette route ne touche pas la base.
export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();
  if (!session || !hasAnyRole(session.roles, ["PARENT"])) {
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
        // Rien à faire ici : le formulaire envoie l'URL retournée directement
        // dans le corps du POST /api/parent-requests juste après l'upload.
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
