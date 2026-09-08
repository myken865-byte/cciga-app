/* eslint-disable jsx-a11y/alt-text -- react-pdf's <Image> renders into a PDF, not the DOM; it has no `alt` prop. */
import path from "path";
import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
  Svg,
  Polygon,
  Circle,
  Font,
  Line,
  Rect,
} from "@react-pdf/renderer";

// Police dédiée à ce document (jamais lib/pdf/fonts.ts / NotoSans, jamais
// partagée avec un autre document) : le mandat de correction exige "Times
// New Roman" — les polices standard-14 intégrées à react-pdf (dont
// "Times-Roman") déforment les caractères accentués français, un bug déjà
// documenté et corrigé ailleurs dans ce projet en embarquant une vraie
// police. Ici, embarque directement le fichier Times New Roman réel de
// Windows (licence déjà valide sur ce poste, utilisée pour les documents
// internes de l'institution) plutôt que le nom générique du PDF standard —
// rend les accents correctement tout en respectant la police demandée.
const EC_FONT_FAMILY = "CCIGA-EC-Times";
let ecFontRegistered = false;
function ensureEcFontRegistered() {
  if (ecFontRegistered) return;
  const fontsDir = path.join(process.cwd(), "assets", "fonts");
  Font.register({
    family: EC_FONT_FAMILY,
    fonts: [
      { src: path.join(fontsDir, "TimesNewRoman-Regular.ttf"), fontWeight: 400 },
      { src: path.join(fontsDir, "TimesNewRoman-Bold.ttf"), fontWeight: 700 },
    ],
  });
  ecFontRegistered = true;
}
ensureEcFontRegistered();

// Format verrouillé : 8,5 x 5,5 pouces, paysage. 1 pouce = 72pt.
// Pli central exactement à 4,25 pouces (moitié) — chaque panneau 4,25 x 5,5.
// Identique à lib/pdf/PaymentBookletDocument.tsx (jamais importé d'ici : ce
// fichier est un fork dédié à l'École Classique afin de ne jamais faire
// dépendre le rendu École Professionnelle/Université de ce travail).
const PAGE_WIDTH = 8.5 * 72; // 612pt
const PAGE_HEIGHT = 5.5 * 72; // 396pt
const PANEL_WIDTH = PAGE_WIDTH / 2; // 306pt = 4.25in

const NAVY = "#00185a";
const GOLD = "#fcc606";
const NAVY_SHADOW = "#000d33";

// Correction post-impression : taille de police minimale imposée pour tout
// le carnet — aucun texte en dessous.
const MIN_FONT_SIZE = 11;

// Bloc "Mode de paiement et vérification" — uniquement au bas de "Frais
// complémentaires" (mandat dédié "Nouveau tableau Suivi des paiements" :
// section retirée du côté "Suivi des paiements", cf. SUIVI_ROW_LABELS).
const PAYMENT_MODES = [
  "Espèces — No du reçu :",
  "MonCash — Téléphone / référence :",
  "NatCash — Téléphone / référence :",
  "Chèque — No du chèque / banque :",
  "Carte de crédit ou de débit — Référence :",
  "Virement ou dépôt bancaire — Banque / référence :",
];

// "Suivi des paiements" (mandat "Nouveau tableau Suivi des paiements") :
// carnet manuscrit — ces 4 libellés sont toujours imprimés d'avance pour
// tout élève, les colonnes Date/Montant/Balance/Signature restent vierges
// pour être remplies à la main à chaque versement réel. Ce tableau n'affiche
// donc plus les montants déjà enregistrés dans Finance sous forme de texte
// imprimé — décision explicite du mandat, remplaçant l'ancien comportement.
const SUIVI_ROW_LABELS = ["Frais d'entrée", "1er versement", "2e versement", "3e versement"];

// "Frais complémentaires" (mandat "Révision partie droite") : lignes vides
// uniquement, aucun libellé préimprimé (contrairement à SUIVI_ROW_LABELS) —
// "Ne préremplir aucun frais" du mandat.
const FRAIS_ROW_COUNT = 4;

// En-tête de la première de couverture (mandat "Corrections couvertures") :
// 4 lignes imposées dans cet ordre exact, adresse forcée sur 2 lignes
// précises (pas un simple retour à la ligne naturel) — jamais réutilisées
// pour l'École Professionnelle ou l'Université.
const EC_FRONT_ADDRESS_LINE_1 = "0107, Fonds-Fabre, Impasse Vernet,";
const EC_FRONT_ADDRESS_LINE_2 = "Petit-Goâve, Haïti";
const EC_FRONT_CONTACT_LINE = "Contact: (+509) 3780 2265 / 3444 6279";
const EC_MOTTO_1 = "« Lumen Super Flumen »";
const EC_MOTTO_2 = "« Marchons Vers l'excellence. »";
// Mandat "Correction quatrième de couverture" : remplace EC_MOTTO_1
// uniquement au pied de page du ruban (bas de la 4e de couverture) — la
// phrase transférée en haut de la 4e de couverture (frameSunRow, mandat
// précédent) reste EC_MOTTO_1, non mentionnée par ce mandat.
const EC_MOTTO_FOOTER = "« La lumière qui brille sur le fleuve »";

// Motif décoratif "soleil" du premier plat de couverture — rayons générés
// plutôt que codés en dur point par point (12 triangles régulièrement
// espacés autour du cercle central).
const SUN_RAYS = 12;
const SUN_CENTER = 50;
const SUN_INNER_R = 27;
const SUN_OUTER_R = 47;
const SUN_RAY_HALF_ANGLE_DEG = 9;

function buildSunRayPoints(): string[] {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  return Array.from({ length: SUN_RAYS }, (_, i) => {
    const angle = (i * 360) / SUN_RAYS;
    const tipX = SUN_CENTER + SUN_OUTER_R * Math.cos(toRad(angle));
    const tipY = SUN_CENTER + SUN_OUTER_R * Math.sin(toRad(angle));
    const base1X = SUN_CENTER + SUN_INNER_R * Math.cos(toRad(angle - SUN_RAY_HALF_ANGLE_DEG));
    const base1Y = SUN_CENTER + SUN_INNER_R * Math.sin(toRad(angle - SUN_RAY_HALF_ANGLE_DEG));
    const base2X = SUN_CENTER + SUN_INNER_R * Math.cos(toRad(angle + SUN_RAY_HALF_ANGLE_DEG));
    const base2Y = SUN_CENTER + SUN_INNER_R * Math.sin(toRad(angle + SUN_RAY_HALF_ANGLE_DEG));
    return `${tipX},${tipY} ${base1X},${base1Y} ${base2X},${base2Y}`;
  });
}

const SUN_RAY_POINTS = buildSunRayPoints();

// Bordure décorative — quatrième de couverture ET première de couverture,
// chacune ajoutée par un mandat dédié et séparé (jamais les pages
// intérieures). Marge de sécurité impression : au moins 8mm entre le bord
// physique de la page et le cadre extérieur (8mm = 22,68pt). Même géométrie
// exacte sur les deux couvertures (mêmes dimensions de panneau).
const BORDER_MARGIN = 22.7;
const BORDER_BAND_WIDTH = 8;
const BORDER_HACHURE_SPACING = 5;

type BorderMargins = { top: number; right: number; bottom: number; left: number };
const UNIFORM_BORDER_MARGIN: BorderMargins = {
  top: BORDER_MARGIN,
  right: BORDER_MARGIN,
  bottom: BORDER_MARGIN,
  left: BORDER_MARGIN,
};

const MM_TO_PT = 72 / 25.4;
// Élargissement ciblé de l'encadrement — 1ère de couverture UNIQUEMENT
// (mandat "Corrections couvertures") : +3mm à droite, +3mm en haut, +1mm à
// gauche, +1mm en bas par rapport à BORDER_MARGIN. La quatrième de
// couverture garde l'encadrement uniforme d'origine, inchangé.
const FRONT_BORDER_MARGIN: BorderMargins = {
  top: BORDER_MARGIN - 3 * MM_TO_PT,
  right: BORDER_MARGIN - 3 * MM_TO_PT,
  bottom: BORDER_MARGIN - 1 * MM_TO_PT,
  left: BORDER_MARGIN - 1 * MM_TO_PT,
};

// Hachures diagonales de la bande décorative. Un clip-path (Defs/ClipPath +
// G clipPath=url(#id)) a été essayé en premier mais react-pdf a rendu le
// motif sur tout le panneau au lieu de le découper — pas fiable ici. Un
// <Svg> imbriqué positionné par x/y a aussi été essayé, mais react-pdf ne
// supporte pas x/y sur <Svg>. Solution retenue, sans dépendance à un
// mécanisme de découpe : chaque diagonale (toutes à 45°) est déjà
// mathématiquement découpée à la bande où elle doit apparaître avant même
// d'être dessinée — plus simple et garanti correct sur ce renderer.
type HachureSegment = { x1: number; y1: number; x2: number; y2: number; color: string };

function clipDiagonalToStrip(
  x0: number,
  strip: { x: number; y: number; width: number; height: number },
): { x1: number; y1: number; x2: number; y2: number } | null {
  // La diagonale globale n°x0 passe par (x0 + t, t) pour t dans [0, PAGE_HEIGHT].
  const tMin = Math.max(strip.y, strip.x - x0);
  const tMax = Math.min(strip.y + strip.height, strip.x + strip.width - x0);
  if (tMin >= tMax) return null;
  return { x1: x0 + tMin, y1: tMin, x2: x0 + tMax, y2: tMax };
}

function buildHachureSegmentsForStrip(strip: { x: number; y: number; width: number; height: number }): HachureSegment[] {
  const segments: HachureSegment[] = [];
  let i = 0;
  for (let x0 = -PAGE_HEIGHT; x0 <= PANEL_WIDTH + PAGE_HEIGHT; x0 += BORDER_HACHURE_SPACING) {
    const clipped = clipDiagonalToStrip(x0, strip);
    if (clipped) segments.push({ ...clipped, color: i % 2 === 0 ? NAVY : GOLD });
    i++;
  }
  return segments;
}

const styles = StyleSheet.create({
  page: { width: PAGE_WIDTH, height: PAGE_HEIGHT, fontFamily: EC_FONT_FAMILY, fontWeight: 700, color: "#1a1a1a" },
  panelRow: { flexDirection: "row", width: "100%", height: "100%" },

  // --- Quatrième de couverture (recto gauche) ---
  // Panneau lui-même non paddé : le positionnement absolu (top/left) se
  // calcule depuis le bord de padding de l'ancêtre le plus proche, donc la
  // bordure décorative a besoin d'un conteneur non paddé pour s'aligner sur
  // le vrai bord du panneau. Le padding qui protège le contenu existant est
  // reporté sur backPanelContent, à l'intérieur.
  backPanel: { width: PANEL_WIDTH, height: PAGE_HEIGHT },
  backPanelContent: { flex: 1, padding: BORDER_MARGIN + BORDER_BAND_WIDTH + 4 },
  // Bordure décorative — cadre extérieur bleu marin fin, bande à hachures
  // diagonales bleu marin / or, cadre intérieur bleu marin fin — aucun
  // texte. Partagée par la quatrième ET la première de couverture (chacune
  // ajoutée par son propre mandat), jamais les pages intérieures.
  // Superposition absolue : n'affecte ni ne déplace aucun élément déjà
  // réalisé dans le panneau.
  panelBorder: { position: "absolute", top: 0, left: 0, width: PANEL_WIDTH, height: PAGE_HEIGHT },
  // Logo agrandi et centré, écriture "CCIGA" supprimée à côté (demande
  // explicite).
  backHeader: { alignItems: "center", marginBottom: 6 },
  backLogo: { width: 32, height: 32 },
  frame: {
    flex: 1,
    border: `1.5 solid ${NAVY}`,
    borderRadius: 3,
    padding: 7,
  },
  frameGoldBar: { height: 3, backgroundColor: GOLD, marginBottom: 5 },
  // Mandat "Corrections couvertures" : remplace l'ancien bloc identité/
  // adresse/code (transféré/retiré, cf. première de couverture) par le
  // soleil transféré depuis la première de couverture.
  frameSunRow: { alignItems: "center", marginBottom: 4 },
  frameDivider: { height: 0.75, backgroundColor: "#dddddd", marginVertical: 4 },
  frameText: { fontSize: MIN_FONT_SIZE, color: "#333333", lineHeight: 1.2, marginBottom: 3 },
  // Fond gris-bleu clair (au lieu du jaune pâle, qui rendait mal à
  // l'impression réelle) — même teinte que le bandeau du bloc "Mode de
  // paiement" pour rester cohérent, sans dépendre des couleurs officielles.
  frameReminder: { padding: 3, borderLeft: `2.5 solid ${GOLD}`, backgroundColor: "#eef1f8", marginBottom: 4 },
  frameReminderText: { fontSize: MIN_FONT_SIZE, color: NAVY, lineHeight: 1.15 },
  frameFooter: { marginTop: "auto", alignItems: "center" },
  // Encadrement fin jaune or ajouté autour du ruban (mandat "Correction
  // quatrième de couverture") — largeur/hauteur ajustées à l'espace
  // réellement disponible sur ce panneau de 4,25 po (le "6 à 8 pouces" du
  // mandat, pensé pour un support plus large, ne peut pas s'appliquer tel
  // quel ici). Ne touche pas le bord physique de la page : reste bien à
  // l'intérieur de la bordure décorative existante.
  frameFooterRibbonFrame: {
    border: `0.75 solid ${GOLD}`,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 3,
  },
  frameFooterText: { fontSize: MIN_FONT_SIZE, color: NAVY, textAlign: "center" },

  // --- Première de couverture (recto droit) ---
  // Même principe que backPanel/backPanelContent ci-dessus : panneau
  // extérieur non paddé (pour l'alignement de la bordure), padding reporté
  // sur coverPanelContent.
  coverPanel: { width: PANEL_WIDTH, height: PAGE_HEIGHT },
  // Padding asymétrique : suit l'encadrement élargi FRONT_BORDER_MARGIN
  // (mandat "Corrections couvertures") — la quatrième de couverture garde
  // un padding uniforme (backPanelContent, inchangé).
  coverPanelContent: {
    flex: 1,
    paddingTop: FRONT_BORDER_MARGIN.top + BORDER_BAND_WIDTH + 4,
    paddingRight: FRONT_BORDER_MARGIN.right + BORDER_BAND_WIDTH + 4,
    paddingBottom: FRONT_BORDER_MARGIN.bottom + BORDER_BAND_WIDTH + 4,
    paddingLeft: FRONT_BORDER_MARGIN.left + BORDER_BAND_WIDTH + 4,
  },
  // Correction ciblée en-tête 1ère de couverture : fond bleu marine plein +
  // texte blanc perdait sa netteté à l'impression réelle (petit texte
  // inversé sur fond foncé plein — même défaut déjà rencontré et corrigé
  // ailleurs dans ce document pour "Mode de paiement" et les en-têtes de
  // tableau). Même solution éprouvée reprise ici pour rester cohérent :
  // fond clair #eef1f8, texte bleu marine — contraste net, fiable à
  // l'impression, n'affecte pas la quatrième de couverture (style
  // entièrement séparé, non modifié).
  coverBanner: { backgroundColor: "#eef1f8", paddingVertical: 5, paddingHorizontal: 10, alignItems: "center" },
  coverBannerOrg: { fontSize: 12, color: NAVY, textAlign: "center", letterSpacing: 0.5 },
  coverBannerAddress: { fontSize: MIN_FONT_SIZE, color: NAVY, textAlign: "center", marginTop: 2, lineHeight: 1.1 },
  coverBannerContacts: { fontSize: MIN_FONT_SIZE, color: NAVY, textAlign: "center", marginTop: 1 },
  // paddingBottom réserve l'espace du pied de page absolument positionné
  // (coverFooter, 2 lignes) pour que le soleil (marginTop:"auto") ne s'y
  // superpose jamais.
  // paddingBottom réduit : coverFooter ne contient plus que 1 ligne (le
  // soleil et « Lumen Super Flumen » sont partis sur la 4e de couverture),
  // plus besoin de réserver autant d'espace pour lui.
  coverBody: { flex: 1, paddingHorizontal: 10, paddingTop: 6, paddingBottom: 20 },
  // flex: 1 retiré — le cadre ne doit contenir que les champs (Code à
  // Téléphone), pas s'étirer jusqu'au bas du panneau : le soleil et les
  // devises vivent maintenant hors du cadre, dans coverFooter.
  coverFrame: {
    border: `1.5 solid ${NAVY}`,
    borderRadius: 3,
    padding: 5,
  },
  coverLogoRow: { alignItems: "center", marginBottom: 2 },
  // Agrandi (mandat "Corrections couvertures") : espace libéré par la
  // réduction de coverBody.paddingBottom et l'encadrement élargi.
  coverLogo: { width: 68, height: 68 },
  coverYear: { fontSize: MIN_FONT_SIZE, color: "#555555", textAlign: "center", marginTop: 1 },
  coverTitle: { fontSize: 16, color: NAVY, textAlign: "center", marginTop: 3, letterSpacing: 0.5 },
  coverGoldBar: { height: 2.5, backgroundColor: GOLD, width: 70, alignSelf: "center", marginTop: 3, marginBottom: 4 },

  fieldsBlock: { gap: 2 },
  fieldRow: { flexDirection: "row", alignItems: "flex-end", gap: 4 },
  fieldLabel: { fontSize: MIN_FONT_SIZE, color: "#667085", textTransform: "uppercase", width: 78 },
  // Ligne noire et plus épaisse — l'ancien gris clair disparaissait à
  // l'impression réelle (même défaut que les lignes de séparation).
  fieldValue: {
    flex: 1,
    fontSize: MIN_FONT_SIZE,
    color: "#1a1a1a",
    borderBottom: "0.75 solid #000000",
    paddingBottom: 1,
  },
  fieldBlank: { flex: 1, borderBottom: "0.75 solid #000000", height: 11 },

  // bottom dégagé au-delà de la bordure décorative (marge + bande) pour ne
  // jamais se superposer aux hachures — react-pdf mesure les décalages
  // absolus depuis le bord extérieur du panneau, pas depuis le padding.
  coverFooter: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: FRONT_BORDER_MARGIN.bottom + BORDER_BAND_WIDTH + 8,
    alignItems: "center",
  },
  coverFooterText: { fontSize: MIN_FONT_SIZE, color: NAVY, textAlign: "center" },

  // Ligne de pli — repère visuel à 4,25 pouces, n'imprime pas de contenu.
  foldLine: {
    position: "absolute",
    left: PANEL_WIDTH,
    top: 0,
    bottom: 0,
    width: 0,
    borderLeft: "0.75 dashed #999999",
  },

  // --- Verso ---
  // Correction post-impression : marge de sécurité imprimable 4-5mm sur les
  // quatre côtés (13pt ≈ 4,6mm).
  panel: { width: PANEL_WIDTH, height: PAGE_HEIGHT, padding: 13 },
  // marginBottom élargi : avec une vraie photo (plus haute que le texte
  // d'identité), la case cochée nettement plus grande laissait trop peu de
  // dégagement avant "Suivi des paiements", au point de sembler chevaucher.
  versoHeader: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 10 },
  versoLogo: { width: 14, height: 14 },
  // Emplacement photo doublé (correction post-impression) — 30x38 -> 60x76.
  versoPhoto: { width: 60, height: 76, border: `1.25 solid ${NAVY}`, borderRadius: 2, objectFit: "cover" },
  versoPhotoPlaceholder: {
    width: 60,
    height: 76,
    border: `1 dashed ${NAVY}`,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  versoPhotoPlaceholderText: { fontSize: MIN_FONT_SIZE, color: NAVY, textAlign: "center" },
  versoIdentityBlock: { flex: 1 },
  versoName: { fontSize: MIN_FONT_SIZE, color: NAVY, lineHeight: 1.1 },
  versoSub: { fontSize: MIN_FONT_SIZE, color: "#555555", marginTop: 1 },
  versoRef: { fontSize: MIN_FONT_SIZE, fontFamily: "Courier", color: "#667085", marginTop: 1 },

  tuitionNote: { fontSize: MIN_FONT_SIZE, color: "#333333", marginBottom: 3, fontWeight: 400 },
  tuitionNoteValue: { fontWeight: 700, color: NAVY },
  tuitionNoteValueWarn: { fontWeight: 700, color: "#b45309" },

  // --- "Suivi des paiements" (mandat "Nouveau tableau Suivi des
  // paiements") : bandeau titre + écolage combiné, tableau à 5 colonnes
  // (Description/Date/Montant/Balance/Signature) à libellés de lignes fixes
  // (carnet manuscrit), sans Mode de paiement. Styles strictement séparés de
  // ceux de Frais complémentaires (table/tableRow/col/etc. ci-dessus, qui
  // restent inchangés et gardent leur propre en-tête clair).
  suiviTopBand: { flexDirection: "row", border: `1.5 solid ${NAVY}`, borderRadius: 3, overflow: "hidden" },
  suiviTopBandLeft: {
    flex: 0.44,
    backgroundColor: "#eef1f8",
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: "center",
    borderRight: `2 solid ${GOLD}`,
  },
  suiviTopBandRight: {
    flex: 0.56,
    backgroundColor: "#eef1f8",
    paddingVertical: 4,
    paddingHorizontal: 6,
    justifyContent: "center",
  },
  suiviTopBandTitle: { fontSize: 11, color: NAVY, letterSpacing: 0.4 },
  // overflow: "hidden" — même correction que `table` plus haut (séparateurs
  // de colonnes qui débordaient sous la dernière ligne).
  suiviTable: { marginTop: 4, border: `1.5 solid ${NAVY}`, borderRadius: 3, overflow: "hidden" },
  suiviTableHeaderRow: { flexDirection: "row", backgroundColor: NAVY, borderBottom: `1.5 solid ${GOLD}` },
  suiviColHeaderText: { fontSize: MIN_FONT_SIZE, color: "#ffffff", textAlign: "center", paddingVertical: 4 },
  suiviCol: {
    flex: 1,
    fontSize: MIN_FONT_SIZE,
    paddingVertical: 4,
    paddingHorizontal: 3,
    textAlign: "center",
    borderRight: `1 solid ${NAVY}`,
  },
  suiviColLast: { flex: 1, fontSize: MIN_FONT_SIZE, paddingVertical: 4, paddingHorizontal: 3, textAlign: "center" },
  // Élargie : "Frais d'entrée" / "1er versement" etc. se coupaient avec un
  // trait d'union dans une colonne trop étroite (même défaut déjà rencontré
  // et corrigé pour colDesc plus haut).
  suiviColDesc: { flex: 1.6, textAlign: "left" },
  suiviColDate: { flex: 0.6 },
  suiviColAmount: { flex: 1 },
  suiviColDescText: { color: NAVY, textAlign: "left" },
  // minHeight généreux : cellules vierges à remplir à la main (mandat :
  // "suffisamment grandes pour permettre une écriture confortable").
  suiviRow: { flexDirection: "row", borderBottom: `1 solid ${NAVY}`, minHeight: 48 },
  suiviRowLast: { flexDirection: "row", minHeight: 48 },
  suiviGoldRule: { height: 1.5, backgroundColor: GOLD, marginTop: 6, marginBottom: 4 },
  suiviRemarqueRow: { flexDirection: "row", alignItems: "flex-end", gap: 4 },
  suiviRemarqueLabel: { fontSize: MIN_FONT_SIZE, color: NAVY },

  // Mandat "Révision partie droite" : encadrement bleu marine distinct
  // (panneau inférieur), plus le gris discret d'origine.
  paymentModeBlock: { marginTop: 4, border: `1.25 solid ${NAVY}`, borderRadius: 6 },
  paymentModeTitle: {
    fontSize: MIN_FONT_SIZE,
    color: NAVY,
    textTransform: "uppercase",
    backgroundColor: "#eef1f8",
    padding: 2,
  },
  paymentModeRows: { padding: 3 },
  paymentModeRow: { flexDirection: "row", alignItems: "flex-start", gap: 4, marginTop: 2 },
  paymentModeCheckbox: { width: 10, height: 10, border: "0.75 solid #333333", marginTop: 1 },
  paymentModeLabel: { flex: 1, fontSize: MIN_FONT_SIZE, fontWeight: 400, color: "#1a1a1a", lineHeight: 1.1 },
  // Ligne noire et plus épaisse — même correction que les autres lignes à
  // remplir (l'ancien gris clair disparaissait à l'impression réelle).
  paymentModeBlank: { width: 60, borderBottom: "0.75 solid #000000", height: 12, alignSelf: "flex-end" },

  // --- "Frais complémentaires" (mandat "Révision partie droite") : panneau
  // supérieur regroupant Éléments remis + tableau, encadrement distinct du
  // panneau "Mode de paiement" (paymentModeBlock ci-dessus). Tableau à 5
  // colonnes proportionnées (28/15/18/17/22 %), aucune ligne préremplie —
  // même les frais réels déjà enregistrés (Uniforme/Examen/Cantine) ne
  // s'affichent plus ici, à remplir à la main comme "Suivi des paiements".
  fraisUpperPanel: { border: `1.25 solid ${NAVY}`, borderRadius: 6, padding: 5, marginTop: 3 },
  fraisSectionTitle: { fontSize: 10, color: NAVY, textAlign: "center", textTransform: "uppercase" },
  fraisGoldRule: { height: 1.25, backgroundColor: GOLD, marginTop: 2, marginBottom: 4, width: "55%", alignSelf: "center" },
  fraisTitleCartouche: {
    alignSelf: "center",
    border: `1 solid ${NAVY}`,
    borderRadius: 3,
    backgroundColor: "#eef1f8",
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 6,
    marginBottom: 3,
  },
  fraisTitleCartoucheText: { fontSize: MIN_FONT_SIZE, color: NAVY, textAlign: "center", textTransform: "uppercase" },
  fraisTable: { border: `1.25 solid ${NAVY}`, borderRadius: 3, overflow: "hidden" },
  fraisTableHeaderRow: { flexDirection: "row", backgroundColor: NAVY, borderBottom: `1.25 solid ${GOLD}` },
  fraisColHeaderText: { fontSize: MIN_FONT_SIZE, color: "#ffffff", textAlign: "center", paddingVertical: 3 },
  fraisCol: {
    fontSize: MIN_FONT_SIZE,
    paddingVertical: 3,
    paddingHorizontal: 2,
    textAlign: "center",
    borderRight: `1 solid ${NAVY}`,
  },
  fraisColLast: { fontSize: MIN_FONT_SIZE, paddingVertical: 3, paddingHorizontal: 2, textAlign: "center" },
  // Proportions du mandat : Description 28 %, Date 15 %, Montant 18 %,
  // Balance 17 %, Signature 22 % (flex directement en dixièmes de %).
  fraisColDesc: { flex: 2.8, textAlign: "left" },
  fraisColDate: { flex: 1.5 },
  fraisColMontant: { flex: 1.8 },
  fraisColBalance: { flex: 1.7 },
  fraisColSignature: { flex: 2.2 },
  fraisRow: { flexDirection: "row", borderBottom: `1 solid ${NAVY}`, minHeight: 32 },
  fraisRowLast: { flexDirection: "row", minHeight: 32 },

  checkRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 3 },
  checkItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  checkBox: { width: 10, height: 10, border: "0.75 solid #333333" },
  // Case cochée = carré plein bleu marine — sans dépendre d'un glyphe de
  // coche (fiabilité d'impression), utilisé pour un exemplaire rempli.
  checkBoxChecked: { backgroundColor: NAVY },
  checkLabel: { fontSize: MIN_FONT_SIZE, fontWeight: 400, color: "#333333" },
});

// Bordure décorative réutilisable — même géométrie exacte sur la quatrième
// et la première de couverture (mandats séparés, jamais les pages
// intérieures) : cadre extérieur bleu marin fin, bande à hachures
// diagonales bleu marin / or, cadre intérieur bleu marin fin, aucun texte.
// Tout est dessiné directement dans les coordonnées du panneau (pas de
// clip-path, pas de <Svg> imbriqué — voir la note ci-dessus).
// margins optionnel : uniforme par défaut (quatrième de couverture,
// inchangée) — la première de couverture passe FRONT_BORDER_MARGIN
// (asymétrique, mandat "Corrections couvertures").
function PanelDecorativeBorder({ margins = UNIFORM_BORDER_MARGIN }: { margins?: BorderMargins }) {
  const innerTop = margins.top + BORDER_BAND_WIDTH;
  const innerRight = margins.right + BORDER_BAND_WIDTH;
  const innerBottom = margins.bottom + BORDER_BAND_WIDTH;
  const innerLeft = margins.left + BORDER_BAND_WIDTH;
  const strips = [
    { x: margins.left, y: margins.top, width: PANEL_WIDTH - margins.left - margins.right, height: BORDER_BAND_WIDTH },
    {
      x: margins.left,
      y: PAGE_HEIGHT - innerBottom,
      width: PANEL_WIDTH - margins.left - margins.right,
      height: BORDER_BAND_WIDTH,
    },
    { x: margins.left, y: innerTop, width: BORDER_BAND_WIDTH, height: PAGE_HEIGHT - innerTop - innerBottom },
    {
      x: PANEL_WIDTH - innerRight,
      y: innerTop,
      width: BORDER_BAND_WIDTH,
      height: PAGE_HEIGHT - innerTop - innerBottom,
    },
  ];
  const segments = strips.flatMap(buildHachureSegmentsForStrip);

  return (
    <Svg style={styles.panelBorder} viewBox={`0 0 ${PANEL_WIDTH} ${PAGE_HEIGHT}`}>
      {segments.map((s, i) => (
        <Line
          key={i}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke={s.color}
          strokeWidth={BORDER_HACHURE_SPACING * 1.05}
        />
      ))}
      <Rect
        x={margins.left}
        y={margins.top}
        width={PANEL_WIDTH - margins.left - margins.right}
        height={PAGE_HEIGHT - margins.top - margins.bottom}
        fill="none"
        stroke={NAVY}
        strokeWidth={1.25}
      />
      <Rect
        x={innerLeft}
        y={innerTop}
        width={PANEL_WIDTH - innerLeft - innerRight}
        height={PAGE_HEIGHT - innerTop - innerBottom}
        fill="none"
        stroke={NAVY}
        strokeWidth={1}
      />
    </Svg>
  );
}

// Bloc unique réutilisé à l'identique au bas de "Suivi des paiements" et de
// "Frais complémentaires" — un seul composant garantit que les deux
// emplacements restent rigoureusement identiques. `checkedMode`/
// `referenceLabel` sont optionnels (undefined pour tout carnet réel — la
// case cochée n'est utilisée que pour un exemplaire rempli) : sans eux, le
// rendu est rigoureusement identique à avant (tout en blanc, non coché).
function PaymentModeBlock({ checkedMode, referenceLabel }: { checkedMode?: string; referenceLabel?: string }) {
  return (
    <View style={styles.paymentModeBlock}>
      <Text style={styles.paymentModeTitle}>Mode de paiement et vérification</Text>
      <View style={styles.paymentModeRows}>
        {PAYMENT_MODES.map((label) => {
          const isChecked = label === checkedMode;
          return (
            <View key={label} style={styles.paymentModeRow}>
              <View style={[styles.paymentModeCheckbox, isChecked ? styles.checkBoxChecked : undefined]} />
              {isChecked && referenceLabel ? (
                // Une seule Text (libellé + référence en gras à l'intérieur),
                // comme pour "L'écolage de l'année est de : {montant}" plus
                // haut — l'enroulement naturel du texte gère la référence
                // sans jamais déborder, contrairement à une case étroite à
                // part (essayé, provoquait un chevauchement/débordement).
                <Text style={styles.paymentModeLabel}>
                  {label} <Text style={{ fontWeight: 700 }}>{referenceLabel}</Text>
                </Text>
              ) : (
                <>
                  <Text style={styles.paymentModeLabel}>{label}</Text>
                  <View style={styles.paymentModeBlank} />
                </>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}


export interface PaymentBookletEcoleClassiqueDocumentProps {
  logoBase64: string;
  academicYearLabel: string;
  carnetNumber: string;
  fullName: string;
  classOrProgramLabel: string;
  phoneLabel: string | null;
  photoBase64: string | null;

  feeLabel: string; // formatHTGForPdf(tuitionFee) ou "À COMPLÉTER - TARIF OFFICIEL REQUIS"
  totalPaidLabel: string;
  balanceLabel: string;

  codeLabel?: string;
  firstNameLabel?: string;
}

export default function PaymentBookletEcoleClassiqueDocument(props: PaymentBookletEcoleClassiqueDocumentProps) {
  return (
    <Document>
      {/* RECTO — extérieur du carnet : gauche = quatrième de couverture, droite = première de couverture */}
      <Page size={[PAGE_WIDTH, PAGE_HEIGHT]} style={styles.page}>
        <View style={styles.panelRow}>
          {/* Quatrième de couverture */}
          <View style={styles.backPanel}>
            <PanelDecorativeBorder />

            <View style={styles.backPanelContent}>
              <View style={styles.backHeader}>
                <Image style={styles.backLogo} src={props.logoBase64} />
              </View>

              <View style={styles.frame}>
                <View style={styles.frameGoldBar} />
                {/* Mandat "Corrections couvertures" : le bloc CCIGA École
                Classique / adresse / contact / Code (retiré de la 1ère de
                couverture) est remplacé ici par le soleil et « Lumen Super
                Flumen », transférés depuis la première de couverture. */}
                <View style={styles.frameSunRow}>
                  <Svg width={44} height={44} viewBox="0 0 100 100">
                    {SUN_RAY_POINTS.map((pts, i) => (
                      <Polygon key={i} points={pts} fill={GOLD} />
                    ))}
                    <Circle cx={SUN_CENTER} cy={SUN_CENTER} r={29} fill="#ffffff" />
                    <Circle cx={SUN_CENTER} cy={SUN_CENTER} r={25} fill={GOLD} />
                  </Svg>
                </View>
                <Text style={styles.frameFooterText}>{EC_MOTTO_1}</Text>

                <View style={styles.frameDivider} />

                <View style={styles.frameReminder}>
                  <Text style={styles.frameReminderText}>
                    N.B. : Le carnet de paiement est obligatoire à chaque versement.
                  </Text>
                </View>

                {/* Mandat "Correction quatrième de couverture" : titre
                "Rappels" supprimé, seule la première des 3 phrases retirée —
                les deux autres sont conservées mot pour mot. */}
                <Text style={styles.frameText}>
                  • Toute perte doit être signalée immédiatement au secrétariat.{"\n"}
                  • Document strictement personnel, non transférable.
                </Text>

                <View style={styles.frameFooter}>
                  {/* Encadrement fin jaune or ajouté autour du ruban (mandat
                  "Correction quatrième de couverture") — le ruban lui-même
                  n'est ni déplacé ni redessiné. */}
                  <View style={styles.frameFooterRibbonFrame}>
                    <Svg width={140} height={38} viewBox="0 0 440 120">
                      <Polygon points="145,15 25,10 0,45 25,80 145,70" fill={NAVY} />
                      <Polygon points="295,15 415,10 440,45 415,80 295,70" fill={NAVY} />
                      <Polygon points="145,80 170,80 145,95" fill={NAVY_SHADOW} />
                      <Polygon points="295,80 270,80 295,95" fill={NAVY_SHADOW} />
                      <Rect x={145} y={10} width={150} height={70} fill={NAVY} />
                    </Svg>
                  </View>
                  <Text style={styles.frameFooterText}>{EC_MOTTO_FOOTER}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Première de couverture */}
          <View style={styles.coverPanel}>
            <PanelDecorativeBorder margins={FRONT_BORDER_MARGIN} />

            <View style={styles.coverPanelContent}>
              <View style={styles.coverBanner}>
                <Text style={styles.coverBannerOrg}>CCIGA ÉCOLE CLASSIQUE</Text>
                <Text style={styles.coverBannerAddress}>{EC_FRONT_ADDRESS_LINE_1}</Text>
                <Text style={styles.coverBannerAddress}>{EC_FRONT_ADDRESS_LINE_2}</Text>
                <Text style={styles.coverBannerContacts}>{EC_FRONT_CONTACT_LINE}</Text>
              </View>

              <View style={styles.coverBody}>
                <View style={styles.coverFrame}>
                  <View style={styles.coverLogoRow}>
                    <Image style={styles.coverLogo} src={props.logoBase64} />
                    <Text style={styles.coverYear}>Année : {props.academicYearLabel}</Text>
                  </View>

                  <Text style={styles.coverTitle}>CARNET DE PAIEMENT</Text>
                  <View style={styles.coverGoldBar} />

                  <View style={styles.fieldsBlock}>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Code :</Text>
                      {props.codeLabel ? (
                        <Text style={[styles.fieldValue, { fontFamily: "Courier" }]}>{props.codeLabel}</Text>
                      ) : (
                        <View style={styles.fieldBlank} />
                      )}
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>No :</Text>
                      <Text style={[styles.fieldValue, { fontFamily: "Courier" }]}>{props.carnetNumber}</Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Nom :</Text>
                      <Text style={styles.fieldValue}>{props.fullName}</Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Prénom :</Text>
                      {props.firstNameLabel ? (
                        <Text style={styles.fieldValue}>{props.firstNameLabel}</Text>
                      ) : (
                        <View style={styles.fieldBlank} />
                      )}
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Classe :</Text>
                      <Text style={styles.fieldValue}>{props.classOrProgramLabel}</Text>
                    </View>
                    <View style={styles.fieldRow}>
                      <Text style={styles.fieldLabel}>Téléphone :</Text>
                      {props.phoneLabel ? (
                        <Text style={styles.fieldValue}>{props.phoneLabel}</Text>
                      ) : (
                        <View style={styles.fieldBlank} />
                      )}
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.coverFooter}>
                {/* Soleil et « Lumen Super Flumen » retirés de la première
                de couverture (mandat "Corrections couvertures") — transférés
                sur la quatrième de couverture. Seule la devise "Marchons Vers
                l'excellence" reste ici. */}
                <Text style={styles.coverFooterText}>{EC_MOTTO_2}</Text>
              </View>
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
                <Text style={styles.versoName}>
                  {props.firstNameLabel ? `${props.fullName} ${props.firstNameLabel}` : props.fullName}
                </Text>
                <Text style={styles.versoSub}>{props.classOrProgramLabel}</Text>
                <Text style={styles.versoRef}>{props.carnetNumber}</Text>
              </View>
            </View>

            <View style={styles.suiviTopBand}>
              <View style={styles.suiviTopBandLeft}>
                <Text style={styles.suiviTopBandTitle}>Suivi des paiements</Text>
              </View>
              <View style={styles.suiviTopBandRight}>
                <Text style={styles.tuitionNote}>
                  L&apos;écolage de l&apos;année est de :{" "}
                  <Text style={props.feeLabel.startsWith("À COMPLÉTER") ? styles.tuitionNoteValueWarn : styles.tuitionNoteValue}>
                    {props.feeLabel}
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.suiviTable}>
              <View style={styles.suiviTableHeaderRow}>
                <Text style={[styles.suiviCol, styles.suiviColDesc, styles.suiviColHeaderText]}>Description</Text>
                <Text style={[styles.suiviCol, styles.suiviColDate, styles.suiviColHeaderText]}>Date</Text>
                <Text style={[styles.suiviCol, styles.suiviColAmount, styles.suiviColHeaderText]}>Montant</Text>
                <Text style={[styles.suiviCol, styles.suiviColAmount, styles.suiviColHeaderText]}>Balance</Text>
                <Text style={[styles.suiviColLast, styles.suiviColHeaderText]}>Signature</Text>
              </View>
              {SUIVI_ROW_LABELS.map((label, i) => (
                <View key={label} style={i === SUIVI_ROW_LABELS.length - 1 ? styles.suiviRowLast : styles.suiviRow}>
                  <Text style={[styles.suiviCol, styles.suiviColDesc, styles.suiviColDescText]}>{label}</Text>
                  <Text style={[styles.suiviCol, styles.suiviColDate]}> </Text>
                  <Text style={[styles.suiviCol, styles.suiviColAmount]}> </Text>
                  <Text style={[styles.suiviCol, styles.suiviColAmount]}> </Text>
                  <Text style={styles.suiviColLast}> </Text>
                </View>
              ))}
            </View>

            <View style={styles.suiviGoldRule} />
            <View style={styles.suiviRemarqueRow}>
              <Text style={styles.suiviRemarqueLabel}>Remarque :</Text>
              <View style={styles.fieldBlank} />
            </View>
          </View>

          {/* Frais complémentaires et éléments remis */}
          <View style={styles.panel}>
            <View style={styles.fraisUpperPanel}>
              <Text style={styles.fraisSectionTitle}>Éléments remis</Text>
              <View style={styles.fraisGoldRule} />
              {/* Mandat "Modèle Maître Carnet de Paiement" : ces cases sont
              toujours générées vierges, sans exception — cochées uniquement
              à la main par l'administration après remise réelle. Aucune
              logique de précochage automatique n'existe plus dans ce
              composant. */}
              <View style={styles.checkRow}>
                {["Badge", "Écusson", "Tenue de sport"].map((label) => (
                  <View key={label} style={styles.checkItem}>
                    <View style={styles.checkBox} />
                    <Text style={styles.checkLabel}>{label}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.checkItem}>
                <View style={styles.checkBox} />
                <Text style={styles.checkLabel}>Autre : ____________</Text>
              </View>

              <View style={styles.fraisTitleCartouche}>
                <Text style={styles.fraisTitleCartoucheText}>Frais complémentaires</Text>
              </View>

              <View style={styles.fraisTable}>
                <View style={styles.fraisTableHeaderRow}>
                  <Text style={[styles.fraisCol, styles.fraisColDesc, styles.fraisColHeaderText]}>Description</Text>
                  <Text style={[styles.fraisCol, styles.fraisColDate, styles.fraisColHeaderText]}>Date</Text>
                  <Text style={[styles.fraisCol, styles.fraisColMontant, styles.fraisColHeaderText]}>Montant</Text>
                  <Text style={[styles.fraisCol, styles.fraisColBalance, styles.fraisColHeaderText]}>Balance</Text>
                  <Text style={[styles.fraisColLast, styles.fraisColSignature, styles.fraisColHeaderText]}>
                    Signature
                  </Text>
                </View>
                {Array.from({ length: FRAIS_ROW_COUNT }).map((_, i) => (
                  <View key={i} style={i === FRAIS_ROW_COUNT - 1 ? styles.fraisRowLast : styles.fraisRow}>
                    <Text style={[styles.fraisCol, styles.fraisColDesc]}> </Text>
                    <Text style={[styles.fraisCol, styles.fraisColDate]}> </Text>
                    <Text style={[styles.fraisCol, styles.fraisColMontant]}> </Text>
                    <Text style={[styles.fraisCol, styles.fraisColBalance]}> </Text>
                    <Text style={[styles.fraisColLast, styles.fraisColSignature]}> </Text>
                  </View>
                ))}
              </View>
            </View>

            <PaymentModeBlock />
          </View>
        </View>
        <View style={styles.foldLine} fixed />
      </Page>
    </Document>
  );
}
