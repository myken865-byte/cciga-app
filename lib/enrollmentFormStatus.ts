export const enrollmentFormStatuses = [
  "brouillon",
  "incomplet",
  "a_verifier",
  "validee",
  "archivee",
] as const;

export type EnrollmentFormStatus = (typeof enrollmentFormStatuses)[number];

export const enrollmentFormStatusLabels: Record<EnrollmentFormStatus, string> = {
  brouillon: "Brouillon",
  incomplet: "Incomplète",
  a_verifier: "À vérifier",
  validee: "Validée",
  archivee: "Archivée",
};

export const enrollmentFormStatusStyles: Record<EnrollmentFormStatus, string> = {
  brouillon: "bg-primary/10 text-primary",
  incomplet: "bg-amber-100 text-amber-700",
  a_verifier: "bg-blue-100 text-blue-700",
  validee: "bg-emerald-600 text-white",
  archivee: "bg-amber-100 text-amber-800",
};

export function isEnrollmentFormStatus(value: string): value is EnrollmentFormStatus {
  return (enrollmentFormStatuses as readonly string[]).includes(value);
}
