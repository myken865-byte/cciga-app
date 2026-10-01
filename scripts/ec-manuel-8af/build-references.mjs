// Manuel d'EC 8e AF — Phase Finale : Références / Sources.
//
// Section consolidée, traçable, distinguant sources normatives, sources
// pédagogiques et ressources de comparaison. Aucune référence ajoutée
// pour enrichir artificiellement la bibliographie ; aucun auteur, date,
// URL, édition ou institution inventés.
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

children.push(sectionHeading("Sources normatives — documents officiels MENFP/DEF", ""));
children.push(bulletPar("Ministère de l'Éducation Nationale et de la Formation Professionnelle (MENFP) / Direction de l'Enseignement Fondamental (DEF). Programme du 3e cycle (7e à 9e Année Fondamentale) — Éducation à la Citoyenneté. Version définitive, 28 juillet 2024. (« EC.pdf ») — source normative principale du contenu des 7 chapitres."));
children.push(bulletPar("MENFP/DEF. Programme du 3e cycle (7e à 9e Année Fondamentale) — Sciences Sociales (Histoire, Géographie). Version définitive, 28 juillet 2024. — consultée en Phase 0 pour le partage de l'horaire combiné avec l'EC ; non utilisée comme source de contenu pédagogique direct dans les 7 chapitres de ce manuel."));
children.push(spacer(200));

children.push(sectionHeading("Textes juridiques/institutionnels mentionnés (non cités verbatim)", ""));
children.push(bodyPar(
  "Les textes suivants sont mentionnés dans les chapitres comme références générales, sans citation exacte " +
  "reproduite — voir la section Annexes et documents pour le détail et le statut [SOURCE À VÉRIFIER] de " +
  "chaque emplacement réservé.",
  { italics: true },
));
children.push(bulletPar("Constitution de la République d'Haïti, 1987."));
children.push(bulletPar("Pacte international relatif aux droits civils et politiques, Organisation des Nations Unies, 1966."));
children.push(bulletPar("Pacte international relatif aux droits économiques, sociaux et culturels, Organisation des Nations Unies, 1966."));
children.push(spacer(200));

children.push(sectionHeading("Sources pédagogiques — œuvres et institutions citées nommément par le programme", ""));
children.push(bodyPar(
  "Ces références sont citées par leur nom seul, comme le fait le programme officiel — aucun contenu d'œuvre " +
  "précis n'est affirmé sans vérification (voir Annexes et documents, `DOC-EC-8AF-C07-01`).",
  { italics: true },
));
children.push(bulletPar("Jacques Roumain — écrivain haïtien cité nommément par le programme MENFP en lien avec l'environnement."));
children.push(bulletPar("Jacques-Stéphen Alexis — écrivain haïtien cité nommément par le programme MENFP."));
children.push(bulletPar("Philton Latortue — artiste cité nommément par le programme MENFP."));
children.push(bulletPar("Sénèque Obin — artiste cité nommément par le programme MENFP."));
children.push(bulletPar("Alex Bellande, essai « Haïti déforestée, paysages remodelés » — cité nommément par le programme MENFP."));
children.push(spacer(200));

children.push(sectionHeading("Institutions publiques haïtiennes mentionnées à titre de connaissance civique générale", ""));
children.push(bodyPar(
  "Ces institutions sont mentionnées dans les chapitres comme exemples factuels et non partisans, sans " +
  "citation d'un texte les instituant.",
  { italics: true },
));
children.push(bulletPar("Structure des trois pouvoirs de l'État haïtien (exécutif, législatif, judiciaire) — Chapitre 3."));
children.push(bulletPar("Niveaux de tribunaux haïtiens (tribunal de paix, première instance, cour d'appel) — Chapitre 5."));
children.push(spacer(200));

children.push(sectionHeading("Ressources de comparaison (benchmarking) — non citées comme sources de contenu", ""));
children.push(bodyPar(
  "Conformément à `06_BENCHMARKING_RESSOURCES_PARALLELES_EC.md` (statut « BENCHMARKING LIMITÉ »), aucun " +
  "manuel privé (Educavision/CIDIHCA ou autre) n'a été consulté en contenu détaillé ni cité comme source : les " +
  "7 chapitres et cette Phase Finale sont des rédactions originales, fondées exclusivement sur le programme " +
  "MENFP et sur des connaissances civiques générales explicitement identifiées comme telles.",
));
children.push(spacer(200));

children.push(sectionHeading("Méthodologie et traçabilité du projet", ""));
children.push(bodyPar(
  "L'ensemble des livrables de Phase 0 et de Validation & Verrouillage de la Collection EC, ainsi que les " +
  "7 chapitres et la Phase Finale du Manuel EC 7e AF, consultés tout au long de la rédaction, constituent la " +
  "documentation de traçabilité interne du projet (non des sources externes) : `04_MATRICE_PROGRESSION_EC_" +
  "7_8_9AF.md`, `05_MATRICE_COMPETENCES_UNITES_EC.md`, `10_TABLE_MATIERES_PROPOSEE_EC_8AF.md`, " +
  "`18_MATRICE_PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, `20_TABLE_MATIERES_EC_8AF_VERROUILLEE.md`, " +
  "`23_CHARTE_EC_VERROUILLEE.md`, `24_PLAN_ILLUSTRATIONS_DOCUMENTS_EC_VERROUILLE.md`.",
));

await buildAndSave(children, 81, "Manuel_EC_8AF_References.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_8e_AF\\08_REFERENCES_FINALES");
