# CCIGA App — Préparation Google Play Store

_Document de préparation uniquement — aucune soumission n'a été faite. À revalider au moment du dépôt réel, les exigences de Google Play évoluant régulièrement._

## Identité de l'application

- **Nom officiel :** CCIGA App
- **Identifiant Android (package name) :** `ht.cciga.app`
- **Site web associé (obligatoire pour la fiche Play Store) :** https://cciga-app.vercel.app
- **Politique de confidentialité (URL publique obligatoire) :** https://cciga-app.vercel.app/politique-de-confidentialite

## Niveau d'API cible

- `targetSdkVersion` / `compileSdkVersion` : **36** (Android 16), `minSdkVersion` : 24 (Android 7.0).
- Généré automatiquement par le gabarit Capacitor le plus récent — déjà conforme à l'exigence Google Play du niveau d'API cible en vigueur au 13 août 2026 (Play Store exige généralement de cibler l'API du dernier ou avant-dernier niveau majeur d'Android). **À revérifier au moment du dépôt réel**, car cette exigence est mise à jour chaque année (généralement en août).

## Formulaire Data Safety (brouillon de réponses)

D'après la politique de confidentialité rédigée ([app/(site)/politique-de-confidentialite](../app/(site)/politique-de-confidentialite/page.tsx)) :

| Catégorie de données | Collectée ? | Partagée avec des tiers ? | Finalité |
|---|---|---|---|
| Nom | Oui | Non | Fonctionnalité de l'app (compte, candidature) |
| E-mail | Oui | Non | Fonctionnalité de l'app (compte, candidature, contact) |
| Téléphone | Oui | Non | Fonctionnalité de l'app (candidature) |
| Adresse | Oui | Non | Fonctionnalité de l'app (candidature) |
| Identifiants (mot de passe) | Oui (chiffré) | Non | Authentification |
| Informations financières (paiements de frais) | Oui | Non | Fonctionnalité de l'app (suivi des frais de scolarité) |
| Autres informations (notes, présences) | Oui | Non | Fonctionnalité de l'app (dossier académique) |

- **Chiffrement des données en transit :** Oui (HTTPS uniquement).
- **Suppression des données possible :** Oui, sur demande (voir politique de confidentialité).
- **Publicité / suivi publicitaire :** Aucun.
- **Analytique tierce :** Aucune.

## Classification du contenu (brouillon)

Site institutionnel éducatif, aucun contenu sensible :

- Violence : Non
- Contenu sexuel : Non
- Langage grossier : Non
- Substances contrôlées : Non
- Jeu d'argent : Non
- Généré par les utilisateurs sans modération : Non (formulaires soumis à l'administration, pas de publication publique de contenu utilisateur)

Classification attendue : **Tout public** (« Everyone » / PEGI 3), à confirmer via le questionnaire officiel de la Play Console.

## Suppression de compte (exigence Google Play)

Satisfaite via le processus documenté : la page [Politique de confidentialité](../app/(site)/politique-de-confidentialite/page.tsx) explique comment demander la suppression d'un compte ou de données, par e-mail via le formulaire de contact du site — accessible depuis l'application (même WebView) et depuis le web, sans connexion nécessaire pour trouver la procédure.

## Autorisations Android déclarées

Uniquement :
- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`

Aucune autre autorisation (caméra, stockage, contacts, localisation) — vérifié directement dans `android/app/src/main/AndroidManifest.xml` et dans les manifestes des plugins Capacitor utilisés.

## Ce qu'il reste à faire avant une soumission réelle (hors de cette phase)

1. Créer un compte développeur Google Play (25 $ US, paiement unique).
2. Générer une clé de signature de release et produire un **Android App Bundle (.aab)** signé (cette phase ne produit qu'un APK de test non signé pour le Store).
3. Rédiger la fiche complète du Store (description courte/longue, captures d'écran sur plusieurs tailles d'écran, icône haute résolution — déjà disponible dans `resources/icon.png`).
4. Remplir et soumettre officiellement le formulaire Data Safety et le questionnaire de classification via la Play Console (les brouillons ci-dessus servent de base).
5. Test interne Play Console avant publication publique.
