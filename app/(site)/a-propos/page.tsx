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
      {/* Grand encadrement — mandat "Refonte Page À propos" (2026-09-06) :
      double bordure institutionnelle (extérieure bleu marine, intérieure
      jaune or) autour de tout le contenu, fond crème clair. */}
      <div className="rounded-[44px] border-[10px] border-primary-dark p-2 shadow-xl">
        <div className="rounded-[36px] border-[6px] border-accent bg-[#fdf8ec] p-6 sm:p-10 lg:p-12">
          <div className="mx-auto mb-10 max-w-3xl rounded-2xl border-2 border-accent/60 bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              À propos du CCIGA
            </p>
            <h1 className="text-3xl font-bold text-primary-dark lg:text-4xl">
              Le Centre Interdisciplinaire des Génies Agrégées
            </h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border-[4px] border-accent bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-3 text-xl font-semibold text-primary-dark">Mission</h2>
              <p className="text-muted">
                Offrir une formation académique, professionnelle et universitaire de
                qualité, ancrée dans les besoins réels de la société, et préparer des
                générations de leaders compétents, responsables et innovants.
              </p>
            </div>
            <div className="rounded-2xl border-[4px] border-accent bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-3 text-xl font-semibold text-primary-dark">Vision</h2>
              <p className="text-muted">
                Devenir une référence régionale en matière d&apos;éducation intégrée,
                en combinant excellence pédagogique, innovation technologique et
                intelligence artificielle au service de la réussite des étudiants.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border-[4px] border-accent bg-white p-6 text-center shadow-sm sm:p-8">
            <h2 className="mb-3 text-xl font-semibold text-primary-dark">Historique</h2>
            <p className="mx-auto max-w-3xl text-muted">
              Le CCIGA a été fondé avec l&apos;ambition de réunir, sous une même
              institution, un parcours académique classique, une offre de formation
              professionnelle et un enseignement universitaire. Au fil des années,
              l&apos;institution a élargi ses programmes et modernisé ses méthodes
              d&apos;enseignement, avec pour objectif actuel de bâtir un campus
              numérique intégré au service de toute sa communauté.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-primary-dark">Direction</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {direction.map((member) => (
                <div key={member.role} className="rounded-2xl border-[4px] border-accent bg-white p-6 text-center shadow-sm">
                  <h3 className="mb-1 font-semibold text-foreground">{member.role}</h3>
                  <p className="text-sm text-muted">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
