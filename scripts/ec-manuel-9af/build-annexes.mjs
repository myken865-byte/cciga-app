// Manuel d'EC 9e AF — Phase Finale : Annexes et documents.
//
// Traite les 5 documents réservés (DOC-EC-9AF-*) identifiés dans les
// Chapitres 1, 2, 5, 6 et 7. Aucune source officielle inventée ; IDs
// conservés à l'identique ; statut explicite pour chacun, sans
// reproduction non vérifiée, sans sceau, signature ou texte juridique
// fabriqué.
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
  "Cette section recense les 5 documents réservés (`DOC-EC-9AF-*`) identifiés au fil des 7 chapitres. Aucun de " +
  "ces documents n'a pu être reproduit textuellement pendant cette Phase Finale : les formulations exactes des " +
  "textes institutionnels concernés n'ont pas été revérifiées en direct dans cette session. Chaque emplacement " +
  "conserve son ID d'origine et son statut réel, sans invention de source ni de citation, sans sceau, " +
  "signature ou texte juridique fabriqué.",
  { italics: true },
));
children.push(spacer(240));

function docEntry(id, chapitre, titre, fonction, sourcePressentie, statut) {
  children.push(subHeading(`${id} — ${titre}`));
  children.push(bodyPar(`Chapitre d'origine : ${chapitre}.`));
  children.push(bodyPar(`Fonction pédagogique : ${fonction}`));
  children.push(bodyPar(`Source institutionnelle pressentie : ${sourcePressentie}`));
  children.push(calloutBox("Statut", [statut], BOX_TEXTEREF_FILL, BOX_TEXTEREF_LINE, ANTHRACITE));
  children.push(spacer(200));
}

docEntry(
  "DOC-EC-9AF-C01-01",
  "Chapitre 1 — Citoyenne, citoyen du monde",
  "Fiche descriptive du Parc national historique (Citadelle, Sans-Souci, Ramiers)",
  "Fournir une fiche exacte et vérifiée sur ce site et sa reconnaissance internationale, en appui à la notion " +
  "de patrimoine mondial introduite dans le chapitre.",
  "Fiche d'inscription du bien au patrimoine mondial de l'UNESCO (date d'inscription 1982, critères " +
  "d'inscription) et documentation institutionnelle haïtienne relative au site.",
  "[SOURCE À VÉRIFIER] — la date de 1982 relève de la notoriété publique générale [ADAPTATION PÉDAGOGIQUE], " +
  "non revérifiée en direct sur une source institutionnelle pendant cette Phase Finale ; aucun autre détail " +
  "n'a été ajouté au-delà de ce constat général.",
);

docEntry(
  "DOC-EC-9AF-C02-01",
  "Chapitre 2 — Citoyen et citoyenneté, ici et dans le monde",
  "Extrait exact du préambule de la Déclaration universelle des droits de l'homme (DUDH)",
  "Illustrer, par une citation exacte, la portée universelle des droits fondamentaux évoquée dans le chapitre.",
  "Déclaration universelle des droits de l'homme, Organisation des Nations Unies, 1948, préambule.",
  "[SOURCE À VÉRIFIER] — aucune formulation exacte n'est reproduite ici tant qu'elle n'a pas été confirmée " +
  "auprès du texte officiel.",
);

docEntry(
  "DOC-EC-9AF-C05-01",
  "Chapitre 5 — Résoudre les conflits, connaître la justice",
  "Fiche sur le rôle des institutions chargées de faire respecter la loi",
  "Appuyer, par une fiche exacte, la distinction établie dans le chapitre entre institutions judiciaires et " +
  "institutions chargées de faire respecter la loi, dans leur fonction d'appui à la justice.",
  "Documentation institutionnelle haïtienne relative aux organismes chargés de l'application des décisions de " +
  "justice.",
  "[SOURCE À VÉRIFIER] — aucun détail précis n'est affirmé ici au-delà de la présentation générale et " +
  "simplifiée déjà donnée dans le chapitre.",
);

docEntry(
  "DOC-EC-9AF-C06-01",
  "Chapitre 6 — Sécurité nationale et coopération internationale",
  "Fiche sur une institution internationale ou une ONG intervenant en matière de paix ou d'aide humanitaire " +
  "en Haïti",
  "Illustrer, par une fiche exacte, le rôle concret d'une institution internationale ou d'une ONG dans la " +
  "préservation de la paix, sans se limiter à une présentation générique.",
  "Documentation publique d'une institution internationale ou d'une ONG active en Haïti dans le domaine de la " +
  "paix ou de l'aide humanitaire (organisation non nommée dans le chapitre par choix éditorial de prudence).",
  "[SOURCE À VÉRIFIER / À FOURNIR] — aucune organisation précise n'a été nommée ni détaillée pendant cette " +
  "Phase Finale, conformément au choix éditorial documenté dans le Chapitre 6.",
);

docEntry(
  "DOC-EC-9AF-C07-01",
  "Chapitre 7 — Développement durable et coopération internationale",
  "Fiche sur une institution internationale ou une ONG environnementale intervenant en Haïti",
  "Illustrer, par une fiche exacte, le rôle concret d'une institution internationale ou d'une ONG " +
  "environnementale, en appui à la dimension internationale du développement durable étudiée dans le chapitre.",
  "Documentation publique d'une institution internationale ou d'une ONG environnementale active en Haïti " +
  "(organisation non nommée dans le chapitre par choix éditorial de prudence).",
  "[SOURCE À VÉRIFIER / À FOURNIR] — aucune organisation précise n'a été nommée ni détaillée pendant cette " +
  "Phase Finale, conformément au choix éditorial documenté dans le Chapitre 7.",
);

children.push(pageBreak());
children.push(sectionHeading("Synthèse des annexes", ""));
children.push(threeColTable(
  ["ID", "Titre", "Statut"],
  [
    ["DOC-EC-9AF-C01-01", "Parc national historique (patrimoine mondial)", "SOURCE À VÉRIFIER"],
    ["DOC-EC-9AF-C02-01", "Préambule de la DUDH", "SOURCE À VÉRIFIER"],
    ["DOC-EC-9AF-C05-01", "Institutions chargées de faire respecter la loi", "SOURCE À VÉRIFIER"],
    ["DOC-EC-9AF-C06-01", "Institution internationale/ONG — paix", "SOURCE À VÉRIFIER / À FOURNIR"],
    ["DOC-EC-9AF-C07-01", "Institution internationale/ONG — environnement", "SOURCE À VÉRIFIER / À FOURNIR"],
  ],
  [3200, 4400, 2800],
));
children.push(spacer(200));
children.push(bodyPar(
  "Aucun de ces 5 documents n'a été remplacé par un autre, ni reproduit sans vérification. Aucun sceau, " +
  "signature ou texte juridique n'a été fabriqué. Le statut « SOURCE À VÉRIFIER » (ou « À FOURNIR » lorsque " +
  "aucune organisation précise n'a pu être identifiée par prudence éditoriale) reflète honnêtement l'état réel " +
  "des vérifications menées pendant ce projet, conformément à la section 9 du Prompt Maître Phase Finale.",
));

await buildAndSave(children, 108, "Manuel_EC_9AF_Annexes.docx", "C:\\Users\\Me. Alcide\\Desktop\\LIVRES_EC\\EC_9e_AF\\12_ANNEXES");
