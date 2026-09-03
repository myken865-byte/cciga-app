# Suivi psychosocial — rôle Conseiller/Psychologue : état d'audit

## Décision métier : OUI (2026-08-27) — activé en DEV/TEST

## Ce qui a été activé

Le rôle `CONSEILLER` (libellé "Conseiller / Psychologue") existe maintenant dans `lib/roles.ts`, à moindre privilège strict :

| Élément | Preuve |
|---|---|
| Rôle ajouté à `roleList` | `lib/roles.ts` — apparaît automatiquement dans `CreateUserForm`/`EditUserForm` |
| Seule permission accordée : suivi psychosocial | `lib/psychosocialAccess.ts` — `CONSEILLER` ajouté à **ce seul tableau**, aucune autre liste d'accès du projet ne le mentionne |
| Attribution du rôle réservée à SUPER_ADMIN | `privilegedRoles` dans `lib/roles.ts` inclut `CONSEILLER` |
| Portail | Réutilise `/admin/psychosocial` existant — aucune nouvelle page créée |

## Vérification en direct (compte QA réel, preprod isolé)

- `qa.conseiller@cciga.test` (rôle `CONSEILLER` uniquement) → `/admin/psychosocial` : **200**
- Même compte → `/admin/dashboard`, `/admin/finance`, `/admin/courses`, `/admin/badges` : **307** (refusé, aucun accès admin/financier/académique)
- Création réelle d'un dossier psychosocial par ce compte : **201**, `AuditLog.actorId` confirmé = ce compte
- `qa.admin@cciga.test` (rôle `ADMIN`, sans `CONSEILLER`) → `/admin/psychosocial` : **307** (inchangé — l'activation du nouveau rôle n'élargit l'accès de personne d'autre)
- `qa.superadmin@cciga.test` → `/admin/psychosocial` : **200** (supervision SUPER_ADMIN préservée)

Aucune donnée personnelle réelle de démonstration n'a été créée — le compte QA et le dossier de test créé pour la vérification portent tous deux un identifiant/contenu explicitement marqué QA/TEST.
