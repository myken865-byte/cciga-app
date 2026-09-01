export const lessonContentTypes = ["texte", "fichier", "video"] as const;

export type LessonContentType = (typeof lessonContentTypes)[number];

export function isLessonContentType(value: unknown): value is LessonContentType {
  return typeof value === "string" && (lessonContentTypes as readonly string[]).includes(value);
}

export const lessonContentTypeLabels: Record<LessonContentType, string> = {
  texte: "Texte",
  fichier: "Fichier",
  video: "Vidéo",
};

export const quizQuestionTypes = ["qcm", "vrai_faux", "reponse_courte"] as const;

export type QuizQuestionType = (typeof quizQuestionTypes)[number];

export function isQuizQuestionType(value: unknown): value is QuizQuestionType {
  return typeof value === "string" && (quizQuestionTypes as readonly string[]).includes(value);
}

export const quizQuestionTypeLabels: Record<QuizQuestionType, string> = {
  qcm: "Choix multiple",
  vrai_faux: "Vrai / Faux",
  reponse_courte: "Réponse courte",
};

/** Auto-gradable types: correctAnswer is compared exactly. reponse_courte is never auto-graded. */
export function isAutoGradable(type: QuizQuestionType): boolean {
  return type === "qcm" || type === "vrai_faux";
}
