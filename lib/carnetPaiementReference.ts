// Numéro du carnet de paiement — dérivé du matricule permanent CCIGA
// (lib/cciga-id.ts), jamais un compteur séparé stocké : même convention que
// CCIGA-FI-/CCIGA-FEC-/CCIGA-REC- (toutes dérivées d'un identifiant déjà
// existant, jamais d'un second système de numérotation). Distinct de
// l'identifiant permanent CCIGA lui-même (§11 du prompt maître) : préfixe
// propre, jamais confondu avec CCIGA-XXXXXX.
import { formatCcigaId } from "@/lib/cciga-id";

export function formatCarnetPaiementReference(userId: number): string {
  return `CCIGA-CP-${formatCcigaId(userId).replace(/[^0-9]/g, "")}`;
}
