import type { Metadata } from "next";
import { getDirection } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos",
  description: "Mission, vision, historique et direction du CCIGA.",
};

export default function AboutPage() {
  const direction = getDirection();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        À propos du CCIGA
      </p>
      <h1 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">
        Le Centre Interdisciplinaire des Génies Agrégées
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-3 text-xl font-semibold text-primary">Mission</h2>
          <p className="text-muted">
            Offrir une formation académique, professionnelle et universitaire de
            qualité, ancrée dans les besoins réels de la société, et préparer des
            générations de leaders compétents, responsables et innovants.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-6">
          <h2 className="mb-3 text-xl font-semibold text-primary">Vision</h2>
          <p className="text-muted">
            Devenir une référence régionale en matière d&apos;éducation intégrée,
            en combinant excellence pédagogique, innovation technologique et
            intelligence artificielle au service de la réussite des étudiants.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-6">
        <h2 className="mb-3 text-xl font-semibold text-primary">Historique</h2>
        <p className="text-muted">
          Le CCIGA a été fondé avec l&apos;ambition de réunir, sous une même
          institution, un parcours académique classique, une offre de formation
          professionnelle et un enseignement universitaire. Au fil des années,
          l&apos;institution a élargi ses programmes et modernisé ses méthodes
          d&apos;enseignement, avec pour objectif actuel de bâtir un campus
          numérique intégré au service de toute sa communauté.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-foreground">Direction</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {direction.map((member) => (
            <div key={member.role} className="rounded-lg border border-border bg-surface p-6">
              <h3 className="mb-1 font-semibold text-foreground">{member.role}</h3>
              <p className="text-sm text-muted">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
