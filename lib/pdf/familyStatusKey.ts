/**
 * Normalise un libellé de "Situation de famille"/"Condition matrimoniale"
 * (voir lib/enrollmentFieldOptions.ts::FAMILY_STATUS_OPTIONS) vers la clé de
 * case à cocher correspondante sur le PDF officiel. Retourne null pour
 * toute valeur non reconnue plutôt que de cocher une case au hasard.
 */
export function familyStatusToCheckboxKey(value: string | null | undefined): string | null {
  switch (value) {
    case "Mariés":
      return "maries";
    case "Vie maritale":
      return "vie_maritale";
    case "Veuf / Veuve":
      return "veuf_veuve";
    case "Divorcés":
      return "divorces";
    case "Séparés":
      return "separes";
    case "Célibataire":
      return "celibataire";
    default:
      return null;
  }
}
