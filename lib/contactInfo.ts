// Coordonnées directes affichées sur /contact — mission "Correction section
// Contact — Contacts directs" (2026-09-12). Structure centralisée pour que
// ces valeurs puissent être remplacées en un seul endroit, sans toucher au
// design de la page. VALEURS TEMPORAIRES : à remplacer par les numéros et
// adresses réels du CCIGA dès qu'ils sont communiqués — ne jamais les
// present comme définitifs.
export interface ContactPhone {
  label: string;
  number: string;
}

export interface ContactEmail {
  label: string;
  address: string;
}

export const contactPhones: ContactPhone[] = [
  { label: "Téléphone 1", number: "+509 0000-0001" },
  { label: "Téléphone 2", number: "+509 0000-0002" },
  { label: "Téléphone 3", number: "+509 0000-0003" },
  { label: "Téléphone 4", number: "+509 0000-0004" },
];

export const contactEmails: ContactEmail[] = [
  { label: "Email 1", address: "contact@cciga.edu" },
  { label: "Email 2", address: "admissions@cciga.edu" },
  { label: "Email 3", address: "secretariat@cciga.edu" },
];

/** `tel:` n'accepte pas les espaces/tirets décoratifs — nettoyage minimal, jamais une renumérotation. */
export function telHref(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}
