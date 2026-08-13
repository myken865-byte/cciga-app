import type { Metadata } from "next";
import { getSchoolBySlug } from "@/lib/content";
import SchoolPage from "@/components/SchoolPage";

export const metadata: Metadata = {
  title: "Université",
  description: "Découvrez l'Université du CCIGA et ses programmes de licence et de spécialisation.",
};

export const dynamic = "force-dynamic";

export default function UniversitePage() {
  const school = getSchoolBySlug("universite")!;
  return <SchoolPage school={school} />;
}
