export interface MissingGrade {
  studentId: number;
  studentName: string;
  categoryId: string;
  categoryName: string;
}

/**
 * Cross-references every (student × evaluation category) pair for a course
 * and returns the ones with no matching grade row — the precise gap list the
 * automatic bulletin/relevé system needs to explain exactly why a document
 * can't be generated yet, per "signaler précisément les notes manquantes".
 */
export function computeMissingGrades(
  categories: { id: string; name: string }[],
  roster: { id: number; name: string }[],
  grades: { studentId: number; evaluationCategoryId: string | null }[],
): MissingGrade[] {
  const missing: MissingGrade[] = [];
  for (const student of roster) {
    for (const category of categories) {
      const hasGrade = grades.some(
        (g) => g.studentId === student.id && g.evaluationCategoryId === category.id,
      );
      if (!hasGrade) {
        missing.push({
          studentId: student.id,
          studentName: student.name,
          categoryId: category.id,
          categoryName: category.name,
        });
      }
    }
  }
  return missing;
}
