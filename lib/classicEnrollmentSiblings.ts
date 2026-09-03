// Fratrie (item 9) — nombre de lignes non limité côté données ; stocké en
// JSON sur ClassicEnrollmentForm.siblings, même convention que les pièces
// fournies de la fiche École Professionnelle (lib/enrollmentFormDocuments.ts).
export interface ClassicEnrollmentSibling {
  firstName: string;
  birthDate: string;
  school: string;
}

export function parseClassicEnrollmentSiblings(json: string): ClassicEnrollmentSibling[] {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((s) => ({
      firstName: typeof s?.firstName === "string" ? s.firstName : "",
      birthDate: typeof s?.birthDate === "string" ? s.birthDate : "",
      school: typeof s?.school === "string" ? s.school : "",
    }));
  } catch {
    return [];
  }
}
