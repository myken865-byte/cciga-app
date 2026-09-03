import { notFound } from "next/navigation";
import { isDevBypassAllowed } from "@/lib/devBypass";
import DevBypassPicker from "@/components/DevBypassPicker";

export default function DevBypassPage() {
  if (!isDevBypassAllowed()) notFound();

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-accent">
        DEV / TEST
      </p>
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground">Choix du portail</h1>
      <DevBypassPicker />
    </div>
  );
}
