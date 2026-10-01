import { describe, it, expect } from "vitest";
import { computeAutoScore } from "@/lib/quizGrading";

describe("lib/quizGrading — computeAutoScore", () => {
  const questions = [
    { id: "q1", type: "qcm", correctAnswer: "b", points: 2 },
    { id: "q2", type: "vrai_faux", correctAnswer: "vrai", points: 1 },
    { id: "q3", type: "reponse_courte", correctAnswer: null, points: 5 },
  ];

  it("awards points for correct auto-gradable answers", () => {
    expect(computeAutoScore(questions, { q1: "b", q2: "vrai" })).toBe(3);
  });

  it("never awards points for a wrong auto-gradable answer", () => {
    expect(computeAutoScore(questions, { q1: "a", q2: "vrai" })).toBe(1);
  });

  it("never awards points for 'reponse_courte' — always manually graded, regardless of the answer text", () => {
    expect(computeAutoScore(questions, { q1: "b", q2: "vrai", q3: "b" })).toBe(3);
  });

  it("awards nothing for missing answers", () => {
    expect(computeAutoScore(questions, {})).toBe(0);
  });

  it("is a pure function of (questions, answers) — same input always yields the same score (no hidden state)", () => {
    const first = computeAutoScore(questions, { q1: "b", q2: "vrai" });
    const second = computeAutoScore(questions, { q1: "b", q2: "vrai" });
    expect(first).toBe(second);
  });
});
