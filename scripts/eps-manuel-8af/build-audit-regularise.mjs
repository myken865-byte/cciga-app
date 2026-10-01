// Audit final regularise — Manuel d'EPS 8e AF.
import {
  Paragraph, TextRun, bodyPar, sectionHeading, subHeading, spacer, pageBreak,
  threeColTable, buildAndSave, FONT, NAVY, GOLD, GREY_TEXT,
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, BOX_RETENIR_FILL, BOX_RETENIR_LINE, calloutBox,
} from "./common.mjs";
import { HeadingLevel } from "docx";

const children = [];

children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Audit final régularisé — Manuel d’EPS 8e AF", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Document de contrôle interne — ne constitue pas une homologation officielle", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));

children.push(calloutBox(
  "Portée de cet audit",
  [
    "Cette version régularise les trois points laissés ouverts par l’audit précédent (Références MENFP, Références complémentaires, pages préliminaires), après autorisation explicite de consulter les sites du MENFP.",
    "« Conforme aux orientations et ressources curriculaires MENFP consultées » ne signifie jamais « officiellement approuvé/homologué par le MENFP ». Aucune preuve formelle d’homologation n’a été obtenue ni recherchée.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

children.push(sectionHeading("1. Vérification des sources MENFP", ""));
children.push(bodyPar(
  "Consultation directe effectuée le 21 août 2026 sur deux sites : https://menfp.gouv.ht (portail institutionnel du MENFP) et https://menfp.reseau-canope.fr (plateforme « NectarEduProfHaïti », section Banque de Documents, cours id=61). Les trois documents demandés par la mission de régularisation ont été retrouvés tels quels sur cette dernière plateforme : « Cadre d’orientation curriculaire pour le système éducatif haïtien », « Programmes du troisième cycle de l’enseignement fondamental » et « Guide de l’Enseignant » (intitulés vérifiés à l’identique sur la page consultée)."
));
children.push(bodyPar(
  "Deux constats supplémentaires, documentés par honnêteté plutôt que dissimulés : (1) le lien « NECTAR » affiché sur le portail principal menfp.gouv.ht pointe vers nectar.menfp.gouv.ht, qui renvoyait une erreur « 502 Bad Gateway » au moment du test — l’adresse réellement fonctionnelle est menfp.reseau-canope.fr ; (2) aucun espace ou cours spécifique à l’EPS ou à la 8e AF n’a été trouvé sur la plateforme consultée (liste des cours vérifiée : Formation numérique, SVT, Créole, Histoire-Géographie, Chimie, Mathématiques, Langues vivantes, Philosophie, Physique, et quelques cours administratifs). Aucune quatrième entrée n’a donc été ajoutée, et aucune phrase du type « l’EPS y est présentée comme formation d’un citoyen responsable sur les plans physique, sanitaire et social » n’a été reprise dans les Références, faute d’avoir pu vérifier cette formulation dans le contenu réel des documents (hébergés en externe, non ouverts)."
));
children.push(spacer(160));

children.push(sectionHeading("2. Tableau d’audit mis à jour", ""));
const rows = [
  ["Références institutionnelles (MENFP)", "PASS", "Trois entrées réelles insérées (Cadre d’orientation curriculaire, Programmes du 3e cycle, Guide de l’Enseignant), vérifiées par consultation directe le 21 août 2026, sans auteur/année/ISBN inventés. Voir section 1."],
  ["Références complémentaires", "PASS", "Mention sobre : « aucune référence complémentaire ajoutée à cette version », situation réelle confirmée — aucune source scientifique/pédagogique externe précise n’a été utilisée pour rédiger les 12 chapitres."],
  ["Pages préliminaires — affirmations d’homologation", "PASS", "Aucune occurrence de « approuvé / homologué / certifié / manuel officiel MENFP » trouvée dans le document assemblé (vérifié par recherche automatisée sur le XML), en dehors de la phrase qui les nie explicitement."],
  ["Pages préliminaires — noms de personnes", "PASS", "Aucun nom de préfacier, inspecteur, directeur ou signataire MENFP inventé ; aucun champ de ce type n’était présent ni requis."],
  ["Pages préliminaires — avant-propos : contenu", "PASS", "Présente les finalités du manuel, sa méthode, la sécurité et la non-comparaison entre élèves ; mentionne désormais explicitement la consultation des ressources MENFP (formulation « en cohérence avec des orientations et ressources curriculaires MENFP consultées »), sans revendiquer d’homologation."],
  ["Pages préliminaires — Préface distincte", "NE S’APPLIQUE PAS", "Aucune préface distincte de l’avant-propos n’existe dans ce manuel ; non requise par la mission (« si elle existe »)."],
  ["Pages préliminaires — Table des matières", "PASS", "Les 15 numéros de page de début de section restent exacts après régularisation (les Références gagnent une page en fin de section, ce qui ne déplace aucun numéro de début de section listé dans la table)."],
  ["Chapitre 2 — item A8 du Corrigé (« endurance »)", "À VÉRIFIER (statut inchangé, non modifié)", "Correction proposée séparément ci-dessous (section 3), non appliquée au Chapitre 2 validé ni au Corrigé, en l’absence de validation explicite de l’utilisateur."],
  ["Contenu des 12 chapitres et du Corrigé général", "PASS", "Non modifiés dans cette régularisation, à l’exception de la note d’audit déjà existante sur l’item Ch2-A8 (aucun changement de contenu)."],
  ["Réassemblage et pagination", "PASS", "Manuel_EPS_8AF_2026_2027_FINAL_REGULARISE.docx : 201 pages, 16 sections (3 pages préliminaires en chiffres romains + 198 pages de corps de l’ouvrage), ouverture sans message de réparation Word, mêmes pages de début de section que la version précédente."],
  ["Fichiers finaux précédents", "PASS", "Manuel_EPS_8AF_2026_2027_FINAL.docx/.pdf et Audit_Final_Manuel_EPS_8AF_MENFP.docx/.pdf conservés, non écrasés."],
  ["Export PDF de la version régularisée", "PASS", "Manuel_EPS_8AF_2026_2027_FINAL_REGULARISE.pdf généré avec succès (1,45 Mo)."],
];
children.push(threeColTable(["Axe", "Statut", "Constat"], rows, [4200, 1900, 3200]));
children.push(spacer(200));

children.push(sectionHeading("3. Correction proposée (non appliquée) — Chapitre 2, item A8", ""));
children.push(bodyPar(
  "Rappel : dans l’exercice A-Compléter du chapitre 2, le mot restant du réservoir lexical après élimination logique des sept autres est « endurance », mais la phrase « … t’aide à progresser dans chaque ____ proposée » reste grammaticalement un peu moins naturelle avec ce mot qu’avec les autres items. Proposition de correction, à valider avant toute application : remplacer, dans le fichier source scripts/eps-manuel-8af/build-chapitre2.mjs, le mot du réservoir « endurance » par un terme comme « activité » dans la huitième phrase, ou reformuler la phrase elle-même (par exemple : « … t’aide à progresser dans chaque situation proposée »). Cette correction toucherait un fichier chapitre déjà validé : elle n’a pas été appliquée dans cette régularisation, conformément à la consigne de ne modifier aucun chapitre sans validation explicite."
));
children.push(spacer(200));

children.push(sectionHeading("4. Synthèse chiffrée", ""));
[
  "PASS : 11",
  "À VÉRIFIER : 1 (Chapitre 2, item A8 — statut inchangé, correction proposée en attente de validation)",
  "CORRECTION REQUISE : 0",
  "BLOQUÉ : 0",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 },
  spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(200));

children.push(sectionHeading("5. Fichiers produits dans cette régularisation", ""));
[
  "Manuel_EPS_8AF_References.docx — régénéré avec les références MENFP réelles (pages 196-198).",
  "Manuel_EPS_8AF_PagesPreliminaires.docx — régénéré avec la note de consultation MENFP (pages i-iii).",
  "Manuel_EPS_8AF_2026_2027_FINAL_REGULARISE.docx — nouveau manuscrit assemblé, 201 pages, 16 sections.",
  "Manuel_EPS_8AF_2026_2027_FINAL_REGULARISE.pdf — export PDF correspondant.",
  "Audit_Final_Manuel_EPS_8AF_MENFP_REGULARISE.docx — le présent rapport.",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 },
  spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(200));

children.push(sectionHeading("6. Arrêt obligatoire", ""));
children.push(calloutBox(
  "Ne pas publier, diffuser ou soumettre au MENFP sans ordre explicite",
  [
    "Ce manuscrit régularisé et cet audit ne doivent pas être publiés, imprimés, transmis au MENFP ou présentés comme officiellement homologués.",
    "Les fichiers finaux précédents (non régularisés) restent disponibles et n’ont pas été supprimés.",
    "Le point Chapitre 2 - item A8 reste en l’état ; sa correction proposée attend une validation explicite avant toute application au chapitre source.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));

const outPath = await buildAndSave(children, 1, "Audit_Final_Manuel_EPS_8AF_MENFP_REGULARISE.docx");
console.log("Audit regularise (8e AF) genere:", outPath);
