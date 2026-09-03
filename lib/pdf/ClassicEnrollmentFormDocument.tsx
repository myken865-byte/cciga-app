/* eslint-disable jsx-a11y/alt-text -- react-pdf's <Image> renders into a PDF, not the DOM; it has no `alt` prop. */
import { Document, Page, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import { DOCUMENT_FONT_FAMILY, ensureDocumentFontRegistered } from "@/lib/pdf/fonts";

ensureDocumentFontRegistered();

const NAVY = "#00185a";
const GOLD = "#fcc606";

const styles = StyleSheet.create({
  page: { padding: 32, paddingTop: 26, fontSize: 9, fontFamily: DOCUMENT_FONT_FAMILY, color: "#1a1a1a" },
  topBar: { height: 4, backgroundColor: GOLD, marginBottom: 12 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  logo: { width: 40, height: 40, marginRight: 10 },
  headerTitleBlock: { flex: 1 },
  orgName: { fontSize: 12, fontWeight: 700, color: NAVY },
  orgSub: { fontSize: 7.5, color: "#555555", marginTop: 1 },
  ficheNumberBox: { alignItems: "flex-end" },
  ficheNumberLabel: { fontSize: 7, color: "#555555" },
  ficheNumberValue: { fontSize: 9, fontWeight: 700, color: NAVY, fontFamily: "Courier" },

  titleBlock: { marginBottom: 10, paddingBottom: 8, borderBottom: `2 solid ${NAVY}` },
  ficheTitle: { fontSize: 14, fontWeight: 700, color: NAVY, letterSpacing: 1, textAlign: "center" },
  classRow: { flexDirection: "row", marginTop: 5, fontSize: 9.5, width: "100%" },
  classLabel: { fontWeight: 700, color: "#1a1a1a" },
  classValue: { marginLeft: 4, fontWeight: 700, color: NAVY, borderBottom: "0.5 solid #999999", flex: 1 },

  bodyRow: { flexDirection: "row", gap: 14 },
  bodyLeft: { flex: 1 },
  photoBox: { width: 70, height: 88, border: `1 solid ${NAVY}`, borderRadius: 2, objectFit: "cover" },
  photoPlaceholder: {
    width: 70,
    height: 88,
    border: `1 dashed ${NAVY}`,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  photoPlaceholderText: { fontSize: 6.5, color: NAVY, textAlign: "center" },

  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: NAVY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 9,
    marginBottom: 4,
    borderBottom: `1 solid ${NAVY}`,
    paddingBottom: 2,
  },
  fieldRow: { flexDirection: "row", marginBottom: 4, alignItems: "flex-end" },
  fieldLabel: { fontSize: 8, color: "#333333" },
  fieldValue: {
    flex: 1,
    fontSize: 8.5,
    fontWeight: 700,
    marginLeft: 4,
    borderBottom: "0.5 solid #999999",
    paddingBottom: 1,
    minHeight: 10,
  },
  fieldRowSplit: { flexDirection: "row", gap: 10 },
  fieldHalf: { flex: 1 },
  fieldThird: { flex: 1 },

  checkRow: { flexDirection: "row", gap: 10, marginBottom: 4, flexWrap: "wrap" },
  checkItem: { fontSize: 8, color: "#333333" },

  table: { marginTop: 3 },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#f0f0f0", paddingVertical: 3, paddingHorizontal: 2 },
  tableRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 3, paddingHorizontal: 2 },
  tableCellHeader: { flex: 1, fontSize: 7.5, fontWeight: 700, color: NAVY },
  tableCell: { flex: 1, fontSize: 8 },

  declarationBox: { marginTop: 4, marginBottom: 8, padding: 8, backgroundColor: "#f7f7f7", borderRadius: 3 },
  declarationText: { fontSize: 8.5, lineHeight: 1.4 },
  declarationRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },

  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  signatureBox: { width: "45%" },
  signatureLabel: { fontSize: 8, fontWeight: 700, color: NAVY, marginBottom: 18 },
  signatureLine: { borderTop: "1 solid #333333", paddingTop: 3, fontSize: 7.5, color: "#555555", textAlign: "center" },

  footerRow: { position: "absolute", bottom: 22, left: 32, right: 32, flexDirection: "row", justifyContent: "space-between", borderTop: "1 solid #dddddd", paddingTop: 6 },
  footerText: { fontSize: 7, color: "#777777" },
  pageLabel: { fontSize: 7, color: "#777777" },
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || " "}</Text>
    </View>
  );
}

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

  fullName: string;
  declarationAccepted: boolean;
  declarationDateLabel: string;

  generatedLabel: string;
}

export default function ClassicEnrollmentFormDocument(props: ClassicEnrollmentFormDocumentProps) {
  const header = (
    <>
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
    </>
  );

  return (
    <Document>
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        {header}
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
          <View style={styles.fieldHalf}>
            <Field label="Nom de famille :" value={props.lastName} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Prénom :" value={props.firstName} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Lieu de naissance — Ville :" value={props.birthPlaceCity} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Lieu de naissance — Département :" value={props.birthPlaceDept} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Date de naissance :" value={props.birthDate} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Sexe :" value={props.sex} />
          </View>
        </View>
        {/* Groupe sanguin volontairement absent du document imprimé —
            conservé uniquement dans le dossier interne. */}
        <View style={styles.checkRow}>
          <Text style={styles.checkItem}>L&apos;enfant réside : {livesWithLabels[props.livesWith] ?? "—"}</Text>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Religion :" value={props.religion} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Adresse :" value={props.addressLine} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Responsables légaux — Père</Text>
        <Field label="Situation familiale :" value={props.familyStatus} />
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Nom et Prénom du père :" value={props.fatherName} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Profession :" value={props.fatherProfession} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Occupation actuelle :" value={props.fatherOccupation} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Email :" value={props.fatherEmail} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldThird}>
            <Field label="Téléphone :" value={props.fatherPhone} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="NIF :" value={props.fatherNif} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="CIN :" value={props.fatherCin} />
          </View>
        </View>

        <View style={styles.footerRow} fixed>
          <Text style={styles.footerText}>Document N° {props.ficheNumber} — {props.generatedLabel}</Text>
          <Text style={styles.pageLabel} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        {header}

        <Text style={styles.sectionTitle}>Responsables légaux — Mère</Text>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Nom et Prénom de la mère :" value={props.motherName} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Profession :" value={props.motherProfession} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Occupation actuelle :" value={props.motherOccupation} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Email :" value={props.motherEmail} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldThird}>
            <Field label="Téléphone :" value={props.motherPhone} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="NIF :" value={props.motherNif} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="CIN :" value={props.motherCin} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Personne responsable si différente des parents</Text>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Nom et Prénom :" value={props.guardianName} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Profession :" value={props.guardianProfession} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Occupation actuelle :" value={props.guardianOccupation} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Email :" value={props.guardianEmail} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldThird}>
            <Field label="Téléphone :" value={props.guardianPhone} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="NIF :" value={props.guardianNif} />
          </View>
          <View style={styles.fieldThird}>
            <Field label="CIN :" value={props.guardianCin} />
          </View>
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

        <Text style={styles.sectionTitle}>Certification</Text>
        <View style={styles.declarationBox}>
          <Text style={styles.declarationText}>
            Je, <Text style={{ fontWeight: 700 }}>{props.fullName || "____________________________"}</Text>, certifie sur
            l&apos;honneur l&apos;exactitude des renseignements ci-dessus.
          </Text>
          <View style={styles.declarationRow}>
            <Text style={{ fontSize: 8 }}>Confirmation : {props.declarationAccepted ? "☑ Certifié" : "☐ Non certifié"}</Text>
            <Text style={{ fontSize: 8 }}>Date : {props.declarationDateLabel || "____________"}</Text>
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
