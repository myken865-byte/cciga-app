"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarkMessageTreatedButton({
  messageId,
  status,
}: {
  messageId: string;
  status: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function toggle() {
    setSubmitting(true);
    try {
      await fetch(`/api/admin/messages/${messageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status === "traite" ? "nouveau" : "traite" }),
      });
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={submitting}
      className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
    >
      {status === "traite" ? "Marquer comme nouveau" : "Marquer comme traité"}
    </button>
  );
}
