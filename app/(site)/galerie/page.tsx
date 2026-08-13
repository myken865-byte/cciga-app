import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerie",
  description: "La galerie photo du CCIGA.",
};

const gallery = [
  { title: "Campus principal", from: "from-primary", to: "to-primary-light" },
  { title: "Vie étudiante", from: "from-accent", to: "to-accent-light" },
  { title: "Laboratoires", from: "from-primary-dark", to: "to-primary" },
  { title: "Cérémonie de graduation", from: "from-accent-light", to: "to-accent" },
  { title: "Salles de classe", from: "from-primary-light", to: "to-primary-dark" },
  { title: "Activités parascolaires", from: "from-accent", to: "to-primary-light" },
];

export default function GaleriePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Galerie
      </p>
      <h1 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
        La vie au CCIGA
      </h1>
      <p className="mb-10 max-w-2xl text-muted">
        Aperçu visuel du campus. Des photos officielles remplaceront prochainement
        ces illustrations.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <div
            key={item.title}
            className={`flex h-48 items-end rounded-lg bg-gradient-to-br ${item.from} ${item.to} p-4`}
          >
            <span className="rounded-md bg-black/30 px-3 py-1 text-sm font-medium text-white">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
