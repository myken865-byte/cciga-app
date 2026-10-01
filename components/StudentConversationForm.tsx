"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  studentConversationServices,
  studentConversationServiceLabels,
  type StudentConversationService,
} from "@/lib/studentConversations";

export default function StudentConversationForm({ courses }: { courses: { id: string; name: string }[] }) {
  const router = useRouter();
  const [service, setService] = useState<StudentConversationService>(studentConversationServices[0]);
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!subject.trim() || !message.trim()) {
      setError("Objet et message sont obligatoires.");
      return;
    }
    if (service === "enseignant" && !courseId) {
      setError("Choisissez un cours pour contacter un enseignant.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/student-conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          subject: subject.trim(),
          message: message.trim(),
          courseId: service === "enseignant" ? courseId : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Envoi impossible.");
        return;
      }
      setSuccess(true);
      setSubject("");
      setMessage("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5 sm:p-6">
      {success && (
        <p className="rounded-md bg-success-bg px-3 py-2 text-sm text-success">Votre message a été envoyé.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Destinataire</span>
          <select className="input" value={service} onChange={(e) => setService(e.target.value as typeof service)}>
            {studentConversationServices.map((s) => (
              <option key={s} value={s} disabled={s === "enseignant" && courses.length === 0}>
                {studentConversationServiceLabels[s]}
              </option>
            ))}
          </select>
        </label>
        {service === "enseignant" && (
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Cours</span>
            <select className="input" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Objet</span>
        <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={200} required />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Message</span>
        <textarea className="input" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </label>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
