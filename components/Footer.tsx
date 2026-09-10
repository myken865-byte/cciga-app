import Link from "next/link";
import SocialLinksSection from "@/components/SocialLinksSection";
import { isJasminKindergartenModuleEnabled } from "@/lib/labFeatureFlags";
import JasminLabFooterLink from "@/components/lab/JasminLabFooterLink";

const footerColumns = [
  {
    title: "Institution",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/programmes", label: "Programmes" },
      { href: "/actualites", label: "Actualités" },
      { href: "/evenements", label: "Événements" },
      { href: "/galerie", label: "Galerie" },
    ],
  },
  {
    title: "Admission",
    links: [
      { href: "/admission", label: "Conditions & frais" },
      { href: "/admission/candidater", label: "Candidater" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Portails",
    links: [
      { href: "/portail/etudiant", label: "Étudiant" },
      { href: "/portail/parent", label: "Parent" },
      { href: "/portail/enseignant", label: "Enseignant" },
      { href: "/portail/administration", label: "Administration" },
    ],
  },
];

function FooterLogo() {
  return (
    <div className="flex items-center justify-center lg:w-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/branding/Logo_CCIGA_General.png" alt="Logo CCIGA" className="h-16 w-16 rounded-xl object-contain" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        {/* Grand cadre supérieur — mandat "Refonte Pied de Page" (2026-09-06) :
        LOGO | Institution | Admission | Portails | LOGO, un seul encadrement
        bleu marine foncé aux angles arrondis, fond crème clair. */}
        <div className="rounded-[40px] border-[10px] border-primary-dark bg-[#fdf8ec] p-6 shadow-lg sm:p-8">
          <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-stretch lg:justify-center">
            <FooterLogo />
            {footerColumns.map((column) => (
              <div key={column.title} className="flex-1 rounded-2xl border-2 border-accent/60 bg-white p-6 text-center shadow-sm">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary-dark">{column.title}</h3>
                <ul className="space-y-2 text-sm text-muted">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <FooterLogo />
          </div>
        </div>

        <div className="mt-8">
          <SocialLinksSection />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-border px-4 py-4 text-center text-xs text-muted sm:flex-row sm:justify-between lg:px-6">
        <span>© {new Date().getFullYear()} CCIGA — Centre Interdisciplinaire des Génies Agrégées. Tous droits réservés.</span>
        <Link href="/politique-de-confidentialite" className="hover:text-primary">
          Politique de confidentialité
        </Link>
      </div>

      {/* Point d'entrée TEMPORAIRE — mandat "Phase 3.1 — validation matérielle
      assistée" (2026-09-09). Uniquement visible quand le feature flag Jasmine
      Kindergarten est actif (jamais en Production, jamais avec le flag
      désactivé) — permet d'atteindre /laboratoire-jasmin depuis la WebView
      de l'app native installée, qui n'a pas de barre d'adresse. À supprimer
      après la validation matérielle Android/Electron.
      Correction (2026-09-10) : le bouton flottant "Ask CCIGA AI" (fixed
      bottom-5 right-5, voir AIAssistantWidget.tsx) chevauchait ce lien une
      fois la page défilée tout en bas — appuis interceptés par le bouton IA
      au lieu du lien. `pb-24` (au lieu de `py-2`) + un espaceur dédié
      garantissent que ce lien reste au-dessus de la zone du bouton flottant,
      quelle que soit la taille d'écran. */}
      {isJasminKindergartenModuleEnabled() && <JasminLabFooterLink />}
    </footer>
  );
}
