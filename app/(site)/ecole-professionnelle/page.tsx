import type { Metadata } from "next";
import { getSchoolBySlug } from "@/lib/content";
import SchoolPage from "@/components/SchoolPage";

export const metadata: Metadata = {
  title: "École Professionnelle",
  description: "Découvrez l'École Professionnelle du CCIGA et ses formations courtes orientées métiers.",
};

export const dynamic = "force-dynamic";

export default function EcoleProfessionnellePage() {
  const school = getSchoolBySlug("ecole-professionnelle")!;
  return <SchoolPage school={school} />;
}
