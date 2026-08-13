export interface StaffMember {
  name: string;
  role: string;
  bio: string;
}

export const direction: StaffMember[] = [
  {
    name: "Direction Générale",
    role: "Directeur Général",
    bio: "Responsable de la vision stratégique et de la gouvernance générale du CCIGA.",
  },
  {
    name: "Direction Académique",
    role: "Directeur Académique",
    bio: "Supervise la qualité pédagogique et la cohérence des programmes académiques.",
  },
  {
    name: "Direction Administrative",
    role: "Directeur Administratif",
    bio: "Gère les opérations administratives, financières et logistiques de l'institution.",
  },
];

export function getDirection(): StaffMember[] {
  return direction;
}
