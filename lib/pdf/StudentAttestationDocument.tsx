import { Document, Page, View, Text } from "@react-pdf/renderer";
import { styles, DocumentHeader, SignatureBlock, DocumentFooter } from "@/lib/pdf/shared";

export interface StudentAttestationDocumentProps {
  logoBase64: string;
  institutionLabel: string;
  docTitle: string;
  studentName: string;
  ccigaId: string;
  programLabel: string;
  levelLabel: string | null;
  academicYearLabel: string;
  bodyText: string;
  reference: string;
  generatedLabel: string;
}

export default function StudentAttestationDocument({
  logoBase64,
  institutionLabel,
  docTitle,
  studentName,
  ccigaId,
  programLabel,
  levelLabel,
  academicYearLabel,
  bodyText,
  reference,
  generatedLabel,
}: StudentAttestationDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <DocumentHeader logoBase64={logoBase64} orgTitle={institutionLabel} docTitle={docTitle} />

        <View style={styles.identityBlock}>
          <View style={styles.identityRow}>
            <Text style={styles.label}>Nom complet</Text>
            <Text style={styles.value}>{studentName}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.label}>Code CCIGA</Text>
            <Text style={styles.value}>{ccigaId}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.label}>Programme / Classe</Text>
            <Text style={styles.value}>{programLabel}</Text>
          </View>
          {levelLabel && (
            <View style={styles.identityRow}>
              <Text style={styles.label}>Niveau</Text>
              <Text style={styles.value}>{levelLabel}</Text>
            </View>
          )}
          <View style={styles.identityRow}>
            <Text style={styles.label}>Année académique</Text>
            <Text style={styles.value}>{academicYearLabel}</Text>
          </View>
        </View>

        <Text style={{ marginTop: 8, marginBottom: 24, lineHeight: 1.6 }}>{bodyText}</Text>

        <SignatureBlock />
        <DocumentFooter reference={reference} publishedLabel={generatedLabel} qrDataUri={null} />
      </Page>
    </Document>
  );
}
