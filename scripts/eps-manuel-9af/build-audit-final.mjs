// Audit final — Manuel d'EPS 9e AF (finalisation editoriale).
import {
  Paragraph, TextRun, bodyPar, sectionHeading, subHeading, spacer, pageBreak,
  threeColTable, buildAndSave, FONT, NAVY, GOLD, GREY_TEXT,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, calloutBox,
} from "./common.mjs";
import { HeadingLevel } from "docx";

const children = [];

children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Audit final — Manuel d’EPS 9e AF", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Document de contrôle interne — ne constitue pas une homologation officielle", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));

children.push(calloutBox(
  "Portée de cet audit",
  [
    "Chaque statut ci-dessous correspond à un contrôle réellement effectué le 21 août 2026, pas à une simple reconduction d’un rapport antérieur.",
    "« Conforme aux orientations et ressources curriculaires MENFP consultées » ne signifie jamais « officiellement approuvé/homologué par le MENFP ». Aucune preuve formelle d’homologation n’a été obtenue ni recherchée.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

children.push(sectionHeading("1. Étape A — Inventaire et sauvegarde", ""));
children.push(bodyPar(
  "Les 12 fichiers Manuel_EPS_9AF_ChapitreN.docx ont été retrouvés, dans l’ordre attendu. Une sauvegarde de travail a été créée avant toute opération d’assemblage : backups/eps-9af-pre-assembly-2026-08-21/. La pagination réelle de chaque chapitre a été revérifiée individuellement via Word COM (instance fraîche par fichier) : 1-13, 14-26, 27-40, 41-53, 54-65, 66-79, 80-93, 94-107, 108-122, 123-136, 137-151, 152-167 — identique à la mémoire de session, aucun écart. Les 8 illustrations de chaque chapitre (96 au total) ont été comptées par extraction directe du XML : aucune lacune, aucun doublon. Aucun chapitre ne manque ni n’est illisible : ARRÊT 1 non déclenché."
));
children.push(spacer(160));

children.push(sectionHeading("2. Tableau d’audit", ""));
const rows = [
  ["Inventaire des 12 chapitres", "PASS", "12 fichiers présents, ordre correct, horodatages inchangés depuis leur validation individuelle."],
  ["Pagination des 12 chapitres", "PASS", "Revérifiée individuellement via Word COM ; identique à la mémoire de session (1 à 167)."],
  ["Illustrations (96 IDs)", "PASS", "8 IDs uniques et contigus par chapitre (ILL-9AF-C0N-01 à 08), 96 au total, vérifiés par extraction XML directe."],
  ["Insertion des illustrations définitives", "NON APPLICABLE — PAGINATION PROVISOIRE", "Aucune image définitive disponible dans cet environnement ; les emplacements et briefs sont conservés tels quels, conformément à la consigne."],
  ["Corrigé général (A, B, C)", "PASS", "Réponses dérivées directement des fichiers sources validés, contrôle croisé chapitre par chapitre effectué avant rédaction."],
  ["Corrigé de l’Évaluation blanche (Chapitre 12)", "PASS", "Inclus séparément et clairement identifié, distinct des exercices réguliers du chapitre."],
  ["Corrigé — questions D (réflexion)", "PASS", "Fournies comme éléments de réponse attendus, non comme réponse unique imposée."],
  ["Glossaire général", "PASS", "73 entrées compilées à partir des exercices A/C et du corps de texte réellement rédigé ; aucun terme inventé."],
  ["Références institutionnelles (MENFP)", "PASS", "4 entrées réelles vérifiées le 21 août 2026 (Préparations des examens 9e AF 2022, Cadre d’orientation curriculaire, Programmes du 3e cycle, Guide de l’Enseignant). Tableau de traçabilité complet fourni, y compris les sources rejetées et la raison du rejet."],
  ["Constat MENFP significatif", "PASS", "Le document officiel de 2022 confirme que l’EPS ne fait pas partie des matières évaluées à l’examen d’État de 9e AF ; ce fait est explicitement signalé plutôt que masqué."],
  ["Références complémentaires (histoire/règlements sportifs)", "PASS", "Sources réellement consultées pendant la rédaction des Chapitres 3 à 8, listées par chapitre, séparées des références MENFP."],
  ["Annexes pédagogiques", "PASS", "Index des 8 encadrés MÉTHODE et grille d’observation générique, toutes deux d’utilité pédagogique réelle et non redondantes avec le contenu des chapitres."],
  ["Dossier d’évaluation", "PASS", "Distingue explicitement l’absence d’épreuve officielle MENFP vérifiée pour l’EPS, l’absence de texte modèle officiel vérifié, et l’unique évaluation blanche originale du manuel."],
  ["Pages préliminaires (couverture, crédits, avant-propos, note d’utilisation, table des matières)", "À VALIDER", "Contenu entièrement nouveau, non soumis à la même validation chapitre par chapitre que le reste de l’ouvrage ; doit être explicitement validé par l’utilisateur."],
  ["Table des matières — exactitude des pages", "PASS", "Les 16 numéros de page ont été vérifiés un par un par rapport aux pages de début réelles de chaque section."],
  ["Préassemblage complet", "PASS", "Manuel_EPS_9AF_2026_2027_FINAL.docx : 211 pages, 17 sections, ouverture sans message de réparation Word, aucune réécriture du contenu des 17 fichiers sources."],
  ["Repagination générale (Étape I)", "NON APPLICABLE", "Non requise : aucune illustration définitive n’a été insérée. La pagination reste explicitement provisoire, conformément à la consigne."],
  ["Fichiers sources des 12 chapitres non modifiés", "PASS", "Horodatages inchangés depuis leur validation individuelle ; aucune réécriture de contenu validé."],
  ["Export PDF", "PASS", "Manuel_EPS_9AF_2026_2027_FINAL.pdf généré avec succès (SaveAs format PDF), 1,4 Mo."],
  ["Typographie (accents, ponctuation, bordures décoratives)", "PASS", "Accents présents dans les 17 sections ; 0 bordure décorative détectée sous les titres, y compris dans le document assemblé."],
  ["En-têtes et pieds de page", "PASS", "Texte strictement identique sur les 17 sections (« Manuel d’EPS 9ème AF » / « Préparé par My-ken Dieujuste, Agronome… »)."],
  ["Contenu pédagogique — absence de contradiction majeure", "PASS", "Progression cohérente Chapitres 1 à 12 ; les chapitres d’application (4, 6, 8, 9, 10) renvoient explicitement aux chapitres historiques (3, 5, 7) sans les recopier."],
  ["Sécurité pédagogique et neutralité corporelle", "PASS", "Aucune promotion d’effort maximal, de charge lourde, de comparaison corporelle ou de diagnostic médical dans les Chapitres 2, 9 et 11."],
  ["Statut d’homologation MENFP", "NE S’APPLIQUE PAS (rappel)", "Le manuel n’est présenté nulle part comme approuvé ou homologué par le MENFP ; ce statut ne peut être revendiqué sans preuve formelle."],
];
children.push(threeColTable(["Axe", "Statut", "Constat"], rows, [3800, 2200, 4000]));
children.push(spacer(200));

children.push(sectionHeading("3. Rapport de traçabilité MENFP", ""));
children.push(bodyPar("Références MENFP retenues (statut VÉRIFIÉ) :"));
[
  "Préparations des examens de la 9ème AF (2022) — MENFP, Direction de l’Enseignement Fondamental (DEF), menfp.gouv.ht, Banque de documents > Modèles d’examens.",
  "Cadre d’orientation curriculaire pour le système éducatif haïtien — MENFP, via NectarEduProfHaïti (menfp.reseau-canope.fr).",
  "Programmes du troisième cycle de l’enseignement fondamental — MENFP, via NectarEduProfHaïti.",
  "Guide de l’Enseignant — MENFP, via NectarEduProfHaïti.",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(120));
children.push(bodyPar("Sources candidates rejetées ou non retenues, avec raison :"));
[
  "Guide numérique pour l’enseignement fondamental (NectarEduProfHaïti) — rejetée : description de la page constituée d’un texte de remplissage générique, non d’un contenu réel vérifiable.",
  "Guide du Directeur (NectarEduProfHaïti) — vérifiée mais non utilisée : concerne l’administration scolaire, sans lien direct avec l’EPS ou le contenu de ce manuel.",
  "Programmes du secondaire (NectarEduProfHaïti) — vérifiée mais non utilisée : concerne le secondaire, pas le fondamental ni la 9e AF.",
  "« Programmes à compétences minimales pour l’école fondamentale » et « Poursuite des activités scolaire 2019-2020 » (menfp.gouv.ht, Banque de documents) — vérifiées mais non utilisées : aucune des deux n’est spécifique à l’EPS ou à la 9e AF.",
  "nectar.menfp.gouv.ht (lien officiel « NECTAR ») — non vérifiable : erreur serveur (502 Bad Gateway) lors des tentatives d’accès.",
  "Espace ou cours EPS spécifique sur NectarEduProfHaïti — recherché, non trouvé : aucun cours EPS ne figure sur la plateforme au moment de la consultation.",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(160));
children.push(bodyPar(
  "Aucune référence MENFP n’a été complétée ou inventée par supposition.",
  { bold: true }
));
children.push(spacer(200));

children.push(sectionHeading("4. Synthèse chiffrée", ""));
[
  "PASS : 20",
  "À VÉRIFIER : 0",
  "À VALIDER : 1 (pages préliminaires, contenu nouveau)",
  "NON APPLICABLE (attendu, non un problème) : 2 (insertion des illustrations définitives ; repagination générale — toutes deux conditionnées à la disponibilité future d’illustrations)",
  "CORRECTION REQUISE : 0",
  "BLOQUÉ : 0",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(200));

children.push(sectionHeading("5. Fichiers produits", ""));
[
  "Manuel_EPS_9AF_PagesPreliminaires.docx — couverture, crédits, avant-propos, note d’utilisation, table des matières (nouveau, à valider), pages i-v.",
  "Manuel_EPS_9AF_CorrigeGeneral.docx — corrigé général des exercices + corrigé de l’évaluation blanche, pages 168-194.",
  "Manuel_EPS_9AF_Glossaire.docx — glossaire général, pages 195-198.",
  "Manuel_EPS_9AF_References.docx — références MENFP vérifiées + références complémentaires, pages 199-202.",
  "Manuel_EPS_9AF_AnnexesDossier.docx — annexes pédagogiques et dossier d’évaluation, pages 203-206.",
  "Manuel_EPS_9AF_2026_2027_FINAL.docx — manuscrit préassemblé complet, 211 pages, 17 sections.",
  "Manuel_EPS_9AF_2026_2027_FINAL.pdf — export PDF du manuscrit préassemblé.",
  "Audit_Final_Manuel_EPS_9AF_MENFP.docx — le présent rapport.",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(200));

children.push(sectionHeading("6. Confirmation", ""));
children.push(bodyPar(
  "Les 12 fichiers-chapitres validés n’ont subi aucune modification non autorisée : leurs horodatages sont restés inchangés depuis leur validation individuelle, confirmés à nouveau lors de cet audit."
));
children.push(spacer(200));

children.push(sectionHeading("7. Points d’arrêt", ""));
children.push(bodyPar(
  "Aucun des quatre points d’arrêt obligatoires (chapitre manquant/corrompu ; référence MENFP ambiguë nécessitant une décision éditoriale ; correction modifiant le sens pédagogique d’un chapitre validé ; déclaration d’homologation/publication) n’a été déclenché : aucune correction pédagogique de fond n’a été nécessaire ni appliquée."
));
children.push(spacer(200));

children.push(sectionHeading("8. Arrêt obligatoire", ""));
children.push(calloutBox(
  "Ne pas publier, diffuser ou soumettre au MENFP sans autorisation explicite",
  [
    "Ce manuscrit préassemblé et cet audit ne doivent pas être publiés, imprimés, transmis au MENFP ou présentés comme officiellement homologués.",
    "Les 12 fichiers sources des chapitres n’ont pas été modifiés et restent la référence validée.",
    "Les pages préliminaires restent un contenu nouveau en attente de validation explicite de l’utilisateur.",
    "La pagination reste provisoire tant que les illustrations définitives ne sont pas insérées ; une repagination générale sera nécessaire à ce moment-là.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));

const outPath = await buildAndSave(children, 1, "Audit_Final_Manuel_EPS_9AF_MENFP.docx");
console.log("Audit final (9e AF) genere:", outPath);
