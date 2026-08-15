"use client";

import { useState } from "react";

export default function PreviewDocumentButton({
  programId,
  semesterId,
  studentId,
}: {
  programId: string;
  semesterId: string;
  studentId: number;
}) {
  const [loading, setLoading] = useState(false);

  async function preview() {
    setLoading(true);
    try {
      const res = await fetch("/api/documents/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programId, semesterId, studentId }),
      });
      if (res.ok) {
        const blob = await res.blob();
        window.open(URL.createObjectURL(blob), "_blank");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={preview} disabled={loading} className="text-sm text-primary hover:underline disabled:opacity-50">
      {loading ? "Génération…" : "Aperçu PDF"}
    </button>
  );
}
