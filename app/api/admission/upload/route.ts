import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

export async function POST(request: Request): Promise<NextResponse> {
  if (isRateLimited(`admission-upload:${getClientKey(request)}`, { max: 20, windowMs: 60_000 })) {
    return NextResponse.json(
      { error: "Trop de fichiers envoyés. Merci de patienter une minute avant de réessayer." },
      { status: 429 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("admission-documents/")) {
          throw new Error("Chemin de destination invalide.");
        }
        return {
          allowedContentTypes: ["application/pdf", "image/jpeg", "image/png"],
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("Admission document upload failed:", err);
    return NextResponse.json({ error: "Échec du téléversement." }, { status: 400 });
  }
}
