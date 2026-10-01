// Références — Manuel d'EPS 8e AF (version régularisée).
// Les trois entrées institutionnelles ci-dessous ont été vérifiées par
// consultation directe du site https://menfp.reseau-canope.fr (plateforme
// "NectarEduProfHaïti", section "Banque de Documents", cours id=61,
// section "Généralités") le 21 août 2026. Les trois titres, orthographe
// comprise, correspondent exactement à ce qui est affiché sur cette page ;
// aucun auteur individuel, aucune année d'édition ni aucun numéro de page
// n'a été ajouté, car ces informations n'apparaissent pas sur la page
// consultée et n'ont pas été vérifiées dans le contenu intégral des
// documents (hébergés en externe, non ouverts dans le cadre de ce travail).
// Aucune ressource spécifique à l'EPS ou à la 8e AF n'a été trouvée sur
// cette plateforme au moment de la consultation ; aucune quatrième entrée
// n'est donc ajoutée.
import {
  Paragraph, TextRun, bodyPar, sectionHeading, subHeading, spacer, pageBreak,
  twoColTable, buildAndSave, FONT, NAVY, GOLD, GREY_TEXT, BOX_SECURITE_FILL, BOX_SECURITE_LINE,
  BOX_RETENIR_FILL, BOX_RETENIR_LINE, calloutBox,
} from "./common.mjs";
import { HeadingLevel } from "docx";

const children = [];

children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { after: 240 },
  children: [new TextRun({ text: "Références", font: FONT, size: 34, bold: true, color: NAVY })],
}));
children.push(new Paragraph({
  spacing: { after: 200 },
  children: [new TextRun({ text: "Manuel d’EPS 8e Année Fondamentale — 2026-2027", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));

children.push(calloutBox(
  "Avertissement méthodologique",
  [
    "Les références institutionnelles ci-dessous ont été vérifiées par consultation directe des sites cités le 21 août 2026 ; elles ne contiennent aucun auteur, année ou numéro de page inventé.",
    "Cette section ne constitue pas une preuve d’homologation du présent manuel par le MENFP. Les ressources citées sont des documents-cadres consultés à titre de contexte curriculaire ; le manuel lui-même n’a fait l’objet d’aucune validation officielle du MENFP.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- A. Références institutionnelles (MENFP) ----
children.push(sectionHeading("A. Références institutionnelles (MENFP)", ""));
children.push(bodyPar(
  "Portail institutionnel principal : République d’Haïti, Ministère de l’Éducation Nationale et de la Formation Professionnelle (MENFP) — https://menfp.gouv.ht (consulté le 21 août 2026). Ce site propose une « Banque de documents » publique (catégorie « Programmes et Curriculum ») qui, au moment de la consultation, ne contenait pas les trois documents ci-dessous pour le fondamental ; ceux-ci ont en revanche été retrouvés et vérifiés sur la plateforme institutionnelle de formation continue du MENFP décrite ci-après."
));
children.push(bodyPar(
  "Plateforme institutionnelle NectarEduProfHaïti — https://menfp.reseau-canope.fr, section « Banque de Documents » (https://menfp.reseau-canope.fr/course/view.php?id=61), consultée le 21 août 2026. Cette plateforme se présente elle-même comme une offre de formation continue proposée par le MENFP aux enseignants, formateurs et cadres du système éducatif haïtien. Note technique : le lien « NECTAR » affiché sur le site institutionnel https://menfp.gouv.ht pointe vers l’adresse nectar.menfp.gouv.ht, qui renvoyait une erreur serveur (« 502 Bad Gateway ») au moment de la consultation ; l’adresse fonctionnelle vérifiée est celle indiquée ci-dessus."
));
children.push(spacer(120));
children.push(twoColTable("Document", "Référence vérifiée", [
  [
    "1. Cadre d’orientation curriculaire",
    "République d’Haïti — Ministère de l’Éducation Nationale et de la Formation Professionnelle (MENFP). Cadre d’orientation curriculaire pour le système éducatif haïtien. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026.",
  ],
  [
    "2. Programmes du 3e cycle",
    "République d’Haïti — Ministère de l’Éducation Nationale et de la Formation Professionnelle (MENFP). Programmes du troisième cycle de l’enseignement fondamental. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026.",
  ],
  [
    "3. Guide de l’Enseignant",
    "République d’Haïti — Ministère de l’Éducation Nationale et de la Formation Professionnelle (MENFP). Guide de l’Enseignant. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026.",
  ],
]));
children.push(spacer(160));
children.push(bodyPar(
  "Limites explicites de ces trois entrées : les pages consultées n’indiquent ni auteur individuel, ni année d’édition, ni numéro ISBN, ni pagination précise — ces éléments ne sont donc pas mentionnés, conformément à la consigne de ne jamais inventer une métadonnée absente. Le contenu intégral de ces documents (hébergés en dehors du domaine menfp.gouv.ht, notamment via des liens Google Drive) n’a pas été ouvert ni analysé dans le cadre de ce travail : ces références attestent l’existence et l’intitulé exact des documents, mais ne permettent pas d’affirmer qu’un passage précis de leur contenu a directement inspiré tel ou tel chapitre du présent manuel.",
  { italics: true }
));
children.push(bodyPar(
  "Aucune ressource spécifique à l’Éducation Physique et Sportive ni à la 8e Année Fondamentale n’a été localisée sur la plateforme NectarEduProfHaïti au moment de la consultation (liste des cours disponibles vérifiée : Formation numérique, SVT, Créole, Histoire et Géographie, Chimie, Mathématiques, Langues vivantes, Philosophie, Physique, et quelques cours administratifs — aucun cours ou espace « EPS » n’y figurait). Aucune quatrième entrée n’est donc ajoutée, conformément à la consigne de ne citer que ce qui a été réellement consulté.",
  { italics: true }
));
children.push(spacer(200));

// ---- B. Références complémentaires (pédagogiques / scientifiques) ----
children.push(sectionHeading("B. Références complémentaires (pédagogiques et scientifiques)", ""));
children.push(bodyPar(
  "Aucune référence complémentaire n’est ajoutée à cette version. Le contenu pédagogique du manuel (progressivité, sécurité, non-comparaison entre élèves, autoévaluation, méthode observer-choisir-agir-ajuster) s’appuie sur des principes généraux et largement partagés en pédagogie de l’EPS, sans qu’un ouvrage, un article ou un auteur précis ait été réellement consulté ou cité pendant la rédaction des douze chapitres. Ajouter ici une référence sans l’avoir vérifiée reviendrait à fabriquer une source ; ce choix est donc délibéré et non un oubli."
));
children.push(spacer(200));

children.push(subHeading("Note de régularisation"));
children.push(bodyPar(
  "Cette section a été mise à jour le 21 août 2026 après autorisation explicite de consulter les sites du MENFP. Les trois entrées institutionnelles ci-dessus remplacent le cadre à compléter de la version précédente. La sous-section B reste volontairement sans référence, faute de source complémentaire réellement utilisée."
));

const outPath = await buildAndSave(children, 196, "Manuel_EPS_8AF_References.docx");
console.log("References (8e AF, regularise) genere:", outPath);
