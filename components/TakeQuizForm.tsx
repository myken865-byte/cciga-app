"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizQuestionType } from "@/lib/lms";

interface QuizQuestionForStudent {
  id: string;
  type: string;
  prompt: string;
  options: string | null;
  order: number;
}

export default function TakeQuizForm({
  quizId,
  questions,
}: {
  quizId: string;
  questions: QuizQuestionForStudent[];
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/quizzes/${quizId}/attempts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setResult(json.score);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result !== null) {
    return (
      <p className="mt-3 rounded-md border border-border bg-background p-3 text-sm font-medium text-foreground">
        Tentative enregistrée — score : {result} point{result > 1 ? "s" : ""}.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-3 rounded-md border border-border bg-background p-3">
      {[...questions]
        .sort((a, b) => a.order - b.order)
        .map((q) => {
          const type = q.type as QuizQuestionType;
          const options: string[] = q.options ? JSON.parse(q.options) : [];
          return (
            <div key={q.id} className="text-sm">
              <p className="mb-1 font-medium text-foreground">{q.prompt}</p>
              {type === "qcm" && (
                <div className="space-y-1">
                  {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
              {type === "vrai_faux" && (
                <div className="flex gap-4">
                  {["vrai", "faux"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                      />
                      {opt === "vrai" ? "Vrai" : "Faux"}
                    </label>
                  ))}
                </div>
              )}
              {type === "reponse_courte" && (
                <input
                  className="input"
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                />
              )}
            </div>
          );
        })}
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Envoi…" : "Soumettre mes réponses"}
      </button>
    </form>
  );
}
