// Audit final — Manuel d'EPS 8e AF (finalisation editoriale).
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
  children: [new TextRun({ text: "Audit final — Manuel d’EPS 8e AF", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Document de contrôle interne — ne constitue pas une homologation officielle", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));

children.push(calloutBox(
  "Portée de cet audit",
  [
    "Cet audit vérifie la cohérence technique, la sécurité pédagogique et l’absence de fabrication de contenu du manuel assemblé. Il ne constitue en aucun cas une homologation, une approbation ou une validation officielle par le MENFP.",
    "« Conforme aux orientations pédagogiques générales de l’EPS » ne signifie jamais « officiellement approuvé par le MENFP ». Aucune preuve formelle d’homologation n’a été obtenue ni recherchée dans le cadre de ce travail.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

children.push(sectionHeading("1. Méthode d’audit", ""));
children.push(bodyPar(
  "Chaque chapitre a été rouvert individuellement (instance Word fraîche à chaque fichier) pour vérifier sa pagination réelle via l’API COM de Word (Sections.Footers.PageNumbers.StartingNumber), après l’échec d’une première tentative de vérification groupée dans une seule instance Word (celle-ci s’est révélée instable, comme observé précédemment dans ce projet). Le contenu XML de chaque fichier a également été inspecté directement (document.xml décompressé) pour vérifier : la présence des accents, l’absence de bordures décoratives sous les titres, l’identité du texte d’en-tête et de pied de page, et la continuité des identifiants d’illustration."
));
children.push(spacer(160));

children.push(sectionHeading("2. Tableau d’audit", ""));
const rows = [
  ["Inventaire des 12 chapitres (présence, ordre, fichiers)", "PASS", "Les 12 fichiers Manuel_EPS_8AF_ChapitreN.docx existent, dans l’ordre attendu, non modifiés depuis leur validation (20 août)."],
  ["Pagination continue des 12 chapitres", "PASS", "Revérifiée individuellement via Word COM : 1-10, 11-23, 24-36, 37-49, 50-62, 63-76, 77-91, 92-106, 107-121, 122-136, 137-152, 153-166. Identique à la mémoire de session."],
  ["Identifiants d’illustration (ILL-8AF-C0N-NN)", "PASS", "101 occurrences au total sur l’ensemble du manuel assemblé, sans doublon ni lacune (4+7+7+8+8+8+9+10+10+10+10+10=101), vérifié par comptage XML."],
  ["En-têtes / pieds de page", "PASS", "Texte strictement identique sur les 16 sections du document assemblé (« Manuel d’EPS 8ème AF » / « Préparé par My-ken Dieujuste, Agronome, professeur d’EPS, d’ETAP et d’EEA »)."],
  ["Bordures décoratives sous les titres", "PASS", "0 occurrence détectée sous Heading1/Heading2 dans les 12 chapitres et dans les nouvelles sections."],
  ["Accents et typographie française (présence)", "PASS", "Présence d’accents confirmée dans chaque fichier. Aucune relecture linguistique exhaustive complète n’a été refaite dans cette passe de finalisation au-delà des vérifications déjà faites chapitre par chapitre ; à considérer si une relecture fine supplémentaire est souhaitée."],
  ["Corrigé général des exercices (A, B, C)", "PASS", "Réponses dérivées directement des fichiers sources validés (mots à compléter, bonnes réponses QCM, correspondances C). Un seul point mineur signalé ci-dessous (chapitre 2)."],
  ["Corrigé général — chapitre 2, item A8", "À VÉRIFIER", "Le mot restant du réservoir lexical (« endurance ») complète la phrase par élimination logique ; formulation un peu moins naturelle que les autres items, mais non fausse. Signalé par prudence, question source non modifiée."],
  ["Corrigé général — questions D (réflexion)", "PASS", "Fournies comme éléments de réponse attendus / critères d’évaluation, et non comme réponse unique imposée, ces questions étant par nature ouvertes."],
  ["Glossaire général", "PASS", "82 entrées compilées à partir des listes « Vocabulaire essentiel » des 12 chapitres ; définitions reprises du contenu réellement rédigé (exercices C-Relier, A-Compléter, ou phrases définitionnelles du corps de texte). Aucun terme ni définition inventés."],
  ["Références institutionnelles (MENFP)", "BLOQUÉ", "Aucun document MENFP précis (titre, date, référence officielle) n’a été consulté pendant la rédaction : impossible de fournir une référence réelle sans fabrication. Cadre à compléter fourni ; nécessite une source vérifiée avant toute diffusion officielle."],
  ["Références complémentaires (pédagogiques/scientifiques)", "BLOQUÉ", "Même situation : aucune source externe précise citée pendant la rédaction. Cadre à compléter fourni, en attente d’informations vérifiées."],
  ["Page de couverture, avant-propos, table des matières", "CORRECTION REQUISE / À VALIDER", "Contenu entièrement nouveau, non soumis à la même validation chapitre par chapitre que le reste de l’ouvrage. Doit être explicitement validé (texte, mise en forme) par l’utilisateur avant diffusion, au même titre que chaque chapitre l’a été."],
  ["Table des matières — exactitude des numéros de page", "PASS", "Les 15 numéros de page de la table des matières ont été vérifiés un par un par rapport aux pages de début réelles de chaque section (confirmées via Word COM)."],
  ["Assemblage final en un seul document continu", "PASS", "Manuel_EPS_8AF_2026_2027_FINAL.docx : 200 pages, 16 sections, ouverture sans message de réparation Word, aucune réécriture du contenu des 16 fichiers sources (uniquement uniformisation technique des sauts de section)."],
  ["Fichiers sources des 12 chapitres non modifiés", "PASS", "Horodatage des 12 fichiers Manuel_EPS_8AF_ChapitreN.docx inchangé depuis leur validation (20 août) ; aucune réécriture de contenu validé."],
  ["Export PDF", "PASS", "Manuel_EPS_8AF_2026_2027_FINAL.pdf généré avec succès via Word (SaveAs format PDF), 1,4 Mo."],
  ["Sécurité pédagogique du contenu", "PASS", "Aucune formulation du corrigé ou du glossaire n’encourage un effort excessif, une compétition dangereuse, un contact violent ou un matériel traditionnel non sécurisé ; cohérent avec les règles de sécurité déjà validées chapitre par chapitre."],
  ["Neutralité corporelle (chapitres 10 et 12)", "PASS", "Le corrigé du chapitre 12 (item D4) reformule explicitement un objectif centré sur l’apparence physique en objectif observable et non comparatif, conformément à la règle du chapitre."],
  ["Statut d’homologation MENFP", "NE S’APPLIQUE PAS (rappel)", "Le manuel n’est présenté nulle part comme approuvé ou homologué par le MENFP. Ce statut ne peut être revendiqué sans preuve formelle."],
];
children.push(threeColTable(
  ["Axe", "Statut", "Constat"],
  rows,
  [4200, 1500, 3300],
));
children.push(spacer(200));

children.push(sectionHeading("3. Éléments bloqués ou en attente de validation", ""));
children.push(bodyPar(
  "Trois éléments nécessitent une décision ou une information de l’utilisateur avant que l’ouvrage puisse être considéré comme définitivement finalisé :"
));
[
  "Références institutionnelles (MENFP) — BLOQUÉ : fournir un document MENFP réel et vérifiable, ou confirmer explicitement qu’aucune référence institutionnelle ne doit être ajoutée pour l’instant.",
  "Références complémentaires — BLOQUÉ : même besoin d’une source vérifiée avant complétion.",
  "Pages préliminaires (couverture, avant-propos, table des matières) — À VALIDER : ce contenu est proposé pour la première fois dans cette passe de finalisation et n’a pas encore reçu la validation chapitre par chapitre appliquée au reste de l’ouvrage.",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 },
  spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(200));

children.push(sectionHeading("4. Fichiers produits", ""));
[
  "Manuel_EPS_8AF_PagesPreliminaires.docx — couverture, avant-propos, table des matières (nouveau, à valider).",
  "Manuel_EPS_8AF_CorrigeGeneral.docx — corrigé général des exercices, pages 167-191.",
  "Manuel_EPS_8AF_Glossaire.docx — glossaire général, pages 192-195.",
  "Manuel_EPS_8AF_References.docx — cadre de références (bloqué, en attente de sources vérifiées), pages 196-197.",
  "Manuel_EPS_8AF_2026_2027_FINAL.docx — manuscrit assemblé complet, 200 pages.",
  "Manuel_EPS_8AF_2026_2027_FINAL.pdf — export PDF du manuscrit assemblé.",
  "Audit_Final_Manuel_EPS_8AF_MENFP.docx — le présent rapport.",
].forEach(t => children.push(new Paragraph({
  numbering: { reference: "bullet-list", level: 0 },
  spacing: { after: 100 },
  children: [new TextRun({ text: t, font: FONT, size: 24 })],
})));
children.push(spacer(200));

children.push(sectionHeading("5. Arrêt obligatoire", ""));
children.push(calloutBox(
  "Ne pas publier, diffuser ou soumettre au MENFP sans validation explicite",
  [
    "Ce manuscrit assemblé et cet audit ne doivent pas être publiés, imprimés, transmis au MENFP ou présentés comme officiellement approuvés.",
    "Les 12 fichiers sources des chapitres n’ont pas été modifiés et restent la référence validée.",
    "Les pages préliminaires (couverture, avant-propos, table des matières) sont un contenu nouveau en attente de validation explicite de l’utilisateur.",
    "Les deux sous-sections de Références restent bloquées, faute de sources réelles vérifiables : aucune correction de fond ne sera apportée sans validation explicite de l’utilisateur, conformément à la consigne reçue.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));

const outPath = await buildAndSave(children, 1, "Audit_Final_Manuel_EPS_8AF_MENFP.docx");
console.log("Audit final (8e AF) genere:", outPath);
