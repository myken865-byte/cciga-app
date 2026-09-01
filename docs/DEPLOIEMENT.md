# CCIGA App — Déploiement de production

_Dernière mise à jour : 13 août 2026_

## Adresse publique

**https://cciga-app.vercel.app**

## Architecture

| Environnement | Base de données | Fichier de config |
|---|---|---|
| Local (`npm run dev`) | SQLite fichier local (`dev.db`) | `.env` |
| Production (Vercel) | Turso (base `cciga-app`, région AWS US East / Virginia) | Variables d'environnement Vercel (projet `cciga-app`) + copie locale dans `.env.production` |

`.env`, `.env.production` et `.env.local` restent **strictement locaux**, exclus de Git (`.gitignore`) et exclus des téléversements Vercel (`.vercelignore`). Aucun secret n'a jamais été commité.

## Comptes de service

- **Turso** : compte personnel de l'utilisateur (organisation `mykendieujuste`), base `cciga-app`.
- **Vercel** : compte personnel de l'utilisateur (`myken865-6872`), projet `cciga-app`.
- Identifiants admin applicatifs (connexion sur le site, `/login`) : communiqués une seule fois lors de la création, à conserver précieusement par l'utilisateur — non répétés dans ce document.

## Procédure de redéploiement (après une modification de code)

Dans le dossier du projet, avec Node.js dans le PATH :

```bash
npx vercel --prod
```

Cette commande reconstruit et redéploie automatiquement en utilisant les variables d'environnement déjà configurées sur Vercel (aucune resaisie de secret nécessaire). Vérifier ensuite le site en ligne et les journaux :

```bash
npx vercel logs https://cciga-app.vercel.app
```

## Procédure de modification du schéma de base de données (Prisma)

1. Modifier `prisma/schema.prisma`.
2. Générer la migration en local : `npx prisma migrate dev --name <nom_descriptif>` (applique aussi à `dev.db` local).
3. Appliquer la migration à Turso : la CLI Prisma standard (`prisma migrate deploy`) **ne fonctionne pas directement avec l'URL Turso** (`libsql://`) — c'est une limitation connue de Prisma avec les adaptateurs de pilote. Utiliser `scripts/apply-turso-migrations.mjs` (voir ci-dessous) plutôt qu'un script ponctuel écrit à la main.
4. Redéployer sur Vercel (voir section précédente).

### Outil `scripts/apply-turso-migrations.mjs`

Remplace l'ancienne pratique d'écrire un script à usage unique à chaque changement de schéma. Il suit dans Turso, via une table `_prisma_migrations`, quelles migrations ont déjà été appliquées, et n'applique jamais deux fois la même. Toujours exécuté par l'utilisateur lui-même, jamais automatiquement.

**Étape unique, à faire une seule fois** (les 15 migrations existantes ont déjà été appliquées à la main, sans suivi) :

```bash
node --env-file=.env.production scripts/apply-turso-migrations.mjs --baseline
```

Cela enregistre les migrations déjà présentes comme appliquées, sans exécuter aucun SQL. Refuse de s'exécuter si la table de suivi contient déjà des lignes (protection contre un double baseline accidentel).

**Ensuite, à chaque nouvelle migration** :

```bash
# 1. Aperçu — n'écrit rien, liste seulement ce qui est en attente
node --env-file=.env.production scripts/apply-turso-migrations.mjs

# 2. Application réelle — une transaction par migration, arrêt immédiat en cas d'échec
node --env-file=.env.production scripts/apply-turso-migrations.mjs --apply
```

## Variables d'environnement Vercel (production)

Configurées via `vercel env add` — valeurs jamais affichées, gérées uniquement via la CLI/le tableau de bord Vercel :

- `DATABASE_URL` — URL Turso
- `TURSO_AUTH_TOKEN` — jeton d'accès Turso (Read & Write)
- `SESSION_SECRET` — clé de signature des sessions, différente de la valeur de développement

Pour ajouter/modifier une variable :

```bash
npx vercel env add NOM_VARIABLE production
npx vercel --prod   # redéployer pour appliquer le changement
```

Pour lister les variables (noms uniquement, jamais les valeurs) :

```bash
npx vercel env ls production
```

## Ce qui reste à faire (en attente d'autorisation explicite)

- **Nom de domaine personnalisé** — non configuré. Nécessite que l'utilisateur possède un domaine, puis le relier au projet Vercel.
- **Déploiement automatique via GitHub** — non configuré. Le déploiement se fait actuellement manuellement via la CLI Vercel (`vercel --prod`) depuis les fichiers locaux ; aucun dépôt GitHub distant n'a été créé.
- **Clé API Anthropic** — non configurée. L'assistant IA public du site (widget « Demandez à CCIGA AI ») reste inactif (message « non configuré ») tant qu'une clé n'est pas ajoutée, en local (`.env`) et en production (`vercel env add ANTHROPIC_API_KEY production`).

## Rotation d'un secret en cas de besoin

1. Générer une nouvelle valeur (jeton Turso, `SESSION_SECRET`, etc.).
2. `npx vercel env rm NOM_VARIABLE production --yes`
3. `npx vercel env add NOM_VARIABLE production`
4. `npx vercel --prod` pour redéployer avec la nouvelle valeur.

Pour un jeton Turso : le révoquer d'abord côté tableau de bord Turso (« Invalidate All Tokens » sur la page de la base) avant de le remplacer côté Vercel.

## Plan de sauvegarde, migration et rollback — préproduction LMS (documentation, non exécuté)

Préparé lors de l'Étape 9 du LMS, à titre de référence pour une future autorisation de mise en préproduction. Aucune commande de cette section n'a été exécutée ; rien ne connecte l'environnement local à Turso ou Vercel pour établir ce plan.

### Sauvegarde avant toute migration

1. Avant d'appliquer une nouvelle migration Prisma à Turso, exporter un instantané de la base de production : `turso db shell cciga-app .dump > backups/cciga-app-<date>.sql` (à exécuter par l'utilisateur, jamais automatiquement).
2. Conserver également l'historique des déploiements Vercel (`npx vercel ls`) — chaque déploiement précédent reste disponible pour un rollback instantané via le tableau de bord Vercel (« Promote to Production » sur un déploiement antérieur), indépendamment de l'état de la base.
3. Le fichier `.sql` exporté ne doit jamais être commité (contient des données réelles) — à stocker hors du dépôt Git, dans un emplacement choisi par l'utilisateur.

### Contrôle de l'intégrité de la sauvegarde (avant de migrer)

1. Vérifier que le fichier `.sql` exporté n'est pas vide et que sa taille est cohérente avec les exports précédents (`ls -la backups/`).
2. Restaurer l'export dans une base SQLite locale temporaire (`sqlite3 backup-verif.db < backups/cciga-app-<date>.sql`) et confirmer que les tables clés du LMS existent et contiennent des lignes (`SELECT COUNT(*) FROM Course; SELECT COUNT(*) FROM Grade;` etc.) avant de considérer la sauvegarde valide.
3. Ne jamais lancer une migration si cette vérification échoue — dans ce cas, arrêter et refaire l'export.

### Migration (si une évolution de schéma devient nécessaire)

Suivre la procédure déjà documentée plus haut (« Procédure de modification du schéma de base de données ») via `scripts/apply-turso-migrations.mjs`, dans cet ordre :

1. Sauvegarde + contrôle d'intégrité (sections ci-dessus).
2. Aperçu des migrations en attente (`node --env-file=.env.production scripts/apply-turso-migrations.mjs`, sans `--apply`).
3. Application (`--apply`) — une transaction par migration, arrêt immédiat en cas d'échec (comportement déjà intégré à l'outil).
4. Validation après migration (section suivante).
5. Redéploiement Vercel uniquement après validation réussie.

Point important pour le LMS : aucune migration de schéma n'a été nécessaire aux Étapes 8, 9 et 10 — les corrections sont restées au niveau du code applicatif (permissions, validation du corps de requête), sans toucher `prisma/schema.prisma`.

### Validation après migration

1. `npx vercel logs` immédiatement après le redéploiement — aucune erreur nouvelle liée à la base.
2. Rejouer manuellement un parcours minimal en production : connexion admin, ouverture d'un cours LMS existant, lecture d'un bulletin publié — sans créer de données.
3. Comparer le nombre de lignes des tables critiques (`Course`, `Grade`, `User`) avant/après migration — toute baisse inattendue est un signal d'arrêt immédiat (voir critères d'arrêt).

### Critères d'arrêt (stop immédiat, ne pas poursuivre vers le redéploiement)

- La sauvegarde échoue à l'étape de contrôle d'intégrité.
- La migration s'interrompt en erreur sur une transaction (`scripts/apply-turso-migrations.mjs --apply` s'arrête déjà automatiquement dans ce cas).
- Le nombre de lignes d'une table critique diminue après migration sans suppression volontaire correspondante.
- Toute erreur inattendue dans `npx vercel logs` dans les minutes suivant le redéploiement.
- Dans tous ces cas : ne pas redéployer davantage, passer directement à la procédure de rollback ci-dessous, et documenter l'incident avant toute nouvelle tentative.

### Rollback (en cas d'anomalie détectée après mise en préproduction/production)

- **Rollback du code** : `npx vercel rollback` ou promotion d'un déploiement antérieur depuis le tableau de bord Vercel — ne nécessite aucune action sur la base de données tant qu'aucune migration de schéma n'a été appliquée entretemps.
- **Rollback de la base** (uniquement si une migration de schéma a été appliquée et doit être annulée) : restaurer depuis l'export `.sql` le plus récent précédant la migration. Turso ne propose pas de « down migration » automatique côté Prisma avec l'adaptateur libSQL — la restauration manuelle depuis sauvegarde est la méthode de repli.

### Contrôles après rollback

1. `npx vercel logs` pour confirmer l'absence de nouvelles erreurs après le rollback.
2. Revérifier le nombre de lignes des tables critiques contre la sauvegarde restaurée.
3. Rejouer le même parcours minimal qu'à l'étape de validation post-migration (connexion admin, cours LMS, bulletin publié).
4. Confirmer que la version du code déployée correspond bien au commit attendu (`npx vercel ls` puis comparaison du hash affiché).

### Risques identifiés pour une future préproduction

- Aucun test de charge n'a été effectué (nombre d'utilisateurs simultanés, volume de notes/documents générés en masse).
- La sauvegarde Turso ci-dessus est manuelle ; aucune sauvegarde automatique planifiée n'est en place à ce jour.
- `app/(site)/portail/responsable/cours/[id]/page.tsx` contient une vérification `hasRole(session.roles, "ADMIN")` obsolète (même motif que les anomalies déjà corrigées), mais elle est **inatteignable** : `proxy.ts` réserve `/portail/responsable/*` au seul rôle `ACADEMIC_OFFICER`, donc aucun compte ADMIN/SUPER_ADMIN n'atteint jamais cette page. Constat sans impact fonctionnel, nettoyage optionnel pour la cohérence du code, non corrigé à l'Étape 10 car non nécessaire.
- `app/api/observations/route.ts` et `app/api/parent-messages/route.ts` ont été corrigés (commit `663dedb`) — ancien risque, désormais clos.
