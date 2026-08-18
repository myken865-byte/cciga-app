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
