import { formatHTG } from "@/lib/currency";
import {
  parentDemoStudent,
  parentDemoAttendance,
  parentDemoCarnet,
  parentDemoHomework,
  parentDemoProgression,
  parentDemoPayments,
  parentDemoDiscipline,
  parentDemoNotifications,
  parentDemoCalendar,
  parentDemoDocuments,
  parentDemoRequests,
} from "@/lib/parentDemoData";
import {
  parentRequestCategories,
  parentRequestCategoryLabels,
  parentRequestServices,
  parentRequestServiceLabels,
  parentRequestStatusLabels,
  parentRequestStatusBadge,
  type ParentRequestCategory,
  type ParentRequestStatus,
} from "@/lib/parentRequests";
import {
  BookIcon,
  WalletIcon,
  CalendarIcon,
  ClipboardIcon,
  DocumentIcon,
  AlertIcon,
  BellIcon,
  ChatIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@/components/icons";

const homeCards = [
  { href: "#presence", label: "Présence", icon: CalendarIcon, summary: "1 retard cette semaine" },
  { href: "#carnet", label: "Carnet scolaire", icon: BookIcon, summary: "2/4 périodes publiées" },
  { href: "#paiements", label: "Paiements", icon: WalletIcon, summary: `Solde ${formatHTG(parentDemoPayments.solde)}` },
  { href: "#travaux", label: "Travaux", icon: ClipboardIcon, summary: "1 en retard" },
  { href: "#discipline", label: "Remarques", icon: AlertIcon, summary: "2 entrées" },
  { href: "#notifications", label: "Notifications", icon: BellIcon, summary: "2 non lues" },
  { href: "#calendrier", label: "Calendrier", icon: CalendarIcon, summary: "3 échéances à venir" },
  { href: "#documents", label: "Documents", icon: DocumentIcon, summary: "3 disponibles" },
];

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#presence", label: "Présence" },
  { href: "#carnet", label: "Carnet" },
  { href: "#travaux", label: "Travaux" },
  { href: "#paiements", label: "Paiements" },
  { href: "#discipline", label: "Remarques" },
  { href: "#notifications", label: "Notifications" },
  { href: "#calendrier", label: "Calendrier" },
  { href: "#documents", label: "Documents" },
  { href: "#communication", label: "Communication" },
  { href: "#profil", label: "Profil" },
];

const homeworkLabels: Record<string, { label: string; badge: string }> = {
  a_faire: { label: "À faire", badge: "badge-neutral" },
  en_cours: { label: "En cours", badge: "badge-info" },
  remis: { label: "Remis", badge: "badge-success" },
  en_retard: { label: "En retard", badge: "badge-danger" },
};

const paymentLabels: Record<string, { label: string; badge: string }> = {
  paye: { label: "PAYÉ", badge: "badge-success" },
  partiel: { label: "PARTIEL", badge: "badge-warning" },
  en_attente: { label: "EN ATTENTE", badge: "badge-neutral" },
  en_retard: { label: "EN RETARD", badge: "badge-danger" },
};

const notificationLabels: Record<string, string> = {
  urgent: "badge-danger",
  important: "badge-warning",
  normal: "badge-info",
};

function DemoTag() {
  return <span className="badge badge-warning">DEMO</span>;
}

export default function ParentDigitalOffice() {
  return (
    <div id="accueil" className="mx-auto max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 pb-20 pt-6 lg:px-6">
      <div className="empty-state mb-6 !border-solid !border-warning !bg-warning-bg !text-left">
        <p className="mb-1 font-bold text-warning">DONNÉES DE DÉMONSTRATION</p>
        <p className="text-foreground">
          Aperçu DEV/TEST du Bureau Scolaire Numérique du Parent. Aucune donnée réelle : tout ce qui suit
          sert uniquement à visualiser l&apos;architecture et le design. Dès qu&apos;un enfant réel est lié à un
          compte, ces cartes de démonstration disparaissent automatiquement.
        </p>
      </div>

      {/* En-tête identité élève */}
      <div className="card mb-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="section-label mb-1">Fiche élève <DemoTag /></p>
            <h2 className="text-xl font-bold text-foreground">{parentDemoStudent.name}</h2>
            <p className="text-sm text-muted">
              {parentDemoStudent.classe} — Section {parentDemoStudent.section} · {parentDemoStudent.etablissement}
            </p>
          </div>
          <span className="badge badge-success">{parentDemoStudent.statut}</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="stat-tile">
            <p className="section-label mb-1">Matricule</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.matricule}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Année académique</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.anneeAcademique}</p>
          </div>
          <div className="stat-tile col-span-2 sm:col-span-1">
            <p className="section-label mb-1 flex items-center gap-1">
              <UsersIcon className="h-3.5 w-3.5" /> Enfant
            </p>
            <select disabled className="input !bg-surface-alt text-sm" defaultValue="1">
              <option value="1">{parentDemoStudent.name}</option>
            </select>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Tuteur autorisé</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.tuteur}</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">
          Architecture multi-enfants prête : le sélecteur ci-dessus permettra de changer d&apos;enfant sans se
          déconnecter dès que plusieurs enfants réels seront liés à ce compte.
        </p>
      </div>

      {/* Navigation courte */}
      <div className="mb-6 -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {navLinks.map((n) => (
          <a key={n.href} href={n.href} className="badge badge-neutral shrink-0 !py-1.5 !px-3 hover:bg-primary/10">
            {n.label}
          </a>
        ))}
      </div>

      {/* Cartes d'accueil */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {homeCards.map(({ href, label, icon: Icon, summary }) => (
          <a key={href} href={href} className="card card-interactive p-3.5">
            <Icon className="mb-2 h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <p className="mt-0.5 text-xs text-muted">{summary}</p>
          </a>
        ))}
      </div>

      {/* Présence */}
      <section id="presence" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" /> Présence <DemoTag />
        </h2>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="stat-tile">
            <p className="section-label mb-1">Aujourd&apos;hui</p>
            <span className="badge badge-success">Présent(e)</span>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Présents (total)</p>
            <p className="text-lg font-bold text-foreground">{parentDemoAttendance.totaux.presents}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Absences</p>
            <p className="text-lg font-bold text-foreground">
              {parentDemoAttendance.totaux.absences}
              <span className="ml-1 text-xs font-normal text-muted">
                ({parentDemoAttendance.totaux.absencesJustifiees} justifiées)
              </span>
            </p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Retards</p>
            <p className="text-lg font-bold text-foreground">{parentDemoAttendance.totaux.retards}</p>
          </div>
        </div>
        <p className="section-label mb-2">Historique récent</p>
        <ul className="divide-y divide-row-divider overflow-hidden rounded-lg border border-border">
          {parentDemoAttendance.historique.map((h) => (
            <li key={h.date} className="flex items-center justify-between bg-surface px-3.5 py-2.5 text-sm">
              <span className="text-foreground">{h.date}</span>
              <span
                className={`badge ${
                  h.statut === "present" ? "badge-success" : h.statut === "retard" ? "badge-warning" : "badge-danger"
                }`}
              >
                {h.statut === "present" ? "Présent(e)" : h.statut === "retard" ? "Retard" : "Absent(e)"}
                {"justifie" in h && h.justifie ? " (justifié)" : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Carnet scolaire */}
      <section id="carnet" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <BookIcon className="h-4 w-4" /> Carnet scolaire — 4 périodes <DemoTag />
        </h2>
        <div className="space-y-2">
          {parentDemoCarnet.map((p) => (
            <details key={p.label} className="card overflow-hidden" open={p.matieres.length > 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3.5 text-sm font-semibold text-foreground">
                <span className="flex items-center gap-2">
                  {p.label}
                  {p.matieres.length === 0 && <span className="badge badge-neutral">À COMPLÉTER</span>}
                </span>
                <span className="flex items-center gap-2">
                  {p.matieres.length > 0 && <span className="badge badge-info">{p.moyenneGenerale.toFixed(1)}/100</span>}
                  <ChevronDownIcon />
                </span>
              </summary>
              <div className="border-t border-border p-3.5">
                {p.matieres.length === 0 ? (
                  <div className="empty-state">{p.appreciationGenerale}</div>
                ) : (
                  <>
                    <div className="overflow-x-auto card mb-3">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-surface-alt text-muted">
                          <tr>
                            <th className="px-3 py-2 font-semibold">Matière</th>
                            <th className="px-3 py-2 font-semibold">Note</th>
                            <th className="px-3 py-2 font-semibold">Moy. classe</th>
                            <th className="px-3 py-2 font-semibold">Appréciation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {p.matieres.map((m) => (
                            <tr key={m.matiere} className="border-t border-row-divider">
                              <td className="px-3 py-2 text-foreground">{m.matiere}</td>
                              <td className="px-3 py-2 font-semibold text-primary">{m.note}/{m.max}</td>
                              <td className="px-3 py-2 text-muted">{m.moyenneClasse}/{m.max}</td>
                              <td className="px-3 py-2 text-muted">{m.appreciation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <div className="stat-tile">
                        <p className="section-label mb-1">Rang</p>
                        <p className="text-sm font-semibold text-foreground">{p.rang}</p>
                      </div>
                      <div className="stat-tile">
                        <p className="section-label mb-1">Décision</p>
                        <span className="badge badge-success">{p.decision}</span>
                      </div>
                      <div className="stat-tile col-span-2 sm:col-span-1">
                        <p className="section-label mb-1">Appréciation générale</p>
                        <p className="text-sm text-foreground">{p.appreciationGenerale}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </details>
          ))}
        </div>

        {/* Progression */}
        <div className="mt-4 border-t border-border pt-4">
          <p className="section-label mb-2">Progression entre périodes</p>
          <div className="mb-2 flex flex-wrap gap-1.5">
            {parentDemoProgression.pointsForts.map((s) => (
              <span key={s} className="badge badge-success">↑ {s}</span>
            ))}
            {parentDemoProgression.aAmeliorer.map((s) => (
              <span key={s} className="badge badge-warning">À renforcer — {s}</span>
            ))}
          </div>
          <p className="text-sm text-muted">{parentDemoProgression.note}</p>
        </div>
      </section>

      {/* Travaux */}
      <section id="travaux" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ClipboardIcon className="h-4 w-4" /> Travaux scolaires <DemoTag />
        </h2>
        <ul className="space-y-2">
          {parentDemoHomework.map((h) => (
            <li key={h.titre} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{h.titre}</p>
                <p className="text-xs text-muted">{h.matiere} · Échéance {h.echeance}</p>
              </div>
              <span className={`badge shrink-0 ${homeworkLabels[h.etat].badge}`}>{homeworkLabels[h.etat].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Paiements */}
      <section id="paiements" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <WalletIcon className="h-4 w-4" /> Paiements / Scolarité <DemoTag />
        </h2>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="stat-tile">
            <p className="section-label mb-1">Total prévu</p>
            <p className="text-sm font-semibold text-foreground">{formatHTG(parentDemoPayments.fraisTotal)}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Payé</p>
            <p className="text-sm font-semibold text-success">{formatHTG(parentDemoPayments.paye)}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Solde</p>
            <p className="text-sm font-semibold text-danger">{formatHTG(parentDemoPayments.solde)}</p>
          </div>
        </div>
        <ul className="divide-y divide-row-divider overflow-hidden rounded-lg border border-border">
          {parentDemoPayments.versements.map((v) => (
            <li key={v.label} className="flex items-center justify-between gap-3 bg-surface px-3.5 py-2.5 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-foreground">{v.label}</p>
                <p className="text-xs text-muted">
                  {formatHTG(v.montant)} · {v.date} · Réf. {v.reference}
                </p>
              </div>
              <span className={`badge shrink-0 ${paymentLabels[v.statut].badge}`}>{paymentLabels[v.statut].label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Discipline */}
      <section id="discipline" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <AlertIcon className="h-4 w-4" /> Remarques / Discipline <DemoTag />
        </h2>
        <ul className="space-y-2">
          {parentDemoDiscipline.map((d, i) => (
            <li key={i} className="card p-3.5 text-sm">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="font-medium text-foreground">{d.categorie}</span>
                <span className="text-xs text-muted">{d.date}</span>
              </div>
              <p className="text-muted">{d.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Notifications */}
      <section id="notifications" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <BellIcon className="h-4 w-4" /> Notifications <DemoTag />
        </h2>
        <ul className="space-y-2">
          {parentDemoNotifications.map((n) => (
            <li key={n.titre} className={`card flex items-start justify-between gap-3 p-3.5 text-sm ${!n.lu ? "border-primary/40" : ""}`}>
              <div className="min-w-0">
                <p className="font-medium text-foreground">{n.titre}</p>
                <p className="text-xs text-muted">{n.corps}</p>
              </div>
              <span className={`badge shrink-0 ${notificationLabels[n.etat]}`}>{n.etat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Calendrier */}
      <section id="calendrier" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <CalendarIcon className="h-4 w-4" /> Calendrier scolaire <DemoTag />
        </h2>
        <ul className="divide-y divide-row-divider overflow-hidden rounded-lg border border-border">
          {parentDemoCalendar.map((c) => (
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

      {/* Documents */}
      <section id="documents" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <DocumentIcon className="h-4 w-4" /> Documents <DemoTag />
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {parentDemoDocuments.map((d) => (
            <div key={d.nom} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{d.nom}</p>
                <p className="text-xs text-muted">{d.type}</p>
              </div>
              <button disabled className="btn-secondary !min-h-0 !py-1.5 text-xs opacity-60">
                Aperçu démo
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Communication / Contacter l'administration */}
      <section id="communication" className="card mb-4 scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <ChatIcon className="h-4 w-4" /> Contacter l&apos;administration <DemoTag />
        </h2>
        <p className="mb-4 text-sm text-muted">
          Aperçu du guichet numérique. Avec un vrai compte parent, ce formulaire envoie réellement la demande à
          l&apos;administration ; ici, la saisie est désactivée.
        </p>
        <div className="mb-5 space-y-3 opacity-75">
          <div className="grid gap-3 sm:grid-cols-2">
            <select disabled className="input">
              {parentRequestCategories.map((c) => (
                <option key={c}>{parentRequestCategoryLabels[c]}</option>
              ))}
            </select>
            <select disabled className="input">
              {parentRequestServices.map((s) => (
                <option key={s}>{parentRequestServiceLabels[s]}</option>
              ))}
            </select>
          </div>
          <input disabled className="input" placeholder="Objet" />
          <textarea disabled className="input" rows={2} placeholder="Message…" />
          <button disabled className="btn-primary w-full">
            Envoyer à l&apos;administration (démo)
          </button>
        </div>

        <p className="section-label mb-2">Mes demandes</p>
        <ul className="space-y-2">
          {parentDemoRequests.map((r) => (
            <li key={r.subject} className="card flex items-center justify-between gap-3 p-3.5 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{r.subject}</p>
                <p className="text-xs text-muted">
                  {parentRequestCategoryLabels[r.category as ParentRequestCategory]} · {r.updatedAt}
                </p>
              </div>
              <span className={`badge shrink-0 ${parentRequestStatusBadge[r.status as ParentRequestStatus]}`}>
                {parentRequestStatusLabels[r.status as ParentRequestStatus]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Profil */}
      <section id="profil" className="card scroll-mt-4 p-5 sm:p-6">
        <h2 className="section-label mb-3 flex items-center gap-1.5">
          <UsersIcon className="h-4 w-4" /> Profil de l&apos;élève <DemoTag />
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="stat-tile">
            <p className="section-label mb-1">Nom</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.name}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Matricule</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.matricule}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Classe / Section</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.classe} — {parentDemoStudent.section}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Établissement</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.etablissement}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Année académique</p>
            <p className="text-sm font-semibold text-foreground">{parentDemoStudent.anneeAcademique}</p>
          </div>
          <div className="stat-tile">
            <p className="section-label mb-1">Statut scolaire</p>
            <span className="badge badge-success">{parentDemoStudent.statut}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
