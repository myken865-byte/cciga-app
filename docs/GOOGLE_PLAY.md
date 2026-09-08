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

## Public cible (Target audience) — confirmé avec le porteur du projet le 2026-08-20

CCIGA App est une application à **audience mixte** : des élèves mineurs de moins de 13 ans (École Classique — primaire/maternelle) se connectent avec leur propre compte STUDENT, aux côtés d'utilisateurs adultes (parents, enseignants, administration, université).

Conséquences pour la déclaration Play Console (section « Target audience and content ») :
- Sélectionner **plusieurs tranches d'âge**, y compris les moins de 13 ans, en tant qu'app à audience mixte — **ne pas** rejoindre le programme « Designed for Families » (réservé aux apps principalement destinées aux enfants ; CCIGA ne l'est pas).
- Le questionnaire de classification de contenu devra être rempli en cochant que l'app peut être utilisée par des enfants.
- Aucune publicité ni tracking publicitaire n'existe dans l'app (déjà confirmé plus haut) — donc pas de risque de non-conformité sur ce point précis, mais à re-confirmer explicitement dans le formulaire.
- Les comptes STUDENT des plus jeunes élèves sont créés par l'administration de l'école (pas d'auto-inscription par l'enfant), ce qui correspond au modèle de consentement généralement attendu pour ce type d'app institutionnelle — **à faire valider par une personne compétente en conformité si possible avant soumission finale**, cette analyse n'étant qu'une préparation technique et non un avis juridique.

## Suppression de compte (exigence Google Play)

Satisfaite via le processus documenté : la page [Politique de confidentialité](../app/(site)/politique-de-confidentialite/page.tsx) explique comment demander la suppression d'un compte ou de données, par e-mail via le formulaire de contact du site — accessible depuis l'application (même WebView) et depuis le web, sans connexion nécessaire pour trouver la procédure.

## Autorisations Android déclarées

Uniquement :
- `android.permission.INTERNET`

Correction (audit du 2026-09-07, mandat "Automatisation Google Play") : `ACCESS_NETWORK_STATE` était listée ici par erreur — elle n'apparaît pas dans `android/app/src/main/AndroidManifest.xml`, qui ne déclare qu'`INTERNET`. Aucune autre autorisation (caméra, stockage, contacts, localisation) — vérifié directement dans le manifeste et dans les manifestes des plugins Capacitor utilisés.

## Fiche Store — descriptions (brouillon)

**Description courte** (66/80 caractères) :
> CCIGA : admissions, cours, notes, bulletins et messagerie en ligne

**Description complète** (brouillon, à valider avant dépôt) :
> CCIGA App est l'application officielle du Centre Interdisciplinaire des Génies Agrégées (CCIGA), une institution éducative réunissant trois entités : l'École Classique (maternelle, primaire, secondaire), l'École Professionnelle et l'Université.
>
> Avec CCIGA App, vous pouvez :
>
> • Consulter les programmes offerts par l'École Classique, l'École Professionnelle et l'Université
> • Déposer une candidature en ligne, à toutes les étapes, avec suivi de dossier
> • Élèves/étudiants : accéder à votre emploi du temps, vos cours, vos évaluations, vos présences et votre bulletin ou relevé de notes
> • Parents : suivre la scolarité de vos enfants (observations, messages avec le titulaire, présences, bulletins)
> • Enseignants : gérer vos cours, devoirs, présences et saisir les notes
> • Rester informé grâce aux actualités et événements de l'institution
> • Contacter l'administration directement depuis l'application
>
> CCIGA App fonctionne avec votre compte CCIGA existant. Toutes les données sont transmises de façon chiffrée (HTTPS). Consultez notre politique de confidentialité pour plus de détails sur la collecte et la protection de vos données : https://cciga-app.vercel.app/politique-de-confidentialite
>
> Une connexion Internet est requise pour utiliser l'application.

## Ressources graphiques — inventaire (audit du 2026-08-19)

| Ressource | Exigence Google Play | État |
|---|---|---|
| Icône haute résolution | 512×512 PNG 32-bit | ✅ `store-assets/CCIGA_Play_Store_Icon_512.png` (512×512 confirmé) |
| Icône maître | — (source) | ✅ `store-assets/CCIGA_App_Icon_Master_1024.png` (1024×1024) |
| Feature graphic (bannière) | 1024×500 JPG/PNG 24-bit | ✅ `store-assets/CCIGA_Feature_Graphic_1024x500.png` (1024×500, PNG 24-bit sans alpha, généré à partir de la charte existante — à valider visuellement avant dépôt) |
| Captures d'écran téléphone | Min. 2, ratio 16:9 à 9:16, dimension min. 320px | ⚠️ Brouillons visuels vérifiés en direct sur le site déployé (accueil, candidature) au ratio 375×812 (~9:16 mais légèrement hors de la plage 2:1 max autorisée par Google) — **captures finales à reprendre à une résolution conforme (ex. 1080×1920) avant dépôt**, directement depuis un téléphone/émulateur |

## Internal Testing — préparation

**Notes de version (brouillon, à coller lors du téléversement)** :
> Première version de test interne de CCIGA App (v1.1). Application officielle du CCIGA : consultation des programmes, candidature en ligne, portail élève/étudiant/parent/enseignant (cours, notes, présences, bulletins), actualités et contact. Merci de signaler tout problème rencontré.

**Testeurs** : la piste Internal Testing accepte jusqu'à 100 testeurs, ajoutés soit individuellement par adresse e-mail (liste simple, gérée directement dans la Play Console — recommandé pour démarrer), soit via un Google Group. Aucune action de mon côté n'est possible ici : c'est toi qui fournis les adresses e-mail des premiers testeurs (toi-même + éventuellement quelques membres de l'équipe CCIGA), directement dans l'interface.

**Fichier à téléverser** : `android\app\build\outputs\bundle\release\app-release.aab` (déjà généré, signé, vérifié — inchangé).

## Ce qu'il reste à faire avant une soumission réelle (hors de cette phase)

1. Créer un compte développeur Google Play (25 $ US, paiement unique).
2. Générer une clé de signature de release et produire un **Android App Bundle (.aab)** signé (cette phase ne produit qu'un APK de test non signé pour le Store).
3. Rédiger la fiche complète du Store (description courte/longue, captures d'écran sur plusieurs tailles d'écran, icône haute résolution — déjà disponible dans `resources/icon.png`).
4. Remplir et soumettre officiellement le formulaire Data Safety et le questionnaire de classification via la Play Console (les brouillons ci-dessus servent de base).
5. Test interne Play Console avant publication publique.
