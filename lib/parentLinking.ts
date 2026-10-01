import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { hasRole, parseRoles } from "@/lib/roles";
import { createNotification } from "@/lib/notifications";
import { formatCcigaId } from "@/lib/cciga-id";

/**
 * Mission "Portail Parent — Phase P1" (2026-09-13), objectif A —
 * rattacher un deuxième enfant à un compte Parent déjà existant. Le schéma
 * supporte déjà plusieurs enfants par parent (`User.parentId` sur
 * l'ÉLÈVE, relation `ParentChildren`) — confirmé lors de l'audit —, mais
 * aucune route ne permettait de RÉUTILISER un parent déjà créé pour un
 * second enfant : la seule route existante (app/api/admin/users/route.ts)
 * crée toujours un nouveau `User`, et son propre garde-fou anti-doublon
 * email refuse la création si le parent existe déjà. Ce fichier n'invente
 * aucune nouvelle logique de correspondance — il applique le même principe
 * déjà établi ailleurs (email d'abord, téléphone ensuite, jamais le nom
 * seul) pour retrouver un compte PARENT réel plutôt qu'un nouveau.
 */
export interface ParentMatch {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

export type ParentLookupResult =
  | { kind: "none" }
  | { kind: "single"; parent: ParentMatch }
  | { kind: "ambiguous"; parents: ParentMatch[] };

/**
 * Cherche un compte PARENT déjà existant par email (identifiant le plus
 * fiable) puis par téléphone à défaut — jamais par nom seul (même
 * convention que checkEnrollmentDuplicates). Retourne "ambiguous" si
 * plusieurs comptes PARENT partagent le même téléphone (peut arriver, un
 * numéro de foyer partagé) : le Secrétariat doit alors choisir
 * explicitement, jamais un rattachement automatique silencieux.
 */
export async function findExistingParent(identifier: {
  email?: string | null;
  phone?: string | null;
}): Promise<ParentLookupResult> {
  const email = identifier.email?.trim() || null;
  const phone = identifier.phone?.trim() || null;

  if (email) {
    const byEmail = await prisma.user.findUnique({ where: { email } });
    if (byEmail && hasRole(parseRoles(byEmail.roles), "PARENT")) {
      return { kind: "single", parent: { id: byEmail.id, name: byEmail.name, email: byEmail.email, phone: byEmail.phone } };
    }
  }

  if (phone) {
    const byPhone = await prisma.user.findMany({ where: { phone } });
    const parents = byPhone.filter((u) => hasRole(parseRoles(u.roles), "PARENT"));
    if (parents.length === 1) {
      const p = parents[0];
      return { kind: "single", parent: { id: p.id, name: p.name, email: p.email, phone: p.phone } };
    }
    if (parents.length > 1) {
      return {
        kind: "ambiguous",
        parents: parents.map((p) => ({ id: p.id, name: p.name, email: p.email, phone: p.phone })),
      };
    }
  }

  return { kind: "none" };
}

export interface LinkChildResult {
  ok: boolean;
  error?: string;
}

/**
 * Rattache un enfant réel à un compte PARENT réel déjà existant — jamais un
 * deuxième compte créé. Réutilise exactement les mêmes gardes que la
 * création initiale (app/api/admin/users/route.ts) : l'enfant doit être un
 * vrai STUDENT, pas déjà lié à un autre parent ; le compte cible doit être
 * un vrai PARENT.
 */
export async function linkChildToExistingParent(parentId: number, childId: number): Promise<LinkChildResult> {
  const [parent, child] = await Promise.all([
    prisma.user.findUnique({ where: { id: parentId } }),
    prisma.user.findUnique({ where: { id: childId } }),
  ]);

  if (!parent || !hasRole(parseRoles(parent.roles), "PARENT")) {
    return { ok: false, error: "Compte parent invalide." };
  }
  if (!child || !hasRole(parseRoles(child.roles), "STUDENT")) {
    return { ok: false, error: "Étudiant invalide." };
  }
  if (child.parentId) {
    return { ok: false, error: "Cet étudiant est déjà lié à un compte parent." };
  }

  await prisma.user.update({ where: { id: childId }, data: { parentId } });
  return { ok: true };
}

export type AutoParentOutcome =
  | { status: "skipped_already_linked" }
  | { status: "skipped_no_contact" }
  | { status: "skipped_ambiguous"; parents: ParentMatch[] }
  | { status: "linked_existing"; parentId: number }
  | { status: "created_new"; parentId: number; temporaryPassword: string };

/**
 * Mission "Portail Parent multi-institutions" (2026-09-13), §4/§5 —
 * création/liaison AUTOMATIQUE du compte Parent, déclenchée par la même
 * action Secrétariat authentifiée qui crée déjà le compte élève (jamais un
 * déclencheur sans acteur humain identifié — §21 : le mot de passe
 * provisoire reste remis au Secrétariat qui a fait l'appel, exactement
 * comme pour la création d'un compte élève ; aucun envoi d'email n'existe
 * dans ce projet, et n'est donc jamais inventé ici).
 *
 * Portée volontairement limitée à un SEUL contact non ambigu par fiche
 * (`contactEmail`/`contactName` déjà résolus par l'appelant) — voir §20 :
 * quand plusieurs responsables valides existent sans règle de priorité
 * établie (cas de ClassicEnrollmentForm : père/mère/tuteur ont chacun leur
 * propre email, aucun champ n'indique lequel est principal), cette
 * fonction n'est délibérément PAS appelée — décision documentée dans le
 * rapport de mission, pas devinée ici.
 */
export async function autoLinkOrCreateParent(input: {
  childId: number;
  contactEmail: string | null;
  contactName: string | null;
}): Promise<AutoParentOutcome> {
  const child = await prisma.user.findUnique({ where: { id: input.childId } });
  if (!child) return { status: "skipped_no_contact" };
  if (child.parentId) return { status: "skipped_already_linked" };

  const email = input.contactEmail?.trim() || null;
  if (!email) return { status: "skipped_no_contact" };

  const lookup = await findExistingParent({ email });
  if (lookup.kind === "ambiguous") return { status: "skipped_ambiguous", parents: lookup.parents };

  if (lookup.kind === "single") {
    const result = await linkChildToExistingParent(lookup.parent.id, input.childId);
    if (!result.ok) return { status: "skipped_already_linked" };
    await createNotification(lookup.parent.id, {
      type: "child_linked",
      title: "Nouvel enfant rattaché à votre compte",
      body: `${child.name} est maintenant relié à votre compte CCIGA.`,
    });
    return { status: "linked_existing", parentId: lookup.parent.id };
  }

  // kind === "none" — pas de nom réel de contact : jamais un compte créé
  // avec un nom inventé, on laisse le rattachement manuel (LinkParentForm)
  // au Secrétariat plutôt que de deviner.
  const name = input.contactName?.trim();
  if (!name) return { status: "skipped_no_contact" };

  const temporaryPassword = randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(temporaryPassword, 10);
  const parent = await prisma.user.create({
    data: { name, email, passwordHash, roles: JSON.stringify(["PARENT"]) },
  });
  await prisma.user.update({ where: { id: input.childId }, data: { parentId: parent.id } });
  await createNotification(parent.id, {
    type: "welcome",
    title: "Bienvenue sur CCIGA",
    body: `Votre compte CCIGA ID ${formatCcigaId(parent.id)} est actif — vous pouvez suivre ${child.name} depuis le Portail Parent.`,
  });

  return { status: "created_new", parentId: parent.id, temporaryPassword };
}
