import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isJasminKindergartenModuleEnabled } from "@/lib/labFeatureFlags";
import JasminOfflineLab from "@/components/lab/JasminOfflineLab";

/**
 * Prototype technique isolé — mandat "Phase 2 — socle données +
 * synchronisation réelle preprod, Jasmine Kindergarten English Program"
 * (2026-09-09).
 *
 * Volontairement absent de toute navigation (aucun lien depuis Header/Footer
 * ni aucun autre portail) et gardé par isJasminKindergartenModuleEnabled() —
 * voir lib/labFeatureFlags.ts. Sans la variable d'environnement locale
 * ENABLE_JASMIN_KINDERGARTEN_MODULE="true" (jamais commitée : .env* est
 * ignoré par git), cette route renvoie 404, y compris sur ce même
 * environnement de développement.
 */
export const metadata: Metadata = {
  title: "Laboratoire — Jasmine Kindergarten (prototype interne)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LaboratoireJasminPage() {
  if (!isJasminKindergartenModuleEnabled()) notFound();

  return <JasminOfflineLab />;
}
