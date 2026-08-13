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
3. Appliquer la migration à Turso : la CLI Prisma standard (`prisma migrate deploy`) **ne fonctionne pas directement avec l'URL Turso** (`libsql://`) — c'est une limitation connue de Prisma avec les adaptateurs de pilote. Il faut appliquer le(s) nouveau(x) fichier(s) `migration.sql` manuellement via le client `@libsql/client`, en pointant vers `.env.production`. (Cette étape nécessite un script ponctuel — demander de l'aide si besoin le moment venu.)
4. Redéployer sur Vercel (voir section précédente).

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
