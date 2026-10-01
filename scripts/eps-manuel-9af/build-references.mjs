// References — Manuel d'EPS 9e AF.
// Protocole anti-invention applique strictement : chaque reference MENFP
// listee a ete reellement ouverte et verifiee le 21 aout 2026 (portail
// officiel menfp.gouv.ht et plateforme institutionnelle NectarEduProfHaiti,
// menfp.reseau-canope.fr). Aucune metadonnee (auteur, annee, ISBN, URL) n'a
// ete completee par supposition. Les references complementaires listees
// sont uniquement celles reellement consultees pendant la redaction des
// chapitres historiques et reglementaires (3, 4, 5, 6, 7, 8).
import {
  Paragraph, TextRun, bodyPar, sectionHeading, subHeading, spacer, pageBreak,
  twoColTable, threeColTable, buildAndSave, FONT, NAVY, GOLD, GREY_TEXT, BOX_SECURITE_FILL, BOX_SECURITE_LINE, calloutBox,
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
  children: [new TextRun({ text: "Manuel d’EPS 9e Année Fondamentale — 2026-2027", font: FONT, size: 24, italics: true, color: GREY_TEXT })],
}));

children.push(calloutBox(
  "Avertissement méthodologique",
  [
    "Les références institutionnelles ci-dessous ont été vérifiées par consultation directe des sites cités le 21 août 2026 ; elles ne contiennent aucun auteur, année ou métadonnée inventés.",
    "Cette section ne constitue pas une preuve d’homologation du présent manuel par le MENFP. Les ressources citées sont des documents-cadres consultés à titre de contexte curriculaire ; le manuel lui-même n’a fait l’objet d’aucune validation officielle du MENFP.",
  ],
  BOX_SECURITE_FILL, BOX_SECURITE_LINE, "8A231A",
));
children.push(spacer(200));

// ---- A. Références institutionnelles (MENFP) ----
children.push(sectionHeading("A. Références institutionnelles (MENFP)", ""));
children.push(bodyPar(
  "Portail institutionnel principal : République d’Haïti, Ministère de l’Éducation Nationale et de la Formation Professionnelle (MENFP) — https://menfp.gouv.ht (consulté le 21 août 2026)."
));
children.push(twoColTable("Document", "Référence vérifiée", [
  [
    "1. Préparations des examens de la 9e AF (2022)",
    "République d’Haïti — MENFP, Direction de l’Enseignement Fondamental (DEF). « Préparations des examens de la 9ème AF (2022) ». Document publié dans la Banque de documents du site officiel https://menfp.gouv.ht, catégorie « Modèles d’examens ». Consulté le 21 août 2026.",
  ],
  [
    "2. Cadre d’orientation curriculaire",
    "République d’Haïti — MENFP. Cadre d’orientation curriculaire pour le système éducatif haïtien. Ressource institutionnelle disponible via la plateforme NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026.",
  ],
  [
    "3. Programmes du 3e cycle de l’enseignement fondamental",
    "République d’Haïti — MENFP. Programmes du troisième cycle de l’enseignement fondamental. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026.",
  ],
  [
    "4. Guide de l’Enseignant",
    "République d’Haïti — MENFP. Guide de l’Enseignant. Ressource institutionnelle disponible via NectarEduProfHaïti (menfp.reseau-canope.fr), Banque de Documents. Consulté le 21 août 2026.",
  ],
]));
children.push(spacer(160));

children.push(subHeading("Constat important issu de la source n°1"));
children.push(bodyPar(
  "Le document « Préparations des examens de la 9ème AF (2022) » précise la structure réelle de l’examen officiel d’État de 9e AF : sept matières évaluées (Communication Française, Mathématiques, Communication Créole, Sciences Sociales, Sciences Expérimentales, Anglais, Espagnol), pour un total de 1600 points. L’Éducation Physique et Sportive n’apparaît pas parmi les matières évaluées dans ce document. Par conséquent, ce manuel ne peut affirmer l’existence d’une épreuve officielle d’EPS pour la 9e AF, faute de preuve documentaire : l’« Évaluation blanche » du Chapitre 12 reste donc, à juste titre, une création pédagogique originale et non officielle."
));
children.push(spacer(160));

children.push(subHeading("Tableau de traçabilité interne"));
children.push(threeColTable(
  ["Source candidate", "Domaine officiel ? / Ouvert ?", "Statut"],
  [
    ["menfp.gouv.ht — Préparations des examens de la 9e AF (2022)", "Oui / Oui", "VÉRIFIÉ — utilisée"],
    ["menfp.reseau-canope.fr — Cadre d’orientation curriculaire", "Oui (plateforme MENFP) / Oui", "VÉRIFIÉ — utilisée"],
    ["menfp.reseau-canope.fr — Programmes du 3e cycle fondamental", "Oui (plateforme MENFP) / Oui", "VÉRIFIÉ — utilisée"],
    ["menfp.reseau-canope.fr — Guide de l’Enseignant", "Oui (plateforme MENFP) / Oui", "VÉRIFIÉ — utilisée"],
    ["menfp.reseau-canope.fr — Guide numérique pour l’enseignement fondamental", "Oui (plateforme) / Oui", "NON VÉRIFIÉ — NE PAS CITER COMME SOURCE OFFICIELLE (description de la page constituée d’un texte de remplissage générique, non d’un contenu réel)"],
    ["menfp.reseau-canope.fr — Guide du Directeur", "Oui (plateforme) / Oui", "Vérifié mais NON UTILISÉE (concerne l’administration scolaire, sans lien direct avec l’EPS ou le contenu de ce manuel)"],
    ["menfp.reseau-canope.fr — Programmes du secondaire", "Oui (plateforme) / Oui", "Vérifié mais NON UTILISÉE (concerne le secondaire, pas le fondamental / la 9e AF)"],
    ["menfp.gouv.ht — Banque de documents, Programmes et Curriculum > Fondamental", "Oui / Oui", "Vérifié : contient uniquement « Programmes à compétences minimales pour l’école fondamentale » et « Poursuite des activités scolaire 2019-2020 » — aucun des deux n’est spécifique à l’EPS ou à la 9e AF ; NON UTILISÉS pour cette raison"],
    ["nectar.menfp.gouv.ht (lien « NECTAR » du portail officiel)", "Oui (domaine officiel) / Non — accès en échec", "NON VÉRIFIABLE — le domaine a retourné une erreur serveur (« 502 Bad Gateway ») lors des tentatives d’accès ; NE PAS CITER COMME SOURCE OFFICIELLE tant que l’accès n’est pas rétabli"],
    ["Espace ou cours EPS spécifique sur NectarEduProfHaïti", "—", "RECHERCHÉ, NON TROUVÉ — aucun cours ni espace consacré à l’EPS n’a été localisé sur la plateforme au moment de la consultation"],
  ],
  [3600, 2600, 3400],
));
children.push(spacer(160));
children.push(bodyPar(
  "Aucune référence MENFP n’a été complétée ou inventée par supposition : chaque entrée « VÉRIFIÉE » ci-dessus correspond à une page réellement ouverte et lue le 21 août 2026, dont le contenu correspond bien au niveau, au cycle ou au cadre éducatif cité.",
  { italics: true }
));
children.push(spacer(200));

// ---- B. Références complémentaires ----
children.push(sectionHeading("B. Références complémentaires (histoire et règlements sportifs)", ""));
children.push(bodyPar(
  "Contrairement au manuel d’EPS 8e AF (dont le contenu ne nécessitait aucune vérification historique externe), plusieurs chapitres de ce manuel — football (Chapitres 3-4), basketball (Chapitres 5-6) et volleyball (Chapitres 7-8) — reposent sur des faits historiques et réglementaires vérifiés à l’aide de sources sportives externes reconnues, consultées et recoupées avant rédaction. Ces sources sont listées ci-dessous, par chapitre concerné ; aucune n’a été ajoutée pour gonfler artificiellement cette bibliographie."
));
children.push(spacer(120));

children.push(subHeading("Chapitres 3 et 4 — Football"));
[
  "Wikipedia (EN). « Haitian Football Federation ».",
  "Wikipedia (EN). « Haiti national football team ».",
  "FIFA.com. « Newcomers Haiti give Italy mighty fright at World Cup 1974 ».",
  "Wikipedia (EN). « Emmanuel Sanon ».",
  "Wikipedia (EN). « Haiti women’s national football team ».",
  "Wikipedia (EN). « 1991 CONCACAF Women’s Championship ».",
  "Wikipedia (EN). « 2023 FIFA Women’s World Cup Group D ».",
  "Wikipedia (EN). « The Football Association ».",
  "IFAB (theifab.com). « Law 13 – Free Kicks » ; The FA (thefa.com). « Law 13 – Free Kicks ».",
].forEach(t => children.push(new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: t, font: FONT, size: 22 })] })));
children.push(spacer(120));

children.push(subHeading("Chapitres 5 et 6 — Basketball"));
[
  "Naismith Basketball Hall of Fame (hoophall.com). « James Naismith ».",
  "Encyclopaedia Britannica. « James Naismith on basketball ».",
  "Springfield College (springfield.edu). « Where Basketball was Invented ».",
  "Naismith International Basketball Foundation (naismithfoundation.org). « History of Basketball ».",
  "FIBA (fiba.basketball). « FIBA celebrates 85th anniversary » ; « 90 years of Olympic basketball ».",
  "Olympics.com. « Olympic basketball: History, top teams… ».",
  "Wikipedia (EN). « Haitian Basketball Federation ».",
  "Wikipedia (EN). « Haiti men’s national basketball team ».",
  "Wikipedia (EN). « Traveling (basketball) » ; « Double dribble ».",
].forEach(t => children.push(new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: t, font: FONT, size: 22 })] })));
children.push(spacer(120));

children.push(subHeading("Chapitres 7 et 8 — Volleyball"));
[
  "International Volleyball Hall of Fame (volleyhall.org). « William G. Morgan ».",
  "Encyclopaedia Britannica. « William G. Morgan ».",
  "Mass Moments (massmoments.org). « Holyoke Man Invents Volleyball ».",
  "New England Historical Society (newenglandhistoricalsociety.com). « In 1895, William Morgan Invents Mintonette ».",
  "FIVB (fivb.com). « History » ; « Basic Rules ».",
  "Olympics.com. « History of volleyball: From origins to the Olympics » ; « The history of Olympic volleyball ».",
].forEach(t => children.push(new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text: t, font: FONT, size: 22 })] })));
children.push(spacer(160));
children.push(bodyPar(
  "Aucune de ces sources n’est une ressource du MENFP : elles ne doivent jamais être présentées comme des normes ou orientations officielles haïtiennes. Elles documentent uniquement des faits d’histoire ou de règlement sportif internationalement reconnus.",
  { italics: true }
));
children.push(spacer(200));

children.push(subHeading("Note de finalisation"));
children.push(bodyPar(
  "Cette section a été rédigée le 21 août 2026, après autorisation explicite de consulter les sites du MENFP et des organismes sportifs cités. Aucune information incertaine n’a été transformée en fait établi ; toute donnée qui n’a pas pu être vérifiée a été explicitement signalée comme telle plutôt qu’omise silencieusement ou inventée."
));

const outPath = await buildAndSave(children, 199, "Manuel_EPS_9AF_References.docx");
console.log("References (9e AF) genere:", outPath);
