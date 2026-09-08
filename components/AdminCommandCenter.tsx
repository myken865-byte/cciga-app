"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatHTG } from "@/lib/currency";
import BackButton from "@/components/BackButton";
import {
  UsersIcon,
  BookIcon,
  CalendarIcon,
  ClipboardIcon,
  WalletIcon,
  AlertIcon,
  DocumentIcon,
  ChatIcon,
  ClockIcon,
} from "@/components/icons";

export interface EnvironmentStats {
  programsCount: number;
  studentsCount: number;
  teachersCount: number;
  presentToday: number;
  absentToday: number;
  retardToday: number;
  pendingGradesCount: number;
  totalPaid: number;
  totalExpected: number;
  balanceOutstanding: number;
  admissionsPending: number;
  admissionsByYear: { year: number; count: number }[];
  enrollmentByYear: { label: string; count: number }[];
}

const quickLinks = [
  { href: "/admin/admissions", label: "Candidatures", icon: ClipboardIcon },
  { href: "/admin/users", label: "Comptes / Élèves / Enseignants", icon: UsersIcon },
  { href: "/admin/courses", label: "Cours", icon: BookIcon },
  { href: "/admin/documents", label: "Bulletins / Documents", icon: DocumentIcon },
  { href: "/admin/finance", label: "Finances", icon: WalletIcon },
  { href: "/admin/messages", label: "Communications", icon: ChatIcon },
];

export default function AdminCommandCenter({
  global,
  environments,
  activeAcademicYearLabel,
  initialScope,
}: {
  global: EnvironmentStats;
  environments: { key: string; label: string; stats: EnvironmentStats }[];
  activeAcademicYearLabel: string | null;
  initialScope: string | null;
}) {
  const router = useRouter();
  const [scope, setScope] = useState<string | null>(initialScope);
  const [capturing, setCapturing] = useState(false);
  const [captureMessage, setCaptureMessage] = useState<string | null>(null);
  const stats = scope ? environments.find((e) => e.key === scope)!.stats : global;
  const scopeLabel = scope ? environments.find((e) => e.key === scope)!.label : "Vue globale";

  // Persiste le choix (même cookie que le sélecteur d'institution) pour que
  // les liens rapides ci-dessous — et toutes les autres pages admin — restent
  // dans le même contexte institutionnel, sans logique dupliquée.
  async function selectScope(key: string | null) {
    setScope(key);
    try {
      await fetch("/api/admin/institution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school: key ?? "toutes" }),
      });
      router.refresh();
    } catch {
      // La bascule locale reste utile même si la persistance échoue
      // (ex. rôle non SUPER_ADMIN pour "Vue globale") — se corrige à la
      // prochaine visite du sélecteur d'institution.
    }
  }

  async function captureEnrollment() {
    setCapturing(true);
    setCaptureMessage(null);
    const res = await fetch("/api/admin/pilotage/snapshot", { method: "POST" });
    const json = await res.json();
    setCapturing(false);
    setCaptureMessage(res.ok ? `Effectifs capturés pour ${json.academicYear} (${json.programsCaptured} programme(s)).` : json.error);
    if (res.ok) router.refresh();
  }

  return (
    <div className="cc-shell">
      <BackButton fallbackHref="/mon-espace" label="Mon espace" />
      {/* Bandeau-titre premium */}
      <div className="cc-title-band mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-light">
              CCIGA — Supervision institutionnelle
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Centre de commandement</h1>
          </div>
          <span className="badge border border-white/25 bg-white/10 !py-1.5 !px-3 text-white backdrop-blur-sm">
            {scopeLabel} · temps réel
          </span>
        </div>
      </div>

      {/* Sélecteur institutionnel */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => selectScope(null)}
          className={`cc-pill rounded-full !py-1.5 !px-3.5 text-xs font-semibold ${scope === null ? "cc-pill-active" : "bg-surface text-muted hover:border-primary-light"}`}
        >
          Vue globale
        </button>
        {environments.map((e) => (
          <button
            key={e.key}
            onClick={() => selectScope(e.key)}
            className={`cc-pill rounded-full !py-1.5 !px-3.5 text-xs font-semibold ${scope === e.key ? "cc-pill-active" : "bg-surface text-muted hover:border-primary-light"}`}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Tableau de bord exécutif */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile icon={UsersIcon} label="Élèves/Étudiants" value={stats.studentsCount} />
        <StatTile icon={UsersIcon} label="Enseignants" value={stats.teachersCount} />
        <StatTile icon={BookIcon} label="Classes / Programmes" value={stats.programsCount} />
        <StatTile icon={ClipboardIcon} label="Candidatures en attente" value={stats.admissionsPending} />
        <StatTile icon={CalendarIcon} label="Présents aujourd'hui" value={stats.presentToday} tone="success" />
        <StatTile icon={AlertIcon} label="Absents aujourd'hui" value={stats.absentToday} tone="danger" />
        <StatTile icon={ClockIcon} label="Retards aujourd'hui" value={stats.retardToday} tone="warning" />
        <StatTile
          icon={ClipboardIcon}
          label="Notes à valider"
          value={stats.pendingGradesCount}
          tone={stats.pendingGradesCount > 0 ? "warning" : undefined}
        />
      </div>

      {/* Finances */}
      <div className="cc-card mb-4 p-5 sm:p-6">
        <h2 className="cc-section-title section-label mb-3 flex items-center gap-1.5">
          <WalletIcon className="h-4 w-4 text-primary" /> Finances — {scopeLabel}
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="cc-tile p-3">
            <p className="section-label mb-1">Prévu</p>
            <p className="text-sm font-semibold text-foreground">{formatHTG(stats.totalExpected)}</p>
          </div>
          <div className="cc-tile p-3">
            <p className="section-label mb-1">Perçu</p>
            <p className="text-sm font-semibold text-success">{formatHTG(stats.totalPaid)}</p>
          </div>
          <div className="cc-tile p-3">
            <p className="section-label mb-1">Solde</p>
            <p className="text-sm font-semibold text-danger">{formatHTG(stats.balanceOutstanding)}</p>
          </div>
        </div>
        <Link href="/admin/finance" className="btn-secondary mt-3 text-sm">
          Ouvrir le module Finances
        </Link>
      </div>

      {/* Workflow académique */}
      <div className="cc-card mb-4 p-5 sm:p-6">
        <h2 className="cc-section-title section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4 text-primary" /> Workflow académique
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {["Brouillon", "Soumis", "À vérifier", "Validé", "Publié"].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="badge badge-neutral border border-border">{step}</span>
              {i < arr.length - 1 && (
                <span className="text-accent" aria-hidden>
                  →
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          {stats.pendingGradesCount > 0
            ? `${stats.pendingGradesCount} note(s) soumise(s) par des enseignants attendent une vérification.`
            : "Aucune note en attente de vérification pour le moment."}
        </p>
        <Link href="/admin/documents" className="btn-secondary mt-3 text-sm">
          Ouvrir la file de validation
        </Link>
      </div>

      {/* Historisation pluriannuelle — données réelles (dates de soumission), pas d'effectif rétroactif inventé */}
      <div className="cc-card mb-6 p-5 sm:p-6">
        <h2 className="cc-section-title section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4 text-primary" /> Évolution des admissions par année — {scopeLabel}
        </h2>
        {stats.admissionsByYear.length === 0 ? (
          <p className="empty-state text-sm">Aucune candidature enregistrée pour cette portée.</p>
        ) : (
          <div className="flex items-end gap-3 overflow-x-auto pb-1">
            {stats.admissionsByYear.map((y) => {
              const max = Math.max(...stats.admissionsByYear.map((x) => x.count), 1);
              return (
                <div key={y.year} className="flex shrink-0 flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-foreground">{y.count}</span>
                  <div
                    className="w-8 rounded-t-md bg-gradient-to-t from-primary to-primary-light"
                    style={{ height: `${Math.max((y.count / max) * 80, 6)}px` }}
                  />
                  <span className="text-[11px] text-muted">{y.year}</span>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-3 text-xs text-muted">Basé sur les dates réelles de soumission des candidatures.</p>
      </div>

      {/* Effectifs pluriannuels — capture explicite, jamais rétroactive */}
      <div className="cc-card mb-6 p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="cc-section-title section-label flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4 text-primary" /> Effectifs par année — {scopeLabel}
          </h2>
          <button onClick={captureEnrollment} disabled={capturing} className="btn-secondary !min-h-0 !py-1.5 text-xs">
            {capturing ? "Capture…" : `Capturer l'effectif actuel${activeAcademicYearLabel ? ` (${activeAcademicYearLabel})` : ""}`}
          </button>
        </div>
        {captureMessage && <p className="mb-3 text-xs text-muted">{captureMessage}</p>}
        {stats.enrollmentByYear.length === 0 ? (
          <p className="empty-state text-sm">
            Aucun effectif capturé pour le moment. Chaque capture enregistre l&apos;effectif réel du jour pour
            l&apos;année académique active — l&apos;historique se construit au fil des années, sans donnée rétroactive inventée.
          </p>
        ) : (
          <div className="flex items-end gap-3 overflow-x-auto pb-1">
            {stats.enrollmentByYear.map((y) => {
              const max = Math.max(...stats.enrollmentByYear.map((x) => x.count), 1);
              return (
                <div key={y.label} className="flex shrink-0 flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-foreground">{y.count}</span>
                  <div
                    className="w-8 rounded-t-md bg-gradient-to-t from-success to-success/60"
                    style={{ height: `${Math.max((y.count / max) * 80, 6)}px` }}
                  />
                  <span className="text-[11px] text-muted">{y.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Accès rapide */}
      <p className="cc-section-title section-label mb-2">Accès rapide</p>
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="cc-card card-interactive flex flex-col p-3.5">
            <span className="cc-tile-icon mb-2">
              <Icon className="h-4 w-4" />
            </span>
            <p className="text-sm font-semibold text-foreground">{label}</p>
          </Link>
        ))}
      </div>

      {/* Modules à venir — honnêtement marqués, aucune donnée fabriquée */}
      <div className="cc-card p-5 sm:p-6">
        <h2 className="cc-section-title section-label mb-3 flex items-center gap-1.5">
          <DocumentIcon className="h-4 w-4 text-primary" /> Modules complémentaires
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between gap-2">
            <span className="text-foreground">Centre d&apos;incidents / discipline institutionnelle</span>
            <span className="badge badge-neutral border border-border">À COMPLÉTER</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="text-foreground">Rapports et analytique avancée</span>
            <span className="badge badge-neutral border border-border">À COMPLÉTER</span>
          </li>
          <li className="flex items-center justify-between gap-2">
            <span className="text-foreground">Aperçu bulletins/palmarès avant publication</span>
            <span className="badge badge-neutral border border-border">À COMPLÉTER</span>
          </li>
        </ul>
      </div>
    </div>
  );
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

function StatTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: (props: { className?: string }) => React.ReactElement;
  label: string;
  value: number;
  tone?: "success" | "danger" | "warning";
}) {
  return (
    <div className="cc-tile p-3">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="cc-tile-icon"
          style={tone ? { background: `color-mix(in srgb, ${toneColors[tone]} 14%, transparent)`, color: toneColors[tone] } : undefined}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="section-label">{label}</span>
      </div>
      <p className={`text-xl font-bold ${tone ? toneText[tone] : "text-foreground"}`}>{value}</p>
    </div>
  );
}
