// Manuel d'EC 7e AF — Phase Finale : Références / Sources.
//
// Section consolidée, traçable, distinguant documents officiels MENFP/DEF,
// textes juridiques/institutionnels effectivement utilisés, et ressources
// pédagogiques consultées. Aucune référence ajoutée pour enrichir
// artificiellement la bibliographie ; aucune source non-MENFP présentée
// comme MENFP.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, spacer, pageBreak,
  buildAndSave, AlignmentType, TextRun, Paragraph, BLEU_CIVIQUE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Références et sources", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(spacer(200));

children.push(sectionHeading("Documents officiels MENFP/DEF", ""));
children.push(bulletPar("Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP) / Direction de l'Enseignement Fondamental (DEF). Programme du 3e cycle (7e à 9e Année Fondamentale) — Éducation à la Citoyenneté. Version définitive, 28 juillet 2024. (« EC.pdf ») — source normative principale du contenu des 7 chapitres."));
children.push(bulletPar("MENFP/DEF. Programme du 3e cycle (7e à 9e Année Fondamentale) — Sciences Sociales (Histoire, Géographie). Version définitive, 28 juillet 2024. (« Domaine des Sciences Sociales.pdf ») — consulté en Phase 0 pour clarifier le partage de l'horaire combiné avec l'EC ; non utilisé comme source de contenu pédagogique direct dans les 7 chapitres."));
children.push(spacer(200));

children.push(sectionHeading("Textes juridiques/institutionnels mentionnés (non cités verbatim)", ""));
children.push(bodyPar(
  "Les textes suivants sont mentionnés dans les chapitres comme références générales (droits et devoirs, " +
  "symboles nationaux, droits de l'enfant), sans citation exacte reproduite — voir la section Annexes et " +
  "documents pour le détail et le statut [SOURCE À VÉRIFIER] de chaque emplacement réservé.",
  { italics: true },
));
children.push(bulletPar("Constitution de la République d'Haïti, 1987."));
children.push(bulletPar("Déclaration universelle des droits de l'homme (DUDH), Organisation des Nations Unies, 1948."));
children.push(bulletPar("Convention internationale relative aux droits de l'enfant, Organisation des Nations Unies, 1989."));
children.push(spacer(200));

children.push(sectionHeading("Institutions publiques haïtiennes citées à titre de connaissance civique générale", ""));
children.push(bodyPar(
  "Ces institutions sont mentionnées au Chapitre 6 comme exemples factuels et non partisans, sans citation " +
  "d'un texte les instituant.",
  { italics: true },
));
children.push(bulletPar("Police Nationale d'Haïti."));
children.push(bulletPar("Direction de la Protection Civile."));
children.push(spacer(200));

children.push(sectionHeading("Méthodologie et traçabilité du projet", ""));
children.push(bodyPar(
  "L'ensemble des livrables de Phase 0 et de Validation & Verrouillage de la Collection EC, consultés et " +
  "cités tout au long de la rédaction des 7 chapitres et de cette Phase Finale, constituent la documentation " +
  "de traçabilité interne du projet (non des sources externes) :",
));
children.push(bulletPar("02_CORPUS_MENFP_EC.md, 04_MATRICE_PROGRESSION_EC_7_8_9AF.md, 05_MATRICE_COMPETENCES_UNITES_EC.md, 09_TABLE_MATIERES_PROPOSEE_EC_7AF.md — Phase 0."));
children.push(bulletPar("17_RAPPORT_VALIDATION_12_POINTS_EC.md, 18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md, 19_TABLE_MATIERES_EC_7AF_VERROUILLEE.md, 22_ARCHITECTURE_PEDAGOGIQUE_EC_VERROUILLEE.md, 23_CHARTE_EC_VERROUILLEE.md, 24_PLAN_ILLUSTRATIONS_DOCUMENTS_EC_VERROUILLE.md, 25_DECISION_VERROUILLAGE_PHASE0_EC.md — Validation & Verrouillage."));
children.push(spacer(200));

children.push(sectionHeading("Note sur le benchmarking", ""));
children.push(bodyPar(
  "Conformément à `06_BENCHMARKING_RESSOURCES_PARALLELES_EC.md` (statut « BENCHMARKING LIMITÉ »), aucun " +
  "manuel privé (Educavision/CIDIHCA ou autre) n'a été consulté en contenu détaillé ni cité comme source : " +
  "les 7 chapitres et cette Phase Finale sont des rédactions originales, fondées exclusivement sur le " +
  "programme MENFP et sur des connaissances civiques générales explicitement identifiées comme telles.",
));

await buildAndSave(children, 85, "Manuel_EC_7AF_References.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\08_REFERENCES_FINALES");
