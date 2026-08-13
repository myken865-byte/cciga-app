import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { getSchools } from "@/lib/content";
import { slugify } from "@/lib/slugify";

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || "programme";
  let n = 2;
  while (await prisma.program.findUnique({ where: { slug } })) {
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

  const { school, faculty, name, level, duration, description, tuitionFee, admissionConditions } =
    (await request.json()) ?? {};

  if (!school || !getSchools().some((s) => s.slug === school)) {
    return NextResponse.json({ error: "École invalide." }, { status: 400 });
  }
  if (!name || !faculty || !level || !duration || !description) {
    return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
  }

  const conditions: string[] = Array.isArray(admissionConditions)
    ? admissionConditions.filter((c) => typeof c === "string" && c.trim().length > 0)
    : [];

  const slug = await uniqueSlug(slugify(name));

  const program = await prisma.program.create({
    data: {
      slug,
      school,
      faculty,
      name,
      level,
      duration,
      description,
      tuitionFee: Number.isFinite(Number(tuitionFee)) ? Math.max(0, Math.round(Number(tuitionFee))) : 0,
      admissionConditions: JSON.stringify(conditions),
    },
  });

  return NextResponse.json({ slug: program.slug }, { status: 201 });
}
