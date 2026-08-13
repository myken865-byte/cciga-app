import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez le CCIGA.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 lg:px-6">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Contact
      </p>
      <h1 className="mb-10 text-3xl font-bold text-foreground lg:text-4xl">
        Contactez-nous
      </h1>

      <div className="grid gap-10 lg:grid-cols-2">
        <ContactForm />

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold text-primary">Coordonnées</h2>
            <ul className="space-y-2 text-sm text-muted">
              <li>📍 Campus principal du CCIGA</li>
              <li>📞 +509 0000-0000</li>
              <li>✉️ contact@cciga.edu</li>
              <li>🕒 Lundi – Vendredi, 8h00 – 16h00</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="mb-3 font-semibold text-primary">Services</h2>
            <ul className="space-y-2 text-sm text-muted">
              <li>Service des admissions</li>
              <li>Service académique</li>
              <li>Service financier</li>
              <li>Direction générale</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
