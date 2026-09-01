/* eslint-disable jsx-a11y/alt-text -- react-pdf's <Image> renders into a PDF, not the DOM; it has no `alt` prop. */
import { Document, Page, StyleSheet, View, Text, Image } from "@react-pdf/renderer";
import { DOCUMENT_FONT_FAMILY, ensureDocumentFontRegistered } from "@/lib/pdf/fonts";

ensureDocumentFontRegistered();

// Format international carte d'identité ID-1 / CR80 : 85,60 mm x 53,98 mm.
const MM_TO_PT = 2.834645669;
const CARD_WIDTH = 85.6 * MM_TO_PT;
const CARD_HEIGHT = 53.98 * MM_TO_PT;

const styles = StyleSheet.create({
  page: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fontFamily: DOCUMENT_FONT_FAMILY,
    color: "#1a1a1a",
  },
  recto: { flexDirection: "column", height: "100%" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00185a",
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 6,
  },
  logo: { width: 22, height: 22 },
  headerText: { flex: 1 },
  orgName: { fontSize: 8, fontWeight: 700, color: "#ffffff" },
  badgeType: { fontSize: 6, color: "#cbd5e1", marginTop: 1 },
  body: { flex: 1, flexDirection: "row", padding: 8, gap: 8 },
  photoBox: {
    width: 52,
    height: 62,
    borderRadius: 3,
    border: "1 solid #00185a",
    objectFit: "cover",
  },
  photoPlaceholder: {
    width: 52,
    height: 62,
    borderRadius: 3,
    border: "1 solid #00185a",
    backgroundColor: "#e8edf5",
    alignItems: "center",
    justifyContent: "center",
  },
  photoPlaceholderText: { fontSize: 16, fontWeight: 700, color: "#00185a" },
  identityBlock: { flex: 1, justifyContent: "center", gap: 3 },
  studentName: { fontSize: 9.5, fontWeight: 700, color: "#00185a" },
  fieldLabel: { fontSize: 5.5, color: "#667085", marginTop: 2 },
  fieldValue: { fontSize: 7, fontWeight: 700, color: "#1a1a1a" },
  rectoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTop: "0.5 solid #dddddd",
  },
  badgeNumber: { fontSize: 6, fontFamily: "Courier", color: "#555555" },
  yearLabel: { fontSize: 6, color: "#555555" },

  verso: { flexDirection: "column", height: "100%", padding: 8 },
  versoTitle: { fontSize: 7, fontWeight: 700, color: "#00185a", marginBottom: 4 },
  versoText: { fontSize: 5.5, color: "#333333", lineHeight: 1.4 },
  versoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flex: 1 },
  versoInfoCol: { flex: 1, gap: 3 },
  versoLabel: { fontSize: 5, color: "#667085" },
  versoValue: { fontSize: 6, fontWeight: 700, color: "#1a1a1a" },
  qrImage: { width: 44, height: 44 },
  versoDisclaimer: { fontSize: 4.5, color: "#888888", marginTop: 4 },
  toComplete: { fontSize: 5, color: "#b45309" },
});

export default function BadgeDocument({
  logoBase64,
  orgName,
  badgeTypeLabel,
  photoBase64,
  fullName,
  matricule,
  classOrFunction,
  yearLabel,
  badgeNumber,
  issuedLabel,
  statusLabel,
  qrDataUri,
  contactEmail,
}: {
  logoBase64: string;
  orgName: string;
  badgeTypeLabel: string;
  photoBase64: string | null;
  fullName: string;
  matricule: string;
  classOrFunction: string;
  yearLabel: string;
  badgeNumber: string;
  issuedLabel: string;
  statusLabel: string;
  qrDataUri: string | null;
  contactEmail: string;
}) {
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <Document>
      {/* RECTO */}
      <Page size={[CARD_WIDTH, CARD_HEIGHT]} style={styles.page}>
        <View style={styles.recto}>
          <View style={styles.header}>
            <Image style={styles.logo} src={logoBase64} />
            <View style={styles.headerText}>
              <Text style={styles.orgName}>{orgName}</Text>
              <Text style={styles.badgeType}>{badgeTypeLabel}</Text>
            </View>
          </View>
          <View style={styles.body}>
            {photoBase64 ? (
              <Image style={styles.photoBox} src={photoBase64} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>{initials}</Text>
              </View>
            )}
            <View style={styles.identityBlock}>
              <Text style={styles.studentName}>{fullName}</Text>
              <Text style={styles.fieldLabel}>Matricule</Text>
              <Text style={styles.fieldValue}>{matricule}</Text>
              <Text style={styles.fieldLabel}>Classe / Fonction</Text>
              <Text style={styles.fieldValue}>{classOrFunction}</Text>
            </View>
          </View>
          <View style={styles.rectoFooter}>
            <Text style={styles.badgeNumber}>N° {badgeNumber}</Text>
            <Text style={styles.yearLabel}>{yearLabel}</Text>
          </View>
        </View>
      </Page>

      {/* VERSO */}
      <Page size={[CARD_WIDTH, CARD_HEIGHT]} style={styles.page}>
        <View style={styles.verso}>
          <Text style={styles.versoTitle}>{orgName}</Text>
          <Text style={styles.versoText}>
            Ce badge est la propriété du CCIGA et doit être présenté sur demande. En cas de perte ou de vol,
            signalez-le immédiatement à l&apos;administration pour désactivation.
          </Text>
          <View style={styles.versoRow}>
            <View style={styles.versoInfoCol}>
              <Text style={styles.versoLabel}>Statut</Text>
              <Text style={styles.versoValue}>{statusLabel}</Text>
              <Text style={styles.versoLabel}>Émis le</Text>
              <Text style={styles.versoValue}>{issuedLabel}</Text>
              <Text style={styles.versoLabel}>Contact</Text>
              <Text style={styles.versoValue}>{contactEmail}</Text>
              <Text style={styles.toComplete}>Adresse / téléphone : À COMPLÉTER — information officielle requise</Text>
            </View>
            {qrDataUri && <Image style={styles.qrImage} src={qrDataUri} />}
          </View>
          <Text style={styles.versoDisclaimer}>Vérification : scannez le code ou consultez le lien de vérification.</Text>
        </View>
      </Page>
    </Document>
  );
}
