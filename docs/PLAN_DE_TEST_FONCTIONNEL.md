# Plan de test fonctionnel — CCIGA App

_Document de préparation aux tests finaux. Basé sur l'audit du code effectué localement — reste à exécuter manuellement (ou via comptes QA) avant toute soumission Google Play._

Rôles couverts en détail : **SUPER_ADMIN**, **ADMIN**, **ENSEIGNANT (TEACHER)**, **ÉTUDIANT (STUDENT)**. Les rôles **SECRETARIAT**, **PARENT** et **ACADEMIC_OFFICER** existent aussi dans l'application (voir note en fin de document) mais n'étaient pas explicitement demandés dans ce lot.

---

## 1. SUPER_ADMIN

**Redirection après connexion** : `/mon-espace` → carte "Super Administrateur" → `/admin/admissions`.

**Écrans accessibles** : tout `/admin/**` (hérite de tous les droits ADMIN) + `/admin/audit` (exclusif) + `/portail/responsable/**` (review de notes, comme ADMIN).

**Actions autorisées, exclusives à ce rôle** :
- Suppression **définitive** d'un programme (`DELETE /api/admin/programs/[id]`) ou d'un cours (`DELETE /api/admin/courses/[id]`) — bloquée si des données en dépendent (étudiants, cours, notes, présences, documents...).
- Attribution d'un rôle privilégié (ADMIN, SUPER_ADMIN, SECRETARIAT) à un compte (`POST/PATCH /api/admin/users`).
- Réinitialisation du mot de passe d'un compte à rôle privilégié.
- Consultation du journal d'audit (`/admin/audit`).

**Actions interdites** : aucune côté admin — c'est le rôle le plus large.

**Tests à exécuter** :
- [ ] Connexion → redirection correcte vers `/admin/admissions`.
- [ ] Tenter une suppression de programme/cours **avec** données liées → doit être refusée avec message explicite (409), pas de suppression silencieuse.
- [ ] Tenter une suppression de programme/cours **sans** aucune donnée liée (créer un programme de test vide) → doit réussir, vérifier le journal d'audit.
- [ ] Créer un compte ADMIN depuis l'interface → doit réussir.
- [ ] Accéder à `/admin/audit` → doit afficher le journal.
- [ ] Accéder à `/portail/responsable` → doit fonctionner (corrigé cette session — vérifier la non-régression).

## 2. ADMIN

**Redirection après connexion** : `/mon-espace` → `/admin/admissions`.

**Écrans accessibles** : `/admin/**` (programmes, cours, utilisateurs, admissions, finance, dashboard, écoles), `/portail/responsable/**`.

**Actions autorisées** :
- CRUD programmes/cours (hors suppression définitive si des données en dépendent — message clair, pas de crash).
- Créer/modifier des comptes **non privilégiés** (étudiant, parent, enseignant) — **ne peut pas** attribuer de rôle privilégié (réservé SUPER_ADMIN, vérifié par `requireSuperAdminSession`).
- Workflow de notation complet : vérifier, valider **et publier** les notes.
- Générer les bulletins/relevés officiels (`/admin/documents`).

**Actions interdites (à vérifier explicitement)** :
- [ ] Tenter `DELETE /api/admin/programs/[id]` en tant qu'ADMIN seul (sans SUPER_ADMIN) → doit renvoyer 403.
- [ ] Tenter de créer un compte avec le rôle SUPER_ADMIN ou ADMIN → doit être refusé (403), message clair.
- [ ] Tenter d'accéder à `/admin/audit` → doit être refusé (redirection login ou 403, selon la garde de `proxy.ts` qui restreint ce préfixe à SUPER_ADMIN seul).

**Tests fonctionnels** :
- [ ] Créer un programme complet (École Classique, Professionnelle, Université — les 3) avec données valides → succès.
- [ ] Créer un programme avec un champ obligatoire manquant (nom vide, description vide) → message d'erreur clair, pas de création partielle.
- [ ] Créer un cours en assignant un enseignant déjà occupé au même créneau → doit être refusé avec le nom du cours en conflit.
- [ ] Cycle de notation complet sur un cours de test : brouillon → soumis (enseignant) → en vérification (ADMIN/officer) → validé → publié → vérifier que l'étudiant voit la note seulement après publication.
- [ ] Générer un bulletin pour une période complète → PDF téléchargeable, QR fonctionnel (`/verify/[id]`).

## 3. ENSEIGNANT (TEACHER)

**Redirection après connexion** : `/mon-espace` → `/portail/enseignant`.

**Écrans accessibles** : `/portail/enseignant`, `/portail/enseignant/cours/[id]` (uniquement ses propres cours), `/portail/enseignant/classe/[programId]` (uniquement s'il est titulaire de ce programme).

**Actions autorisées** :
- Présences, notes (statut initial `brouillon`), devoirs, quiz, annonces, contenu de cours — **uniquement sur ses propres cours** (`course.teacherId === session.userId`, vérifié serveur).
- Soumettre ses notes (`brouillon` → `soumis`).
- Si titulaire d'un programme : observations, messages aux parents, appréciations pour les élèves de sa classe.

**Actions interdites (à vérifier explicitement)** :
- [ ] Accéder à `/portail/enseignant/cours/{id-dun-autre-enseignant}` → doit renvoyer 404 (pas 403 — le code utilise délibérément `notFound()` pour ne pas révéler l'existence du cours).
- [ ] Tenter `POST /api/admin/courses/[id]/grades/review` (mettre en vérification) → doit être refusé (`requireReviewerSession` exclut TEACHER).
- [ ] Tenter `POST /api/admin/courses/[id]/grades/validate` ou `publish` → doit être refusé.
- [ ] Accéder à `/portail/enseignant/classe/{programId-dont-il-nest-pas-titulaire}` → 404.
- [ ] Vérifier qu'un enseignant ne voit **aucune** donnée d'un cours qui n'est pas le sien, même en devinant un ID de cours dans l'URL.

**Tests fonctionnels** :
- [ ] Enregistrer les présences d'une classe → persistance correcte, alerte automatique déclenchée après le seuil d'absences configuré.
- [ ] Créer un devoir avec date limite → apparaît côté étudiant, soumission après échéance marquée "en retard".
- [ ] Créer un quiz avec question à choix multiple → réponse correcte jamais visible côté étudiant avant soumission (déjà vérifié dans le code : `correctAnswer` explicitement exclu du payload envoyé au client).
- [ ] Soumettre les notes d'un cours (École Classique/Pro/Université) → statut passe à "soumis", disparaît du tableau "brouillon".

## 4. ÉTUDIANT (STUDENT)

**Redirection après connexion** : `/mon-espace` → `/portail/etudiant`.

**Écrans accessibles** : `/portail/etudiant`, `/portail/etudiant/cours/[id]` (uniquement les cours de son propre programme), `/portail/bulletin` (son propre bulletin, ou celui d'un autre élève **seulement** si rang/permissions le permettent — non, en pratique : uniquement le sien).

**Actions autorisées** :
- Consulter cours, matériel, devoirs, quiz, présences, notes **publiées uniquement**.
- Soumettre un devoir, tenter un quiz (dans la limite du nombre de tentatives autorisées).
- Télécharger son bulletin/relevé une fois publié par l'administration.
- Changer son propre mot de passe (`/mon-espace/mot-de-passe`).

**Actions interdites (à vérifier explicitement)** :
- [ ] Modifier l'URL `/portail/etudiant/cours/{id}` vers un cours d'un **autre programme** → doit renvoyer 404 (`course.programId !== user.programId`).
- [ ] Modifier `/portail/bulletin?student={id-dun-autre-eleve}` → doit renvoyer un accès refusé (`resolveBulletinAccess` renvoie `targetId: null`).
- [ ] Vérifier qu'une note au statut `brouillon`, `soumis` ou `en_verification` (pas encore `publie`) **n'apparaît jamais** dans "Mes notes" ni dans le détail d'un devoir noté.
- [ ] Tenter d'appeler directement une route API réservée enseignant/admin (ex. `POST /api/courses/[id]/grades`) en tant qu'étudiant → 401/403.

**Tests fonctionnels** :
- [ ] Soumettre un devoir avant l'échéance → marqué à l'heure ; après l'échéance → marqué en retard.
- [ ] Passer un quiz → score calculé automatiquement pour les questions auto-corrigibles, tentatives suivantes limitées par `maxAttempts`.
- [ ] Consulter le bulletin une fois publié par l'administration → PDF correct, QR renvoyant vers `/verify/[id]` sans exposer de notes sur cette page publique.
- [ ] Changer son mot de passe avec un mot de passe trop court → erreur claire, pas de mise à jour silencieuse.

---

## 5. Parcours transverses à tester pour tous les rôles

- [ ] Connexion avec mauvais mot de passe × 6 sur le même compte en moins de 15 min → blocage temporaire (429), message clair (pas de fuite d'info sur l'existence du compte).
- [ ] Naviguer vers une URL totalement inexistante (`/xyz123`) → page 404 CCIGA (`app/not-found.tsx`), pas la page générique Next.js.
- [ ] Simuler une erreur serveur (ex. couper la connexion réseau pendant une soumission de formulaire) → message "Impossible de contacter le serveur", pas de page blanche.
- [ ] Se déconnecter → cookie de session supprimé, tentative de retour sur une page protégée → redirection `/login`.
- [ ] Un compte avec **plusieurs rôles** (ex. ADMIN + TEACHER) → `/mon-espace` affiche une carte par rôle, chaque portail reste correctement cloisonné.

## 6. Notes sur les rôles non détaillés ici

- **SECRETARIAT** : accès `/admin/admissions` et `/admin/finance` uniquement (`requireSecretariatSession`) — pas `/admin/programs`, `/admin/courses` ni `/admin/users`. À tester si ce rôle est utilisé en production.
- **PARENT** : accès uniquement aux enfants liés via `parentId` — jamais aux autres élèves, même en devinant un ID. Peut envoyer des messages au titulaire, consulter observations/bulletin/finances de ses enfants.
- **ACADEMIC_OFFICER** : accès `/portail/responsable` (review de notes), même périmètre que ADMIN sur cette fonction précise, mais ne peut pas publier (`canPublish` réservé ADMIN) ni accéder au reste de `/admin`.

---

_Dernière mise à jour : 2026-08-20. À ré-exécuter avant toute soumission Google Play, et après toute modification touchant l'authentification, les rôles ou le workflow de notation._
