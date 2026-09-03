"use client";

import { useState } from "react";
import {
  teacherDemoName,
  teacherDemoToday,
  teacherDemoEnvironments,
  teacherDemoNotifications,
  teacherDemoCalendar,
  teacherDemoDocuments,
} from "@/lib/teacherDemoData";
import {
  BookIcon,
  CalendarIcon,
  ClipboardIcon,
  DocumentIcon,
  BellIcon,
  ChatIcon,
  AlertIcon,
  ClockIcon,
  DoorIcon,
  UsersIcon,
} from "@/components/icons";

const attendanceLabels: Record<string, { label: string; badge: string }> = {
  present: { label: "Présent(e)", badge: "badge-success" },
  absent: { label: "Absent(e)", badge: "badge-danger" },
  retard: { label: "Retard", badge: "badge-warning" },
  justifie: { label: "Justifié", badge: "badge-info" },
};

const homeworkLabels: Record<string, { label: string; badge: string }> = {
  brouillon: { label: "Brouillon", badge: "badge-neutral" },
  publie: { label: "Publié", badge: "badge-info" },
  remis: { label: "Remis", badge: "badge-success" },
  en_retard: { label: "En retard", badge: "badge-danger" },
  corrige: { label: "Corrigé", badge: "badge-success" },
};

const examLabels: Record<string, { label: string; badge: string }> = {
  a_venir: { label: "À venir", badge: "badge-neutral" },
  termine: { label: "Terminé", badge: "badge-info" },
  note: { label: "Noté", badge: "badge-success" },
};

const syncLabels: Record<string, { label: string; badge: string }> = {
  brouillon: { label: "Brouillon", badge: "badge-neutral" },
  soumis: { label: "Soumis", badge: "badge-info" },
  a_verifier: { label: "À vérifier", badge: "badge-warning" },
  valide: { label: "Validé", badge: "badge-success" },
  retourne: { label: "Retourné pour correction", badge: "badge-danger" },
};

const notificationLabels: Record<string, string> = {
  urgent: "badge-danger",
  important: "badge-warning",
  normal: "badge-info",
};

function DemoTag() {
  return <span className="badge badge-warning">DEMO</span>;
}

export default function TeacherDigitalClassroom() {
  const [envKey, setEnvKey] = useState<(typeof teacherDemoEnvironments)[number]["key"]>("classique");
  const [gradeMode, setGradeMode] = useState<"brouillon" | "soumis">("brouillon");
  const env = teacherDemoEnvironments.find((e) => e.key === envKey)!;

  return (
    <div className="mx-auto max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 pb-20 pt-6 lg:px-6">
      <div className="empty-state mb-6 !border-solid !border-warning !bg-warning-bg !text-left">
        <p className="mb-1 font-bold text-warning">DONNÉES DE DÉMONSTRATION</p>
        <p className="text-foreground">
          Aperçu DEV/TEST de la Salle de Classe Numérique. Aucune donnée réelle : les boutons Brouillon /
          Soumission ci-dessous ne modifient rien en base — ils illustrent uniquement le fonctionnement. Dès
          qu&apos;un cours réel sera affecté, cette démonstration disparaît automatiquement.
        </p>
      </div>

      {/* Dashboard */}
      <div className="card mb-4 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-foreground">Bonjour, {teacherDemoName} <DemoTag /></h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="stat-tile">
            <p className="section-label mb-1">Cours aujourd&apos;hui</p>
            <p className="text-lg font-bold text-foreground">{teacherDemoToday.coursAujourdhui}</p>
          </div>
          <div className="stat-tile col-span-2 sm:col-span-1">
            <p className="section-label mb-1">Prochaine classe</p>
            <p className="text-sm font-semibold text-foreground">{teacherDemoToday.prochaineClasse}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">À corriger</p>
            <p className="text-lg font-bold text-foreground">{teacherDemoToday.travauxACorriger}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Notes en brouillon</p>
            <p className="text-lg font-bold text-foreground">{teacherDemoToday.notesEnBrouillon}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Présences à compléter</p>
            <p className="text-lg font-bold text-foreground">{teacherDemoToday.presencesACompleter}</p>
          </div>
        </div>
      </div>

      {/* Trois environnements */}
      <p className="section-label mb-2">Choisir un environnement</p>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {teacherDemoEnvironments.map((e) => (
          <button
            key={e.key}
            onClick={() => setEnvKey(e.key)}
            className={`card p-4 text-left transition-colors ${
              envKey === e.key ? "border-primary bg-primary/5" : "card-interactive"
            }`}
          >
            <DoorIcon className="mb-2 h-6 w-6 text-primary" />
            <p className="font-semibold text-foreground">{e.label}</p>
            <p className="mt-0.5 text-xs text-muted">{e.groupeName}</p>
          </button>
        ))}
      </div>

      {/* Fil d'ariane */}
      <div className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted">
        {env.breadcrumb.map((b, i) => (
          <span key={b} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>›</span>}
            {b}
          </span>
        ))}
      </div>

      {/* Cahier de présence */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <UsersIcon className="h-4 w-4" /> Cahier de présence <DemoTag />
        </h2>
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
          {env.attendance.map((a) => (
            <li key={a.nom} className="flex items-center justify-between bg-surface px-3.5 py-2.5 text-sm">
              <span className="text-foreground">{a.nom}</span>
              <span className={`badge ${attendanceLabels[a.statut].badge}`}>{attendanceLabels[a.statut].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Cahier de classe */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <BookIcon className="h-4 w-4" /> Cahier de classe <DemoTag />
        </h2>
        <div className="space-y-2">
          {env.journal.map((j) => (
            <div key={j.date} className="card p-3.5 text-sm">
              <p className="mb-1 flex items-center justify-between font-medium text-foreground">
                {j.sujet}
                <span className="text-xs font-normal text-muted">{j.date}</span>
              </p>
              <p className="text-muted">{j.contenu}</p>
              <p className="mt-1 text-xs text-muted">Devoir donné : {j.devoirDonne}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cours et ressources */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <DocumentIcon className="h-4 w-4" /> Cours et ressources <DemoTag />
        </h2>
        <ul className="space-y-2">
          {env.ressources.map((r) => (
            <li key={r.nom} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <span className="font-medium text-foreground">{r.nom}</span>
              <span className="badge badge-neutral">{r.type}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Devoirs */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4" /> Devoirs / Travaux <DemoTag />
        </h2>
        <ul className="space-y-2">
          {env.devoirs.map((d) => (
            <li key={d.titre} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{d.titre}</p>
                <p className="text-xs text-muted">Échéance {d.echeance}</p>
              </div>
              <span className={`badge shrink-0 ${homeworkLabels[d.etat].badge}`}>{homeworkLabels[d.etat].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Examens */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <AlertIcon className="h-4 w-4" /> Examens / Évaluations <DemoTag />
        </h2>
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
          {env.examens.map((ex) => (
            <li key={ex.titre} className="flex items-center justify-between gap-3 bg-surface px-3.5 py-2.5 text-sm">
              <div>
                <p className="font-medium text-foreground">{ex.titre}</p>
                <p className="text-xs text-muted">{ex.date} · Barème {ex.bareme}</p>
              </div>
              <span className={`badge shrink-0 ${examLabels[ex.statut].badge}`}>{examLabels[ex.statut].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Module notes */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4" /> Notes — {env.matiereOuModule} ({env.periodeLabel}) <DemoTag />
        </h2>
        <div className="overflow-x-auto card mb-3">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-alt text-muted">
              <tr>
                <th className="px-3 py-2 font-semibold">{env.apprenantLabel}</th>
                <th className="px-3 py-2 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {env.gradebook.map((g) => (
                <tr key={g.apprenant} className="border-t border-border">
                  <td className="px-3 py-2 text-foreground">{g.apprenant}</td>
                  <td className="px-3 py-2 font-semibold text-primary">
                    {g.note !== null ? `${g.note}/${g.max}` : <span className="badge badge-neutral">Manquante</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button onClick={() => setGradeMode("brouillon")} className="btn-secondary text-sm">
            Enregistrer comme brouillon
          </button>
          <button onClick={() => setGradeMode("soumis")} className="btn-primary text-sm">
            Soumettre à l&apos;Administration
          </button>
        </div>
        <p className="text-xs text-muted">
          DEMO — aucune donnée n&apos;est envoyée. État actuel :{" "}
          <span className={`badge ${syncLabels[gradeMode === "soumis" ? "soumis" : "brouillon"].badge}`}>
            {syncLabels[gradeMode === "soumis" ? "soumis" : "brouillon"].label}
          </span>
        </p>
      </section>

      {/* Synchronisation Administration */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClockIcon className="h-4 w-4" /> Statut de synchronisation — Administration <DemoTag />
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`badge ${syncLabels[env.syncStatut].badge}`}>{syncLabels[env.syncStatut].label}</span>
          <span className="text-sm text-muted">
            {env.groupeLabel} {env.groupeName} · {env.matiereOuModule} · {env.periodeLabel}
          </span>
        </div>
        {env.syncStatut === "retourne" && (
          <div className="mt-3 rounded-md bg-danger-bg p-3 text-sm text-danger">
            Retourné pour correction — un commentaire de l&apos;Administration serait affiché ici. Workflow : Corriger
            → Vérifier → Resoumettre.
          </div>
        )}
      </section>

      {/* Palmarès */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <BookIcon className="h-4 w-4" /> Palmarès <DemoTag />
        </h2>
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
          {env.palmares.map((p) => (
            <li key={p.nom} className="flex items-center justify-between bg-surface px-3.5 py-2.5 text-sm">
              <span className="text-foreground">
                <span className="badge badge-neutral mr-2">#{p.rang}</span>
                {p.nom}
              </span>
              <span className="badge badge-info">{p.moyenne}/100</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Historique / audit */}
      <section className="card mb-8 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClockIcon className="h-4 w-4" /> Historique / Audit <DemoTag />
        </h2>
        <ul className="space-y-2">
          {env.audit.map((a, i) => (
            <li key={i} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-foreground">{a.action}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-muted">{a.date}</span>
                <span className="badge badge-neutral">{a.statut}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mb-4 h-px bg-border" />
      <p className="section-label mb-3">Global — tous environnements</p>

      {/* Calendrier */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" /> Calendrier professeur <DemoTag />
        </h2>
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
          {teacherDemoCalendar.map((c) => (
            <li key={c.titre} className="flex items-center justify-between gap-3 bg-surface px-3.5 py-2.5 text-sm">
              <div>
                <p className="font-medium text-foreground">{c.titre}</p>
                <p className="text-xs text-muted">{c.date}</p>
              </div>
              <span className="badge badge-neutral">{c.type}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Notifications */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <BellIcon className="h-4 w-4" /> Notifications <DemoTag />
        </h2>
        <ul className="space-y-2">
          {teacherDemoNotifications.map((n) => (
            <li key={n.titre} className="card flex items-start justify-between gap-3 p-3.5 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-foreground">{n.titre}</p>
                <p className="text-xs text-muted">{n.corps}</p>
              </div>
              <span className={`badge shrink-0 ${notificationLabels[n.etat]}`}>{n.etat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Documents */}
      <section className="card mb-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <DocumentIcon className="h-4 w-4" /> Documents professeur <DemoTag />
        </h2>
        <ul className="space-y-2">
          {teacherDemoDocuments.map((d) => (
            <li key={d.nom} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <span className="font-medium text-foreground">{d.nom}</span>
              <span className="badge badge-neutral">{d.type}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Communication */}
      <section className="card p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ChatIcon className="h-4 w-4" /> Communication
        </h2>
        <div className="empty-state">
          Espace de communication avec l&apos;Administration, la Direction et le Secrétariat — architecture prête,
          fonctionnalité à activer dans une prochaine phase. Aucune messagerie fictive n&apos;a été créée.
        </div>
      </section>
    </div>
  );
}
