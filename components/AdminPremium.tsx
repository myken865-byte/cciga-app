// Bibliothèque de présentation partagée par TOUTES les pages /admin/*
// (mandat "Design premium Centre de commandement", étendu à l'ensemble de
// l'admin — cf. AdminCommandCenter.tsx et app/admin/dashboard/page.tsx, les
// deux premiers écrans où ce système a été validé). Purement visuel : ces
// composants ne portent aucune logique métier, uniquement les classes
// `cc-*` déjà définies dans app/globals.css. Ne jamais utiliser en dehors de
// /admin — ces classes ne sont pas prévues pour les pages (site)/portail.

type IconComponent = (props: { className?: string }) => React.ReactElement;

export function AdminShell({ children }: { children: React.ReactNode }) {
  return <div className="cc-shell">{children}</div>;
}

export function AdminTitleBand({
  eyebrow,
  title,
  trailing,
}: {
  eyebrow: string;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="cc-title-band mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-light">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{title}</h1>
        </div>
        {trailing}
      </div>
    </div>
  );
}

export function AdminCard({
  title,
  icon: Icon,
  action,
  className = "",
  children,
}: {
  title?: string;
  icon?: IconComponent;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`cc-card p-5 sm:p-6 ${className}`}>
      {title && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="cc-section-title section-label flex items-center gap-1.5">
            {Icon && <Icon className="h-4 w-4 text-primary" />} {title}
          </h2>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function AdminTile({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`cc-tile p-3 ${className}`}>{children}</div>;
}

const toneColors: Record<string, string> = {
  success: "var(--success)",
  danger: "var(--danger)",
  warning: "var(--warning)",
};
const toneText: Record<string, string> = {
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
};

export function AdminStatTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: IconComponent;
  label: string;
  value: string | number;
  tone?: "success" | "danger" | "warning";
}) {
  return (
    <div className="cc-tile p-3">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="cc-tile-icon"
          style={
            tone
              ? { background: `color-mix(in srgb, ${toneColors[tone]} 14%, transparent)`, color: toneColors[tone] }
              : undefined
          }
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="section-label">{label}</span>
      </div>
      <p className={`text-xl font-bold ${tone ? toneText[tone] : "text-foreground"}`}>{value}</p>
    </div>
  );
}
