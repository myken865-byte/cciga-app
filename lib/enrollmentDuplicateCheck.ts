import { prisma } from "@/lib/db";
import { parseRoles, hasRole } from "@/lib/roles";
import { formatCcigaId } from "@/lib/cciga-id";

/**
 * Mission "Inscription unifiée — Phase 1" (2026-09-12), §8/§23 — contrôle
 * anti-doublon AVANT création d'une candidature ou d'une fiche. Documente
 * l'existant sans jamais bloquer automatiquement sur un simple nom identique
 * (mandat explicite) : seul un signal fort (email, téléphone, ou
 * nom+prénom+date de naissance identiques) est classé MATCH_FORT ; un nom
 * seul reste MATCH_POSSIBLE, jamais bloquant côté serveur — c'est à l'agent/
 * au candidat de décider, l'API se contente d'avertir.
 */

export type DuplicateMatchKind = "user" | "admission" | "enrollment" | "classic";

export interface DuplicateMatch {
  kind: DuplicateMatchKind;
  id: string;
  label: string;
  detail: string;
  href: string;
}

export interface DuplicateCheckInput {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  /** Chaîne libre (formats hétérogènes selon le modèle source) — comparée telle quelle, jamais reformatée. */
  dob?: string | null;
}

export interface DuplicateCheckResult {
  strongMatches: DuplicateMatch[];
  possibleMatches: DuplicateMatch[];
}

function norm(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

export async function checkEnrollmentDuplicates(input: DuplicateCheckInput): Promise<DuplicateCheckResult> {
  const email = norm(input.email);
  const phone = norm(input.phone);
  const firstName = norm(input.firstName);
  const lastName = norm(input.lastName);
  const dob = norm(input.dob);
  const hasName = Boolean(firstName && lastName);

  const strongMatches: DuplicateMatch[] = [];
  const possibleMatches: DuplicateMatch[] = [];

  // Rien à vérifier sans au moins un identifiant exploitable.
  if (!email && !phone && !hasName) {
    return { strongMatches, possibleMatches };
  }

  // `User` a un champ `name` unique (nom complet) ; les trois autres modèles
  // ont `firstName`/`lastName` séparés — deux formes de filtre "nom"
  // distinctes, jamais interchangeables (chacune typée pour son propre modèle).
  const userNameOr = hasName
    ? [{ AND: [{ name: { contains: input.firstName ?? "" } }, { name: { contains: input.lastName ?? "" } }] }]
    : [];
  const splitNameOr = hasName
    ? [{ AND: [{ firstName: { contains: input.firstName ?? "" } }, { lastName: { contains: input.lastName ?? "" } }] }]
    : [];

  const [users, admissions, enrollmentForms, classicForms] = await Promise.all([
    (email || phone || hasName)
      ? prisma.user.findMany({
          where: {
            OR: [
              ...(email ? [{ email: { equals: input.email ?? "" } }] : []),
              ...(phone ? [{ phone: { equals: input.phone ?? "" } }] : []),
              ...userNameOr,
            ],
          },
          take: 10,
        })
      : Promise.resolve([]),
    (email || phone || hasName)
      ? prisma.admissionSubmission.findMany({
          where: {
            OR: [
              ...(email ? [{ email: { equals: input.email ?? "" } }] : []),
              ...(phone ? [{ phone: { equals: input.phone ?? "" } }] : []),
              ...splitNameOr,
            ],
          },
          take: 10,
        })
      : Promise.resolve([]),
    (email || phone || hasName)
      ? prisma.enrollmentForm.findMany({
          where: {
            OR: [
              ...(email ? [{ email: { equals: input.email ?? "" } }] : []),
              ...(phone ? [{ phone: { equals: input.phone ?? "" } }] : []),
              ...splitNameOr,
            ],
          },
          take: 10,
        })
      : Promise.resolve([]),
    hasName
      ? prisma.classicEnrollmentForm.findMany({
          where: { OR: splitNameOr },
          take: 10,
        })
      : Promise.resolve([]),
  ]);

  for (const u of users) {
    if (!hasRole(parseRoles(u.roles), "STUDENT")) continue;
    const emailMatch = email && norm(u.email) === email;
    const phoneMatch = phone && norm(u.phone) === phone;
    const dobMatch = dob && u.dob && norm(u.dob.toISOString().slice(0, 10)) === dob;
    const nameMatch = hasName && norm(u.name).includes(firstName) && norm(u.name).includes(lastName);
    const match: DuplicateMatch = {
      kind: "user",
      id: String(u.id),
      label: u.name,
      detail: `Compte élève existant — ${formatCcigaId(u.id)}${u.email ? ` — ${u.email}` : ""}`,
      href: `/admin/recherche?q=${encodeURIComponent(u.email)}`,
    };
    if (emailMatch || phoneMatch || (nameMatch && dobMatch)) strongMatches.push(match);
    else if (nameMatch) possibleMatches.push(match);
  }

  for (const a of admissions) {
    const emailMatch = email && norm(a.email) === email;
    const phoneMatch = phone && norm(a.phone) === phone;
    const dobMatch = dob && norm(a.dob) === dob;
    const nameMatch = hasName && norm(a.lastName) === lastName && norm(a.firstName) === firstName;
    const match: DuplicateMatch = {
      kind: "admission",
      id: a.id,
      label: `${a.firstName} ${a.lastName}`,
      detail: `Candidature en ligne ${a.reference} — statut ${a.status}`,
      href: `/admin/admissions/${a.id}`,
    };
    if (emailMatch || phoneMatch || (nameMatch && dobMatch)) strongMatches.push(match);
    else if (nameMatch) possibleMatches.push(match);
  }

  for (const f of enrollmentForms) {
    const emailMatch = email && norm(f.email) === email;
    const phoneMatch = phone && norm(f.phone) === phone;
    const nameMatch = hasName && norm(f.lastName) === lastName && norm(f.firstName) === firstName;
    const match: DuplicateMatch = {
      kind: "enrollment",
      id: f.id,
      label: `${f.firstName} ${f.lastName}`,
      detail: `Fiche d'inscription présentielle (${f.school}) — statut ${f.status}`,
      href: `/admin/fiches-inscription/${f.id}`,
    };
    // EnrollmentForm n'a pas de champ dob discret (birthDateAndPlace est un
    // texte libre combiné) — jamais comparé ici, corrélation email/téléphone
    // uniquement pour un MATCH_FORT sur ce modèle.
    if (emailMatch || phoneMatch) strongMatches.push(match);
    else if (nameMatch) possibleMatches.push(match);
  }

  for (const f of classicForms) {
    const nameMatch = hasName && norm(f.lastName) === lastName && norm(f.firstName) === firstName;
    const dobMatch = dob && norm(f.birthDate) === dob;
    const match: DuplicateMatch = {
      kind: "classic",
      id: f.id,
      label: `${f.firstName} ${f.lastName}`,
      detail: `Fiche d'inscription présentielle (École Classique) — statut ${f.status}`,
      href: `/admin/inscriptions-ecole-classique/${f.id}`,
    };
    if (nameMatch && dobMatch) strongMatches.push(match);
    else if (nameMatch) possibleMatches.push(match);
  }

  return { strongMatches, possibleMatches };
}
