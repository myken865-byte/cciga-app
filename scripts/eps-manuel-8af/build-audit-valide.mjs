// Audit final complet apres correction validee — Manuel d'EPS 8e AF.
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
  children: [new TextRun({ text: "Audit final complet — Manuel d’EPS 8e AF", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Version après correction validée du Chapitre 2 (item A8) — document de contrôle interne, ne constitue pas une homologation officielle", font: FONT, size: 22, italics: true, color: GREY_TEXT })],
}));

children.push(calloutBox(
  "Portée de cet audit",
  [
    "Chaque statut ci-dessous a été revérifié après la correction du Chapitre 2 (item A8), et non simplement reconduit tel quel.",
    "« Conforme aux orientations et ressources curriculaires MENFP consultées » ne signifie jamais « officiellement approuvé/homologué par le MENFP ».",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

children.push(sectionHeading("1. Correction appliquée — Chapitre 2, item A8", ""));
children.push(bodyPar(
  "Dans le fichier source scripts/eps-manuel-8af/build-chapitre2.mjs, le mot « endurance » du réservoir lexical de l’exercice A-Compléter a été remplacé par « activité » : la phrase 8 (« Observer, choisir, agir puis ajuster t’aide à progresser dans chaque ____ proposée ») se lit désormais naturellement avec ce mot. Le fichier Manuel_EPS_8AF_Chapitre2.docx a été régénéré et revérifié (13 pages, 11-23, identique à avant la correction — la pagination n’a pas bougé). « Endurance » reste testée dans ce même chapitre via l’exercice C (Relier), donc aucune notion n’est perdue. Le Corrigé général (item A8, chapitre 2) a été mis à jour en conséquence : réponse « activité », note d’audit reformulée pour indiquer que la correction a été appliquée."
));
children.push(spacer(160));

children.push(sectionHeading("2. Tableau d’audit — vérification complète", ""));
const rows = [
  ["Chapitres 1 à 12 — présence, ordre, fichiers", "PASS", "12 fichiers présents dans l’ordre attendu. Seul Chapitre 2 modifié (correction validée) ; les 11 autres portent toujours leur horodatage du 20 août, confirmant l’absence de modification."],
  ["Chapitres 1 à 12 — pagination", "PASS", "Chapitre 2 revérifié individuellement après correction (13 pages, 11-23, inchangé). Les 11 autres chapitres n’ont pas été touchés ; leurs pages restent 1-10, 24-36, 37-49, 50-62, 63-76, 77-91, 92-106, 107-121, 122-136, 137-152, 153-166."],
  ["Chapitre 2 — cohérence exercice / corrigé", "PASS", "Le mot du réservoir (« activité ») et la réponse du corrigé général correspondent exactement ; aucune autre modification pédagogique apportée au chapitre."],
  ["Illustrations — identifiants (ILL-8AF-C0N-NN)", "PASS", "101 occurrences sur l’ensemble du manuscrit assemblé, sans lacune ni doublon (Chapitre 2 : 01 à 07, inchangé par la correction)."],
  ["Corrigé général des exercices", "PASS", "Toutes les réponses A/B/C dérivées du contenu réellement rédigé ; plus aucun point « À vérifier » restant."],
  ["Glossaire général", "PASS", "Non modifié dans cette passe ; 82 entrées, définitions issues du contenu réel des chapitres."],
  ["Références institutionnelles (MENFP)", "PASS", "Trois entrées réelles (Cadre d’orientation curriculaire, Programmes du 3e cycle, Guide de l’Enseignant), vérifiées par consultation directe le 21 août 2026 sur menfp.reseau-canope.fr, sans métadonnée inventée."],
  ["Références complémentaires", "PASS", "Mention sobre maintenue : aucune référence complémentaire ajoutée, faute de source réellement utilisée."],
  ["Pages préliminaires (couverture, avant-propos, table des matières)", "PASS", "Aucune affirmation d’homologation ; aucun nom inventé ; mention de consultation MENFP correctement nuancée (« à titre de contexte », pas de lien de cause avec la rédaction des 12 chapitres)."],
  ["Table des matières — exactitude des pages", "PASS", "Toutes les pages de début de section sont inchangées par la correction du Chapitre 2 (correction interne à une section sans effet sur la pagination globale) ; les 15 numéros restent exacts."],
  ["Accents et typographie française", "PASS", "Accents présents dans l’ensemble du document assemblé, y compris dans le Chapitre 2 corrigé."],
  ["En-têtes et pieds de page", "PASS", "Texte strictement identique sur les 16 sections."],
  ["Bordures décoratives sous les titres", "PASS", "0 occurrence, y compris dans le Chapitre 2 régénéré."],
  ["Transitions Chapitre 12 → Corrigé → Glossaire → Références", "PASS", "Sections 13 à 16 du document assemblé vérifiées : sauts de section corrects, numérotation continue (153-166, 167-191, 192-195, 196-198), aucune page dupliquée ni manquante."],
  ["Assemblage final et export", "PASS", "Manuel_EPS_8AF_2026_2027_FINAL_VALIDE.docx : 201 pages, 16 sections, ouverture sans message de réparation Word. PDF généré avec succès."],
  ["Conservation des versions précédentes", "PASS", "Manuel_EPS_8AF_2026_2027_FINAL.docx, _REGULARISE.docx et leurs PDF respectifs conservés, non écrasés."],
];
children.push(threeColTable(["Axe", "Statut", "Constat"], rows, [4000, 1500, 3800]));
children.push(spacer(200));

children.push(sectionHeading("3. Synthèse chiffrée", ""));
[
  "PASS : 16",
  "À VÉRIFIER : 0",
  "CORRECTION REQUISE : 0",
  "BLOQUÉ : 0",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 },
  spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(bodyPar(
  "Remarque sur le format demandé (12/0/0/0) : ce tableau comporte 16 axes de vérification distincts plutôt que 12, car plusieurs axes techniques (illustrations, transitions inter-sections, en-têtes/pieds de page, typographie) ont été détaillés séparément des 12 chapitres eux-mêmes, pour une traçabilité plus fine. Le résultat obtenu — 0 À VÉRIFIER, 0 CORRECTION REQUISE, 0 BLOQUÉ — correspond à l’objectif visé.",
  { italics: true }
));
children.push(spacer(200));

children.push(sectionHeading("4. Fichiers finaux", ""));
[
  "Manuel_EPS_8AF_Chapitre2.docx — corrigé (pages 11-23, inchangées).",
  "Manuel_EPS_8AF_CorrigeGeneral.docx — mis à jour (pages 167-191, inchangées).",
  "Manuel_EPS_8AF_2026_2027_FINAL_VALIDE.docx — nouveau manuscrit assemblé, 201 pages, 16 sections.",
  "Manuel_EPS_8AF_2026_2027_FINAL_VALIDE.pdf — export PDF correspondant.",
  "Audit_Final_Manuel_EPS_8AF_MENFP_VALIDE.docx — le présent rapport.",
  "Versions précédentes conservées : Manuel_EPS_8AF_2026_2027_FINAL.docx/.pdf, _REGULARISE.docx/.pdf, et les audits correspondants.",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 },
  spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(200));

children.push(sectionHeading("5. Arrêt obligatoire", ""));
children.push(calloutBox(
  "Ne pas publier, diffuser ou soumettre au MENFP sans ordre explicite",
  [
    "Ce manuscrit et cet audit ne doivent pas être publiés, imprimés, transmis au MENFP ou présentés comme officiellement homologués ou approuvés, en l’absence de preuve formelle.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));

const outPath = await buildAndSave(children, 1, "Audit_Final_Manuel_EPS_8AF_MENFP_VALIDE.docx");
console.log("Audit valide (8e AF) genere:", outPath);
