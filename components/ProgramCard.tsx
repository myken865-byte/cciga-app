import Link from "next/link";
import type { Program } from "@/lib/content";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      href={`/programmes/${program.slug}`}
      className="flex flex-col rounded-lg border border-border bg-surface p-5 transition hover:border-primary hover:shadow-md"
    >
      <span className="mb-2 inline-block w-fit rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-semibold text-primary-dark">
        {program.level}
      </span>
      <h3 className="mb-1 font-semibold text-foreground">{program.name}</h3>
      <p className="mb-1 text-sm text-muted">{program.faculty}</p>
      <p className="mb-3 text-sm text-muted">{program.description}</p>
      <span className="mt-auto text-xs font-medium text-primary">
        Durée : {program.duration}
      </span>
    </Link>
  );
}
