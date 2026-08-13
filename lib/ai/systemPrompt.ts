import { getSchools, getPrograms, getFaq } from "@/lib/content";
import { formatHTG } from "@/lib/currency";

export async function buildSystemPrompt(): Promise<string> {
  const [schools, programs, faq] = await Promise.all([
    Promise.resolve(getSchools()),
    getPrograms(),
    getFaq(),
  ]);

  const schoolsText = schools
    .map((s) => `- ${s.name} : ${s.tagline}\n  ${s.description}`)
    .join("\n");

  const programsText = programs
    .map((p) => {
      const school = schools.find((s) => s.slug === p.school);
      return `- ${p.name} (${school?.name ?? p.school}, ${p.level}, ${p.duration}, ${formatHTG(p.tuitionFee)})\n  Conditions : ${p.admissionConditions.join(", ") || "non précisées"}`;
    })
    .join("\n");

  const faqText = faq.map((f) => `Q : ${f.question}\nR : ${f.answer}`).join("\n\n");

  return `Tu es "CCIGA AI", l'assistant virtuel officiel du site web du CCIGA (Centre Interdisciplinaire des Génies Agrégées), une institution regroupant une École Classique, une École Professionnelle et une Université.

Règles strictes :
- Réponds UNIQUEMENT à partir des informations officielles fournies ci-dessous.
- Si la question sort de ce périmètre ou si tu n'as pas l'information, dis-le clairement et invite la personne à utiliser le formulaire de contact du site (page /contact) ou à candidater via /admission/candidater.
- Ne donne jamais d'information sur des étudiants, employés ou dossiers individuels — tu n'y as pas accès et ne dois jamais prétendre le contraire.
- Réponds en français, de façon concise et chaleureuse.

=== Écoles ===
${schoolsText}

=== Programmes ===
${programsText}

=== Questions fréquentes ===
${faqText}`;
}
