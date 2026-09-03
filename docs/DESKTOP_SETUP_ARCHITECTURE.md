# CCIGA App — Architecture du Setup Bureau / Distribution USB

_Dernière mise à jour : 3 septembre 2026_

## Architecture validée (actuelle)

**CCIGA App Bureau = client / chargeur distant.** Le Setup Windows (`desktop/`, distribué via `CCIGA App - Distribution USB` sur le Bureau) installe uniquement :

- L'écran de choix des 12 portails, l'écran de chargement, l'écran d'erreur (fichiers locaux)
- Le logo, le raccourci Windows
- Le code Electron minimal (`main.js`/`preload.js`) qui affiche ces écrans et charge la suite depuis internet

Tout le reste — les 12 tableaux de bord, toute la logique métier, l'authentification, la base de données, la génération des PDF (fiche d'inscription, reçu de paiement), et toute donnée affichée — est chargé en direct depuis le serveur (`https://cciga-app-devtest.vercel.app` en DEV/TEST/PREPROD) à chaque navigation. Vérifié par inspection du paquet installé (`app.asar` : 7 fichiers, aucun code métier) et du code source (`REMOTE_HOST`/`loadURL` dans `desktop/main.js`).

- **Internet requis** : OUI, en permanence après l'écran d'accueil
- **Application complète embarquée** : NON
- **Secrets embarqués** : 0 (aucun token Turso, aucun secret de session, vérifié)
- **Avantage direct** : toute correction déployée côté serveur est immédiatement disponible dans l'app installée, sans nouveau Setup, sauf si l'écran d'accueil ou le code Electron lui-même change

Validé le 3 septembre 2026 comme architecture opérationnelle. Ne pas transformer en application totalement autonome/offline sans autorisation explicite — voir Piste B ci-dessous.

## Piste A — serveur local avec accès direct à la base : rejetée (pas seulement reportée)

Étudiée et rejetée pour raison de sécurité, pas de complexité. `lib/db.ts` connecte Prisma via `TURSO_AUTH_TOKEN` + `DATABASE_URL` ; `lib/auth.ts` signe les sessions avec `SESSION_SECRET`. Un serveur Next.js embarqué avec accès direct à la base exigerait d'inclure ces secrets dans **chaque copie distribuée** de l'application — extractibles trivialement du paquet installé. Cette approche ne doit pas être reprise sans un mécanisme d'authentification par appareil entièrement différent (hors scope actuel).

## PISTE B — CCIGA App hybride / réplique locale + synchronisation (réservée, non exécutée)

Piste conservée pour ouverture future sur autorisation explicite uniquement — **ne pas exécuter sans mandat séparé**.

**Principe** : une réplique locale de la base (libSQL/Turso supporte les répliques embarquées, le schéma Prisma est déjà `provider = "sqlite"`) permettrait un vrai fonctionnement hors ligne pour la lecture, avec synchronisation vers Turso à la reconnexion.

**Ce que ça résoudrait** : consultation des portails sans internet.

**Ce que ça exigerait, non trivial** :
- Gestion des écritures hors ligne (paiements, notes, présences) et résolution de conflits à la resynchronisation
- Un nouveau risque de sécurité qui n'existe pas aujourd'hui : des données institutionnelles (notes, paiements, dossiers, éventuellement données sensibles) stockées localement sur un poste qui peut être perdu ou volé — à traiter (chiffrement au repos, expiration de la réplique, etc.) avant toute exécution
- Refonte de l'authentification pour un fonctionnement déconnecté
- Un plan de migration et une stratégie de test dédiés

**Condition d'ouverture** : autorisation explicite et séparée de l'utilisateur, avec étude de risque de sécurité des données au repos avant toute exécution.

## Règle permanente après chaque futur travail

modification → tests → PASS → mise à jour de l'application distante → vérification de la version Bureau → vérification du Setup USB → mise à jour `VERSION.txt` → vérification SHA-256 → test depuis le Bureau → rapport final.

Si le shell Electron n'a pas changé, ne pas le reconstruire inutilement. Dans ce cas, indiquer clairement : *Shell Electron inchangé : OUI — Application distante mise à jour : OUI — Setup USB revalidé : PASS.*

Le dossier `CCIGA App - Distribution USB` (Bureau) reste le dossier officiel de transfert, doit toujours contenir `CCIGA-App-Setup-LATEST.exe`, `VERSION.txt`, `README-INSTALLATION.txt`, `CHECKSUM-SHA256.txt`, et rester copiable tel quel sur une clé USB pour installer CCIGA App sur un autre poste Windows.
