"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Program } from "@/lib/content";
import { dayLabels } from "@/lib/schedule";
import ProgramSelect from "@/components/ProgramSelect";

interface Teacher {
  id: number;
  name: string;
}

interface SemesterOption {
  id: string;
  label: string;
}

interface CourseInitial {
  id: string;
  programId: string;
  name: string;
  code: string | null;
  description: string;
  teacherId: number | null;
  dayOfWeek: number | null;
  startTime: string | null;
  endTime: string | null;
  semesterId: string | null;
  credits: number | null;
  coefficient: number | null;
  groupLabel: string | null;
  retakeOfCourseId: string | null;
  active: boolean;
}

interface CourseOption {
  id: string;
  name: string;
  programId: string;
}

export default function EditCourseForm({
  course,
  programs,
  teachers,
  semesters,
  allCourses,
  isSuperAdmin,
}: {
  course: CourseInitial;
  programs: Program[];
  teachers: Teacher[];
  semesters?: SemesterOption[];
  allCourses?: CourseOption[];
  isSuperAdmin: boolean;
}) {
  const router = useRouter();
  const [programId, setProgramId] = useState(course.programId);
  const [name, setName] = useState(course.name);
  const [code, setCode] = useState(course.code ?? "");
  const [description, setDescription] = useState(course.description);
  const [teacherId, setTeacherId] = useState(course.teacherId ? String(course.teacherId) : "");
  const [dayOfWeek, setDayOfWeek] = useState(
    course.dayOfWeek === null ? "" : String(course.dayOfWeek),
  );
  const selectedProgram = programs.find((p) => p.id === programId);
  const isTitulaireModel = selectedProgram?.teacherModel === "titulaire";
  const isUniversite = selectedProgram?.school === "universite";
  const isEcoleClassique = selectedProgram?.school === "ecole-classique";
  const isEcoleProfessionnelle = selectedProgram?.school === "ecole-professionnelle";
  const showPeriodFields = isUniversite || isEcoleClassique || isEcoleProfessionnelle;
  const titulaireName = isTitulaireModel
    ? teachers.find((t) => t.id === selectedProgram?.titulaireId)?.name
    : undefined;
  const [startTime, setStartTime] = useState(course.startTime ?? "");
  const [endTime, setEndTime] = useState(course.endTime ?? "");
  const [semesterId, setSemesterId] = useState(course.semesterId ?? "");
  const [credits, setCredits] = useState(course.credits !== null ? String(course.credits) : "");
  const [coefficient, setCoefficient] = useState(course.coefficient !== null ? String(course.coefficient) : "");
  const [groupLabel, setGroupLabel] = useState(course.groupLabel ?? "");
  const [retakeOfCourseId, setRetakeOfCourseId] = useState(course.retakeOfCourseId ?? "");
  const retakeOptions = (allCourses ?? []).filter((c) => c.programId === programId && c.id !== course.id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [active, setActive] = useState(course.active);
  const [archiving, setArchiving] = useState(false);
  const [archiveError, setArchiveError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function toggleArchive() {
    const confirmMsg = active
      ? "Archiver ce cours ? Il disparaîtra des sélecteurs, mais tout l'historique (notes, présences, matériel) reste intact et vous pourrez le réactiver à tout moment."
      : "Réactiver ce cours ?";
    if (!confirm(confirmMsg)) return;
    setArchiving(true);
    setArchiveError(null);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}/archive`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setArchiveError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setActive(json.active);
      router.refresh();
    } catch {
      setArchiveError("Impossible de contacter le serveur.");
    } finally {
      setArchiving(false);
    }
  }

  async function deleteCourse() {
    if (!confirm("Supprimer définitivement ce cours ? Cette action est irréversible et n'est possible que si aucune donnée n'en dépend.")) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        setDeleteError(json.error ?? "Une erreur est survenue.");
        return;
      }
      router.push("/admin/courses");
      router.refresh();
    } catch {
      setDeleteError("Impossible de contacter le serveur.");
    } finally {
      setDeleting(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          name,
          code,
          description,
          teacherId: isTitulaireModel ? undefined : teacherId || undefined,
          dayOfWeek: dayOfWeek === "" ? undefined : Number(dayOfWeek),
          startTime: startTime || undefined,
          endTime: endTime || undefined,
          semesterId: showPeriodFields ? semesterId || undefined : undefined,
          credits: isUniversite ? credits || undefined : undefined,
          coefficient: showPeriodFields ? coefficient || undefined : undefined,
          groupLabel: showPeriodFields ? groupLabel || undefined : undefined,
          retakeOfCourseId: isUniversite ? retakeOfCourseId || undefined : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Une erreur est survenue.");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setSubmitting(false);
    }
  }

  const form = (
    <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Modifier le cours</h2>
        {!active && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Archivé
          </span>
        )}
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Programme</span>
        <ProgramSelect programs={programs} value={programId} onChange={setProgramId} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Nom du cours</span>
        <input required className="input" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Code (optionnel)</span>
        <input className="input" value={code} onChange={(e) => setCode(e.target.value)} />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-foreground">Description</span>
        <textarea
          required
          rows={3}
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {isTitulaireModel ? (
        <div className="rounded-md border border-border bg-background p-3 text-sm">
          <span className="block font-medium text-foreground">Enseignant</span>
          {titulaireName ? (
            <span className="text-muted">
              {titulaireName} (titulaire de la classe — assigné automatiquement à toutes les matières)
            </span>
          ) : (
            <span className="text-red-600">
              Aucun titulaire n&apos;est assigné à cette classe. Assignez-en un depuis la fiche du programme.
            </span>
          )}
        </div>
      ) : (
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-foreground">Enseignant</span>
          <select className="input" value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
            <option value="">Aucun enseignant assigné</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <div>
        <span className="mb-1 block text-sm font-medium text-foreground">
          Créneau hebdomadaire (optionnel)
        </span>
        <div className="grid grid-cols-3 gap-2">
          <select className="input" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
            <option value="">Jour</option>
            {dayLabels.map((label, i) => (
              <option key={label} value={i}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="time"
            className="input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {showPeriodFields && (
        <div className="space-y-3 rounded-md border border-border bg-background p-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-foreground">
              {isUniversite ? "Semestre" : "Période"}
            </span>
            <select className="input" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}>
              <option value="">Aucune</option>
              {semesters?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div className={`grid gap-2 ${isUniversite ? "grid-cols-3" : "grid-cols-2"}`}>
            {isUniversite && (
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-foreground">Crédits</span>
                <input type="number" min="0" className="input" value={credits} onChange={(e) => setCredits(e.target.value)} />
              </label>
            )}
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Coefficient</span>
              <input type="number" min="0" step="0.1" className="input" value={coefficient} onChange={(e) => setCoefficient(e.target.value)} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Groupe</span>
              <input className="input" placeholder="Ex. Groupe A" value={groupLabel} onChange={(e) => setGroupLabel(e.target.value)} />
            </label>
          </div>
          {isUniversite && (
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-foreground">Reprise du cours (optionnel)</span>
              <select
                className="input"
                value={retakeOfCourseId}
                onChange={(e) => setRetakeOfCourseId(e.target.value)}
              >
                <option value="">Ce n&apos;est pas une reprise</option>
                {retakeOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      {saved && (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Modifications enregistrées.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || (isTitulaireModel && !titulaireName)}
        className="w-full rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light disabled:opacity-50"
      >
        {submitting ? "Enregistrement…" : "Enregistrer"}
      </button>
    </form>
  );

  return (
    <>
      {form}
      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-2 font-semibold text-foreground">Archivage</h2>
        <p className="mb-4 text-sm text-muted">
          {active
            ? "Retire ce cours des sélecteurs de nouvelle notation, sans supprimer aucune donnée. Réversible à tout moment."
            : "Ce cours est archivé — il n'apparaît plus dans les sélecteurs de nouveau cours."}
        </p>
        {archiveError && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{archiveError}</p>
        )}
        <button
          type="button"
          onClick={toggleArchive}
          disabled={archiving}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background disabled:opacity-50"
        >
          {archiving ? "…" : active ? "Archiver ce cours" : "Réactiver ce cours"}
        </button>
      </div>

      {isSuperAdmin && (
        <div className="rounded-lg border border-red-200 bg-surface p-6">
          <h2 className="mb-2 font-semibold text-foreground">Suppression définitive</h2>
          <p className="mb-4 text-sm text-muted">
            Réservée au Super Administrateur, et uniquement possible si aucune note, présence,
            matériel, devoir ou reprise n&apos;est lié à ce cours. Préférez l&apos;archivage dans
            tous les autres cas.
          </p>
          {deleteError && (
            <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{deleteError}</p>
          )}
          <button
            type="button"
            onClick={deleteCourse}
            disabled={deleting}
            className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Suppression…" : "Supprimer définitivement"}
          </button>
        </div>
      )}
    </>
  );
}
