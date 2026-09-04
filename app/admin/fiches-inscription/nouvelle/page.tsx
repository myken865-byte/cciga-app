import { getProgramsBySchool } from "@/lib/content";
import { getActiveSchool, schoolLabels } from "@/lib/institutionContext";
import NewFicheForm from "./NewFicheForm";

export const dynamic = "force-dynamic";

export default async function NouvelleFicheInscriptionPage() {
  const activeSchool = await getActiveSchool();
  const school = activeSchool === "universite" ? "universite" : "ecole-professionnelle";
  const programs = await getProgramsBySchool(school);
  return (
    <NewFicheForm
      school={school}
      institutionLabel={schoolLabels[school]}
      programs={programs.map((p) => ({ id: p.id, name: p.name }))}
    />
  );
}
