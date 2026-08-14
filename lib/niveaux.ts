export type Niveau = "prescolaire" | "primaire" | "secondaire";

export const niveauList: Niveau[] = ["prescolaire", "primaire", "secondaire"];

export const niveauLabels: Record<Niveau, string> = {
  prescolaire: "Kindergarten / Préscolaire",
  primaire: "Primaire / École fondamentale",
  secondaire: "Secondaire",
};
