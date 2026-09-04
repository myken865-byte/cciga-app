/* eslint-disable jsx-a11y/alt-text -- react-pdf's <Image> renders into a PDF, not the DOM; it has no `alt` prop. */
import { Document, Page, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import { DOCUMENT_FONT_FAMILY, ensureDocumentFontRegistered } from "@/lib/pdf/fonts";

ensureDocumentFontRegistered();

// Format verrouillé : 8,5 x 5,5 pouces, paysage. 1 pouce = 72pt.
// Pli central exactement à 4,25 pouces (moitié) — chaque panneau 4,25 x 5,5.
const PAGE_WIDTH = 8.5 * 72; // 612pt
const PAGE_HEIGHT = 5.5 * 72; // 396pt
const PANEL_WIDTH = PAGE_WIDTH / 2; // 306pt = 4.25in

const NAVY = "#00185a";
const GOLD = "#fcc606";

const styles = StyleSheet.create({
  page: { width: PAGE_WIDTH, height: PAGE_HEIGHT, fontFamily: DOCUMENT_FONT_FAMILY, color: "#1a1a1a" },
  panelRow: { flexDirection: "row", width: "100%", height: "100%" },
  panel: { width: PANEL_WIDTH, height: PAGE_HEIGHT, padding: 12 },
  // Ligne de pli — repère visuel à 4,25 pouces, n'imprime pas de contenu.
  foldLine: {
    position: "absolute",
    left: PANEL_WIDTH,
    top: 0,
    bottom: 0,
    width: 0,
    borderLeft: "0.75 dashed #999999",
  },

  // --- Couverture (recto droit) ---
  coverLogo: { width: 40, height: 40, alignSelf: "center", marginBottom: 6 },
  coverOrg: { fontSize: 10, fontWeight: 700, color: NAVY, textAlign: "center" },
  coverTitle: { fontSize: 13, fontWeight: 700, color: NAVY, textAlign: "center", marginTop: 4, letterSpacing: 0.5 },
  coverGoldBar: { height: 2.5, backgroundColor: GOLD, width: 60, alignSelf: "center", marginVertical: 8 },
  coverYear: { fontSize: 8, color: "#555555", textAlign: "center", marginBottom: 10 },
  coverFieldRow: { marginTop: 5 },
  coverFieldLabel: { fontSize: 6, color: "#667085", textTransform: "uppercase" },
  coverFieldValue: { fontSize: 8.5, fontWeight: 700, color: "#1a1a1a", borderBottom: "0.5 solid #cccccc", paddingBottom: 2 },

  // --- Dos (recto gauche) ---
  backHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  backLogo: { width: 18, height: 18 },
  backOrgName: { fontSize: 8, fontWeight: 700, color: NAVY },
  backText: { fontSize: 6.5, color: "#333333", lineHeight: 1.4 },
  backSectionTitle: { fontSize: 6.5, fontWeight: 700, color: NAVY, marginTop: 10, marginBottom: 3, textTransform: "uppercase" },
  toComplete: { fontSize: 6, color: "#b45309" },
  notesBox: { marginTop: 6, borderTop: "0.5 solid #dddddd", flex: 1 },
  notesLine: { borderBottom: "0.5 solid #dddddd", height: 16 },

  // --- Verso panels ---
  versoHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
  versoLogo: { width: 16, height: 16 },
  versoPhoto: { width: 30, height: 38, border: `1 solid ${NAVY}`, borderRadius: 2, objectFit: "cover" },
  versoPhotoPlaceholder: {
    width: 30,
    height: 38,
    border: `1 dashed ${NAVY}`,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  versoPhotoPlaceholderText: { fontSize: 4.5, color: NAVY, textAlign: "center" },
  versoIdentityBlock: { flex: 1 },
  versoName: { fontSize: 8.5, fontWeight: 700, color: NAVY },
  versoSub: { fontSize: 6, color: "#555555", marginTop: 1 },
  versoRef: { fontSize: 5.5, fontFamily: "Courier", color: "#667085", marginTop: 1 },

  sectionTitle: {
    fontSize: 6.5,
    fontWeight: 700,
    color: NAVY,
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 3,
    borderBottom: `0.75 solid ${NAVY}`,
    paddingBottom: 1.5,
  },
  summaryBox: { flexDirection: "row", backgroundColor: "#f0f2f7", borderRadius: 2, padding: 4, marginBottom: 4, gap: 4 },
  summaryCell: { flex: 1, alignItems: "center" },
  summaryLabel: { fontSize: 5, color: "#667085" },
  summaryValue: { fontSize: 7, fontWeight: 700, color: NAVY, textAlign: "center" },
  summaryValueWarn: { fontSize: 4.5, fontWeight: 700, color: "#b45309", textAlign: "center" },

  table: { marginTop: 2 },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#f0f0f0", paddingVertical: 2, gap: 4 },
  tableRow: { flexDirection: "row", borderBottom: "0.5 solid #e2e2e2", paddingVertical: 2.5, minHeight: 14, gap: 4 },
  colDate: { width: 34, fontSize: 5.5 },
  colDesc: { flex: 1, fontSize: 5.5 },
  colMontant: { width: 42, fontSize: 5.5, textAlign: "right" },
  colSignature: { width: 42, fontSize: 5.5, borderBottom: "0.5 solid #cccccc" },
  colHeaderText: { fontSize: 5, fontWeight: 700, color: NAVY },
  emptyRowText: { fontSize: 5.5, color: "#888888", fontStyle: "italic" as const },
  truncatedNote: { fontSize: 5, color: "#667085", marginTop: 3, fontStyle: "italic" as const },

  noteBox: { marginTop: 6, padding: 5, borderLeft: `2.5 solid ${GOLD}`, backgroundColor: "#fffbea" },
  noteText: { fontSize: 6, fontWeight: 700, color: "#4a3a00" },

  checkRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 6 },
  checkItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  checkBox: { width: 7, height: 7, border: "0.75 solid #333333" },
  checkLabel: { fontSize: 6, color: "#333333" },

  extraTable: { marginTop: 2 },
  extraRow: { flexDirection: "row", borderBottom: "0.5 solid #e2e2e2", paddingVertical: 3, minHeight: 16 },
  extraDesc: { flex: 1, fontSize: 5.5, borderBottom: "0.5 solid #cccccc", marginRight: 4, alignSelf: "flex-end" },
  extraDate: { width: 40, fontSize: 5.5, borderBottom: "0.5 solid #cccccc", marginRight: 4, alignSelf: "flex-end" },
  extraMontant: { width: 40, fontSize: 5.5, borderBottom: "0.5 solid #cccccc", marginRight: 4, alignSelf: "flex-end" },
  extraSignature: { width: 44, fontSize: 5.5, borderBottom: "0.5 solid #cccccc", alignSelf: "flex-end" },
});

export interface PaymentBookletPayment {
  dateLabel: string;
  description: string;
  amountLabel: string;
}

export interface PaymentBookletDocumentProps {
  logoBase64: string;
  institutionLabel: string; // "CCIGA École Classique" | "CCIGA École Professionnelle" | "CCIGA Université"
  academicYearLabel: string;
  carnetNumber: string;
  ccigaId: string;
  fullName: string;
  classOrProgramLabel: string;
  photoBase64: string | null;

  feeLabel: string; // formatHTGForPdf(tuitionFee) ou "À COMPLÉTER - TARIF OFFICIEL REQUIS"
  totalPaidLabel: string;
  balanceLabel: string;
  payments: PaymentBookletPayment[];
  paymentsTruncated: boolean;

  institutionDescription: string;
  generatedLabel: string;
}

export default function PaymentBookletDocument(props: PaymentBookletDocumentProps) {
  return (
    <Document>
      {/* RECTO — extérieur du carnet : gauche = dos, droite = couverture */}
      <Page size={[PAGE_WIDTH, PAGE_HEIGHT]} style={styles.page}>
        <View style={styles.panelRow}>
          {/* Dos / quatrième de couverture */}
          <View style={styles.panel}>
            <View style={styles.backHeader}>
              <Image style={styles.backLogo} src={props.logoBase64} />
              <Text style={styles.backOrgName}>CCIGA</Text>
            </View>
            <Text style={styles.backText}>{props.institutionDescription}</Text>

            <Text style={styles.backSectionTitle}>Coordonnées officielles</Text>
            <Text style={styles.toComplete}>À COMPLÉTER — coordonnées officielles</Text>

            <Text style={styles.backSectionTitle}>Notes</Text>
            <View style={styles.notesBox}>
              <View style={styles.notesLine} />
              <View style={styles.notesLine} />
              <View style={styles.notesLine} />
              <View style={styles.notesLine} />
            </View>
          </View>

          {/* Première de couverture */}
          <View style={styles.panel}>
            <Image style={styles.coverLogo} src={props.logoBase64} />
            <Text style={styles.coverOrg}>{props.institutionLabel}</Text>
            <Text style={styles.coverTitle}>CARNET DE PAIEMENT</Text>
            <View style={styles.coverGoldBar} />
            <Text style={styles.coverYear}>Année : {props.academicYearLabel}</Text>

            <View style={styles.coverFieldRow}>
              <Text style={styles.coverFieldLabel}>N° du carnet</Text>
              <Text style={[styles.coverFieldValue, { fontFamily: "Courier" }]}>{props.carnetNumber}</Text>
            </View>
            <View style={styles.coverFieldRow}>
              <Text style={styles.coverFieldLabel}>Identifiant permanent CCIGA</Text>
              <Text style={[styles.coverFieldValue, { fontFamily: "Courier" }]}>{props.ccigaId}</Text>
            </View>
            <View style={styles.coverFieldRow}>
              <Text style={styles.coverFieldLabel}>Nom et prénom</Text>
              <Text style={styles.coverFieldValue}>{props.fullName}</Text>
            </View>
            <View style={styles.coverFieldRow}>
              <Text style={styles.coverFieldLabel}>Classe / Programme</Text>
              <Text style={styles.coverFieldValue}>{props.classOrProgramLabel}</Text>
            </View>
          </View>
        </View>
        <View style={styles.foldLine} fixed />
      </Page>

      {/* VERSO — intérieur : gauche = identification + paiements, droite = frais complémentaires */}
      <Page size={[PAGE_WIDTH, PAGE_HEIGHT]} style={styles.page}>
        <View style={styles.panelRow}>
          {/* Identification + suivi des paiements principaux */}
          <View style={styles.panel}>
            <View style={styles.versoHeader}>
              <Image style={styles.versoLogo} src={props.logoBase64} />
              {props.photoBase64 ? (
                <Image style={styles.versoPhoto} src={props.photoBase64} />
              ) : (
                <View style={styles.versoPhotoPlaceholder}>
                  <Text style={styles.versoPhotoPlaceholderText}>PHOTO</Text>
                </View>
              )}
              <View style={styles.versoIdentityBlock}>
                <Text style={styles.versoName}>{props.fullName}</Text>
                <Text style={styles.versoSub}>{props.classOrProgramLabel}</Text>
                <Text style={styles.versoRef}>{props.carnetNumber}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Suivi des paiements</Text>
            <View style={styles.summaryBox}>
              <View style={styles.summaryCell}>
                <Text style={styles.summaryLabel}>Montant dû</Text>
                {props.feeLabel.startsWith("À COMPLÉTER") ? (
                  <Text style={styles.summaryValueWarn}>{props.feeLabel}</Text>
                ) : (
                  <Text style={styles.summaryValue}>{props.feeLabel}</Text>
                )}
              </View>
              <View style={styles.summaryCell}>
                <Text style={styles.summaryLabel}>Payé</Text>
                <Text style={styles.summaryValue}>{props.totalPaidLabel}</Text>
              </View>
              <View style={styles.summaryCell}>
                <Text style={styles.summaryLabel}>Balance</Text>
                <Text style={styles.summaryValue}>{props.balanceLabel}</Text>
              </View>
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.colDate, styles.colHeaderText]}>Date</Text>
                <Text style={[styles.colDesc, styles.colHeaderText]}>Description</Text>
                <Text style={[styles.colMontant, styles.colHeaderText]}>Montant</Text>
                <Text style={[styles.colSignature, styles.colHeaderText]}>Signature</Text>
              </View>
              {props.payments.length === 0 ? (
                <View style={styles.tableRow}>
                  <Text style={styles.emptyRowText}>Aucun paiement enregistré à ce jour.</Text>
                </View>
              ) : (
                props.payments.map((p, i) => (
                  <View key={i} style={styles.tableRow}>
                    <Text style={styles.colDate}>{p.dateLabel}</Text>
                    <Text style={styles.colDesc}>{p.description}</Text>
                    <Text style={styles.colMontant}>{p.amountLabel}</Text>
                    <View style={styles.colSignature} />
                  </View>
                ))
              )}
            </View>
            {props.paymentsTruncated && (
              <Text style={styles.truncatedNote}>Historique complet dans le dossier Finance de l&apos;élève.</Text>
            )}
          </View>

          {/* Frais complémentaires et éléments remis */}
          <View style={styles.panel}>
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>N.B. : Le carnet de paiement est obligatoire à chaque versement.</Text>
            </View>

            <Text style={styles.sectionTitle}>Éléments remis</Text>
            <View style={styles.checkRow}>
              <View style={styles.checkItem}>
                <View style={styles.checkBox} />
                <Text style={styles.checkLabel}>Badge</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkBox} />
                <Text style={styles.checkLabel}>Écusson</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkBox} />
                <Text style={styles.checkLabel}>Tenue scolaire</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkBox} />
                <Text style={styles.checkLabel}>Tenue de sport</Text>
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkBox} />
                <Text style={styles.checkLabel}>Autre : ____________</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Frais complémentaires</Text>
            <View style={styles.extraTable}>
              <View style={styles.tableHeaderRow}>
                <Text style={[{ flex: 1 }, styles.colHeaderText]}>Description</Text>
                <Text style={[{ width: 40 }, styles.colHeaderText]}>Date</Text>
                <Text style={[{ width: 40 }, styles.colHeaderText]}>Montant</Text>
                <Text style={[{ width: 44 }, styles.colHeaderText]}>Signature</Text>
              </View>
              {Array.from({ length: 5 }).map((_, i) => (
                <View key={i} style={styles.extraRow}>
                  <View style={styles.extraDesc} />
                  <View style={styles.extraDate} />
                  <View style={styles.extraMontant} />
                  <View style={styles.extraSignature} />
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.foldLine} fixed />
      </Page>
    </Document>
  );
}
