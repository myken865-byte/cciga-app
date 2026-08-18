import { formatSchedule, type ScheduleSlot } from "@/lib/schedule";
import { lessonContentTypeLabels, type LessonContentType } from "@/lib/lms";
import LessonProgressToggle from "@/components/LessonProgressToggle";

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

interface LessonItem {
  id: string;
  title: string;
  order: number;
  contentType: string;
  body: string | null;
  fileUrl: string | null;
  videoUrl: string | null;
  completed?: boolean;
}

interface LessonModuleItem {
  id: string;
  title: string;
  order: number;
  lessons: LessonItem[];
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
  lessonModules = [],
  showLessonProgress = false,
}: {
  course: CourseInfo;
  materials: Material[];
  assignments?: AssignmentItem[];
  lessonModules?: LessonModuleItem[];
  showLessonProgress?: boolean;
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

      <h2 className="mb-4 text-lg font-semibold text-foreground">Modules du cours</h2>
      {lessonModules.length === 0 ? (
        <p className="mb-6 text-sm text-muted">Aucun module publié pour ce cours pour le moment.</p>
      ) : (
        <div className="mb-6 space-y-4">
          {[...lessonModules]
            .sort((a, b) => a.order - b.order)
            .map((mod) => (
              <div key={mod.id} className="rounded-lg border border-border bg-surface p-4">
                <h3 className="mb-3 font-semibold text-foreground">{mod.title}</h3>
                {mod.lessons.length === 0 ? (
                  <p className="text-sm text-muted">Aucune leçon dans ce module pour le moment.</p>
                ) : (
                  <ul className="space-y-3">
                    {[...mod.lessons]
                      .sort((a, b) => a.order - b.order)
                      .map((lesson) => (
                        <li key={lesson.id} className="rounded-md border border-border p-3">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <p className="font-medium text-foreground">{lesson.title}</p>
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                              {lessonContentTypeLabels[lesson.contentType as LessonContentType] ?? lesson.contentType}
                            </span>
                          </div>
                          {lesson.contentType === "texte" && lesson.body && (
                            <p className="whitespace-pre-wrap text-sm text-muted">{lesson.body}</p>
                          )}
                          {lesson.contentType === "fichier" && lesson.fileUrl && (
                            <a
                              href={lesson.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Ouvrir le fichier
                            </a>
                          )}
                          {lesson.contentType === "video" && lesson.videoUrl && (
                            <a
                              href={lesson.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              Voir la vidéo
                            </a>
                          )}
                          {showLessonProgress && (
                            <div className="mt-2">
                              <LessonProgressToggle lessonId={lesson.id} initialCompleted={lesson.completed ?? false} />
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}

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
