"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";

declare global {
  interface Window {
    cciga?: {
      openPortal: (role: string) => Promise<{ ok: boolean }>;
      retryLoad: () => Promise<{ ok: boolean }>;
      goHome: () => Promise<{ ok: boolean }>;
    };
  }
}

/**
 * Retour à l'écran des 12 portails (Niveau A — dashboard principal d'un
 * portail). Dans l'app Windows, cet écran est desktop/home.html, un fichier
 * local du shell Electron — pas une route de l'app web — donc `router.back()`
 * ne peut jamais y ramener : on passe par le pont IPC `window.cciga.goHome()`
 * déjà exposé par desktop/preload.js. Hors du shell Electron (navigateur
 * web), cette API n'existe pas ; le repli va vers l'espace personnel de
 * l'utilisateur, l'équivalent web le plus proche d'un « choix de portail ».
 */
export default function BackToPortalsButton({
  className = "",
  tone = "light",
}: {
  className?: string;
  /** "light" pour un fond clair (admin) ; "dark" pour un fond bleu marine (en-tête de portail). */
  tone?: "light" | "dark";
}) {
  const router = useRouter();

  function handleClick() {
    if (typeof window !== "undefined" && window.cciga?.goHome) {
      window.cciga.goHome();
    } else {
      router.push("/mon-espace");
    }
  }

  const toneClasses =
    tone === "dark"
      ? "text-white/90 hover:text-white"
      : "text-primary hover:text-primary-light";

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${toneClasses} ${className}`}
    >
      <ArrowLeftIcon className="h-4 w-4 shrink-0" />
      Retour aux portails
    </button>
  );
}
