"use client";

// Vrai sélecteur de date natif (calendrier, navigation par année incluse
// dans le composant du navigateur) partagé par les fiches d'inscription —
// remplace les champs texte libres pour toute donnée qui est réellement une
// date. La valeur est stockée au format ISO "AAAA-MM-JJ" (natif à
// <input type="date">) ; l'affichage suit la locale du navigateur (JJ/MM/AAAA
// en français).
export default function DateField({
  label,
  value,
  onChange,
  max,
  min,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  max?: string;
  min?: string;
  helperText?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <input type="date" className="input" value={value} max={max} min={min} onChange={(e) => onChange(e.target.value)} />
      {helperText && <span className="mt-1 block text-[11px] text-muted">{helperText}</span>}
    </label>
  );
}

/** Date du jour au format ISO "AAAA-MM-JJ", pour bloquer les dates futures ou proposer une valeur par défaut. */
export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}
