import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notifyAdmins } from "@/lib/notifications";

export async function POST(request: Request) {
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
