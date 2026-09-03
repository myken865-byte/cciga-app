"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Lu par BackButton — voir la constante jumelle dans ce fichier. */
export const NAVIGATED_FLAG = "cciga-navigated-in-session";

/**
 * Composant invisible monté une fois par mise en page (admin et portail) —
 * marque, dans sessionStorage, que l'utilisateur a réellement navigué d'une
 * page CCIGA App à une autre pendant CETTE session d'onglet. BackButton s'en
 * sert pour décider si `router.back()` est sûr (une vraie page CCIGA
 * précédente existe forcément dans l'historique) ou s'il doit utiliser sa
 * destination de repli explicite (arrivée directe par URL/favori/nouvel
 * onglet, où l'historique du navigateur ne contient rien d'interne).
 * Ignore volontairement le tout premier rendu : ce n'est qu'un changement de
 * chemin SUBSÉQUENT qui prouve une navigation interne réelle.
 */
export default function NavigationTracker() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      sessionStorage.setItem(NAVIGATED_FLAG, "1");
    } catch {
      // sessionStorage indisponible (navigation privée stricte, etc.) —
      // BackButton retombera simplement toujours sur sa destination explicite.
    }
  }, [pathname]);

  return null;
}
