// Manuel d'ETAP 9e AF — Phase Finale, PARTIE VI : Références et sources.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, spacer, pageBreak,
  buildAndSave, AlignmentType, TextRun, Paragraph, VERT,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "PARTIE VI — Références et sources", bold: true, color: VERT, size: 40 })],
}));
children.push(spacer(200));

children.push(sectionHeading("Source normative — document officiel MENFP/DEF", ""));
children.push(bulletPar("Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP) / Direction de l'Enseignement Fondamental (DEF). Programme du 3e cycle (7e à 9e Année Fondamentale) — Éducation à la Technologie et aux Activités Productives (ETAP). Version définitive, 28 juillet 2024, 77 pages (« ETAP (3).pdf »). Consulté via menfp.reseau-canope.fr/course/view.php?id=61. Pages 9e AF (p.56-77) relues et vérifiées page par page le 2026-08-22 — source normative des 6 chapitres, y compris la compétence CAO/FAO de la page 62 (Chapitre 6)."));
children.push(bulletPar("« Option (ETAP).pdf », même émetteur, 38 pages — document complémentaire identifié en Phase 0, non consulté en détail (hors périmètre du tronc commun traité par ce manuel)."));
children.push(spacer(200));

children.push(sectionHeading("Statut des épreuves officielles — recherche documentée", ""));
children.push(bodyPar(
  "Un Examen d'État de 9e Année Fondamentale existe réellement (organisé par le MENFP via le BUNEXE), mais " +
  "aucune preuve n'a été trouvée qu'ETAP en fasse partie — statut « NON CONFIRMÉ PAR SOURCE OFFICIELLE " +
  "DISPONIBLE » (voir `RECHERCHE_EPREUVES_MENFP_ETAP_9AF.md`). Aucune épreuve officielle, aucun barème " +
  "officiel, aucun texte modèle officiel ETAP n'a été localisé. Un résultat commercial privé " +
  "(editions-jpl.com) a été identifié et explicitement écarté : non cité, non utilisé comme source. La " +
  "Partie III de ce manuel (préparation à l'évaluation) est donc composée exclusivement d'épreuves " +
  "d'entraînement originales, jamais présentées comme officielles.",
));
children.push(spacer(200));

children.push(sectionHeading("Logiciels libres cités (Chapitre 6)", ""));
children.push(bodyPar(
  "Cités comme exemples d'applications libres de droits pour la CAO, conformément à la liste fournie par le " +
  "document source (p.62) : 3D Builder, TinkerCAD, FreeCAD, Blender, Google SketchUp. Aucune fonctionnalité " +
  "précise de ces logiciels n'est décrite au-delà de ce qui est de notoriété générale (type de modélisation, " +
  "gratuité, usage courant).",
  { italics: true },
));
children.push(spacer(200));

children.push(sectionHeading("Méthodologie et traçabilité du projet", ""));
children.push(bodyPar(
  "Documentation de traçabilité interne du projet (non des sources externes), consultée tout au long de la " +
  "rédaction : `SOURCES_VERIFIEES_ETAP_9AF.md`, `MATRICE_MENFP_ETAP_9AF.md`, `MATRICE_PROGRESSION_ETAP_7_8_9_" +
  "AF.md`, `TABLE_MATIERES_ETAP_9AF_PROPOSEE.md`, `GATE_5_VS_6_CHAPITRES_ETAP_9AF.md` (gate critique et sa " +
  "résolution du 2026-08-28), `PLAN_CORRIGES_ETAP_9AF.md`, `PLAN_PREPARATION_EVALUATION_ETAP_9AF.md`, " +
  "`PLAN_ILLUSTRATIONS_ETAP_9AF.md`. Manuels ETAP 7e AF et 8e AF (déjà finalisés) consultés en lecture seule " +
  "pour la cohérence de style et de convention, jamais modifiés à l'occasion de ce travail.",
));

await buildAndSave(children, 104, "Manuel_ETAP_9AF_References.docx");
