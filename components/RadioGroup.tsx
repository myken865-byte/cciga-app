"use client";

// Boutons radio partagés pour tout champ à choix prédéfini court (2-4
// options) — remplace la saisie libre pour les données qui ont une liste
// finie et connue de réponses possibles (Sexe, Oui/Non, etc.).
export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <div className="flex flex-wrap gap-4">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-1.5 text-sm text-foreground">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}
