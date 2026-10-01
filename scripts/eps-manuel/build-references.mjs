// Manuel d'EPS 7e AF — Phase Finale : Références.
//
// Reprend les 3 références institutionnelles MENFP déjà vérifiées par
// consultation directe (21 août 2026, dans le cadre du Manuel d'EPS 8e
// AF) : ces documents couvrent le 3e cycle (7e à 9e AF) dans son
// ensemble, donc s'appliquent identiquement au présent manuel — la
// vérification n'a pas été refaite indépendamment pour la 7e AF, ce qui
// est signalé explicitement ci-dessous plutôt que présenté comme une
// nouvelle consultation.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, spacer, pageBreak,
  buildAndSave, AlignmentType, TextRun, Paragraph, NAVY,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text: "Références", bold: true, color: NAVY, size: 40 })],
}));
children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Manuel d'EPS 7e Année Fondamentale — 2026-2027", italics: true, color: "1B7A6E", size: 26 })],
}));

children.push(sectionHeading("Avertissement méthodologique", ""));
children.push(bodyPar(
  "Les trois références institutionnelles ci-dessous ont été vérifiées par consultation directe des sites " +
  "cités le 21 août 2026, dans le cadre des travaux du Manuel d'EPS 8e Année Fondamentale. Ces documents " +
  "(Cadre d'orientation curriculaire, Programmes du 3e cycle, Guide de l'Enseignant) couvrent le 3e cycle de " +
  "l'enseignement fondamental haïtien dans son ensemble (7e à 9e AF) et s'appliquent donc identiquement au " +
  "présent manuel de 7e AF. Aucune nouvelle consultation indépendante n'a été effectuée spécifiquement pour " +
  "la 7e AF — ce qui est signalé ici par transparence plutôt que présenté comme une vérification distincte.",
));
children.push(bodyPar(
  "Cette section ne constitue pas une preuve d'homologation du présent manuel par le MENFP. Les ressources " +
  "citées sont des documents-cadres consultés à titre de contexte curriculaire ; le manuel lui-même n'a fait " +
  "l'objet d'aucune validation officielle du MENFP.",
));
children.push(spacer(200));

children.push(sectionHeading("A. Références institutionnelles (MENFP)", ""));
children.push(bulletPar("Portail institutionnel principal : République d'Haïti, Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP) — menfp.gouv.ht."));
children.push(bulletPar("Plateforme institutionnelle NectarEduProfHaïti — menfp.reseau-canope.fr, section « Banque de Documents » (menfp.reseau-canope.fr/course/view.php?id=61), consultée le 21 août 2026."));
children.push(spacer(160));

function doc(num, titre, texte) {
  children.push(subHeading(`${num}. ${titre}`));
  children.push(bodyPar(texte));
}

doc("1", "Cadre d'orientation curriculaire", "République d'Haïti — Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP). Cadre d'orientation curriculaire pour le système éducatif haïtien. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026 (dans le cadre du Manuel d'EPS 8e AF).");
doc("2", "Programmes du 3e cycle", "République d'Haïti — Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP). Programmes du troisième cycle de l'enseignement fondamental. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026 (dans le cadre du Manuel d'EPS 8e AF).");
doc("3", "Guide de l'Enseignant", "République d'Haïti — Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP). Guide de l'Enseignant. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026 (dans le cadre du Manuel d'EPS 8e AF).");
children.push(spacer(160));

children.push(bodyPar(
  "Limites explicites de ces trois entrées : les pages consultées n'indiquent ni auteur individuel, ni année " +
  "d'édition, ni numéro ISBN, ni pagination précise — ces éléments ne sont donc pas mentionnés, conformément " +
  "à la consigne de ne jamais inventer une métadonnée absente. Le contenu intégral de ces documents n'a pas " +
  "été ouvert ni analysé dans le cadre de la rédaction du présent manuel de 7e AF : ces références attestent " +
  "l'existence et l'intitulé exact des documents-cadres, sans affirmer qu'un passage précis de leur contenu a " +
  "directement inspiré tel ou tel chapitre.",
));
children.push(bodyPar(
  "Aucune ressource spécifique à l'Éducation Physique et Sportive ni à la 7e Année Fondamentale n'a été " +
  "localisée sur la plateforme NectarEduProfHaïti lors de la consultation du 21 août 2026. Aucune quatrième " +
  "entrée n'est donc ajoutée, conformément à la consigne de ne citer que ce qui a été réellement consulté.",
));
children.push(spacer(200));

children.push(sectionHeading("B. Références complémentaires (pédagogiques et scientifiques)", ""));
children.push(bodyPar(
  "Aucune référence complémentaire n'est ajoutée. Le contenu pédagogique du manuel (progressivité, sécurité, " +
  "non-comparaison entre élèves, coopération, fair-play) s'appuie sur des principes généraux et largement " +
  "partagés en pédagogie de l'EPS, sans qu'un ouvrage, un article ou un auteur précis ait été réellement " +
  "consulté ou cité pendant la rédaction des dix chapitres. Ajouter ici une référence sans l'avoir vérifiée " +
  "reviendrait à fabriquer une source ; ce choix est donc délibéré et non un oubli.",
));

await buildAndSave(children, 124, "Manuel_EPS_7AF_References.docx");
