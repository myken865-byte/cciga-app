"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { NAVIGATED_FLAG } from "@/components/NavigationTracker";

/**
 * Bouton Retour standard CCIGA App — un seul composant réutilisé sur toutes
 * les pages secondaires (fiche, dossier, formulaire, sous-page) plutôt
 * qu'une implémentation différente par écran.
 *
 * Comportement (règle permanente UI/UX) :
 * - Essaie d'abord la vraie page précédente de CCIGA App via
 *   `router.back()` — mais UNIQUEMENT si NavigationTracker confirme qu'une
 *   navigation interne a réellement eu lieu pendant cette session d'onglet.
 *   Cela préserve automatiquement filtres/recherche/pagination puisque
 *   l'URL précédente exacte est restaurée.
 * - Sinon (arrivée directe par URL, favori, nouvel onglet, ou historique
 *   navigateur non fiable) : navigue vers `fallbackHref`, une destination
 *   explicite déjà calculée par la page appelante (toujours une vraie liste
 *   de CCIGA App dans l'institution/le portail actifs — jamais Connexion, le
 *   choix des portails, ni une autre institution).
 */
export default function BackButton({
  fallbackHref,
  label = "Retour",
  confirmIfUnsaved = false,
  className = "",
}: {
  fallbackHref: string;
  label?: string;
  /** true si la page appelante a des modifications non enregistrées en cours. */
  confirmIfUnsaved?: boolean;
  /** Classes additionnelles — ex. "print:hidden" sur une page imprimable. */
  className?: string;
}) {
  const router = useRouter();

  function handleClick() {
    if (confirmIfUnsaved) {
      const proceed = window.confirm(
        "Modifications non enregistrées — ces informations n'ont pas encore été enregistrées. Quitter sans enregistrer ?",
      );
      if (!proceed) return;
    }

    let navigatedInSession = false;
    try {
      navigatedInSession = sessionStorage.getItem(NAVIGATED_FLAG) === "1";
    } catch {
      // sessionStorage indisponible — repli explicite ci-dessous.
    }

    if (navigatedInSession) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light hover:underline ${className}`}
    >
      <ArrowLeftIcon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  );
}
