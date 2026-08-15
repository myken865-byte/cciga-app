import { computeFinalCourseGrade, computeWeightedAverage, computeAcademicDecision, rankStudents } from "@/lib/universiteGrades";

export interface PeriodCourse {
  id: string;
  name: string;
  credits: number | null;
  coefficient: number | null;
  evaluationCategories: { id: string; weightPercent: number }[];
}

export interface PeriodGrade {
  courseId: string;
  studentId: number;
  evaluationCategoryId: string | null;
  score: number;
}

export interface CourseFinal {
  courseId: string;
  courseName: string;
  finalGrade: number | null;
  weight: number;
}

export interface PeriodResult {
  courseFinals: CourseFinal[];
  average: number | null;
  decision: ReturnType<typeof computeAcademicDecision>;
  rank: number | null;
}

/**
 * Per-student, per-period computation shared by École Classique (weighted by
 * coefficient) and Université (weighted by credits) — the same shape the
 * Université bulletin branch always computed inline, now reusable so a new
 * branch doesn't duplicate it. Rank is computed against the full cohort
 * whenever rankingEnabled is true, for any authorized viewer (not admin-only
 * — a prior bug hid rank from students viewing their own bulletin).
 */
export function computeStudentPeriodResult(params: {
  studentId: number;
  courses: PeriodCourse[];
  grades: PeriodGrade[];
  weightField: "credits" | "coefficient";
  passingGrade: number | null;
  rankingEnabled: boolean;
  cohortIds: number[];
}): PeriodResult {
  const { studentId, courses, grades, weightField, passingGrade, rankingEnabled, cohortIds } = params;

  function courseFinalsFor(sid: number): CourseFinal[] {
    return courses.map((course) => {
      const courseGrades = grades
        .filter((g) => g.courseId === course.id && g.studentId === sid)
        .map((g) => ({ evaluationCategoryId: g.evaluationCategoryId, score: g.score }));
      const rawWeight = weightField === "credits" ? course.credits : course.coefficient;
      const weight = weightField === "coefficient" ? rawWeight ?? 1 : rawWeight ?? 0;
      return {
        courseId: course.id,
        courseName: course.name,
        finalGrade: computeFinalCourseGrade(courseGrades, course.evaluationCategories),
        weight,
      };
    });
  }

  const courseFinals = courseFinalsFor(studentId);
  const average = computeWeightedAverage(courseFinals.map((c) => ({ finalGrade: c.finalGrade, weight: c.weight })));
  const decision = computeAcademicDecision(average, passingGrade);

  let rank: number | null = null;
  if (rankingEnabled) {
    const cohortAverages = cohortIds.map((sid) => ({
      studentId: sid,
      average: computeWeightedAverage(courseFinalsFor(sid).map((c) => ({ finalGrade: c.finalGrade, weight: c.weight }))),
    }));
    const ranked = rankStudents(cohortAverages);
    rank = ranked.find((r) => r.studentId === studentId)?.rank ?? null;
  }

  return { courseFinals, average, decision, rank };
}
