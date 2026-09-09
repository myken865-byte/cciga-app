"use client";

import Link from "next/link";
import SearchableTable from "@/components/admin/SearchableTable";

interface CourseRow {
  id: string;
  name: string;
  code: string | null;
  groupLabel: string | null;
  program: { name: string };
  teacher: { name: string } | null;
}

/** Client wrapper — see AuditLogTable.tsx for why this indirection is needed. */
export default function CoursesTable({ courses }: { courses: CourseRow[] }) {
  return (
    <SearchableTable
      items={courses}
      getSearchText={(course) => [course.program.name, course.name, course.code, course.teacher?.name, course.groupLabel]}
      placeholder="Rechercher par cours, code, programme, enseignant…"
      colSpan={4}
      baseEmptyMessage="Aucun cours pour le moment."
      head={
        <tr>
          <th className="px-4 py-3 font-semibold">Programme</th>
          <th className="px-4 py-3 font-semibold">Cours</th>
          <th className="px-4 py-3 font-semibold">Code</th>
          <th className="px-4 py-3 font-semibold">Enseignant</th>
        </tr>
      }
      renderRow={(course) => (
        <tr key={course.id} className="border-t border-row-divider">
          <td className="px-4 py-3 text-muted">{course.program.name}</td>
          <td className="px-4 py-3">
            <Link href={`/admin/courses/${course.id}`} className="font-medium text-primary hover:underline">
              {course.name}
              {course.groupLabel && ` (${course.groupLabel})`}
            </Link>
          </td>
          <td className="px-4 py-3 text-muted">{course.code ?? "—"}</td>
          <td className="px-4 py-3 text-muted">{course.teacher?.name ?? "Non assigné"}</td>
        </tr>
      )}
    />
  );
}
