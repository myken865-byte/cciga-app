/**
 * Abstraction fournisseur de paiement — préparation MonCash/NatCash.
 *
 * Aucun identifiant, clé API ou compte marchand réel n'existe dans ce projet.
 * Ce fichier ne fait qu'exposer une interface stable : le registre de paiement
 * manuel existant (`app/api/admin/finance/[id]/payments/route.ts`) continue de
 * fonctionner sans aucun changement — `Payment.provider` vaut "manuel" par
 * défaut pour toute écriture qui ne précise rien.
 *
 * Quand des identifiants officiels seront fournis, un provider réel
 * (MonCashProvider / NatCashProvider) prendra le relai de `initiateTransaction`
 * sans qu'aucune route existante n'ait besoin d'être réécrite.
 */

export type PaymentProviderKey = "manuel" | "moncash" | "natcash";
export type PaymentTransactionStatus = "en_attente" | "confirme" | "echoue";

export interface PaymentTransactionResult {
  status: PaymentTransactionStatus;
  providerReference: string | null;
}

export interface PaymentProvider {
  key: PaymentProviderKey;
  label: string;
  /** true si les identifiants requis sont présents dans l'environnement. */
  isConfigured(): boolean;
  /**
   * Démarre une transaction chez le fournisseur. Ne doit JAMAIS être appelé
   * si isConfigured() renvoie false — lève une erreur explicite le cas échéant,
   * ne simule jamais un succès.
   */
  initiateTransaction(input: { amountHTG: number; studentId: number; reference: string }): Promise<PaymentTransactionResult>;
}

/** Registre manuel — comportement 100% inchangé, utilisé partout aujourd'hui. */
export const manualProvider: PaymentProvider = {
  key: "manuel",
  label: "Registre manuel (Secrétariat)",
  isConfigured: () => true,
  async initiateTransaction() {
    return { status: "confirme", providerReference: null };
  },
};

class UnconfiguredProviderError extends Error {
  constructor(providerLabel: string, envVarsNeeded: string[]) {
    super(
      `À COMPLÉTER — IDENTIFIANT/API OFFICIEL ${providerLabel.toUpperCase()} : variables d'environnement manquantes (${envVarsNeeded.join(", ")}).`,
    );
    this.name = "UnconfiguredProviderError";
  }
}

/**
 * Prêt à activer dès que MONCASH_CLIENT_ID / MONCASH_CLIENT_SECRET sont fournis.
 * Tant qu'ils sont absents, isConfigured() renvoie false et initiateTransaction
 * refuse explicitement — aucune tentative d'appel réseau vers un identifiant inventé.
 */
export const monCashProvider: PaymentProvider = {
  key: "moncash",
  label: "MonCash (Digicel)",
  isConfigured: () => Boolean(process.env.MONCASH_CLIENT_ID && process.env.MONCASH_CLIENT_SECRET),
  async initiateTransaction() {
    if (!monCashProvider.isConfigured()) {
      throw new UnconfiguredProviderError("MonCash", ["MONCASH_CLIENT_ID", "MONCASH_CLIENT_SECRET"]);
    }
    // Intégration réelle à écrire une fois les identifiants fournis et validés.
    throw new UnconfiguredProviderError("MonCash", ["intégration API réelle non encore implémentée"]);
  },
};

/** Même préparation pour NatCash (Natcom) — même garde-fou. */
export const natCashProvider: PaymentProvider = {
  key: "natcash",
  label: "NatCash (Natcom)",
  isConfigured: () => Boolean(process.env.NATCASH_CLIENT_ID && process.env.NATCASH_CLIENT_SECRET),
  async initiateTransaction() {
    if (!natCashProvider.isConfigured()) {
      throw new UnconfiguredProviderError("NatCash", ["NATCASH_CLIENT_ID", "NATCASH_CLIENT_SECRET"]);
    }
    throw new UnconfiguredProviderError("NatCash", ["intégration API réelle non encore implémentée"]);
  },
};

const registry: Record<PaymentProviderKey, PaymentProvider> = {
  manuel: manualProvider,
  moncash: monCashProvider,
  natcash: natCashProvider,
};

export function getPaymentProvider(key: PaymentProviderKey): PaymentProvider {
  return registry[key];
}

export function listPaymentProviders(): PaymentProvider[] {
  return Object.values(registry);
}
