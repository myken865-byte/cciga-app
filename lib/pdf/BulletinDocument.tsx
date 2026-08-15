import { Document, Page, View, Text } from "@react-pdf/renderer";
import { styles, DocumentHeader, DraftWatermark, SignatureBlock, DocumentFooter } from "@/lib/pdf/shared";

export interface BulletinDocumentProps {
  logoBase64: string;
  studentName: string;
  ccigaId: string;
  programName: string;
  periodLabel: string;
  courseFinals: { courseName: string; weight: number; finalGrade: number | null }[];
  average: number | null;
  decisionLabel: string;
  rank: number | null;
  rankingEnabled: boolean;
  absences: number;
  retards: number;
  appreciation: string | null;
  conduct: string | null;
  isDraft: boolean;
  reference: string;
  publishedLabel: string;
  qrDataUri: string | null;
}

export default function BulletinDocument(props: BulletinDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <DraftWatermark isDraft={props.isDraft} />
        <DocumentHeader logoBase64={props.logoBase64} orgTitle="CCIGA" docTitle="Bulletin scolaire — École Classique" />

        <View style={styles.identityBlock}>
          <View style={styles.identityRow}>
            <Text style={styles.label}>Élève</Text>
            <Text style={styles.value}>{props.studentName}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.label}>Identifiant CCIGA</Text>
            <Text style={styles.value}>{props.ccigaId}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.label}>Classe</Text>
            <Text style={styles.value}>{props.programName}</Text>
          </View>
          <View style={styles.identityRow}>
            <Text style={styles.label}>Période</Text>
            <Text style={styles.value}>{props.periodLabel}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.colSubject}>Matière</Text>
            <Text style={styles.colWeight}>Coefficient</Text>
            <Text style={styles.colGrade}>Note finale</Text>
          </View>
          {props.courseFinals.map((c) => (
            <View key={c.courseName} style={styles.tableRow}>
              <Text style={styles.colSubject}>{c.courseName}</Text>
              <Text style={styles.colWeight}>{c.weight}</Text>
              <Text style={styles.colGrade}>{c.finalGrade !== null ? `${c.finalGrade.toFixed(1)}/100` : "—"}</Text>
            </View>
          ))}
        </View>

        <View style={styles.summaryBlock}>
          <View style={styles.summaryRow}>
            <Text>Moyenne générale</Text>
            <Text style={styles.value}>{props.average !== null ? `${props.average.toFixed(1)}/100` : "—"}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Décision</Text>
            <Text style={styles.value}>{props.decisionLabel}</Text>
          </View>
          {props.rankingEnabled && props.rank !== null && (
            <View style={styles.summaryRow}>
              <Text>Rang</Text>
              <Text style={styles.value}>{props.rank}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text>Absences / Retards</Text>
            <Text style={styles.value}>
              {props.absences} / {props.retards}
            </Text>
          </View>
          {props.conduct && (
            <View style={styles.summaryRow}>
              <Text>Conduite</Text>
              <Text style={styles.value}>{props.conduct}</Text>
            </View>
          )}
          {props.appreciation && (
            <View style={styles.summaryRow}>
              <Text>Appréciation</Text>
              <Text style={styles.value}>{props.appreciation}</Text>
            </View>
          )}
        </View>

        <SignatureBlock />
        <DocumentFooter reference={props.reference} publishedLabel={props.publishedLabel} qrDataUri={props.qrDataUri} />
      </Page>
    </Document>
  );
}
