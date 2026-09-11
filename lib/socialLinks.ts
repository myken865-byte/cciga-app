/**
 * Centralized, reusable config for official CCIGA social/contact links.
 * `url: null` means the real link hasn't been provided yet — the UI must
 * render that platform as "À COMPLÉTER — LIEN OFFICIEL À FOURNIR" and never
 * link anywhere. Fill in a real https:// URL here (and only here) once the
 * institution provides it; no component change is needed.
 */

export type SocialPlatformKey =
  | "whatsapp"
  | "facebook"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "autres";

export interface SocialLink {
  key: SocialPlatformKey;
  name: string;
  description: string;
  url: string | null;
}

export const socialLinks: SocialLink[] = [
  { key: "whatsapp", name: "WhatsApp", description: "Contacter CCIGA", url: null },
  {
    key: "facebook",
    name: "Facebook",
    description: "Suivre notre page officielle",
    // Lien officiel fourni directement par l'utilisateur (2026-09-11) — jamais deviné.
    url: "https://www.facebook.com/share/19epdBKtVY/",
  },
  {
    key: "tiktok",
    name: "TikTok",
    description: "Voir nos contenus",
    // Lien officiel fourni directement par l'utilisateur (2026-09-11) — jamais deviné.
    url: "https://www.tiktok.com/@universite.cciga?_r=1&_t=ZN-99ccmTqFY1e",
  },
  { key: "instagram", name: "Instagram", description: "Découvrir nos publications", url: null },
  { key: "youtube", name: "YouTube", description: "Regarder nos vidéos", url: null },
  { key: "autres", name: "Site Officiel", description: "Visiter universitecciga.com", url: "https://www.universitecciga.com" },
];

/** Only ever open a link that is a real, well-formed https:// URL — never http, never a placeholder. */
export function isSafeExternalUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}
