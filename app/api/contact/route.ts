import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notifyAdmins } from "@/lib/notifications";
import { isRateLimited, getClientKey } from "@/lib/rateLimit";

export async function POST(request: Request) {
  // Public, unauthenticated form — same abuse-protection pattern as
  // /api/admission and /api/login, previously missing here.
  if (isRateLimited(`contact:${getClientKey(request)}`, { max: 5, windowMs: 60_000 })) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Merci de patienter une minute avant de réessayer." },
      { status: 429 },
    );
  }

  const { name, email, subject, body } = (await request.json()) ?? {};

  if (!name || !email || !subject || !body) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: { name, email, subject, body },
  });

  await notifyAdmins({
    type: "contact_message",
    title: "Nouveau message de contact",
    body: `${name} — ${subject}`,
  });

  return NextResponse.json({ id: message.id }, { status: 201 });
}
