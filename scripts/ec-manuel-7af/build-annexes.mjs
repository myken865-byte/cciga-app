// Manuel d'EC 7e AF — Phase Finale : Annexes et documents.
//
// Traite les 5 documents réservés (DOC-EC-7AF-*) conformément au plan
// verrouillé (`24_PLAN_ILLUSTRATIONS_DOCUMENTS_EC_VERROUILLE.md`). Aucune
// source officielle inventée ; IDs conservés à l'identique ; statut
// explicite pour chacun, sans reproduction non vérifiée.
import {
  bodyPar, mixedPar, sectionHeading, subHeading, bulletPar, numberedPar,
  calloutBox, threeColTable, spacer, pageBreak, buildAndSave, AlignmentType, TextRun, Paragraph,
  BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, BLEU_CIVIQUE, OR_CITOYEN, ANTHRACITE,
} from "./common.mjs";

const children = [];

children.push(new Paragraph({
  spacing: { after: 300 },
  children: [new TextRun({ text: "Annexes et documents", bold: true, color: BLEU_CIVIQUE, size: 40 })],
}));
children.push(bodyPar(
  "Cette section recense les 5 documents réservés (`DOC-EC-7AF-*`) identifiés au fil des 7 chapitres. Aucun " +
  "de ces documents n'a pu être reproduit textuellement pendant cette Phase Finale : les formulations exactes " +
  "des textes constitutionnels et internationaux concernés n'ont pas été revérifiées en direct dans cette " +
  "session. Chaque emplacement conserve son ID d'origine et son statut réel, sans invention de source ni de " +
  "citation.",
  { italics: true },
));
children.push(spacer(240));

function docEntry(id, chapitre, titre, fonction, sourcePressentie, statut) {
  children.push(subHeading(`${id} — ${titre}`));
  children.push(bodyPar(`Chapitre d'origine : ${chapitre}.`));
  children.push(bodyPar(`Fonction pédagogique : ${fonction}`));
  children.push(bodyPar(`Source institutionnelle pressentie : ${sourcePressentie}`));
  children.push(calloutBox(
    "Statut",
    [statut],
    BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE,
  ));
  children.push(spacer(200));
}

docEntry(
  "DOC-EC-7AF-C01-01",
  "Chapitre 1 — Moi, Haïtien : nation et identité",
  "Extrait sur les symboles nationaux",
  "Fournir une base juridique exacte à la présentation des symboles nationaux (drapeau, hymne, devise, " +
  "armoiries), présentés dans le chapitre comme connaissance civique générale.",
  "Constitution de la République d'Haïti de 1987 (articles relatifs aux symboles de la nation).",
  "[SOURCE À VÉRIFIER] — aucun extrait exact confirmé pendant cette Phase Finale. À compléter lors d'une " +
  "vérification directe et documentée du texte constitutionnel.",
);

docEntry(
  "DOC-EC-7AF-C02-01",
  "Chapitre 2 — Citoyenne, citoyen : mes droits, mes devoirs",
  "Extrait sur les droits et devoirs fondamentaux",
  "Appuyer l'enseignement des droits et devoirs fondamentaux du citoyen par un extrait constitutionnel exact.",
  "Constitution de la République d'Haïti de 1987 (titre relatif aux droits et devoirs du citoyen).",
  "[SOURCE À VÉRIFIER] — aucun extrait exact confirmé pendant cette Phase Finale.",
);

docEntry(
  "DOC-EC-7AF-C02-02",
  "Chapitre 2 — Citoyenne, citoyen : mes droits, mes devoirs",
  "Extrait sur les droits sociaux",
  "Appuyer l'étude de cas sur les droits sociaux (accès à l'eau, au logement, à l'emploi) par un extrait " +
  "international exact.",
  "Déclaration universelle des droits de l'homme (DUDH, 1948), article relatif au niveau de vie suffisant.",
  "[SOURCE À VÉRIFIER] — aucun extrait exact confirmé pendant cette Phase Finale.",
);

docEntry(
  "DOC-EC-7AF-C04-01",
  "Chapitre 4 — Toi comme moi : le principe d'égalité",
  "Extrait sur la dignité, les libertés fondamentales et les droits de l'enfant",
  "Appuyer l'enseignement de la dignité, des libertés fondamentales et du droit à l'éducation par un extrait " +
  "exact.",
  "Constitution de 1987, DUDH, ou Convention internationale des droits de l'enfant (1989), selon le contenu " +
  "confirmé le plus pertinent.",
  "[SOURCE À VÉRIFIER] — aucun extrait exact confirmé pendant cette Phase Finale.",
);

docEntry(
  "DOC-EC-7AF-C06-01",
  "Chapitre 6 — Paix, protection et sécurité au quotidien",
  "Extrait sur le droit à la sûreté et à la protection",
  "Appuyer l'enseignement du droit à la sûreté par une référence exacte, nationale ou internationale.",
  "Constitution de 1987 ou DUDH, article relatif à la sûreté de la personne.",
  "[SOURCE À VÉRIFIER] — aucun extrait exact confirmé pendant cette Phase Finale.",
);

children.push(pageBreak());
children.push(sectionHeading("Synthèse des annexes", ""));
children.push(threeColTable(
  ["ID", "Titre", "Statut"],
  [
    ["DOC-EC-7AF-C01-01", "Symboles nationaux", "SOURCE À VÉRIFIER"],
    ["DOC-EC-7AF-C02-01", "Droits et devoirs fondamentaux", "SOURCE À VÉRIFIER"],
    ["DOC-EC-7AF-C02-02", "Droits sociaux", "SOURCE À VÉRIFIER"],
    ["DOC-EC-7AF-C04-01", "Dignité, libertés, droits de l'enfant", "SOURCE À VÉRIFIER"],
    ["DOC-EC-7AF-C06-01", "Droit à la sûreté", "SOURCE À VÉRIFIER"],
  ],
  [3200, 4400, 2800],
));
children.push(spacer(200));
children.push(bodyPar(
  "Aucun de ces 5 documents n'a été remplacé par un autre, ni reproduit sans vérification. Le statut « SOURCE " +
  "À VÉRIFIER » reflète honnêtement l'état réel des vérifications menées pendant ce projet, conformément à " +
  "la section 3 du Prompt Maître Phase Finale.",
));
children.push(spacer(200));
children.push(bodyPar(
  "Note sur le périmètre : contrairement à une éventuelle collection avec examen d'État direct (comme l'EC " +
  "9e AF), le Manuel d'EC 7e AF ne comporte pas d'annexe d'épreuve officielle — aucun document de ce type " +
  "n'a été identifié ni requis par l'architecture verrouillée pour ce niveau.",
  { italics: true },
));

await buildAndSave(children, 79, "Manuel_EC_7AF_Annexes.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_7e_AF\\12_ANNEXES");
