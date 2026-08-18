"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LessonProgressToggle({
  lessonId,
  initialCompleted,
}: {
  lessonId: string;
  initialCompleted: boolean;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initialCompleted);
  const [submitting, setSubmitting] = useState(false);

  async function markDone() {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/lessons/${lessonId}/progress`, { method: "POST" });
      if (res.ok) {
        setCompleted(true);
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (completed) {
    return <span className="text-xs font-semibold text-emerald-600">✓ Leçon terminée</span>;
  }

  return (
    <button
      onClick={markDone}
      disabled={submitting}
      className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted hover:bg-background disabled:opacity-50"
    >
      {submitting ? "…" : "Marquer comme terminée"}
    </button>
  );
}
