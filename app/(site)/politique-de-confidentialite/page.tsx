import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment le CCIGA collecte, utilise et protège vos données personnelles sur le site et l'application CCIGA App.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Confidentialité
      </p>
      <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
        Politique de confidentialité
      </h1>
      <p className="mb-10 text-sm text-muted">Dernière mise à jour : 13 août 2026</p>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-primary">
            Champ d&apos;application
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Cette politique s&apos;applique au site web du CCIGA (cciga-app.vercel.app) et à
            l&apos;application Android « CCIGA App », qui affiche le même site. Aucune donnée
            supplémentaire n&apos;est collectée par l&apos;application Android par rapport au site web
            : elle n&apos;accède à aucune fonction du téléphone (caméra, contacts, localisation,
            stockage) et ne demande que l&apos;autorisation d&apos;accès à Internet.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-primary">
            Données que nous collectons
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-muted">
            <div>
              <p className="font-medium text-foreground">Candidature en ligne (admission)</p>
              <p>
                Nom, prénom, date de naissance, e-mail, téléphone, adresse, école et programme
                choisis, ainsi que la liste des documents fournis. Utilisées uniquement pour
                traiter votre dossier de candidature.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Compte utilisateur (CCIGA ID)</p>
              <p>
                E-mail, nom, mot de passe (stocké de façon chiffrée, jamais en clair), rôle
                (étudiant, parent, enseignant, administration). Créé lors de l&apos;admission ou par
                l&apos;administration.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">
                Dossier académique (comptes étudiant/parent/enseignant)
              </p>
              <p>
                Notes, présences, emploi du temps, paiements de frais de scolarité — visibles
                uniquement par l&apos;étudiant concerné, ses parents liés, ses enseignants et
                l&apos;administration.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Formulaire de contact</p>
              <p>Nom, e-mail et message, transmis à l&apos;administration du CCIGA.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-primary">
            Ce que nous ne faisons pas
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-muted">
            <li>Aucune publicité, aucun traceur publicitaire.</li>
            <li>Aucun outil d&apos;analyse d&apos;audience tiers (type Google Analytics).</li>
            <li>Aucune vente ni partage de vos données à des tiers à des fins commerciales.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-primary">
            Hébergement et sous-traitants techniques
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Le site et l&apos;application sont hébergés par <strong>Vercel</strong> (hébergement de
            l&apos;application) et <strong>Turso</strong> (base de données). Ces prestataires stockent
            les données ci-dessus pour le compte du CCIGA et n&apos;y accèdent pas à des fins
            propres. Si un assistant conversationnel IA est un jour activé sur le site, les
            questions posées à l&apos;assistant seront transmises à <strong>Anthropic</strong> (fournisseur
            du modèle) uniquement pour générer une réponse ; cette fonctionnalité est actuellement
            inactive.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-primary">Sécurité</h2>
          <p className="text-sm leading-relaxed text-muted">
            Les mots de passe sont chiffrés (jamais stockés en clair). Les connexions sont
            protégées par un jeton de session sécurisé, accessible uniquement par le serveur.
            L&apos;accès aux dossiers académiques et administratifs est limité par rôle : chaque
            utilisateur ne voit que les informations qui le concernent.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-primary">
            Suppression de votre compte ou de vos données
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Pour demander la suppression de votre compte et des données associées, ou la
            suppression d&apos;une candidature soumise, contactez l&apos;administration du CCIGA via le{" "}
            <a href="/contact" className="text-primary underline hover:text-primary-light">
              formulaire de contact
            </a>{" "}
            du site, en précisant votre nom et l&apos;adresse e-mail utilisée. Votre demande sera
            traitée dans un délai raisonnable, sous réserve des obligations légales de
            conservation des dossiers académiques et financiers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-primary">Nous contacter</h2>
          <p className="text-sm leading-relaxed text-muted">
            Pour toute question concernant cette politique ou vos données personnelles, utilisez
            le{" "}
            <a href="/contact" className="text-primary underline hover:text-primary-light">
              formulaire de contact
            </a>{" "}
            du site.
          </p>
        </section>
      </div>
    </div>
  );
}
