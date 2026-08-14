export type TeacherModel = "titulaire" | "matiere";

export const teacherModelList: TeacherModel[] = ["titulaire", "matiere"];

export const teacherModelLabels: Record<TeacherModel, string> = {
  titulaire: "Titulaire de classe (un seul enseignant, toutes les matières)",
  matiere: "Enseignant par matière (un enseignant par matière)",
};

export function isTeacherModel(value: unknown): value is TeacherModel {
  return value === "titulaire" || value === "matiere";
}
