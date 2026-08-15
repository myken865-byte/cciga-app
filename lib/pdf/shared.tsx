import { StyleSheet, View, Text, Image } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 16, borderBottom: 2, borderBottomColor: "#0f2d52", paddingBottom: 10 },
  logo: { width: 40, height: 40, marginRight: 12 },
  headerTitleBlock: { flex: 1 },
  orgName: { fontSize: 14, fontWeight: 700, color: "#0f2d52" },
  docTitle: { fontSize: 12, marginTop: 2, color: "#1a1a1a" },
  identityBlock: { marginBottom: 14 },
  identityRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  label: { color: "#555555" },
  value: { fontWeight: 700 },
  table: { marginTop: 8, marginBottom: 12 },
  tableRow: { flexDirection: "row", borderBottom: 1, borderBottomColor: "#dddddd", paddingVertical: 4 },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#f0f0f0", paddingVertical: 5, fontWeight: 700 },
  colSubject: { flex: 3 },
  colWeight: { flex: 1, textAlign: "center" },
  colGrade: { flex: 1, textAlign: "center" },
  summaryBlock: { marginTop: 10, marginBottom: 14, padding: 10, backgroundColor: "#f7f7f7" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 40 },
  signatureBox: { width: "40%", borderTop: 1, borderTopColor: "#999999", paddingTop: 4, textAlign: "center", fontSize: 8, color: "#555555" },
  footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, paddingTop: 10, borderTop: 1, borderTopColor: "#dddddd" },
  footerText: { fontSize: 7, color: "#777777" },
  qrImage: { width: 60, height: 60 },
  watermark: { position: "absolute", top: 260, left: 90, fontSize: 42, color: "#e04040", opacity: 0.35, transform: "rotate(-30deg)" },
});

export function DocumentHeader({ logoBase64, orgTitle, docTitle }: { logoBase64: string; orgTitle: string; docTitle: string }) {
  return (
    <View style={styles.headerRow}>
      <Image style={styles.logo} src={logoBase64} />
      <View style={styles.headerTitleBlock}>
        <Text style={styles.orgName}>{orgTitle}</Text>
        <Text style={styles.docTitle}>{docTitle}</Text>
      </View>
    </View>
  );
}

export function DraftWatermark({ isDraft }: { isDraft: boolean }) {
  if (!isDraft) return null;
  return <Text style={styles.watermark}>BROUILLON - NON OFFICIEL</Text>;
}

export function SignatureBlock() {
  return (
    <View style={styles.signatureRow}>
      <Text style={styles.signatureBox}>Signature de l&apos;administration</Text>
      <Text style={styles.signatureBox}>Cachet officiel</Text>
    </View>
  );
}

export function DocumentFooter({
  reference,
  publishedLabel,
  qrDataUri,
}: {
  reference: string;
  publishedLabel: string;
  qrDataUri: string | null;
}) {
  return (
    <View style={styles.footerRow}>
      <View>
        <Text style={styles.footerText}>Document N° {reference}</Text>
        <Text style={styles.footerText}>{publishedLabel}</Text>
      </View>
      {qrDataUri && <Image style={styles.qrImage} src={qrDataUri} />}
    </View>
  );
}
