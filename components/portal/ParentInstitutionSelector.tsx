import Link from "next/link";
import { schoolLabels, type SchoolKey } from "@/lib/institutions";

/**
 * Mission "Portail Parent multi-institutions" (2026-09-13) — filtre rapide
 * par institution pour un parent dont les enfants sont répartis sur
 * plusieurs des 3 écoles CCIGA. N'affiche rien si tous les enfants du
 * parent appartiennent à la même institution (ou à aucune).
 */
export default function ParentInstitutionSelector({
  institutions,
  active,
  basePath,
}: {
  institutions: SchoolKey[];
  active: SchoolKey | null;
  basePath: string;
}) {
  if (institutions.length <= 1) return null;
  return (
    <div className="mb-3 flex flex-wrap gap-2 text-xs">
      <Link
        href={basePath}
        className={`rounded-full px-2.5 py-1 font-medium ${!active ? "bg-primary text-white" : "bg-background text-muted"}`}
      >
        Toutes les institutions
      </Link>
      {institutions.map((school) => (
        <Link
          key={school}
          href={`${basePath}?institution=${school}`}
          className={`rounded-full px-2.5 py-1 font-medium ${active === school ? "bg-primary text-white" : "bg-background text-muted"}`}
        >
          {schoolLabels[school]}
        </Link>
      ))}
    </div>
  );
}
