# Exports Excel / besoins MENFP — état d'audit

## Ce qui est TERMINÉ (exports Excel génériques)

Générateur générique réutilisable : `lib/excelExport.ts` (basé sur `exceljs`, sans dépendance vulnérable connue).

| Export | Route | Accès | Format |
|---|---|---|---|
| Liste des élèves (globale ou par programme/classe) | `GET /api/admin/exports/eleves?programId=` | SECRETARIAT+ | CCIGA ID, nom, email, programme, école |
| Notes d'un cours | `GET /api/admin/exports/notes/[id]` | SECRETARIAT+ | Étudiant, catégorie/devoir, note, statut, date |
| Présences d'un cours | `GET /api/admin/exports/presences/[id]` | SECRETARIAT+ | Étudiant, date, statut |

Boutons "Exporter (.xlsx)" ajoutés sur `/admin/users` (élèves) et `/admin/courses/[id]` (notes, présences).

## Couche d'adaptation MENFP — prête, aucun gabarit enregistré

`lib/exports/menfpAdapter.ts` expose un registre de gabarits (`registerMenfpTemplate` / `getMenfpTemplate`) et `GET /api/admin/exports/menfp/[templateId]` (SECRETARIAT+) qui génère le fichier dès qu'un gabarit y est enregistré. Tant qu'aucun gabarit officiel n'est fourni, la route renvoie explicitement **501 — À COMPLÉTER — GABARIT OFFICIEL MENFP À FOURNIR** (vérifié en direct sur preprod) plutôt que de produire un fichier inventé.

## Ce qui manque réellement — format officiel MENFP

**À COMPLÉTER — GABARIT OFFICIEL MENFP À FOURNIR/VALIDER.**

Aucun format d'export spécifique au Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP) n'a été inventé. Le MENFP publie ses propres gabarits officiels (listes d'effectifs, relevés, statistiques) selon un format que je n'ai pas les moyens de vérifier de façon fiable. Produire un fichier prétendant respecter ce format sans le modèle officiel en main créerait un risque réel de rejet administratif.

Dès que l'établissement fournit le gabarit officiel (fichier `.xlsx` ou spécification MENFP), il suffit d'appeler `registerMenfpTemplate({ id, label, columns, buildRows })` une seule fois (ex. dans `lib/exports/menfpAdapter.ts` ou un fichier d'initialisation dédié) — aucune route, composant ou modèle existant n'a besoin d'être réécrit. Les exports internes déjà livrés (élèves, notes, présences) continuent de fonctionner indépendamment de cette couche.
