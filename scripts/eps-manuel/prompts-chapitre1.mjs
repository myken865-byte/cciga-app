// Structured illustration definitions for Chapitre 1 — Comprendre
// l'éducation physique et sportive. Each entry maps 1:1 to an
// "Illustration 1.N" already described (as a placeholder brief) in the
// canonical Chapitre 1 docx (LIVRES_EPS/EPS_7e_AF/01_CHAPITRES/Chapitre_01/).
// Fields derived directly from the brief/légende/fonction already written
// there — no new pedagogical content invented, only reformatted into the
// structured schema expected by prompt-builder.mjs.
import { buildImagePrompt } from "./prompt-builder.mjs";

const AGE = "élèves d'environ 12-13 ans (7e Année Fondamentale)";
const COUR = "cour d'école haïtienne, sol en terre battue, quelques bâtiments scolaires simples en arrière-plan";

export const CHAPITRE = 1;

export const ILLUSTRATIONS = [
  {
    numero: 1,
    nomFichier: "ch01_ill01_seance_eps.png",
    legende: "Une séance d'EPS dans une cour d'école haïtienne.",
    emplacement: "Section d'ouverture du chapitre, après la situation de départ",
    size: "1536x1024",
    fields: {
      sujet: "scène d'ouverture d'une séance d'EPS scolaire, ancrant la notion dans un contexte haïtien concret",
      nombrePersonnes: "6 à 8 élèves plus l'enseignant(e)",
      age: AGE,
      environnement: COUR + ", avec des lignes tracées à la craie au sol",
      action: "l'enseignant(e) donne des consignes avec un sifflet ; les élèves, en tenue simple (short, tee-shirt, tennis), sont attentifs et alignés en rang",
      position: "élèves debout, alignés, attentifs ; enseignant en position de meneur face au groupe",
      materiel: "un ballon et quelques cônes ou pierres utilisés comme repères au sol",
      angle: "plan large montrant l'ensemble de la scène (groupe et enseignant)",
      composition: "environnement modeste, réaliste, sans matériel luxueux",
      securite: "scène calme, organisée, aucun risque visible",
      exclusions: "aucun texte dans l'image",
    },
  },
];

export function promptFor(entry) {
  return buildImagePrompt(entry.fields);
}
