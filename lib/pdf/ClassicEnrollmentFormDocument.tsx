/* eslint-disable jsx-a11y/alt-text -- react-pdf's <Image> renders into a PDF, not the DOM; it has no `alt` prop. */
import { Document, Page, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import { DOCUMENT_FONT_FAMILY, ensureDocumentFontRegistered } from "@/lib/pdf/fonts";

ensureDocumentFontRegistered();

const NAVY = "#00185a";
const GOLD = "#fcc606";

const styles = StyleSheet.create({
  page: { padding: 26, paddingTop: 20, fontSize: 8.5, fontFamily: DOCUMENT_FONT_FAMILY, color: "#1a1a1a" },
  topBar: { height: 3, backgroundColor: GOLD, marginBottom: 8 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  logo: { width: 32, height: 32, marginRight: 8 },
  headerTitleBlock: { flex: 1 },
  orgName: { fontSize: 11, fontWeight: 700, color: NAVY },
  orgSub: { fontSize: 7, color: "#555555", marginTop: 1 },
  ficheNumberBox: { alignItems: "flex-end" },
  ficheNumberLabel: { fontSize: 6.5, color: "#555555" },
  ficheNumberValue: { fontSize: 8.5, fontWeight: 700, color: NAVY, fontFamily: "Courier" },

  titleBlock: { marginBottom: 6, paddingBottom: 5, borderBottom: `1.5 solid ${NAVY}` },
  ficheTitle: { fontSize: 12, fontWeight: 700, color: NAVY, letterSpacing: 1, textAlign: "center" },
  classRow: { flexDirection: "row", marginTop: 3, fontSize: 8.5, width: "100%" },
  classLabel: { fontWeight: 700, color: "#1a1a1a" },
  classValue: { marginLeft: 4, fontWeight: 700, color: NAVY, borderBottom: "0.5 solid #999999", flex: 1 },

  bodyRow: { flexDirection: "row", gap: 12 },
  bodyLeft: { flex: 1 },
  photoBox: { width: 60, height: 76, border: `1 solid ${NAVY}`, borderRadius: 2, objectFit: "cover" },
  photoPlaceholder: {
    width: 60,
    height: 76,
    border: `1 dashed ${NAVY}`,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  photoPlaceholderText: { fontSize: 6, color: NAVY, textAlign: "center" },

  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 700,
    color: NAVY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 6,
    marginBottom: 3,
    borderBottom: `1 solid ${NAVY}`,
    paddingBottom: 2,
  },
  fieldRow: { flexDirection: "row", marginBottom: 3, alignItems: "flex-end" },
  fieldLabel: { fontSize: 7, color: "#333333" },
  fieldValue: {
    flex: 1,
    fontSize: 8,
    fontWeight: 700,
    marginLeft: 4,
    borderBottom: "0.5 solid #999999",
    paddingBottom: 1,
    minHeight: 9,
  },
  fieldRowSplit: { flexDirection: "row", gap: 8 },
  fieldHalf: { flex: 1 },
  fieldThird: { flex: 1 },

  checkRow: { flexDirection: "row", gap: 8, marginBottom: 3, flexWrap: "wrap" },
  checkItem: { fontSize: 7.5, color: "#333333" },

  table: { marginTop: 2 },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#f0f0f0", paddingVertical: 2, paddingHorizontal: 2 },
  tableRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 2, paddingHorizontal: 2 },
  tableCellHeader: { flex: 1, fontSize: 7, fontWeight: 700, color: NAVY },
  tableCell: { flex: 1, fontSize: 7.5 },

  // Grille comparative Père / Mère / Tuteur — remplace les trois sections
  // empilées de l'ancienne mise en page à deux pages par un seul tableau,
  // sans retirer aucun champ (regroupement, pas suppression).
  respTable: { marginTop: 2 },
  respHeaderRow: { flexDirection: "row", backgroundColor: "#f0f0f0", paddingVertical: 3, paddingHorizontal: 2 },
  respHeaderLabelCell: { width: "15%" },
  respHeaderCell: { flex: 1, fontSize: 7, fontWeight: 700, color: NAVY, textAlign: "center" },
  respRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 2.5, paddingHorizontal: 2, alignItems: "center" },
  respRowLabel: { width: "15%", fontSize: 7, fontWeight: 700, color: "#333333" },
  respCell: { flex: 1, fontSize: 7.5, paddingHorizontal: 2 },

  docTable: { marginTop: 2 },
  docRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 2.5, alignItems: "center" },
  docIndex: { width: 12, fontSize: 7.5, color: "#555555" },
  docLabel: { flex: 1, fontSize: 7.5 },
  docStatus: { width: 62, fontSize: 7.5, fontWeight: 700, textAlign: "right" },
  docPlaceholder: { fontSize: 7.5, color: "#b45309", fontWeight: 700 },

  declarationBox: { marginTop: 3, marginBottom: 5, padding: 6, backgroundColor: "#f7f7f7", borderRadius: 3 },
  declarationText: { fontSize: 7.5, lineHeight: 1.35 },
  declarationRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },

  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  signatureBox: { width: "45%" },
  signatureLabel: { fontSize: 7.5, fontWeight: 700, color: NAVY, marginBottom: 14 },
  signatureLine: { borderTop: "1 solid #333333", paddingTop: 3, fontSize: 7, color: "#555555", textAlign: "center" },

  footerRow: { position: "absolute", bottom: 16, left: 26, right: 26, flexDirection: "row", justifyContent: "space-between", borderTop: "1 solid #dddddd", paddingTop: 4 },
  footerText: { fontSize: 6.5, color: "#777777" },
  pageLabel: { fontSize: 6.5, color: "#777777" },
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || " "}</Text>
    </View>
  );
}

function ResponsableRow({ label, pere, mere, tuteur }: { label: string; pere: string; mere: string; tuteur: string }) {
  return (
    <View style={styles.respRow}>
      <Text style={styles.respRowLabel}>{label}</Text>
      <Text style={styles.respCell}>{pere || "—"}</Text>
      <Text style={styles.respCell}>{mere || "—"}</Text>
      <Text style={styles.respCell}>{tuteur || "—"}</Text>
    </View>
  );
}

const docStatusLabels: Record<string, string> = { fourni: "Fourni", non_fourni: "Non fourni", a_verifier: "À vérifier" };
const docStatusColors: Record<string, string> = { fourni: "#0f8a5f", non_fourni: "#c02626", a_verifier: "#b45309" };

const livesWithLabels: Record<string, string> = {
  parents: "Chez les parents",
  pere: "Chez le père",
  mere: "Chez la mère",
  tuteurs: "Chez ses tuteurs",
};

export interface ClassicEnrollmentFormDocumentProps {
  logoBase64: string;
  ficheNumber: string;
  classLabel: string;
  photoBase64: string | null;

  registrationDateLabel: string;
  schoolLevel: string;
  previousSchool: string;
  adminCode: string;

  lastName: string;
  firstName: string;
  birthPlaceCity: string;
  birthPlaceDept: string;
  birthDate: string;
  sex: string;
  bloodType: string;
  livesWith: string;
  religion: string;
  addressLine: string;

  familyStatus: string;
  fatherName: string;
  fatherProfession: string;
  fatherOccupation: string;
  fatherEmail: string;
  fatherPhone: string;
  fatherNif: string;
  fatherCin: string;

  motherName: string;
  motherProfession: string;
  motherOccupation: string;
  motherEmail: string;
  motherPhone: string;
  motherNif: string;
  motherCin: string;

  guardianName: string;
  guardianProfession: string;
  guardianOccupation: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianNif: string;
  guardianCin: string;

  vaccinesUpToDateLabel: string;
  longTermMedicationLabel: string;
  medicationDetails: string;

  siblings: { firstName: string; birthDate: string; school: string }[];
  documents: { label: string; status: string }[];

  fullName: string;
  declarationAccepted: boolean;
  declarationDateLabel: string;

  generatedLabel: string;
}

export default function ClassicEnrollmentFormDocument(props: ClassicEnrollmentFormDocumentProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.topBar} />
        <View style={styles.headerRow}>
          <Image style={styles.logo} src={props.logoBase64} />
          <View style={styles.headerTitleBlock}>
            <Text style={styles.orgName}>ÉCOLE CLASSIQUE CCIGA</Text>
            <Text style={styles.orgSub}>Centre Interdisciplinaire des Génies Agrégées</Text>
          </View>
          <View style={styles.ficheNumberBox}>
            <Text style={styles.ficheNumberLabel}>N°</Text>
            <Text style={styles.ficheNumberValue}>{props.ficheNumber}</Text>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.ficheTitle}>FICHE D&apos;INSCRIPTION POUR LA CLASSE</Text>
          <View style={styles.classRow}>
            <Text style={styles.classLabel}>DE :</Text>
            <Text style={styles.classValue}>{props.classLabel}</Text>
          </View>
        </View>

        <View style={styles.bodyRow}>
          <View style={styles.bodyLeft}>
            <Text style={styles.sectionTitle}>Cadre réservé à l&apos;administration</Text>
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldHalf}>
                <Field label="Date d'inscription :" value={props.registrationDateLabel} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="Niveau scolaire :" value={props.schoolLevel} />
              </View>
            </View>
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldHalf}>
                <Field label="Dernière école fréquentée :" value={props.previousSchool} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="Code :" value={props.adminCode} />
              </View>
            </View>
          </View>

          {props.photoBase64 ? (
            <Image style={styles.photoBox} src={props.photoBase64} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>PHOTO DE L&apos;ÉLÈVE</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Renseignements de l&apos;enfant</Text>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldThird}>
            <Field label="Nom de famille :" value={props.lastName} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="Prénom :" value={props.firstName} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="Sexe :" value={props.sex} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldThird}>
            <Field label="Date de naissance :" value={props.birthDate} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="Lieu de naissance — Ville :" value={props.birthPlaceCity} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="Lieu de naissance — Département :" value={props.birthPlaceDept} />
          </View>
        </View>
        {/* Groupe sanguin volontairement absent du document imprimé —
            conservé uniquement dans le dossier interne. */}
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <View style={styles.checkRow}>
              <Text style={styles.checkItem}>L&apos;enfant réside : {livesWithLabels[props.livesWith] ?? "—"}</Text>
            </View>
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Religion :" value={props.religion} />
          </View>
        </View>
        <Field label="Adresse :" value={props.addressLine} />

        <Text style={styles.sectionTitle}>Responsables légaux</Text>
        <Field label="Situation familiale :" value={props.familyStatus} />
        <View style={styles.respTable}>
          <View style={styles.respHeaderRow}>
            <View style={styles.respHeaderLabelCell} />
            <Text style={styles.respHeaderCell}>PÈRE</Text>
            <Text style={styles.respHeaderCell}>MÈRE</Text>
            <Text style={styles.respHeaderCell}>TUTEUR / RESPONSABLE (si différent)</Text>
          </View>
          <ResponsableRow label="Nom et Prénom" pere={props.fatherName} mere={props.motherName} tuteur={props.guardianName} />
          <ResponsableRow label="Profession" pere={props.fatherProfession} mere={props.motherProfession} tuteur={props.guardianProfession} />
          <ResponsableRow label="Occupation actuelle" pere={props.fatherOccupation} mere={props.motherOccupation} tuteur={props.guardianOccupation} />
          <ResponsableRow label="Email" pere={props.fatherEmail} mere={props.motherEmail} tuteur={props.guardianEmail} />
          <ResponsableRow label="Téléphone" pere={props.fatherPhone} mere={props.motherPhone} tuteur={props.guardianPhone} />
          <ResponsableRow label="NIF" pere={props.fatherNif} mere={props.motherNif} tuteur={props.guardianNif} />
          <ResponsableRow label="CIN" pere={props.fatherCin} mere={props.motherCin} tuteur={props.guardianCin} />
        </View>

        {/* Données médicales (vaccins, médication) volontairement absentes du
            document imprimé remis à la famille — conservées uniquement dans
            le dossier interne (base de données), jamais sur un document
            public/imprimable. Voir la consigne de confidentialité du
            workflow fiche/reçu PDF. */}

        <Text style={styles.sectionTitle}>La fratrie</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableCellHeader}>Prénoms</Text>
            <Text style={styles.tableCellHeader}>Date de naissance</Text>
            <Text style={styles.tableCellHeader}>Écoles fréquentées</Text>
          </View>
          {props.siblings.length === 0 ? (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>—</Text>
              <Text style={styles.tableCell}>—</Text>
              <Text style={styles.tableCell}>—</Text>
            </View>
          ) : (
            props.siblings.map((s, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCell}>{s.firstName || "—"}</Text>
                <Text style={styles.tableCell}>{s.birthDate || "—"}</Text>
                <Text style={styles.tableCell}>{s.school || "—"}</Text>
              </View>
            ))
          )}
        </View>

        <Text style={styles.sectionTitle}>Pièces d&apos;inscription</Text>
        {props.documents.length === 0 ? (
          <Text style={styles.docPlaceholder}>À COMPLÉTER — LISTE OFFICIELLE DES PIÈCES REQUISE</Text>
        ) : (
          <View style={styles.docTable}>
            {props.documents.map((d, i) => (
              <View key={i} style={styles.docRow}>
                <Text style={styles.docIndex}>{i + 1}.</Text>
                <Text style={styles.docLabel}>{d.label}</Text>
                <Text style={[styles.docStatus, { color: docStatusColors[d.status] ?? "#555555" }]}>
                  {docStatusLabels[d.status] ?? d.status}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Certification</Text>
        <View style={styles.declarationBox}>
          <Text style={styles.declarationText}>
            Je, <Text style={{ fontWeight: 700 }}>{props.fullName || "____________________________"}</Text>, certifie sur
            l&apos;honneur l&apos;exactitude des renseignements ci-dessus.
          </Text>
          <View style={styles.declarationRow}>
            <Text style={{ fontSize: 7.5 }}>Confirmation : {props.declarationAccepted ? "☑ Certifié" : "☐ Non certifié"}</Text>
            <Text style={{ fontSize: 7.5 }}>Date : {props.declarationDateLabel || "____________"}</Text>
          </View>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>SIGNATURE</Text>
            <Text style={styles.signatureLine}>Parent / Tuteur</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>L&apos;ADMINISTRATION CCIGA</Text>
            <Text style={styles.signatureLine}>Signature — Validation</Text>
          </View>
        </View>

        <View style={styles.footerRow} fixed>
          <Text style={styles.footerText}>Document N° {props.ficheNumber} — {props.generatedLabel}</Text>
          <Text style={styles.pageLabel} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
