import { getProgramsBySchool } from "@/lib/content";
import NewFicheForm from "./NewFicheForm";

export const dynamic = "force-dynamic";

export default async function NouvelleFicheInscriptionPage() {
  const programs = await getProgramsBySchool("ecole-professionnelle");
  return <NewFicheForm programs={programs.map((p) => ({ id: p.id, name: p.name }))} />;
}
