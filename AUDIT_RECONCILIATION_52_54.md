# Réconciliation de l'inventaire — 52 vs 54 vs 62 vs 64

_Addendum à `AUDIT_MODULES_CCIGA_APP.md` (préservé intact, non réécrit — NO REDO). Ce document explique, avec preuve technique, comment on passe du total documenté (52) au total canonique réel après les deux phases suivantes : "Intégration des modules institutionnels complémentaires" et "Résolution des 5 points humains"._

## 1. Verdict sur 52 vs 54

- **52** — expliqué, OUI. C'est le total exact documenté dans `AUDIT_MODULES_CCIGA_APP.md` §10 (5 portails + 14 modules principaux + 17 sous-modules + 9 services transversaux + 7 infrastructure), vérifié à nouveau ligne par ligne dans cette phase.
- **54** — expliqué, NON. Aucun fichier du repository n'a jamais contenu ce nombre (recherche exhaustive : `grep -rl "54 élément" --include="*.md" .` → aucun résultat). La reconstitution la plus rigoureuse possible de l'état réel juste avant la phase "modules institutionnels" (52 + le seul élément réellement nouveau et non documenté de la phase "7 travaux", la suite de tests automatisés — voir §2) donne **53**, pas 54. L'écart de 1 entre 53 et 54 ne correspond à aucun élément technique identifiable ; le chiffre 54 apparaissait uniquement dans le texte d'un prompt précédent, jamais dans un artefact du projet. Je ne le force pas a posteriori.

## 2. Ce que la phase "7 travaux avant Google Play" a réellement ajouté (jamais reporté dans le fichier d'audit)

| ID | Catégorie | Élément | Type | Preuve | Comptabilisé dans les 52 ? |
|---|---|---|---|---|---|
| 53 | E. Infrastructure | Suite de tests automatisés (Vitest unitaires + Playwright E2E) | Nouveau | `vitest.config.mts`, `playwright.config.ts`, `tests/*.test.ts`, `tests/e2e/portals.spec.ts` | NON — §11 de l'audit listait explicitement "Suite de tests automatisés (inexistante)" comme travail P2 manquant |

La "Recherche globale" et le "CI avec tests" de cette même phase ne sont **pas** des éléments nouveaux : ils font passer des lignes déjà comptées dans les 52 (`Recherche / Filtres`, `CI (GitHub Actions)`) de PARTIEL à TERMINÉ, sans créer de nouvelle capacité distincte.

**Total juste avant la phase "modules institutionnels" = 52 + 1 = 53.**

## 3. Ce que la phase "Intégration des modules institutionnels complémentaires" a ajouté

Taxonomie appliquée strictement selon les règles anti-double-comptage de `AUDIT_MODULES_CCIGA_APP.md` §2 : un module principal (B) doit avoir son ou ses modèle(s) DB propre(s) et être autonome ; une capacité subordonnée avec ou sans modèle séparé, mais non autonome, est un sous-module (C) rattaché à son parent ; une capacité sans modèle propre, transversale à plusieurs modules, est un service (D).

Révision assumée par rapport au rapport de fin de phase précédent : "Paramètres globaux" y avait été compté comme module principal (B) — il n'a aucun modèle DB propre, c'est un hub de navigation/agrégation, donc reclassé en D. "Génération/formatage des badges" y avait été compté à part — c'est une capacité subordonnée au module Badges (même précédent que "Génération PDF" sous Bulletins ou "Reçus PDF" sous Finances dans les 52 originaux), donc reclassé en sous-module C. Quatre sous-modules supplémentaires (congés, prêt/retour, affectation transport, réservations cantine) avaient été omis du décompte initial alors qu'ils suivent exactement le même patron que les 17 sous-modules déjà comptés (ex. "Palmarès/classement" sous Notes).

| ID | Catégorie | Élément | Type | Fichier / route / modèle | Statut | Comptabilisé avant ? | Preuve |
|---|---|---|---|---|---|---|---|
| 54 | B | Portail Personnel / RH | Nouveau | `Employee`, `EmployeeLeaveRequest` ; `app/admin/personnel/` ; `app/api/admin/employees/*` | TERMINÉ | NON | Modèles Prisma dédiés, CRUD + workflow réel testé en base |
| 55 | B | Contrôle d'accès / Badges | Nouveau | `Badge` ; `app/admin/badges/` ; `app/api/admin/badges` | TERMINÉ | NON | Modèle dédié, statuts, RBAC vérifié en direct |
| 56 | B | Infirmerie | Nouveau | `InfirmaryVisit` ; `app/admin/infirmerie/` | TERMINÉ | NON | Registre confidentiel, accès ADMIN+ |
| 57 | B | Suivi psychosocial | Nouveau | `PsychosocialCase`, `PsychosocialNote` ; `app/admin/psychosocial/` | TERMINÉ (SUPER_ADMIN uniquement) | NON | RBAC le plus restrictif du projet, vérifié en direct |
| 58 | B | Bibliothèque | Nouveau | `Book`, `BookLoan` ; `app/admin/bibliotheque/` | TERMINÉ | NON | Catalogue + prêts, modèles dédiés |
| 59 | B | Transport | Nouveau | `Vehicle`, `TransportAssignment` ; `app/admin/transport/` | TERMINÉ | NON | Aucun véhicule réel inventé |
| 60 | B | Cantine | Nouveau | `CanteenMenu`, `CanteenReservation` ; `app/admin/cantine/` | TERMINÉ | NON | Menus + réservations |
| 61 | B | Inventaire / Patrimoine | Nouveau | `InventoryItem` ; `app/admin/inventaire/` | TERMINÉ | NON | CRUD + suivi d'état |
| 62 | C (→54) | Workflow d'approbation des congés | Nouveau | `app/api/admin/employees/leave/route.ts`, `components/LeaveRequestReview.tsx` | TERMINÉ | NON | Soumis→approuvé/rejeté, audit vérifié |
| 63 | C (→55) | Génération / impression de badge | Nouveau | `app/admin/badges/[id]/print/page.tsx` | TERMINÉ | NON | Gabarit imprimable, sans photo (champ absent) |
| 64 | C (→58) | Prêt / retour | Nouveau | `app/api/admin/bibliotheque/[id]/loan/route.ts` | TERMINÉ | NON | Disponibilité vérifiée avant prêt |
| 65 | C (→59) | Affectation des passagers | Nouveau | `app/api/admin/transport/[id]/assign/route.ts` | TERMINÉ | NON | — |
| 66 | C (→60) | Réservations | Nouveau | `app/api/admin/cantine/[id]/reserve/route.ts` | TERMINÉ | NON | — |
| 67 | D | Exports Excel génériques | Nouveau | `lib/excelExport.ts` ; `app/api/admin/exports/{eleves,notes,presences}` | TERMINÉ (générique) | NON | 3 routes vérifiées en direct, boutons UI |
| 68 | D | Paramètres globaux (hub) | Nouveau | `app/admin/parametres/page.tsx` | TERMINÉ | NON | Aucun modèle propre — agrège l'existant, reclassé D (voir ci-dessus) |

**15 éléments ajoutés** par cette phase (8 B + 5 C + 2 D). Note : le rapport de fin de phase précédent annonçait "10 nouveaux éléments" — ce chiffre sous-comptait les sous-modules par manque de granularité ; 15 est le chiffre corrigé et défendu ici, ligne par ligne, dans le tableau ci-dessus.

**Total après la phase "modules institutionnels" = 53 + 15 = 68.**

## 4. Ce que la phase "Résolution des 5 points humains" ajoute

| ID | Catégorie | Élément | Type | Fichier / route / modèle | Statut | Comptabilisé avant ? | Preuve |
|---|---|---|---|---|---|---|---|
| 69 | C (rattaché au module #9 Finances, existant) | Abstraction fournisseur de paiement (MonCash/NatCash prêts, non activés) | Nouveau | `lib/payments/provider.ts` ; `Payment.provider/.providerReference/.status` (migration `20260827185815`) | TERMINÉ (abstraction) — bloqué sur identifiants réels | NON | 6 tests unitaires (`tests/paymentProvider.test.ts`), statut affiché en direct sur `/admin/finance` |
| 70 | C (rattaché au module #12 Centre de commandement, existant) | Évolution pluriannuelle des admissions | Nouveau | `components/AdminCommandCenter.tsx`, `app/admin/centre-de-commandement/page.tsx` | TERMINÉ | NON | Données réelles (`AdmissionSubmission.submittedAt`), vérifié en direct sur preprod |

La couche d'adaptation MENFP (`lib/exports/menfpAdapter.ts`) et la centralisation RBAC du suivi psychosocial (`lib/psychosocialAccess.ts`) sont des **extensions internes** de l'élément #67 (Exports Excel) et de l'élément #57 (Suivi psychosocial) respectivement — pas de nouvelles capacités utilisateur distinctes, donc pas de nouvelle ligne.

**2 éléments ajoutés** par cette phase.

**Total après la phase "5 points humains" = 68 + 2 = 70.**

## 6. Ce que la phase "Fermeture des 3 décisions métier" ajoute

Décisions métier activées : rôle CONSEILLER/PSYCHOLOGUE (OUI), photo sur badge (OUI), historisation pluriannuelle des effectifs (OUI).

| ID | Catégorie | Élément | Type | Fichier / route / modèle | Statut | Comptabilisé avant ? | Preuve |
|---|---|---|---|---|---|---|---|
| 71 | C (rattaché à #57 Suivi psychosocial) | Rôle CONSEILLER/PSYCHOLOGUE activé (RBAC à moindre privilège) | Nouveau | `lib/roles.ts` (+`CONSEILLER`), `lib/psychosocialAccess.ts` (1 ligne modifiée) | TERMINÉ | NON | RBAC vérifié en direct : CONSEILLER → 200 sur `/admin/psychosocial`, 307 sur dashboard/finance/courses/badges ; écriture réelle testée, `AuditLog.actorId` confirmé |
| 72 | C (rattaché à #55 Badges) | Photo de profil sur badge | Nouveau | `User.photoUrl` (migration `20260827202800`), `app/api/admin/badges/photo/{,upload}/route.ts`, `components/BadgeManager.tsx`, gabarit imprimable | TERMINÉ | NON | Upload non authentifié refusé (401) ; persistance + `AuditLog` (`photo_update`/`photo_remove`) vérifiés en direct ; avatar à initiales en l'absence de photo |
| 73 | C (rattaché à #12 Centre de commandement) | Historisation pluriannuelle des effectifs (capture + comparaison) | Nouveau | `EnrollmentSnapshot` (migration `20260827202906`), `app/api/admin/pilotage/snapshot/route.ts`, `components/AdminCommandCenter.tsx` | TERMINÉ | NON | Capture réelle vérifiée en direct (2 programmes, année active `QA_2026-2027`) ; ré-capture confirmée idempotente (upsert, aucune ligne dupliquée, aucune autre année écrasée) |

Aucune de ces trois décisions n'a créé de nouveau portail ni de nouveau module principal autonome : les trois s'intègrent aux modules déjà comptés (#57, #55, #12), donc classées C.

**3 éléments ajoutés** par cette phase.

## 7. Total canonique final

```
TOTAL CANONIQUE AVANT INTÉGRATION (fin phase "5 points humains")        = 70
NOUVEAUX ÉLÉMENTS UNIQUES AJOUTÉS (phase "3 décisions métier")          =  3
TOTAL CANONIQUE APRÈS INTÉGRATION                                       = 73

Détail par catégorie :
PORTAILS               = 5   (inchangé)
MODULES PRINCIPAUX     = 22  (14 + 8)
SOUS-MODULES           = 27  (17 + 5 + 2 + 3)
SERVICES TRANSVERSAUX  = 11  (9 + 2)
INFRASTRUCTURE         = 8   (7 + 1)
─────────────────────────────────
TOTAL CANONIQUE        = 73  (5+22+27+11+8)
```

ÉCART 52/54 EXPLIQUÉ = NON (54 n'a aucune trace technique ; 52 est confirmé exact comme point de départ documenté). Le chemin de reconstitution vérifiable est **52 → 53 → 68 → 70 → 73**, jamais 54.
