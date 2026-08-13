import type { Metadata } from "next";
import { getSchoolBySlug } from "@/lib/content";
import SchoolPage from "@/components/SchoolPage";

export const metadata: Metadata = {
  title: "École Classique",
  description: "Découvrez l'École Classique du CCIGA, de la maternelle au secondaire.",
};

export const dynamic = "force-dynamic";

export default function EcoleClassiquePage() {
  const school = getSchoolBySlug("ecole-classique")!;
  return <SchoolPage school={school} />;
}
