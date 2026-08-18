import { formatSchedule, type ScheduleSlot } from "@/lib/schedule";
import { lessonContentTypeLabels, type LessonContentType } from "@/lib/lms";
import LessonProgressToggle from "@/components/LessonProgressToggle";
import SubmitAssignmentForm from "@/components/SubmitAssignmentForm";
import TakeQuizForm from "@/components/TakeQuizForm";

interface AnnouncementItem {
  id: string;
  title: string;
  body: string;
  authorName: string;
  createdAt: Date;
}

interface Material {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
}

interface SubmissionGrade {
  score: number;
}

interface OwnSubmission {
  textContent: string | null;
  fileUrl: string | null;
  submittedAt: Date;
  late: boolean;
  grade?: SubmissionGrade | null;
}

interface StaffSubmission {
  id: string;
  studentName: string;
  textContent: string | null;
  fileUrl: string | null;
  submittedAt: Date;
  late: boolean;
  grade?: SubmissionGrade | null;
}

interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  submission?: OwnSubmission | null;
  submissions?: StaffSubmission[];
}

interface QuizQuestionForView {
  id: string;
  type: string;
  prompt: string;
  options: string | null;
  order: number;
}

interface StaffQuizAttempt {
  id: string;
  studentName: string;
  score: number | null;
  submittedAt: Date | null;
}

interface OwnQuizAttempt {
  id: string;
  score: number | null;
  submittedAt: Date | null;
}

interface QuizItem {
  id: string;
  title: string;
  description: string | null;
  isGraded: boolean;
  maxAttempts: number;
  questions?: QuizQuestionForView[];
  attempts?: StaffQuizAttempt[];
  myAttempts?: OwnQuizAttempt[];
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
  completedCount?: number;
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
  canSubmitAssignments = false,
  showSubmissions = false,
  quizzes = [],
  canTakeQuizzes = false,
  showQuizAttempts = false,
  announcements = [],
  totalEnrolled,
}: {
  course: CourseInfo;
  materials: Material[];
  assignments?: AssignmentItem[];
  lessonModules?: LessonModuleItem[];
  showLessonProgress?: boolean;
  canSubmitAssignments?: boolean;
  showSubmissions?: boolean;
  quizzes?: QuizItem[];
  canTakeQuizzes?: boolean;
  showQuizAttempts?: boolean;
  announcements?: AnnouncementItem[];
  totalEnrolled?: number;
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

      {announcements.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Annonces</h2>
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="font-medium text-foreground">{ann.title}</h3>
                  <span className="text-xs text-muted">{formatDate(ann.createdAt)}</span>
                </div>
                <p className="whitespace-pre-wrap text-sm text-muted">{ann.body}</p>
                <p className="mt-1 text-xs text-muted">Par {ann.authorName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
                          {!showLessonProgress && lesson.completedCount !== undefined && totalEnrolled !== undefined && (
                            <p className="mt-2 text-xs text-muted">
                              {lesson.completedCount}/{totalEnrolled} étudiant{totalEnrolled > 1 ? "s" : ""} ont terminé
                            </p>
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

              {canSubmitAssignments && (
                <>
                  {a.submission && (
                    <div className="mt-3 rounded-md border border-border bg-background p-3 text-sm">
                      <p className="font-medium text-foreground">
                        Ma remise ({formatDate(a.submission.submittedAt)}
                        {a.submission.late ? " — en retard" : ""})
                      </p>
                      {a.submission.textContent && (
                        <p className="mt-1 whitespace-pre-wrap text-muted">{a.submission.textContent}</p>
                      )}
                      {a.submission.fileUrl && (
                        <a
                          href={a.submission.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-primary hover:underline"
                        >
                          Voir le fichier remis
                        </a>
                      )}
                      {a.submission.grade && (
                        <p className="mt-1 font-semibold text-primary">Note : {a.submission.grade.score}/100</p>
                      )}
                    </div>
                  )}
                  <SubmitAssignmentForm
                    assignmentId={a.id}
                    initialTextContent={a.submission?.textContent}
                    initialFileUrl={a.submission?.fileUrl}
                  />
                </>
              )}

              {showSubmissions && (
                <div className="mt-3">
                  {totalEnrolled !== undefined && (
                    <p className="mb-2 text-xs font-medium text-muted">
                      Statut de remise : {a.submissions?.length ?? 0}/{totalEnrolled} étudiant
                      {totalEnrolled > 1 ? "s" : ""} ont remis
                    </p>
                  )}
                  {!a.submissions || a.submissions.length === 0 ? (
                    <p className="text-sm text-muted">Aucune remise pour ce devoir pour le moment.</p>
                  ) : (
                    <div className="space-y-2">
                      {a.submissions.map((s) => (
                        <div key={s.id} className="rounded-md border border-border bg-background p-3 text-sm">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">{s.studentName}</p>
                            <span className="text-xs text-muted">
                              {formatDate(s.submittedAt)}
                              {s.late ? " — en retard" : ""}
                            </span>
                          </div>
                          {s.textContent && <p className="mt-1 whitespace-pre-wrap text-muted">{s.textContent}</p>}
                          {s.fileUrl && (
                            <a
                              href={s.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 block text-primary hover:underline"
                            >
                              Voir le fichier remis
                            </a>
                          )}
                          {s.grade && <p className="mt-1 font-semibold text-primary">Note : {s.grade.score}/100</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="mb-4 text-lg font-semibold text-foreground">Quiz</h2>
      {quizzes.length === 0 ? (
        <p className="mb-6 text-sm text-muted">Aucun quiz pour ce cours pour le moment.</p>
      ) : (
        <div className="mb-6 space-y-3">
          {quizzes.map((q) => {
            const attemptsUsed = q.myAttempts?.length ?? 0;
            const canAttemptMore = attemptsUsed < q.maxAttempts;
            return (
              <div key={q.id} className="rounded-lg border border-border bg-surface p-4">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="font-medium text-foreground">{q.title}</h3>
                  <span className="text-xs text-muted">
                    {q.isGraded ? "Noté" : "Non noté"} · {q.maxAttempts} tentative{q.maxAttempts > 1 ? "s" : ""} max
                  </span>
                </div>
                {q.description && <p className="text-sm text-muted">{q.description}</p>}

                {canTakeQuizzes && (
                  <>
                    {q.myAttempts && q.myAttempts.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {q.myAttempts.map((att) => (
                          <p key={att.id} className="text-sm text-muted">
                            Tentative{att.submittedAt ? ` du ${formatDate(att.submittedAt)}` : ""} — score :{" "}
                            {att.score ?? "—"}
                          </p>
                        ))}
                      </div>
                    )}
                    {canAttemptMore ? (
                      <TakeQuizForm quizId={q.id} questions={q.questions ?? []} />
                    ) : (
                      <p className="mt-3 text-sm text-muted">Nombre maximal de tentatives atteint.</p>
                    )}
                  </>
                )}

                {showQuizAttempts && (
                  <div className="mt-3">
                    {!q.attempts || q.attempts.length === 0 ? (
                      <p className="text-sm text-muted">Aucune tentative pour ce quiz pour le moment.</p>
                    ) : (
                      <div className="space-y-1">
                        {q.attempts.map((att) => (
                          <p key={att.id} className="text-sm text-muted">
                            {att.studentName}
                            {att.submittedAt ? ` — ${formatDate(att.submittedAt)}` : ""} — score : {att.score ?? "—"}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
