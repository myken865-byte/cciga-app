"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestionTypes, quizQuestionTypeLabels, type QuizQuestionType } from "@/lib/lms";

export default function AddQuizQuestionForm({
  quizzes,
}: {
  quizzes: { id: string; title: string }[];
}) {
  const router = useRouter();
  const [quizId, setQuizId] = useState(quizzes[0]?.id ?? "");

  // Adjusted during render (React's recommended pattern) instead of in an
  // effect, to avoid an extra render pass — see AddLessonForm.tsx.
  const [prevQuizzes, setPrevQuizzes] = useState(quizzes);
  if (quizzes !== prevQuizzes) {
    setPrevQuizzes(quizzes);
    if (!quizzes.some((q) => q.id === quizId)) {
      setQuizId(quizzes[0]?.id ?? "");
    }
  }

  const [type, setType] = useState<QuizQuestionType>("qcm");
  const [prompt, setPrompt] = useState("");
  const [optionsText, setOptionsText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [points, setPoints] = useState("1");
  const [order, setOrder] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const options = optionsText
        .split("\n")
        .map((o) => o.trim())
        .filter(Boolean);
      const res = await fetch(`/api/quizzes/${quizId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          prompt,
          options: type === "qcm" ? options : undefined,
          correctAnswer: type === "reponse_courte" ? undefined : correctAnswer,
          points: Number(points),
          order: Number(order),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setPrompt("");
      setOptionsText("");
      setCorrectAnswer("");
      setPoints("1");
      setOrder("1");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (quizzes.length === 0) {
    return (
      <div className="card p-6 text-sm text-muted">
        Créez d&apos;abord un quiz pour pouvoir y ajouter des questions.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 card p-6">
      <h2 className="font-semibold text-foreground">Ajouter une question</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Quiz</span>
        <select required className="input" value={quizId} onChange={(e) => setQuizId(e.target.value)}>
          {quizzes.map((q) => (
            <option key={q.id} value={q.id}>
              {q.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Question</span>
        <textarea required rows={2} className="input" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Type de question</span>
        <select className="input" value={type} onChange={(e) => setType(e.target.value as QuizQuestionType)}>
          {quizQuestionTypes.map((t) => (
            <option key={t} value={t}>
              {quizQuestionTypeLabels[t]}
            </option>
          ))}
        </select>
      </label>
      {type === "qcm" && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Options (une par ligne)</span>
          <textarea
            required
            rows={4}
            className="input"
            placeholder={"Option A\nOption B\nOption C"}
            value={optionsText}
            onChange={(e) => setOptionsText(e.target.value)}
          />
        </label>
      )}
      {(type === "qcm" || type === "vrai_faux") && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">
            {type === "vrai_faux" ? "Réponse correcte (vrai ou faux)" : "Réponse correcte (doit correspondre exactement à une option)"}
          </span>
          <input
            required
            className="input"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </label>
      )}
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Points</span>
        <input required type="number" min="1" className="input" value={points} onChange={(e) => setPoints(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Ordre</span>
        <input required type="number" min="1" className="input" value={order} onChange={(e) => setOrder(e.target.value)} />
      </label>
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Ajout…" : "Ajouter la question"}
      </button>
    </form>
  );
}
