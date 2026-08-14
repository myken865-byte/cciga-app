"use client";

import type { Program } from "@/lib/content";
import { niveauLabels, niveauList } from "@/lib/niveaux";
import { schools } from "@/data/schools";

export default function ProgramSelect({
  programs,
  value,
  onChange,
  includeEmpty,
  emptyLabel,
  className,
}: {
  programs: Program[];
  value: string;
  onChange: (value: string) => void;
  includeEmpty?: boolean;
  emptyLabel?: string;
  className?: string;
}) {
  return (
    <select className={className ?? "input"} value={value} onChange={(e) => onChange(e.target.value)}>
      {includeEmpty && <option value="">{emptyLabel ?? "Aucun"}</option>}
      {schools.map((school) => {
        const schoolPrograms = programs.filter((p) => p.school === school.slug);
        if (schoolPrograms.length === 0) return null;

        if (school.slug === "ecole-classique") {
          return niveauList.map((niveau) => {
            const classes = schoolPrograms.filter((p) => p.niveau === niveau);
            if (classes.length === 0) return null;
            return (
              <optgroup key={niveau} label={`${school.name} — ${niveauLabels[niveau]}`}>
                {classes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            );
          });
        }

        return (
          <optgroup key={school.slug} label={school.name}>
            {schoolPrograms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </optgroup>
        );
      })}
    </select>
  );
}
