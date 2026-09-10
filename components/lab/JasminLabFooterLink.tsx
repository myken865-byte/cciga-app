"use client";

import { usePathname } from "next/navigation";

/**
 * Point d'entrée TEMPORAIRE — voir Footer.tsx pour le contexte complet
 * (mandat "Phase 3.1 — validation matérielle assistée", 2026-09-09).
 * Extrait en composant client dédié uniquement pour pouvoir se masquer sur
 * sa propre page cible (mandat "Phase 3.1 — cohérence footer", 2026-09-10) :
 * un lien vers la page courante affiché À L'INTÉRIEUR de cette même page
 * est une petite incohérence UX relevée pendant le test Android.
 *
 * `<a href>` plutôt que next/link (mandat "OPTION C — app-shell offline
 * global", 2026-09-10) : un <Link> Next.js déclenche une navigation douce
 * (fetch RSC), volontairement jamais interceptée par public/sw.js — elle
 * échouerait hors-ligne même si /laboratoire-jasmin est déjà en cache.
 * Un <a href> provoque une vraie navigation plein document, que le service
 * worker sert depuis le cache quand le réseau est coupé.
 */
export default function JasminLabFooterLink() {
  const pathname = usePathname();
  if (pathname === "/laboratoire-jasmin") return null;

  return (
    <div className="border-t border-dashed border-accent bg-accent/10 px-4 pb-24 pt-2 text-center text-xs">
      <a href="/laboratoire-jasmin" className="font-semibold text-primary-dark underline">
        🧪 Jasmine Lab — Test
      </a>
    </div>
  );
}
