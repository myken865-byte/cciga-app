"use client";

import { useState } from "react";
import Link from "next/link";
import type { Program, School } from "@/lib/content";
import { teacherModelLabels } from "@/lib/teacherModel";
import { programTypeLabels, programStatusList, programStatusLabels, type ProgramStatus } from "@/lib/universite";

export default function ProgramsTable({
  programs,
  schools,
  teachersById,
  facultiesById,
}: {
  programs: Program[];
  schools: School[];
  teachersById: Map<number, string>;
  facultiesById: Map<string, string>;
}) {
  const [schoolFilter, setSchoolFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProgramStatus | "">("");

  const schoolsBySlug = new Map(schools.map((s) => [s.slug, s]));
  const universiteFaculties = [...facultiesById.entries()];

  const filtered = programs.filter((p) => {
    if (schoolFilter && p.school !== schoolFilter) return false;
    if (typeFilter && p.programType !== typeFilter) return false;
    if (facultyFilter && p.academicFacultyId !== facultyFilter) return false;
    if (statusFilter && p.programStatus !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-3 grid gap-2 sm:grid-cols-4">
        <select className="input" value={schoolFilter} onChange={(e) => setSchoolFilter(e.target.value)}>
          <option value="">Toutes les écoles</option>
          {schools.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        <select className="input" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Toutes catégories</option>
          <option value="licence">Licence</option>
          <option value="diplome">Diplôme</option>
        </select>
        <select className="input" value={facultyFilter} onChange={(e) => setFacultyFilter(e.target.value)}>
          <option value="">Toutes facultés / domaines</option>
          {universiteFaculties.map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ProgramStatus | "")}
        >
          <option value="">Tous statuts</option>
          {programStatusList.map((s) => (
            <option key={s} value={s}>
              {programStatusLabels[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-background text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">École</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Niveau / Cycle</th>
              <th className="px-4 py-3 font-semibold">Modèle / Catégorie</th>
              <th className="px-4 py-3 font-semibold">Titulaire / Faculté</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Durée</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((program) => (
              <tr key={program.id} className="border-t border-border">
                <td className="px-4 py-3 text-muted">
                  {schoolsBySlug.get(program.school)?.name ?? program.school}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/programs/${program.id}`} className="font-medium text-primary hover:underline">
                    {program.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{program.level}</td>
                <td className="px-4 py-3 text-muted">
                  {program.teacherModel
                    ? teacherModelLabels[program.teacherModel].split(" (")[0]
                    : program.programType
                      ? programTypeLabels[program.programType]
                      : "—"}
                </td>
                <td className="px-4 py-3 text-muted">
                  {program.titulaireId
                    ? teachersById.get(program.titulaireId) ?? "—"
                    : program.academicFacultyId
                      ? facultiesById.get(program.academicFacultyId) ?? "—"
                      : "—"}
                </td>
                <td className="px-4 py-3 text-muted">
                  {program.programStatus ? programStatusLabels[program.programStatus] : "—"}
                </td>
                <td className="px-4 py-3 text-muted">{program.duration}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  Aucun programme ne correspond à ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
