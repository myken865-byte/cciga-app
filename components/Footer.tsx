import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-primary-dark">
              CG
            </span>
            <span className="text-lg font-bold">CCIGA</span>
          </div>
          <p className="text-sm text-white/70">
            Centre Interdisciplinaire des Génies Agrégées — École Classique, École
            Professionnelle et Université réunies dans un campus numérique intégré.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent-light">
            Institution
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/a-propos" className="hover:text-white">À propos</Link></li>
            <li><Link href="/programmes" className="hover:text-white">Programmes</Link></li>
            <li><Link href="/actualites" className="hover:text-white">Actualités</Link></li>
            <li><Link href="/evenements" className="hover:text-white">Événements</Link></li>
            <li><Link href="/galerie" className="hover:text-white">Galerie</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent-light">
            Admission
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/admission" className="hover:text-white">Conditions & frais</Link></li>
            <li><Link href="/admission/candidater" className="hover:text-white">Candidater</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent-light">
            Portails
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/portail/etudiant" className="hover:text-white">Étudiant</Link></li>
            <li><Link href="/portail/parent" className="hover:text-white">Parent</Link></li>
            <li><Link href="/portail/enseignant" className="hover:text-white">Enseignant</Link></li>
            <li><Link href="/portail/administration" className="hover:text-white">Administration</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} CCIGA — Centre Interdisciplinaire des Génies Agrégées. Tous droits réservés.</span>
        <Link href="/politique-de-confidentialite" className="hover:text-white">
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}
