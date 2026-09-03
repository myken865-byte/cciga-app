# Badges — photo de profil : état d'audit

## Décision métier : OUI (2026-08-27) — implémenté

## Ce qui a été construit

Réutilisation intégrale du mécanisme d'upload déjà en production (`@vercel/blob`, même schéma que `app/api/parent-requests/upload/route.ts`) — aucune nouvelle dépendance.

| Élément | Preuve |
|---|---|
| Champ additif `User.photoUrl String?` | Migration `20260827202800_add_user_photo_url` — nullable, aucune donnée existante affectée |
| Route d'upload (client direct, signée) | `app/api/admin/badges/photo/upload/route.ts` — ADMIN+, JPG/PNG uniquement, 4 Mo max, préfixe `badge-photos/` |
| Enregistrement / suppression de la photo | `app/api/admin/badges/photo/route.ts` (`PATCH`/`DELETE`) — audit loggé (`photo_update` / `photo_remove`) |
| UI de gestion | `components/BadgeManager.tsx` — bouton "Ajouter photo"/"Changer photo"/"Retirer" par badge, aperçu en avatar rond ou initiales |
| Gabarit imprimable | `app/admin/badges/[id]/print/page.tsx` — affiche la photo si présente, sinon un avatar à initiales propre (jamais d'image cassée ni de silhouette générique invraisemblable) |

## Garde-fous respectés

- Aucune vraie photo n'a été collectée, demandée ou simulée par moi-même.
- Comportement propre en l'absence de photo : avatar à initiales, pas d'espace vide ni d'erreur.
- Toute photo de test ajoutée manuellement par un compte QA doit être clairement identifiée DEMO/TEST par son nom de fichier — aucune photo n'a été pré-chargée par cette phase.
