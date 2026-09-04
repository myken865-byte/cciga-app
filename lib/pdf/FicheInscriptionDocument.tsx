/* eslint-disable jsx-a11y/alt-text -- react-pdf's <Image> renders into a PDF, not the DOM; it has no `alt` prop. */
import { Document, Page, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import { DOCUMENT_FONT_FAMILY, ensureDocumentFontRegistered } from "@/lib/pdf/fonts";

ensureDocumentFontRegistered();

const NAVY = "#00185a";
const GOLD = "#fcc606";

// Styles harmonisés avec ClassicEnrollmentFormDocument.tsx (même famille
// documentaire CCIGA : mêmes tailles de police/marges/titres de section)
// afin que les fiches École Classique et École Professionnelle se
// présentent visuellement comme une seule famille de documents.
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
  formationRow: { flexDirection: "row", marginTop: 3, fontSize: 8.5, width: "100%" },
  formationLabel: { fontWeight: 700, color: "#1a1a1a" },
  formationValue: { marginLeft: 4, fontWeight: 700, color: NAVY, borderBottom: "0.5 solid #999999", flex: 1 },

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

  docTable: { marginTop: 2 },
  docRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 2.5, alignItems: "center" },
  docIndex: { width: 12, fontSize: 7.5, color: "#555555" },
  docLabel: { flex: 1, fontSize: 7.5 },
  docStatus: { width: 62, fontSize: 7.5, fontWeight: 700, textAlign: "right" },

  declarationBox: { marginTop: 3, marginBottom: 5, padding: 6, backgroundColor: "#f7f7f7", borderRadius: 3 },
  declarationText: { fontSize: 7.5, lineHeight: 1.35 },
  declarationRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },

  summaryTable: { marginTop: 2, marginBottom: 4 },
  summaryRow: { flexDirection: "row", borderBottom: "0.5 solid #dddddd", paddingVertical: 2.5 },
  summaryLabel: { width: 90, fontSize: 7.5, color: "#333333" },
  summaryValue: { flex: 1, fontSize: 7.5, fontWeight: 700 },

  noteBox: { marginTop: 3, marginBottom: 6, padding: 5, borderLeft: `3 solid ${GOLD}`, backgroundColor: "#fffbea" },
  noteText: { fontSize: 7, color: "#4a3a00", lineHeight: 1.3 },

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

const docStatusLabels: Record<string, string> = { fourni: "Fourni", non_fourni: "Non fourni", a_verifier: "À vérifier" };
const docStatusColors: Record<string, string> = { fourni: "#0f8a5f", non_fourni: "#c02626", a_verifier: "#b45309" };

export interface FicheInscriptionDocumentProps {
  logoBase64: string;
  epsLogoBase64: string | null;
  // Fiche réutilisée telle quelle pour École Professionnelle et Université
  // (même modèle EnrollmentForm) — seuls ces libellés varient selon
  // l'institution réellement enregistrée sur la fiche, jamais son contenu
  // structurel (voir PROMPT_OFFICIEL_INSCRIPTION_UNIVERSITE_BADGE_AUTOMATIQUE).
  institutionLabel: string;
  formationFieldLabel: string;
  facultyLabel: string;
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
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.topBar} />
        <View style={styles.headerRow}>
          <Image style={styles.logo} src={props.logoBase64} />
          {props.epsLogoBase64 && <Image style={styles.logo} src={props.epsLogoBase64} />}
          <View style={styles.headerTitleBlock}>
            <Text style={styles.orgName}>{props.institutionLabel}</Text>
            <Text style={styles.orgSub}>Centre Interdisciplinaire des Génies Agrégées</Text>
          </View>
          <View style={styles.ficheNumberBox}>
            <Text style={styles.ficheNumberLabel}>N°</Text>
            <Text style={styles.ficheNumberValue}>{props.ficheNumber}</Text>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.ficheTitle}>FICHE D&apos;INSCRIPTION</Text>
          <View style={styles.formationRow}>
            <Text style={styles.formationLabel}>{props.formationFieldLabel}</Text>
            <Text style={styles.formationValue}>{props.formationLabel}</Text>
          </View>
          {props.facultyLabel ? (
            <View style={styles.formationRow}>
              <Text style={styles.formationLabel}>Faculté :</Text>
              <Text style={styles.formationValue}>{props.facultyLabel}</Text>
            </View>
          ) : null}
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
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldHalf}>
                <Field label="Date et lieu de naissance :" value={props.birthDateAndPlace} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="Sexe :" value={props.sex} />
              </View>
            </View>
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldHalf}>
                <Field label="Fils de :" value={props.fatherName} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="Et de :" value={props.motherName} />
              </View>
            </View>
            <Field label="Situation de famille :" value={props.familyStatus} />
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldThird}>
                <Field label="CIN :" value={props.cin} />
              </View>
              <View style={styles.fieldThird}>
                <Field label="Délivrée le :" value={props.cinIssuedDate} />
              </View>
              <View style={styles.fieldThird}>
                <Field label="À :" value={props.cinIssuedPlace} />
              </View>
            </View>
            <Field label="Adresse géographique :" value={props.address} />
            <View style={styles.fieldRowSplit}>
              <View style={styles.fieldHalf}>
                <Field label="Téléphone :" value={props.phone} />
              </View>
              <View style={styles.fieldHalf}>
                <Field label="Adresse électronique du candidat :" value={props.email} />
              </View>
            </View>
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

        <Text style={styles.sectionTitle}>Déclaration du candidat</Text>
        <View style={styles.declarationBox}>
          <Text style={styles.declarationText}>
            Moi, <Text style={{ fontWeight: 700 }}>{props.fullName || "____________________________"}</Text>, soussigné(e),
            certifie l&apos;exactitude des informations fournies à CCIGA. Je m&apos;engage à respecter le règlement et la
            discipline de l&apos;établissement.
          </Text>
          <View style={styles.declarationRow}>
            <Text style={{ fontSize: 7.5 }}>
              Confirmation : {props.declarationAccepted ? "☑ Certifié" : "☐ Non certifié"}
            </Text>
            <Text style={{ fontSize: 7.5 }}>Date : {props.declarationDateLabel || "____________"}</Text>
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
