import { isAutoGradable, type QuizQuestionType } from "@/lib/lms";

export interface GradableQuestion {
  id: string;
  type: string;
  correctAnswer: string | null;
  points: number;
}

/**
 * Mission "Portail Enseignant — Phase 3 P2" (2026-09-13), §15-§17 — extrait
 * de app/api/quizzes/[id]/attempts/route.ts (soumission élève, inchangé) et
 * réutilisé par app/api/quizzes/[id]/attempts/[attemptId]/route.ts
 * (correction manuelle) : même calcul du score auto-corrigé aux deux
 * endroits, jamais deux implémentations divergentes. Les questions
 * "reponse_courte" ne contribuent jamais ici (isAutoGradable les exclut) —
 * c'est exactement la partie que la correction manuelle vient compléter.
 */
export function computeAutoScore(questions: GradableQuestion[], answers: Record<string, string>): number {
  let score = 0;
  for (const q of questions) {
    const type = q.type as QuizQuestionType;
    if (!isAutoGradable(type)) continue;
    const given = answers[q.id];
    if (given !== undefined && q.correctAnswer !== null && given === q.correctAnswer) {
      score += q.points;
    }
  }
  return score;
}
