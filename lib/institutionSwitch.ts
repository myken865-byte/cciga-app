import { type SchoolKey } from "@/lib/institutions";

/**
 * Cycle fixe et obligatoire du sélecteur rapide d'entité — jamais les trois
 * institutions présentées à choisir, un seul clic vers la suivante.
 */
const SWITCH_CYCLE: Record<SchoolKey, SchoolKey> = {
  "ecole-classique": "ecole-professionnelle",
  "ecole-professionnelle": "universite",
  universite: "ecole-classique",
};

export function nextSchoolInCycle(current: SchoolKey): SchoolKey {
  return SWITCH_CYCLE[current];
}

// Page "structure académique" — une seule exposée à la fois (jamais les
// trois), déjà appliqué par proxy.ts (SCHOOL_STRUCTURE_PAGES). Même type de
// page dans chaque institution, chemin différent : équivalence directe.
const STRUCTURE_PATHS: Record<SchoolKey, string> = {
  "ecole-classique": "/admin/ecole-classique",
  "ecole-professionnelle": "/admin/ecole-professionnelle",
  universite: "/admin/universite",
};

// Module Inscriptions du Secrétariat — chemins distincts par institution
// (voir les deux missions "fiche d'inscription"), l'Université n'a pas ce
// module. Seules la liste (racine, avec son éventuel filtre de statut) et
// "Nouvelle fiche" existent des deux côtés ; une fiche précise ou une page
// propre à une seule institution (ex. "Élèves inscrits", École Classique
// uniquement) n'ont pas d'équivalent — on retombe sur la liste de la cible.
const INSCRIPTIONS_ROOTS: Partial<Record<SchoolKey, string>> = {
  "ecole-classique": "/admin/inscriptions-ecole-classique",
  "ecole-professionnelle": "/admin/fiches-inscription",
};
const INSCRIPTIONS_MAPPABLE_SUBPATHS = ["", "/nouvelle"];

/**
 * Résout la route "équivalente" dans l'institution cible pour la page
 * actuellement affichée (item 4 de la mission) : même type de page quand
 * elle existe dans la cible, sinon le tableau de bord DU MÊME PORTAIL —
 * jamais une route cassée, jamais un retour à l'écran de connexion.
 *
 * `fallbackHref` doit être la page d'accueil déjà calculée pour le rôle de
 * la session (même valeur que `homeHref` dans AdminNav.tsx) : "/admin/dashboard"
 * n'est accessible qu'à ADMIN_LEVEL, donc jamais utilisable en dur ici — un
 * SECRETARIAT ou un CONSEILLER s'y ferait rejeter par proxy.ts et atterrirait
 * exactement sur l'écran de connexion que cette mission interdit.
 */
export function resolveEquivalentAdminPath(pathname: string, toSchool: SchoolKey, fallbackHref: string): string {
  const [path, query] = pathname.split("?");

  if (Object.values(STRUCTURE_PATHS).includes(path)) {
    return path === STRUCTURE_PATHS[toSchool] ? pathname : STRUCTURE_PATHS[toSchool];
  }

  // Centre des Bulletins — exclusif à l'École Classique.
  if (path.startsWith("/admin/ecole-classique/bulletins")) {
    return toSchool === "ecole-classique" ? pathname : fallbackHref;
  }

  for (const fromRoot of Object.values(INSCRIPTIONS_ROOTS)) {
    if (fromRoot && path.startsWith(fromRoot)) {
      const toRoot = INSCRIPTIONS_ROOTS[toSchool];
      if (!toRoot) return fallbackHref;
      const rest = path.slice(fromRoot.length);
      const subpath = INSCRIPTIONS_MAPPABLE_SUBPATHS.includes(rest) ? rest : "";
      return `${toRoot}${subpath}${subpath === "" && query ? `?${query}` : ""}`;
    }
  }

  // Le reste des pages /admin/* est partagé entre les trois institutions
  // (déjà filtré par le contexte actif côté serveur) — même route conservée.
  if (path.startsWith("/admin")) {
    return pathname;
  }

  return fallbackHref;
}
