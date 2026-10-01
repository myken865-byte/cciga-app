// Manuel d'EC 9e AF — Phase Finale : Références / Sources.
//
// Section consolidée, traçable, distinguant sources normatives, sources
// d'examen, textes juridiques/institutionnels mentionnés et ressources de
// comparaison. Aucune référence ajoutée pour enrichir artificiellement la
// bibliographie ; aucun auteur, date, URL, édition ou institution inventés.
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
children.push(spacer(200));

children.push(sectionHeading("Ressource d'examen — Texte modèle EC 9e AF (statut vérifié)", ""));
children.push(bodyPar(
  "Cette ressource a servi de repère de FORMAT et de THÈME pour les blocs « Préparation à l'examen officiel " +
  "de 9e AF » de chaque chapitre et pour l'examen blanc de cette Phase Finale — jamais comme source de " +
  "contenu reproduit.",
  { italics: true },
));
children.push(bulletPar("« EXAMENS DE 9ème ANNÉE FONDAMENTALE », matière Éducation à la Citoyenneté, juillet 2024, MENFP/DEF/BUNEXE. Document identifié et documenté en Phase 0 (`07_INVENTAIRE_EXAMENS_EC_9AF.md`, `08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`), statut [TEXTE MODÈLE] — jamais requalifié en « examen officiel » dans ce manuel. Accès : source tierce (haitilibre.com), non le site officiel menfp.gouv.ht. Statut de reproduction : [DROITS / SOURCE À RÉGLER] — aucun énoncé de ce document n'a été reproduit dans les 7 chapitres ni dans cette Phase Finale."));
children.push(bulletPar("Aucun document d'examen daté 2025 ou 2026 spécifique à l'EC n'a été localisé et vérifié à ce jour — statut [À VÉRIFIER — PREUVE À FOURNIR], inchangé depuis le Chapitre 1."));
children.push(spacer(200));

children.push(sectionHeading("Textes juridiques/institutionnels mentionnés (non cités verbatim)", ""));
children.push(bodyPar(
  "Les textes suivants sont mentionnés dans les chapitres comme références générales, sans citation exacte " +
  "reproduite — voir la section Annexes et documents pour le détail et le statut de chaque emplacement " +
  "réservé.",
  { italics: true },
));
children.push(bulletPar("Constitution de la République d'Haïti, 1987."));
children.push(bulletPar("Déclaration universelle des droits de l'homme, Organisation des Nations Unies, 1948 (préambule notamment, voir `DOC-EC-9AF-C02-01`)."));
children.push(spacer(200));

children.push(sectionHeading("Institutions publiques et internationales mentionnées à titre de connaissance civique générale", ""));
children.push(bodyPar(
  "Ces institutions sont mentionnées dans les chapitres comme exemples factuels et non partisans, sans " +
  "citation d'un texte les instituant, ni détail non vérifié.",
  { italics: true },
));
children.push(bulletPar("Police Nationale d'Haïti — mentionnée depuis la 7e AF, reprise au Chapitre 6 dans le cadre de l'Activité citoyenne."));
children.push(bulletPar("Niveaux de tribunaux haïtiens (tribunal de paix, première instance, cour d'appel, cour de cassation) — Chapitre 5."));
children.push(bulletPar("Organisation des Nations Unies — mentionnée à titre d'exemple d'institution internationale contribuant à la paix, Chapitre 6."));
children.push(bulletPar("Parc national historique (Citadelle, Sans-Souci, Ramiers) — Chapitre 1, voir `DOC-EC-9AF-C01-01` pour le statut de vérification de sa reconnaissance internationale."));
children.push(spacer(200));

children.push(sectionHeading("Ressources de comparaison (benchmarking) — non citées comme sources de contenu", ""));
children.push(bodyPar(
  "Conformément à `06_BENCHMARKING_RESSOURCES_PARALLELES_EC.md` (statut « BENCHMARKING LIMITÉ »), aucun " +
  "manuel privé (Educavision/CIDIHCA ou autre) n'a été consulté en contenu détaillé ni cité comme source : les " +
  "7 chapitres et cette Phase Finale sont des rédactions originales, fondées exclusivement sur le programme " +
  "MENFP, sur la ressource d'examen documentée ci-dessus, et sur des connaissances civiques générales " +
  "explicitement identifiées comme telles.",
));
children.push(spacer(200));

children.push(sectionHeading("Méthodologie et traçabilité du projet", ""));
children.push(bodyPar(
  "L'ensemble des livrables de Phase 0 et de Validation & Verrouillage de la Collection EC, ainsi que les " +
  "manuels EC 7e AF et EC 8e AF (Phase Finale incluse pour les deux, consultés en lecture seule pour délimiter " +
  "les acquis, jamais modifiés), constituent la documentation de traçabilité interne du projet (non des " +
  "sources externes) : `04_MATRICE_PROGRESSION_EC_7_8_9AF.md`, `07_INVENTAIRE_EXAMENS_EC_9AF.md`, " +
  "`08_MATRICE_EXIGENCES_EVALUATION_EC_9AF.md`, `11_TABLE_MATIERES_PROPOSEE_EC_9AF.md`, `18_MATRICE_" +
  "PROGRESSION_EC_7_8_9AF_VERROUILLEE.md`, `21_TABLE_MATIERES_EC_9AF_VERROUILLEE.md`, `23_CHARTE_EC_" +
  "VERROUILLEE.md`, `24_PLAN_ILLUSTRATIONS_DOCUMENTS_EC_VERROUILLE.md`.",
));

await buildAndSave(children, 115, "Manuel_EC_9AF_References.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\08_REFERENCES_FINALES");
