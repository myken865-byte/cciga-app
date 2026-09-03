# Module Finances / Paiements — état d'audit

## Ce qui est réellement TERMINÉ (vérifié dans le code)

- Enregistrement de paiement : `components/RecordPaymentForm.tsx` → `POST /api/admin/finance/[id]/payments`
  - RBAC réel (`requireSecretariatSession` — ADMIN/SUPER_ADMIN/SECRETARIAT uniquement)
  - Validation : montant positif, entier, étudiant existant
  - Journal d'audit (`AuditLog`) à chaque paiement enregistré
  - Notification in-app envoyée à l'étudiant
- Calcul de solde en temps réel : `fee - paid`, affiché avec code couleur (`app/admin/finance/[id]/page.tsx:37-59`)
- **Génération de reçu PDF réelle et fonctionnelle** : `app/api/admin/finance/[id]/payments/[paymentId]/receipt`, lien de téléchargement présent par paiement
- Visibilité Parent (solde, historique) : `app/(site)/portail/parent/page.tsx`

## Ce qui manque réellement — nécessite une décision/un accès humain

| Élément | Pourquoi je ne peux pas le compléter automatiquement |
|---|---|
| Passerelle de paiement en ligne réelle (carte, MonCash, virement) | Nécessite un compte marchand, des clés API réelles et un choix de fournisseur — **À COMPLÉTER — INTERVENTION HUMAINE REQUISE** |
| Échéancier structuré (1er/2e/3e/4e versement avec dates) | Le modèle `Payment` actuel n'a qu'un total cumulé, pas d'échéances individuelles ; ajouter cette structure exige une décision métier (nombre de versements, dates, montants par école) que je ne peux pas inventer — **À COMPLÉTER — DÉCISION MÉTIER REQUISE** |
| Statut de paiement (payé/partiel/en retard) par versement | Dépend de l'échéancier ci-dessus, même blocage |
| Rapprochement bancaire automatique | Dépend d'une intégration bancaire réelle — **À COMPLÉTER — INTERVENTION HUMAINE REQUISE** |

## Ce qui a été vérifié cette phase (sans modification de code)

Le module a été audité et confirmé fonctionnel pour son périmètre actuel (registre manuel avec traçabilité complète). Aucune modification n'était nécessaire ni possible sans invention de règle métier — conformément à la règle « ne jamais inventer de credentials » et « aucune donnée financière fictive ».

## Architecture d'intégration MonCash / NatCash — code réel, non activé

Aucun identifiant, clé API ou compte marchand réel n'existe dans ce projet. Ce qui suit est du **code réellement écrit et testé**, mais qui reste inerte tant qu'aucun identifiant officiel n'est fourni.

| Élément | État | Preuve |
|---|---|---|
| Abstraction fournisseur (`PaymentProvider`) | **TERMINÉ** — interface stable, 3 implémentations (`manuel`, `moncash`, `natcash`) | `lib/payments/provider.ts` |
| Modèle de données prêt (statut transactionnel, référence, fournisseur) | **TERMINÉ** — additif, rétrocompatible à 100 % (`provider="manuel"`, `status="confirme"` par défaut sur toute ligne existante) | `Payment.provider` / `.providerReference` / `.status` (migration `20260827185815_add_payment_provider_abstraction`) |
| Détection de configuration | **TERMINÉ** — `isConfigured()` vérifie la présence de variables d'environnement, jamais de valeur en dur | `lib/payments/provider.ts` |
| Garde-fou anti-invention | **TERMINÉ** — `initiateTransaction()` lève une erreur explicite `À COMPLÉTER — IDENTIFIANT/API OFFICIEL …` tant que non configuré ; ne simule jamais un succès | idem |
| Visibilité DEV/TEST | **TERMINÉ** — statut des 3 fournisseurs affiché en direct sur `/admin/finance` | `app/admin/finance/page.tsx` |
| Point d'entrée applicatif | `RecordPaymentForm.tsx` → `POST /api/admin/finance/[id]/payments` reste le point d'écriture unique du modèle `Payment` (comportement inchangé) — une passerelle en ligne créerait un `Payment` par le même chemin, pas un modèle parallèle |
| Webhook de confirmation (MonCash/NatCash → serveur) | Emplacement prévu : `app/api/webhooks/moncash/route.ts` (à créer) — recevrait la confirmation de transaction du fournisseur et créerait le `Payment` correspondant après vérification de signature |
| Clés API / secrets marchand | **À COMPLÉTER — IDENTIFIANT/API OFFICIEL MONCASH** (`MONCASH_CLIENT_ID`, `MONCASH_CLIENT_SECRET`) ; **À COMPLÉTER — IDENTIFIANT/API OFFICIEL NATCASH** (`NATCASH_CLIENT_ID`, `NATCASH_CLIENT_SECRET`) — variables d'environnement `.env` uniquement, jamais en dur dans le code |
| Compte marchand | **À COMPLÉTER — COMPTE MARCHAND** — nécessite l'ouverture d'un compte marchand Digicel (MonCash) et/ou Natcom (NatCash) par l'établissement |
| Devise / montants | Les deux passerelles opèrent en HTG — aucune conversion ni taux n'est inventé ici |
| Traçabilité | Chaque paiement confirmé par webhook suivrait exactement le même `writeAuditLog()` que les paiements manuels actuels — aucune nouvelle infrastructure d'audit à construire |

Tant que les identifiants officiels ne sont pas fournis, le registre de paiement manuel actuel (fonctionnel, testé, audité) reste le seul mode de paiement réel de l'application. La page `/admin/finance` affiche en direct que MonCash et NatCash sont "non configurés" — c'est le comportement attendu, pas une erreur.
