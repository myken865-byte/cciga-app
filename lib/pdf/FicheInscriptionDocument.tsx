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
  ficheTitle: { fontSize: 15, fontWeight: 700, color: NAVY, letterSpacing: 1, textAlign: "center" },
  formationRow: { flexDirection: "row", marginTop: 5, fontSize: 9.5, width: "100%" },
  formationLabel: { fontWeight: 700, color: "#1a1a1a" },
  formationValue: { marginLeft: 4, fontWeight: 700, color: NAVY, borderBottom: "0.5 solid #999999", flex: 1 },

  bodyRow: { flexDirection: "row", gap: 14 },
  bodyLeft: { flex: 1 },
  photoBox: { width: 78, height: 96, border: `1 solid ${NAVY}`, borderRadius: 2, objectFit: "cover" },
  photoPlaceholder: {
    width: 78,
    height: 96,
    border: `1 dashed ${NAVY}`,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  photoPlaceholderText: { fontSize: 6.5, color: NAVY, textAlign: "center" },

  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: NAVY,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 5,
    borderBottom: `1 solid ${NAVY}`,
    paddingBottom: 2,
  },
  fieldRow: { flexDirection: "row", marginBottom: 5, alignItems: "flex-end" },
  fieldLabel: { fontSize: 8.5, color: "#333333" },
  fieldValue: {
    flex: 1,
    fontSize: 9,
    fontWeight: 700,
    marginLeft: 4,
    borderBottom: "0.5 solid #999999",
    paddingBottom: 1,
    minHeight: 11,
  },
  fieldRowSplit: { flexDirection: "row", gap: 12 },
  fieldHalf: { flex: 1 },

  docTable: { marginTop: 4 },
  docRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 3, alignItems: "center" },
  docIndex: { width: 14, fontSize: 8.5, color: "#555555" },
  docLabel: { flex: 1, fontSize: 8.5 },
  docStatus: { width: 70, fontSize: 8.5, fontWeight: 700, textAlign: "right" },

  declarationBox: { marginTop: 4, marginBottom: 10, padding: 10, backgroundColor: "#f7f7f7", borderRadius: 3 },
  declarationText: { fontSize: 9, lineHeight: 1.5 },
  declarationRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },

  summaryTable: { marginTop: 4, marginBottom: 10 },
  summaryRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 4 },
  summaryLabel: { width: 130, fontSize: 9, color: "#333333" },
  summaryValue: { flex: 1, fontSize: 9, fontWeight: 700 },

  noteBox: { marginTop: 4, marginBottom: 16, padding: 8, borderLeft: `3 solid ${GOLD}`, backgroundColor: "#fffbea" },
  noteText: { fontSize: 8, color: "#4a3a00", lineHeight: 1.4 },

  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 30 },
  signatureBox: { width: "45%" },
  signatureLabel: { fontSize: 8.5, fontWeight: 700, color: NAVY, marginBottom: 22 },
  signatureLine: { borderTop: "1 solid #333333", paddingTop: 3, fontSize: 7.5, color: "#555555", textAlign: "center" },

  footerRow: { position: "absolute", bottom: 22, left: 32, right: 32, flexDirection: "row", justifyContent: "space-between", borderTop: "1 solid #dddddd", paddingTop: 6 },
  footerText: { fontSize: 7, color: "#777777" },
  pageLabel: { fontSize: 7, color: "#777777" },
});

function Field({ label, value, flex = true }: { label: string; value: string; flex?: boolean }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={[styles.fieldValue, !flex ? { flex: undefined, minWidth: 100 } : {}]}>{value || " "}</Text>
    </View>
  );
}

const docStatusLabels: Record<string, string> = { fourni: "Fourni", non_fourni: "Non fourni", a_verifier: "À vérifier" };
const docStatusColors: Record<string, string> = { fourni: "#0f8a5f", non_fourni: "#c02626", a_verifier: "#b45309" };

export interface FicheInscriptionDocumentProps {
  logoBase64: string;
  epsLogoBase64: string | null;
  ficheNumber: string;
  formationLabel: string;
  photoBase64: string | null;
  lastName: string;
  firstName: string;
  birthDateAndPlace: string;
  sex: string;
  fatherName: string;
  motherName: string;
  familyStatus: string;
  cin: string;
  cinIssuedDate: string;
  cinIssuedPlace: string;
  address: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactEmail: string;
  emergencyContactPhone: string;
  documents: { label: string; status: string }[];
  fullName: string;
  declarationAccepted: boolean;
  declarationDateLabel: string;
  option: string;
  inscriptionInfo: string;
  duration: string;
  uniformInfo: string;
  versement1: string;
  versement2: string;
  versement3: string;
  generatedLabel: string;
}

export default function FicheInscriptionDocument(props: FicheInscriptionDocumentProps) {
  const header = (
    <>
      <View style={styles.topBar} />
      <View style={styles.headerRow}>
        <Image style={styles.logo} src={props.logoBase64} />
        {props.epsLogoBase64 && <Image style={styles.logo} src={props.epsLogoBase64} />}
        <View style={styles.headerTitleBlock}>
          <Text style={styles.orgName}>CCIGA — École Professionnelle</Text>
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
      {/* PAGE 1 — Fiche d'inscription */}
      <Page size="A4" style={styles.page}>
        {header}
        <View style={styles.titleBlock}>
          <Text style={styles.ficheTitle}>FICHE D&apos;INSCRIPTION</Text>
          <View style={styles.formationRow}>
            <Text style={styles.formationLabel}>À la formation :</Text>
            <Text style={styles.formationValue}>{props.formationLabel}</Text>
          </View>
        </View>

        <View style={styles.bodyRow}>
          <View style={styles.bodyLeft}>
            <Text style={styles.sectionTitle}>État civil</Text>
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldHalf}>
                <Field label="Nom :" value={props.lastName} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="Prénoms :" value={props.firstName} />
              </View>
            </View>
            <Field label="Date et lieu de naissance :" value={props.birthDateAndPlace} />
            <Field label="Sexe :" value={props.sex} />
            <Field label="Fils de :" value={props.fatherName} />
            <Field label="Et de :" value={props.motherName} />
            <Field label="Situation de famille :" value={props.familyStatus} />
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldHalf}>
                <Field label="CIN :" value={props.cin} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="Délivrée le :" value={props.cinIssuedDate} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="À :" value={props.cinIssuedPlace} />
              </View>
            </View>
            <Field label="Adresse géographique :" value={props.address} />
            <Field label="Téléphone :" value={props.phone} />
            <Field label="Adresse électronique du candidat :" value={props.email} />
          </View>

          {props.photoBase64 ? (
            <Image style={styles.photoBox} src={props.photoBase64} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderText}>PHOTO</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Personne à contacter en cas de nécessité</Text>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Nom et prénoms :" value={props.emergencyContactName} />
          </View>
        </View>
        <View style={styles.fieldRowSplit}>
          <View style={styles.fieldHalf}>
            <Field label="Adresse électronique :" value={props.emergencyContactEmail} />
          </View>
          <View style={styles.fieldHalf}>
            <Field label="Téléphone :" value={props.emergencyContactPhone} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Pièces fournies</Text>
        <View style={styles.docTable}>
          {props.documents.map((d, i) => (
            <View key={d.label} style={styles.docRow}>
              <Text style={styles.docIndex}>{i + 1}.</Text>
              <Text style={styles.docLabel}>{d.label}</Text>
              <Text style={[styles.docStatus, { color: docStatusColors[d.status] ?? "#555555" }]}>
                {docStatusLabels[d.status] ?? d.status}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footerRow} fixed>
          <Text style={styles.footerText}>Document N° {props.ficheNumber} — {props.generatedLabel}</Text>
          <Text style={styles.pageLabel} render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* PAGE 2 — Engagement et résumé */}
      <Page size="A4" style={styles.page}>
        {header}

        <Text style={styles.sectionTitle}>Déclaration du candidat</Text>
        <View style={styles.declarationBox}>
          <Text style={styles.declarationText}>
            Moi, <Text style={{ fontWeight: 700 }}>{props.fullName || "____________________________"}</Text>, soussigné(e),
            certifie l&apos;exactitude des informations fournies à CCIGA. Je m&apos;engage à respecter le règlement et la
            discipline de l&apos;établissement.
          </Text>
          <View style={styles.declarationRow}>
            <Text style={{ fontSize: 8.5 }}>
              Confirmation : {props.declarationAccepted ? "☑ Certifié" : "☐ Non certifié"}
            </Text>
            <Text style={{ fontSize: 8.5 }}>Date : {props.declarationDateLabel || "____________"}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Résumé</Text>
        <View style={styles.summaryTable}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Option</Text>
            <Text style={styles.summaryValue}>{props.option || "—"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Inscription</Text>
            <Text style={styles.summaryValue}>{props.inscriptionInfo || "À COMPLÉTER"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Durée</Text>
            <Text style={styles.summaryValue}>{props.duration || "À COMPLÉTER"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Uniforme</Text>
            <Text style={styles.summaryValue}>{props.uniformInfo || "À COMPLÉTER"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Versement 1</Text>
            <Text style={styles.summaryValue}>{props.versement1 || "À COMPLÉTER"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Versement 2</Text>
            <Text style={styles.summaryValue}>{props.versement2 || "À COMPLÉTER"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Versement 3</Text>
            <Text style={styles.summaryValue}>{props.versement3 || "À COMPLÉTER"}</Text>
          </View>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            N.B. : Le 1er versement doit être versé dès la rentrée. Les stages et les séminaires sont obligatoires.
          </Text>
        </View>

        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>L&apos;ÉTUDIANT</Text>
            <Text style={styles.signatureLine}>Signature</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>L&apos;ADMINISTRATION CCIGA</Text>
            <Text style={styles.signatureLine}>Signature</Text>
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
