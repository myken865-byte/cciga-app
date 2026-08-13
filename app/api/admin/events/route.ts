import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || "evenement";
  let n = 2;
  while (await prisma.event.findUnique({ where: { slug } })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { title, date, location, description } = (await request.json()) ?? {};

  if (!title || !date || !location || !description) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  const slug = await uniqueSlug(slugify(title));

  const event = await prisma.event.create({
    data: { slug, title, date: new Date(date), location, description },
  });

  return NextResponse.json({ slug: event.slug }, { status: 201 });
}
