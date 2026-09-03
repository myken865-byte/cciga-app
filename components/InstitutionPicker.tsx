"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { schoolKeys, schoolLabels, ALL_SCHOOLS_VALUE, type SchoolKey } from "@/lib/institutions";

const descriptions: Record<SchoolKey, string> = {
  "ecole-classique": "Programmes, classes et élèves de l'École Classique.",
  "ecole-professionnelle": "Formations, filières et étudiants de l'École Professionnelle.",
  universite: "Facultés, programmes et étudiants de l'Université.",
};

export default function InstitutionPicker({
  next,
  showAllSchools,
}: {
  next: string;
  showAllSchools: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function choose(school: string) {
    setBusy(school);
    await fetch("/api/admin/institution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ school }),
    });
    router.push(next);
    router.refresh();
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {schoolKeys.map((key) => (
        <button
          key={key}
          onClick={() => choose(key)}
          disabled={busy !== null}
          className="card card-interactive p-6 text-left disabled:opacity-50"
        >
          <p className="section-label mb-2">Institution</p>
          <p className="mb-2 text-lg font-bold text-foreground">{schoolLabels[key]}</p>
          <p className="text-sm text-muted">{descriptions[key]}</p>
          <p className="mt-4 text-sm font-semibold text-primary">
            {busy === key ? "Ouverture…" : "Entrer →"}
          </p>
        </button>
      ))}

      {showAllSchools && (
        <button
          onClick={() => choose(ALL_SCHOOLS_VALUE)}
          disabled={busy !== null}
          className="card card-interactive p-6 text-left disabled:opacity-50 sm:col-span-3"
        >
          <p className="section-label mb-2">Supervision</p>
          <p className="mb-2 text-lg font-bold text-foreground">Vue globale — toutes les institutions</p>
          <p className="text-sm text-muted">
            Réservée au Super Administrateur. Agrège les trois institutions — à utiliser pour la supervision, pas pour le travail quotidien d&apos;une institution précise.
          </p>
          <p className="mt-4 text-sm font-semibold text-primary">
            {busy === ALL_SCHOOLS_VALUE ? "Ouverture…" : "Entrer →"}
          </p>
        </button>
      )}
    </div>
  );
}
