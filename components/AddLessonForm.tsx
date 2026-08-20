"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lessonContentTypes, lessonContentTypeLabels, type LessonContentType } from "@/lib/lms";

export default function AddLessonForm({
  modules,
}: {
  modules: { id: string; title: string }[];
}) {
  const router = useRouter();
  const [moduleId, setModuleId] = useState(modules[0]?.id ?? "");

  // The module list arrives fresh after each router.refresh() (e.g. right
  // after creating the course's first module), but this component stays
  // mounted across that refresh, so its own state doesn't reinitialize.
  // Re-point the selection at a valid module whenever the current one no
  // longer exists in the list — adjusted during render (React's recommended
  // pattern) instead of in an effect, to avoid an extra render pass.
  const [prevModules, setPrevModules] = useState(modules);
  if (modules !== prevModules) {
    setPrevModules(modules);
    if (!modules.some((m) => m.id === moduleId)) {
      setModuleId(modules[0]?.id ?? "");
    }
  }
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("1");
  const [contentType, setContentType] = useState<LessonContentType>("texte");
  const [body, setBody] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/modules/${moduleId}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, order: Number(order), contentType, body, fileUrl, videoUrl }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setTitle("");
      setOrder("1");
      setBody("");
      setFileUrl("");
      setVideoUrl("");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  if (modules.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">
        Créez d&apos;abord un module pour pouvoir y ajouter des leçons.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="font-semibold text-foreground">Ajouter une leçon</h2>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Module</span>
        <select required className="input" value={moduleId} onChange={(e) => setModuleId(e.target.value)}>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Titre de la leçon</span>
        <input required className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Ordre</span>
        <input
          required
          type="number"
          min="1"
          className="input"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Type de contenu</span>
        <select
          className="input"
          value={contentType}
          onChange={(e) => setContentType(e.target.value as LessonContentType)}
        >
          {lessonContentTypes.map((t) => (
            <option key={t} value={t}>
              {lessonContentTypeLabels[t]}
            </option>
          ))}
        </select>
      </label>
      {contentType === "texte" && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Contenu</span>
          <textarea required rows={5} className="input" value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
      )}
      {contentType === "fichier" && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Lien du fichier</span>
          <input
            required
            type="url"
            className="input"
            placeholder="https://…"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />
        </label>
      )}
      {contentType === "video" && (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Lien vidéo</span>
          <input
            required
            type="url"
            className="input"
            placeholder="https://…"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </label>
      )}
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Ajout…" : "Ajouter la leçon"}
      </button>
    </form>
  );
}
