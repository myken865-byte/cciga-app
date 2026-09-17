import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, relative, dirname } from "path";

/**
 * Mission "Résoudre le problème des boutons Retour — architecture
 * centralisée" (2026-09-12) — mécanisme de test permanent réclamé par le
 * mandat (§11) : ce test échoue si une nouvelle page interne (sous
 * app/admin/** ou app/portail/**) est ajoutée sans BackButton (ni
 * directement, ni via un composant enfant importé qui le rend lui-même) et
 * qu'elle n'est pas explicitement listée comme page racine. Empêche la
 * régression de revenir en silence, comme lors des audits précédents.
 */

const ROOT_DIR = process.cwd();
// Mission "Récupération incident + reconstruction 8 portails" (2026-09-15) :
// app/(site)/portail/** ajouté au scan. Seuls Parent et Étudiant ont été
// migrés hors du groupe de routes (site) lors de la reconstruction (leur
// ancienne version simple sous (site) a été retirée pour éviter un conflit
// de route) ; les 6 autres portails (enseignant, responsable, rectorat,
// decanat, coordination, logistique) restent — intacts, jamais déplacés —
// sous app/(site)/portail, seul emplacement où ils ont toujours vécu.
const SCAN_ROOTS = ["app/admin", "app/portail", "app/(site)/portail"];

/**
 * Pages racines de portail — atteintes directement depuis la connexion/le
 * sélecteur de rôle, sans page parente logique au-dessus. Toute NOUVELLE
 * racine doit être ajoutée ici explicitement (jamais silencieusement
 * exemptée par un motif générique).
 */
const ROOT_PAGES = new Set([
  "app/admin/page.tsx", // redirect pur vers /admin/dashboard, aucun rendu
  "app/admin/centre-de-commandement/page.tsx",
  "app/admin/dashboard/page.tsx",
  "app/admin/institution/page.tsx",
  "app/portail/etudiant/page.tsx",
  "app/portail/parent/page.tsx",
  "app/(site)/portail/enseignant/page.tsx",
  "app/(site)/portail/responsable/page.tsx",
  "app/(site)/portail/rectorat/page.tsx",
  "app/(site)/portail/decanat/page.tsx",
  "app/(site)/portail/coordination/page.tsx",
  "app/(site)/portail/logistique/page.tsx",
  // Pages utilitaires publiques/partagées, jamais nichées sous un seul
  // portail parent logique (découvertes lors de l'extension du scan à
  // app/(site)/portail ci-dessus, jamais scannées avant cette mission) :
  "app/(site)/portail/administration/page.tsx", // page publique non authentifiée, lien direct vers /login
  "app/(site)/portail/bulletin/page.tsx", // atteinte via ?student=<id> depuis Parent ET Étudiant, aucun parent unique
]);

function walk(dir: string, out: string[]) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (entry === "page.tsx") out.push(full);
  }
}

function resolveAbsComponent(importPath: string): string | null {
  const candidates = [join("components", importPath + ".tsx"), join("components", importPath, "index.tsx")];
  for (const c of candidates) if (existsSync(c)) return c;
  return null;
}

function pageHasBackButton(pagePath: string): boolean {
  const content = readFileSync(pagePath, "utf8");
  if (content.includes("BackButton")) return true;

  const pageDir = dirname(pagePath);
  const relImports = [...content.matchAll(/import\s+\w+\s+from\s+"(\.[^"]+)"/g)].map((m) => m[1]);
  for (const ri of relImports) {
    const full = join(pageDir, ri) + ".tsx";
    if (existsSync(full) && readFileSync(full, "utf8").includes("BackButton")) return true;
  }

  const absImports = [...content.matchAll(/import\s+\w+\s+from\s+"@\/components\/([^"]+)"/g)].map((m) => m[1]);
  for (const ai of absImports) {
    const full = resolveAbsComponent(ai);
    if (full && readFileSync(full, "utf8").includes("BackButton")) return true;
  }

  return false;
}

describe("Navigation retour — couverture BackButton (app/admin/**, app/portail/**)", () => {
  const pages: string[] = [];
  for (const root of SCAN_ROOTS) walk(join(ROOT_DIR, root), pages);
  const relPages = pages.map((p) => relative(ROOT_DIR, p).split("\\").join("/"));

  it("a bien trouvé des pages à auditer (le scan lui-même n'est pas cassé)", () => {
    expect(relPages.length).toBeGreaterThan(50);
  });

  it("toute page ROOT_PAGES déclarée existe réellement sur disque (pas d'exemption fantôme)", () => {
    for (const rootPage of ROOT_PAGES) {
      expect(relPages).toContain(rootPage);
    }
  });

  it.each(relPages.filter((p) => !ROOT_PAGES.has(p)))("%s a un chemin de retour (BackButton direct ou via un composant enfant)", (relPage) => {
    const absPage = join(ROOT_DIR, relPage);
    expect(pageHasBackButton(absPage)).toBe(true);
  });
});
