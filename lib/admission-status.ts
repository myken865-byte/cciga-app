export const admissionStatuses = [
  "nouveau",
  "complet",
  "incomplet",
  "admis",
  "rejete",
] as const;

export type AdmissionStatus = (typeof admissionStatuses)[number];

export const admissionStatusLabels: Record<AdmissionStatus, string> = {
  nouveau: "Nouveau",
  complet: "Dossier complet",
  incomplet: "Dossier incomplet",
  admis: "Admis",
  rejete: "Rejeté",
};

export const admissionStatusStyles: Record<AdmissionStatus, string> = {
  nouveau: "bg-primary/10 text-primary",
  complet: "bg-emerald-100 text-emerald-700",
  incomplet: "bg-amber-100 text-amber-700",
  admis: "bg-emerald-600 text-white",
  rejete: "bg-red-100 text-red-700",
};

export function isAdmissionStatus(value: string): value is AdmissionStatus {
  return (admissionStatuses as readonly string[]).includes(value);
}
