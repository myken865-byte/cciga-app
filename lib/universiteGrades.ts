import { DEFAULT_PASSING_GRADE } from "@/lib/universite";

export interface CategoryWeight {
  id: string;
  weightPercent: number;
}

export function categoryWeightsSumTo100(categories: CategoryWeight[]): boolean {
  if (categories.length === 0) return false;
  const sum = categories.reduce((acc, c) => acc + c.weightPercent, 0);
  return Math.abs(sum - 100) < 0.01;
}

export interface GradeForComputation {
  evaluationCategoryId: string | null;
  score: number;
}

/**
 * Weighted final grade for one student in one course, from per-category grade
 * averages. Returns null when the category weights are incomplete (don't sum
 * to 100%) or when a defined category has no grade yet — an accurate final
 * cannot be produced from a partial evaluation scheme.
 */
export function computeFinalCourseGrade(
  grades: GradeForComputation[],
  categories: CategoryWeight[],
): number | null {
  if (!categoryWeightsSumTo100(categories)) return null;

  let total = 0;
  for (const category of categories) {
    const categoryGrades = grades.filter((g) => g.evaluationCategoryId === category.id);
    if (categoryGrades.length === 0) return null;
    const categoryAverage = categoryGrades.reduce((sum, g) => sum + g.score, 0) / categoryGrades.length;
    total += categoryAverage * (category.weightPercent / 100);
  }
  return Math.round(total * 100) / 100;
}

export interface CourseResult {
  courseId: string;
  finalGrade: number | null;
  credits: number;
}

/** Credit-weighted semester average; courses without a computed final grade are excluded. */
export function computeSemesterAverage(results: CourseResult[]): number | null {
  const graded = results.filter((r) => r.finalGrade !== null && r.credits > 0);
  if (graded.length === 0) return null;
  const totalCredits = graded.reduce((sum, r) => sum + r.credits, 0);
  if (totalCredits === 0) return null;
  const weightedSum = graded.reduce((sum, r) => sum + r.finalGrade! * r.credits, 0);
  return Math.round((weightedSum / totalCredits) * 100) / 100;
}

export type AcademicDecision = "reussi" | "echec" | "indetermine";

export const academicDecisionLabels: Record<AcademicDecision, string> = {
  reussi: "Réussi",
  echec: "Échec",
  indetermine: "Indéterminé",
};

export function computeAcademicDecision(
  average: number | null,
  passingGrade: number | null,
): AcademicDecision {
  if (average === null) return "indetermine";
  return average >= (passingGrade ?? DEFAULT_PASSING_GRADE) ? "reussi" : "echec";
}

export interface RankableStudent {
  studentId: number;
  average: number | null;
}

export interface RankedStudent extends RankableStudent {
  rank: number | null;
}

/** Standard competition ranking (ties share a rank, next rank skips accordingly); ungraded students get rank null. */
export function rankStudents(students: RankableStudent[]): RankedStudent[] {
  const graded = students.filter((s): s is RankableStudent & { average: number } => s.average !== null);
  const sorted = [...graded].sort((a, b) => b.average - a.average);

  const ranked = new Map<number, number>();
  let lastAverage: number | null = null;
  let lastRank = 0;
  sorted.forEach((s, i) => {
    if (s.average !== lastAverage) {
      lastRank = i + 1;
      lastAverage = s.average;
    }
    ranked.set(s.studentId, lastRank);
  });

  return students.map((s) => ({ ...s, rank: ranked.get(s.studentId) ?? null }));
}
