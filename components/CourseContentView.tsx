import { formatSchedule, type ScheduleSlot } from "@/lib/schedule";

interface Material {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}

interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
}

interface CourseInfo extends ScheduleSlot {
  name: string;
  code: string | null;
  description: string;
  programName: string;
  teacherName?: string | null;
}

function formatDate(iso: Date) {
  return iso.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function CourseContentView({
  course,
  materials,
  assignments = [],
}: {
  course: CourseInfo;
  materials: Material[];
  assignments?: AssignmentItem[];
}) {
  const schedule = formatSchedule(course);

  return (
    <div>
      <div className="mb-6 rounded-lg border border-border bg-surface p-6">
        <p className="text-sm text-muted">
          {course.programName}
          {course.code ? ` · ${course.code}` : ""}
        </p>
        <h1 className="mb-2 text-2xl font-bold text-foreground">{course.name}</h1>
        <p className="text-muted">{course.description}</p>
        {course.teacherName && (
          <p className="mt-2 text-sm text-muted">Enseignant : {course.teacherName}</p>
        )}
        {schedule && <p className="mt-1 text-sm text-muted">Horaire : {schedule}</p>}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-foreground">Devoirs</h2>
      {assignments.length === 0 ? (
        <p className="mb-6 text-sm text-muted">Aucun devoir pour ce cours pour le moment.</p>
      ) : (
        <div className="mb-6 space-y-3">
          {assignments.map((a) => (
            <div key={a.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-medium text-foreground">{a.title}</h3>
                {a.dueDate && (
                  <span className="text-xs text-muted">Échéance : {formatDate(a.dueDate)}</span>
                )}
              </div>
              <p className="text-sm text-muted">{a.description}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="mb-4 text-lg font-semibold text-foreground">Contenu du cours</h2>
      {materials.length === 0 ? (
        <p className="text-sm text-muted">Aucun contenu publié pour ce cours pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {materials.map((m) => (
            <div key={m.id} className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{m.title}</h3>
                <span className="text-xs text-muted">{formatDate(m.createdAt)}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-muted">{m.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
