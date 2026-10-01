// Manuel d'EC 8e AF — Phase Finale : Annexes et documents.
//
// Traite les 3 documents réservés (DOC-EC-8AF-*) conformément au plan
// verrouillé. Aucune source officielle inventée ; IDs conservés à
// l'identique ; statut explicite pour chacun, sans reproduction non
// vérifiée, sans sceau, signature ou texte juridique fabriqué.
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
  "Cette section recense les 3 documents réservés (`DOC-EC-8AF-*`) identifiés au fil des 7 chapitres. Aucun " +
  "de ces documents n'a pu être reproduit textuellement pendant cette Phase Finale : les formulations exactes " +
  "des textes constitutionnels et des œuvres littéraires concernées n'ont pas été revérifiées en direct dans " +
  "cette session. Chaque emplacement conserve son ID d'origine et son statut réel, sans invention de source " +
  "ni de citation, sans sceau, signature ou texte juridique fabriqué.",
  { italics: true },
));
children.push(spacer(240));

function docEntry(id, chapitre, titre, fonction, sourcePressentie, statut) {
  children.push(subHeading(`${id} — ${titre}`));
  children.push(bodyPar(`Chapitre d'origine : ${chapitre}.`));
  children.push(bodyPar(`Fonction pédagogique : ${fonction}`));
  children.push(bodyPar(`Source institutionnelle ou littéraire pressentie : ${sourcePressentie}`));
  children.push(calloutBox("Statut", [statut], BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE));
  children.push(spacer(200));
}

docEntry(
  "DOC-EC-8AF-C02-01",
  "Chapitre 2 — Citoyenneté et État : approfondir mes droits",
  "Extrait sur les droits civils/politiques et économiques/sociaux",
  "Fournir une base juridique exacte à la distinction entre droits civils/politiques et droits économiques/" +
  "sociaux et culturels, présentée dans le chapitre comme organisation pédagogique du socle de droits déjà " +
  "connu.",
  "Constitution de la République d'Haïti de 1987 ; Pactes internationaux de 1966 (droits civils et " +
  "politiques ; droits économiques, sociaux et culturels).",
  "[SOURCE À VÉRIFIER] — aucun extrait exact confirmé pendant cette Phase Finale. À compléter lors d'une " +
  "vérification directe et documentée du texte concerné.",
);

docEntry(
  "DOC-EC-8AF-C05-01",
  "Chapitre 5 — Débattre et argumenter pour la justice",
  "Extrait sur l'organisation judiciaire et la présomption d'innocence",
  "Appuyer l'enseignement de la présomption d'innocence et de l'organisation judiciaire par un extrait " +
  "constitutionnel exact.",
  "Constitution de la République d'Haïti de 1987 (dispositions relatives à la justice et aux garanties de la " +
  "personne).",
  "[SOURCE À VÉRIFIER] — aucun extrait exact confirmé pendant cette Phase Finale.",
);

docEntry(
  "DOC-EC-8AF-C07-01",
  "Chapitre 7 — Gérer nos ressources durablement",
  "Extrait littéraire ou artistique haïtien sur l'environnement",
  "Illustrer, par un extrait réel, le regard porté par la littérature ou l'art haïtien sur la terre, la " +
  "nature ou les paysages, en appui à l'étude de cas sur le déboisement.",
  "Œuvre de Jacques Roumain, Jacques-Stéphen Alexis, Philton Latortue, Sénèque Obin, ou essai « Haïti " +
  "déforestée, paysages remodelés » d'Alex Bellande — tous cités nommément par le programme MENFP lui-même.",
  "[SOURCE À VÉRIFIER / À FOURNIR] — aucun extrait exact confirmé pendant cette Phase Finale ; aucun contenu " +
  "d'œuvre n'a été inventé, conformément au choix éditorial documenté dans le Chapitre 7.",
);

children.push(pageBreak());
children.push(sectionHeading("Synthèse des annexes", ""));
children.push(threeColTable(
  ["ID", "Titre", "Statut"],
  [
    ["DOC-EC-8AF-C02-01", "Droits civils/politiques et économiques/sociaux", "SOURCE À VÉRIFIER"],
    ["DOC-EC-8AF-C05-01", "Organisation judiciaire, présomption d'innocence", "SOURCE À VÉRIFIER"],
    ["DOC-EC-8AF-C07-01", "Extrait littéraire/artistique sur l'environnement", "SOURCE À VÉRIFIER / À FOURNIR"],
  ],
  [3200, 4400, 2800],
));
children.push(spacer(200));
children.push(bodyPar(
  "Aucun de ces 3 documents n'a été remplacé par un autre, ni reproduit sans vérification. Aucun sceau, " +
  "signature ou texte juridique n'a été fabriqué. Le statut « SOURCE À VÉRIFIER » reflète honnêtement l'état " +
  "réel des vérifications menées pendant ce projet, conformément à la section 5 du Prompt Maître Phase " +
  "Finale.",
));

await buildAndSave(children, 75, "Manuel_EC_8AF_Annexes.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_8e_AF\\12_ANNEXES");
