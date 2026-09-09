import Link from "next/link";
import type { Program } from "@/lib/content";

/**
 * Institutional double-border variant used only on the public "Nos
 * programmes" page (mandat "Refonte Page Nos Programmes", 2026-09-06) —
 * kept separate from the shared ProgramCard so other pages that reuse
 * ProgramCard (ecole-classique/[niveau]) stay visually untouched.
 */

// Mandat "Jasmin Kindergarten" (2026-09-09) : appellations florales
// affichées en plus du nom de niveau, jamais à sa place — display-only,
// aucune donnée en base modifiée.
const jasminKindergartenNames: Record<string, string> = {
  "prescolaire-petite-section": "Fleur de Choux",
  "prescolaire-moyenne-section": "Fleur de Lys",
  "prescolaire-grande-section": "Fleur Jasmin",
};

export default function ProgramInstitutionalCard({ program }: { program: Program }) {
  const flowerName = jasminKindergartenNames[program.slug];
  return (
    <Link
      href={`/programmes/${program.slug}`}
      className="block rounded-2xl border-[3px] border-primary-dark p-1 shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-full flex-col rounded-xl border-[3px] border-accent bg-white p-5">
        <span className="mb-2 inline-block w-fit rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
          {program.level}
        </span>
        <h3 className="mb-1 font-semibold text-foreground">{program.name}</h3>
        {flowerName && <p className="mb-1 text-sm font-medium text-accent">{flowerName}</p>}
        <p className="mb-1 text-sm text-muted">{program.faculty}</p>
        <p className="mb-3 text-sm text-muted">{program.description}</p>
        <span className="mt-auto text-xs font-medium text-primary">
          Durée : {program.duration}
        </span>
      </div>
    </Link>
  );
}
