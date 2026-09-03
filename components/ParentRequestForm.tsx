"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  parentRequestCategories,
  parentRequestCategoryLabels,
  parentRequestServices,
  parentRequestServiceLabels,
} from "@/lib/parentRequests";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 8 * 1024 * 1024;

export default function ParentRequestForm({
  students,
}: {
  students: { id: number; name: string; classe?: string; anneeAcademique?: string }[];
}) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [category, setCategory] = useState(parentRequestCategories[0]);
  const [service, setService] = useState(parentRequestServices[0]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<{ url: string; name: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const selectedChild = students.find((c) => c.id === Number(studentId));

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Format non accepté (PDF, JPG ou PNG uniquement).");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Fichier trop volumineux (8 Mo maximum).");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const blob = await upload(`parent-requests/${crypto.randomUUID()}-${file.name}`, file, {
        access: "private",
        handleUploadUrl: "/api/parent-requests/upload",
      });
      setAttachment({ url: blob.url, name: file.name });
    } catch {
      setError("Échec du téléversement. Veuillez réessayer.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!studentId || !subject.trim() || !message.trim()) {
      setError("Élève, objet et message sont obligatoires.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/parent-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          category,
          service,
          subject: subject.trim(),
          message: message.trim(),
          attachmentUrl: attachment?.url,
          attachmentName: attachment?.name,
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
      setAttachment(null);
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
        <p className="rounded-md bg-success-bg px-3 py-2 text-sm text-success">
          Votre demande a été envoyée à l&apos;administration.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Élève concerné</span>
          <select className="input" value={studentId} onChange={(e) => setStudentId(Number(e.target.value))}>
            {students.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Classe</span>
            <input className="input" disabled value={selectedChild?.classe || "À COMPLÉTER"} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">Année académique</span>
            <input className="input" disabled value={selectedChild?.anneeAcademique || "À COMPLÉTER"} />
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Catégorie</span>
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
            {parentRequestCategories.map((c) => (
              <option key={c} value={c}>
                {parentRequestCategoryLabels[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Service destinataire</span>
          <select className="input" value={service} onChange={(e) => setService(e.target.value as typeof service)}>
            {parentRequestServices.map((s) => (
              <option key={s} value={s}>
                {parentRequestServiceLabels[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Objet</span>
        <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Message</span>
        <textarea className="input" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Document joint (optionnel)</span>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} className="input" disabled={uploading} />
        {attachment && <p className="mt-1 text-xs text-success">Joint : {attachment.name}</p>}
        {uploading && <p className="mt-1 text-xs text-muted">Téléversement…</p>}
      </label>

      {error && <p className="rounded-md bg-danger-bg px-3 py-2 text-sm text-danger">{error}</p>}

      <button type="submit" disabled={submitting || uploading} className="btn-primary w-full">
        {submitting ? "Envoi…" : "Envoyer à l'administration"}
      </button>
    </form>
  );
}
