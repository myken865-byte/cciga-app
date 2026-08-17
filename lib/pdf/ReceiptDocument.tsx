import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { styles as shared, DocumentHeader, DocumentFooter } from "@/lib/pdf/shared";

const styles = StyleSheet.create({
  amountBlock: { marginTop: 18, marginBottom: 18, padding: 14, backgroundColor: "#f7f7f7", alignItems: "center" },
  amountLabel: { fontSize: 9, color: "#555555", marginBottom: 4 },
  amountValue: { fontSize: 22, fontWeight: 700, color: "#0f2d52" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
});

export default function ReceiptDocument({
  logoBase64,
  studentName,
  ccigaId,
  programName,
  paymentId,
  amountLabel,
  paidAtLabel,
  note,
  totalPaidLabel,
  balanceLabel,
  reference,
  publishedLabel,
  qrDataUri,
}: {
  logoBase64: string;
  studentName: string;
  ccigaId: string;
  programName: string;
  paymentId: string;
  amountLabel: string;
  paidAtLabel: string;
  note: string | null;
  totalPaidLabel: string;
  balanceLabel: string;
  reference: string;
  publishedLabel: string;
  qrDataUri: string | null;
}) {
  return (
    <Document>
      <Page size="A4" style={shared.page}>
        <DocumentHeader logoBase64={logoBase64} orgTitle="CCIGA" docTitle="Reçu de paiement" />

        <View style={shared.identityBlock}>
          <View style={shared.identityRow}>
            <Text style={shared.label}>Étudiant(e)</Text>
            <Text style={shared.value}>{studentName}</Text>
          </View>
          <View style={shared.identityRow}>
            <Text style={shared.label}>Identifiant CCIGA</Text>
            <Text style={shared.value}>{ccigaId}</Text>
          </View>
          <View style={shared.identityRow}>
            <Text style={shared.label}>Programme</Text>
            <Text style={shared.value}>{programName}</Text>
          </View>
          <View style={shared.identityRow}>
            <Text style={shared.label}>Date de paiement</Text>
            <Text style={shared.value}>{paidAtLabel}</Text>
          </View>
          {note && (
            <View style={shared.identityRow}>
              <Text style={shared.label}>Note</Text>
              <Text style={shared.value}>{note}</Text>
            </View>
          )}
        </View>

        <View style={styles.amountBlock}>
          <Text style={styles.amountLabel}>Montant reçu</Text>
          <Text style={styles.amountValue}>{amountLabel}</Text>
        </View>

        <View style={shared.summaryBlock}>
          <View style={styles.row}>
            <Text style={shared.label}>Total payé à ce jour</Text>
            <Text style={shared.value}>{totalPaidLabel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={shared.label}>Solde restant</Text>
            <Text style={shared.value}>{balanceLabel}</Text>
          </View>
        </View>

        <DocumentFooter reference={reference} publishedLabel={publishedLabel} qrDataUri={qrDataUri} />
      </Page>
    </Document>
  );
}
