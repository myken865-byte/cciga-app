/* eslint-disable jsx-a11y/alt-text -- react-pdf's <Image> renders into a PDF, not the DOM; it has no `alt` prop. */
import { Document, Page, StyleSheet, View, Text, Image, Svg, Path, Rect, Circle, Line, Ellipse } from "@react-pdf/renderer";
import { DOCUMENT_FONT_FAMILY, ensureDocumentFontRegistered } from "@/lib/pdf/fonts";
import { fitFontSizePt, measureTextWidthPt } from "@/lib/pdf/textFit";

ensureDocumentFontRegistered();

/**
 * Mission "Remplacement réel des anciens badges par les 4 nouveaux modèles
 * finaux" (2026-09-17) — refonte complète de la structure visuelle (recto ET
 * verso) : carte portrait avec fente de cordon, bandeau d'en-tête arrondi
 * bleu marine, vague dorée décorative, pastille de rôle, bloc "Consignes
 * importantes", bloc contact, bandeau de pied avec signature "Marchons vers
 * l'excellence" — fidèle à la référence fournie (4 badge.png).
 *
 * Mission "Finition visuelle premium" (2026-09-17, suite) — logo consolidé
 * dans l'en-tête (un seul logo sur toute la carte), photo agrandie, panneaux
 * teintés pour matricule/année/QR (recto) et statut/année/classe/matricule
 * (verso), icônes contact vectorielles pures.
 *
 * Mission "Finition visuelle finale" (2026-09-17, suite) — corrections à
 * partir de l'audit visuel des rendus réels (badge Université) :
 *  1. Avatar de repli (pas de photo) réduit — les initiales occupaient
 *     encore trop le cadre ; un médaillon proportionné (14% de la hauteur
 *     de carte, pas 19%) lit mieux comme "avatar" que comme texte géant.
 *  2. Icônes de contact (verso) : elles utilisaient une taille en points
 *     FIXE (13pt) alors que tout le reste du badge est dimensionné en
 *     fraction de CARD_HEIGHT — à l'échelle réelle de la carte (~243pt de
 *     haut), 13pt dépassait la taille du NOM de l'étudiant (~8pt). Corrigé
 *     en passant une taille d'icône elle aussi fractionnée, proportionnée
 *     au texte qu'elle accompagne — pas seulement un ajustement cosmétique,
 *     un vrai défaut d'échelle trouvé en audit.
 *  3. Faculté / Programme séparés pour l'Université UNIQUEMENT quand la
 *     donnée existe réellement (`Program.faculty`, déjà affichée telle
 *     quelle par le site public — voir app/(site)/universite/page.tsx) —
 *     jamais inventée pour les 3 autres institutions, qui n'ont pas cette
 *     notion. Le numéro de badge (`badgeNumber`) était déjà une donnée
 *     réelle (`Badge.badgeNumber`), déjà affiché au verso — vérifié, pas de
 *     changement nécessaire sur ce point.
 *  4. Rapprochement Photo → Nom → Rôle → Programme, panneau recto remonté
 *     et agrandi (moins de zone morte), QR agrandi (recto et verso),
 *     libellés gris renforcés (taille + contraste), bloc Consignes
 *     resserré.
 *
 * Identité par institution : `INSTITUTION_ACCENTS` — un unique accent de
 * couleur secondaire par institution (bordure photo, liseré des panneaux),
 * pendant que l'ossature commune (bandeau marine, vague dorée, pastille de
 * rôle dorée, fente de cordon, slogan) reste strictement identique aux 4.
 *
 * Les coordonnées ci-dessous sont exprimées en fractions de CARD_WIDTH /
 * CARD_HEIGHT pour rester synchronisées avec la même mise en page dessinée
 * indépendamment dans lib/pdf/badgePng.ts (moteur PNG distinct) : toute
 * évolution visuelle doit changer les deux fichiers de façon symétrique.
 */
const MM_TO_PT = 2.834645669;
const CARD_WIDTH = 53.98 * MM_TO_PT;
const CARD_HEIGHT = 85.6 * MM_TO_PT;

// Mission "Cadre photo circulaire" (2026-09-20) — cercle parfait (largeur =
// hauteur = diamètre, jamais un ovale). La photo y est posée en `contain`
// dans un carré de côté 70 % du diamètre utile : un rectangle dont la
// diagonale ne dépasse pas le diamètre ne touche jamais le bord du cercle,
// donc aucun format de photo (portrait, carré, paysage) n'est rogné.
const PHOTO_DIAMETER = CARD_HEIGHT * 0.285;
const PHOTO_BORDER = 2;
const PHOTO_IMAGE_SIDE = (PHOTO_DIAMETER - PHOTO_BORDER * 2) * 0.7;

const NAVY = "#0b1f4d";
const GOLD = "#f0b429";
const PANEL_BG = "#f4f6fb";
const PANEL_BORDER = "#dfe4ee";
const LABEL_GRAY = "#3f4753";
const CARD_RADIUS = 10;

/** Un accent secondaire distinct par institution — même ossature CCIGA, identité propre. */
const INSTITUTION_ACCENTS: Record<string, string> = {
  "École Classique": "#c98a12",
  Kindergarten: "#1f8a7d",
  "École Professionnelle": "#4a6b85",
  Université: "#7a1f3d",
};
const DEFAULT_ACCENT = "#c98a12";

function accentFor(institutionLine: string): string {
  return INSTITUTION_ACCENTS[institutionLine] ?? DEFAULT_ACCENT;
}

// Largeur réelle disponible pour le texte des cases du verso (Statut/Année/
// Classe-Fonction/Matricule, ou Faculté/Programme/Matricule en pleine
// largeur pour l'Université) — dérivée des mêmes fractions que les styles
// `versoBody`/`profilePanel`/`profileRow`/`versoQrCell` ci-dessous, pour que
// le calcul de taille de police (`fitFontSizePt`, voir plus bas) porte sur
// la largeur RÉELLEMENT disponible, pas une estimation. Un identifiant
// technique ("CCIGA-ID-000050") ne doit JAMAIS être coupé par une césure
// automatique — voir le commentaire détaillé sur `versoQrCell`.
const VERSO_QR_CELL_WIDTH = CARD_WIDTH * 0.22 + 14;
const VERSO_PROFILE_GRID_WIDTH = CARD_WIDTH * 0.81 - VERSO_QR_CELL_WIDTH - CARD_WIDTH * 0.02;
const VERSO_TILE_HALF_WIDTH = VERSO_PROFILE_GRID_WIDTH / 2;
const VERSO_TILE_FULL_WIDTH = VERSO_PROFILE_GRID_WIDTH;
// Aucune césure automatique jamais, sur aucun texte du verso (labels ET
// valeurs) : react-pdf insère par défaut un trait d'union à l'intérieur
// d'un mot trop large pour sa colonne ("CLASSE / FONC-TION", "CCI-
// GA-ID-000050" — bug réel constaté). Retourner le mot entier comme un seul
// segment interdit toute coupure ; combiné à `fitFontSizePt` (qui réduit la
// police AVANT tout dépassement), le texte tient sur une seule ligne.
const NO_HYPHENATION = (word: string) => [word];

const styles = StyleSheet.create({
  page: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    fontFamily: DOCUMENT_FONT_FAMILY,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
    borderRadius: CARD_RADIUS,
    overflow: "hidden",
  },
  face: { width: "100%", height: "100%", position: "relative" },
  hole: {
    position: "absolute",
    top: CARD_HEIGHT * 0.014,
    left: CARD_WIDTH * 0.38,
    width: CARD_WIDTH * 0.24,
    height: CARD_HEIGHT * 0.016,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#c9ccd6",
    backgroundColor: "#f4f5f8",
  },
  headerWrap: { position: "absolute", top: CARD_HEIGHT * 0.045, left: 0, width: "100%" },
  header: {
    marginHorizontal: CARD_WIDTH * 0.06,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: NAVY,
    borderRadius: 7,
    borderWidth: 1.2,
    borderColor: GOLD,
    paddingVertical: CARD_HEIGHT * 0.009,
    paddingHorizontal: CARD_WIDTH * 0.025,
    gap: CARD_WIDTH * 0.02,
  },
  headerLogoChip: {
    width: CARD_HEIGHT * 0.066,
    height: CARD_HEIGHT * 0.066,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLogoImg: { width: "78%", height: "78%" },
  headerTextCol: { flex: 1, alignItems: "center" },
  headerOrg: { fontSize: CARD_HEIGHT * 0.025, fontWeight: 700, color: "#ffffff", letterSpacing: 0.5 },
  headerInstitution: { fontSize: CARD_HEIGHT * 0.0145, fontWeight: 700, color: "#ffffff", marginTop: 1, textTransform: "uppercase" },
  headerSpacer: { width: CARD_HEIGHT * 0.066 },

  photoBox: {
    position: "absolute",
    left: (CARD_WIDTH - PHOTO_DIAMETER) / 2,
    top: CARD_HEIGHT * 0.205,
    width: PHOTO_DIAMETER,
    height: PHOTO_DIAMETER,
    borderRadius: PHOTO_DIAMETER / 2,
    borderWidth: PHOTO_BORDER,
    backgroundColor: "#eef1f7",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  photoImage: { width: PHOTO_IMAGE_SIDE, height: PHOTO_IMAGE_SIDE, objectFit: "contain" },
  avatarText: { fontSize: CARD_HEIGHT * 0.075, fontWeight: 700 },
  // `height` + `overflow: hidden` : filet de sécurité — un nom vraiment
  // extrême (4 prénoms, ex. "Jean-Baptiste Emmanuel Christophe Alexandre")
  // reste plus large que la carte même à `minSize` (mismatch de mesure
  // opentype.js vs fontkit, voir plus bas) et passe sur 2 lignes malgré
  // `fitFontSizePt` — sans cette hauteur fixe, ce débordement recouvrait le
  // programme et empiétait sur le panneau du dessous (bug réel trouvé en
  // audit). Avec la hauteur fixe, l'éventuel débordement est simplement
  // coupé proprement au lieu de corrompre la mise en page — dégradation
  // acceptable pour un cas limite improbable, jamais pour un vrai nom.
  // Mission "Micro-finition du recto Kindergarten" (2026-09-17) — `height`
  // resserrée (0.127→0.112) : le contenu réel (nom + pastille + classe)
  // n'occupait pas toute la hauteur réservée, laissant un vide avant le
  // panneau Matricule/Année ; toujours assez de marge pour le filet de
  // sécurité `overflow: hidden` (nom extrême sur 2 lignes, voir ci-dessus).
  identityBlock: {
    position: "absolute",
    top: CARD_HEIGHT * 0.5,
    height: CARD_HEIGHT * 0.112,
    left: CARD_WIDTH * 0.06,
    right: CARD_WIDTH * 0.06,
    alignItems: "center",
    overflow: "hidden",
  },
  // Taille réduite très légèrement (0.034→0.031) — le nom restait dominant
  // face au rôle/niveau ; toujours nettement le plus grand texte du recto.
  studentName: { fontSize: CARD_HEIGHT * 0.031, fontWeight: 700, color: NAVY, textAlign: "center", letterSpacing: 0.2 },
  rolePill: {
    marginTop: CARD_HEIGHT * 0.005,
    backgroundColor: GOLD,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  rolePillText: { fontSize: CARD_HEIGHT * 0.0145, fontWeight: 700, color: NAVY },
  classText: { marginTop: CARD_HEIGHT * 0.006, fontSize: CARD_HEIGHT * 0.017, fontWeight: 700, color: "#1a1a1a", textAlign: "center" },

  // Mission "Correction ciblée du recto — QR retiré du recto" (2026-09-17) —
  // le QR (déjà présent au verso, voir `versoQrCell`) est retiré du recto
  // sans laisser de case vide : `infoPanel` (qui réservait une colonne au QR
  // + une colonne matricule/année) devient `rectoBottomPanel`, à 2 colonnes
  // Matricule / Année réparties sur toute la largeur récupérée.
  // Mission "Micro-finition du recto Kindergarten" (2026-09-17) — `top`
  // remonté (0.65→0.63) pour réduire le vide sous "Petite Section", sans le
  // rapprocher excessivement de `identityBlock`.
  rectoBottomPanel: {
    position: "absolute",
    left: CARD_WIDTH * 0.07,
    right: CARD_WIDTH * 0.07,
    top: CARD_HEIGHT * 0.63,
    bottom: CARD_HEIGHT * 0.1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PANEL_BG,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PANEL_BORDER,
    borderLeftWidth: 4,
    overflow: "hidden",
  },
  rectoBottomField: { flex: 1, alignItems: "center", gap: CARD_HEIGHT * 0.006 },
  rectoBottomDivider: { width: 1, height: "55%", backgroundColor: PANEL_BORDER },
  fieldLabel: { fontSize: CARD_HEIGHT * 0.0138, color: LABEL_GRAY, textTransform: "uppercase", letterSpacing: 0.3, textAlign: "center" },
  fieldValue: { fontSize: CARD_HEIGHT * 0.0175, fontWeight: 700, color: "#1a1a1a", textAlign: "center" },

  footerWrap: { position: "absolute", bottom: 0, left: 0, width: "100%" },
  footerText: { fontSize: CARD_HEIGHT * 0.0148, fontWeight: 700, color: "#ffffff", textAlign: "center", letterSpacing: 0.3 },

  // Verso
  // Marges/paddings réduits par rapport aux versions précédentes : la
  // colonne de texte (Statut/Année/Classe-Fonction/Matricule) était trop
  // étroite et provoquait une césure automatique de react-pdf ("CLASSE /
  // FONC-TION", "CCI-GA-ID-000050" — bug réel trouvé en audit, jamais un
  // simple réglage cosmétique). Élargie ici en reprenant de la place sur
  // les marges du panneau plutôt que sur le QR (qui garde sa taille réelle
  // — voir `versoQrImage`, inchangé).
  versoBody: { position: "absolute", top: CARD_HEIGHT * 0.185, left: CARD_WIDTH * 0.05, right: CARD_WIDTH * 0.05, bottom: CARD_HEIGHT * 0.105 },
  profilePanel: {
    backgroundColor: PANEL_BG,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PANEL_BORDER,
    borderLeftWidth: 4,
    padding: CARD_WIDTH * 0.045,
  },
  profileName: { fontSize: CARD_HEIGHT * 0.022, fontWeight: 700, color: NAVY },
  profileRow: { flexDirection: "row", marginTop: CARD_HEIGHT * 0.023, gap: CARD_WIDTH * 0.02 },
  profileGrid: { flex: 1, flexDirection: "row", flexWrap: "wrap", rowGap: CARD_HEIGHT * 0.024 },
  profileTile: { width: "50%" },
  profileTileFull: { width: "100%" },
  profileTileLabel: { color: LABEL_GRAY, textTransform: "uppercase", letterSpacing: 0.25 },
  profileTileValue: { fontWeight: 700, color: "#161b22", marginTop: 2 },
  // Taille de cellule alignée sur la taille RÉELLE de la carte QR (image +
  // marge intérieure) : avant, la cellule déclarée (0.25) était plus
  // étroite que la carte réellement dessinée (image 0.22 + 2×5pt de
  // padding), qui débordait donc silencieusement sur l'espace nominalement
  // réservé au texte — corrigé pour que le calcul de largeur du texte soit
  // enfin exact.
  versoQrCell: { width: CARD_WIDTH * 0.22 + 14, alignItems: "center", gap: 4 },
  versoQrCard: { backgroundColor: "#ffffff", borderRadius: 5, borderWidth: 1, borderColor: PANEL_BORDER, padding: 5 },
  versoQrImage: { width: CARD_WIDTH * 0.22, height: CARD_WIDTH * 0.22 },
  versoQrCaption: { fontSize: CARD_HEIGHT * 0.0088, color: LABEL_GRAY, textAlign: "center" },

  consignesPanel: {
    marginTop: CARD_HEIGHT * 0.017,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PANEL_BORDER,
    paddingHorizontal: CARD_WIDTH * 0.055,
    paddingVertical: CARD_HEIGHT * 0.012,
  },
  consignesTitle: { fontSize: CARD_HEIGHT * 0.0155, fontWeight: 700, color: NAVY },
  consigneRow: { flexDirection: "row", gap: 6, marginTop: CARD_HEIGHT * 0.008, alignItems: "flex-start" },
  consigneBulletBox: { width: 5, height: 5, borderRadius: 1.5, marginTop: 2.5 },
  consigneText: { fontSize: CARD_HEIGHT * 0.0118, color: "#2e2e2e", flex: 1, lineHeight: 1.25 },

  contactPanel: {
    marginTop: CARD_HEIGHT * 0.015,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PANEL_BORDER,
    padding: CARD_WIDTH * 0.055,
    gap: CARD_HEIGHT * 0.02,
  },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  contactText: { fontSize: CARD_HEIGHT * 0.0155, color: "#242424" },
  versoDisclaimer: {
    position: "absolute",
    bottom: CARD_HEIGHT * 0.108,
    left: CARD_WIDTH * 0.07,
    right: CARD_WIDTH * 0.07,
    fontSize: CARD_HEIGHT * 0.0088,
    color: "#7d879a",
    textAlign: "center",
  },
});

/** Vague dorée décorative sous l'en-tête — commune au recto et au verso. */
function HeaderWave() {
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT * 0.024;
  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <Path d={`M0 0 H${w} V${h * 0.3} C${w * 0.7} ${h * 1.3}, ${w * 0.35} ${-h * 0.3}, 0 ${h * 0.6} Z`} fill={GOLD} />
    </Svg>
  );
}

/** Bandeau bleu marine du pied de carte, bord supérieur ondulé, doré fin. */
function FooterWave() {
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT * 0.075;
  return (
    <View>
      <Svg width={w} height={h * 0.18} viewBox={`0 0 ${w} ${h * 0.18}`}>
        <Path d={`M0 ${h * 0.18} H${w} V0 C${w * 0.65} ${h * 0.9}, ${w * 0.3} ${-h * 0.4}, 0 ${h * 0.18} Z`} fill={GOLD} />
      </Svg>
      <View style={{ backgroundColor: NAVY, paddingVertical: h * 0.26, alignItems: "center" }}>
        <Text style={styles.footerText}>Marchons vers l&apos;excellence</Text>
      </View>
    </View>
  );
}

/** En-tête consolidé : logo + nom institution en UNE seule pastille — plus de médaillon séparé (évite l'effet "double logo" quand la photo n'est pas une vraie photo). */
function HeaderBand({ logoBase64, institutionLine }: { logoBase64: string; institutionLine: string }) {
  return (
    <View style={styles.headerWrap}>
      <View style={styles.header}>
        <View style={styles.headerLogoChip}>
          <Image style={styles.headerLogoImg} src={logoBase64} />
        </View>
        <View style={styles.headerTextCol}>
          <Text style={styles.headerOrg}>CCIGA</Text>
          <Text style={styles.headerInstitution}>{institutionLine}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>
      <HeaderWave />
    </View>
  );
}

// Icônes de contact (verso) : primitives vectorielles pures (aucune police
// d'icônes, aucun glyphe Unicode). `size` est fourni en points PAR L'APPELANT
// — fraction de CARD_HEIGHT comme tout le reste du badge, jamais une valeur
// fixe : à l'échelle réelle de la carte (~243pt de haut), une icône à taille
// fixe (13pt, valeur trouvée en audit) dépassait le nom de l'étudiant
// (~8pt) — un vrai défaut d'échelle, pas un simple réglage cosmétique.
function PhoneIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Rect x="6" y="1.5" width="8" height="17" rx="2" fill="none" stroke={color} strokeWidth={1.6} />
      <Circle cx="10" cy="15.6" r="0.9" fill={color} />
    </Svg>
  );
}

function EmailIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Rect x="1.5" y="4" width="17" height="12" rx="1.5" fill="none" stroke={color} strokeWidth={1.6} />
      <Path d="M2.5 5.2 L10 11 L17.5 5.2" fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function GlobeIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth={1.5} />
      <Line x1="2" y1="10" x2="18" y2="10" stroke={color} strokeWidth={1.5} />
      <Ellipse cx="10" cy="10" rx="3.4" ry="8" fill="none" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export default function BadgeDocument({
  logoBase64,
  orgName,
  badgeTypeLabel,
  photoBase64,
  fullName,
  roleLabel,
  matricule,
  classOrFunction,
  facultyLabel,
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
  roleLabel: string;
  matricule: string;
  classOrFunction: string;
  /** Faculté — Université uniquement, seulement quand `Program.faculty` existe réellement (jamais inventée pour les 3 autres institutions). */
  facultyLabel?: string;
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

  // `orgName` arrive déjà sous la forme "CCIGA <Institution>" (voir
  // resolveBadgeBranding) — on le sépare pour l'en-tête et pour choisir
  // l'accent institutionnel (INSTITUTION_ACCENTS).
  const institutionLine = orgName.replace(/^CCIGA\s*/i, "").trim() || badgeTypeLabel;
  const accent = accentFor(institutionLine);
  const contactIconSize = CARD_HEIGHT * 0.021;

  // Marge de sécurité (0.84 au lieu de 0.88) : `fitFontSizePt` mesure avec
  // opentype.js (lib/pdf/textFit.ts) alors que react-pdf dessine avec
  // fontkit — un nom extrême ("Jean-Baptiste Emmanuel Christophe
  // Alexandre") est resté légèrement plus large que prévu et a basculé sur
  // 2 lignes malgré le calcul, faisant disparaître le programme sous le
  // panneau fixe du dessous (bug réel trouvé en audit, pas cosmétique).
  // `minSize` abaissé en complément pour que même un nom extrême tienne
  // sur une seule ligne.
  const nameMaxWidth = CARD_WIDTH * 0.84;
  const nameFontSize = fitFontSizePt(fullName, nameMaxWidth, CARD_HEIGHT * 0.031, CARD_HEIGHT * 0.018, true);
  const classFontSize = fitFontSizePt(classOrFunction, nameMaxWidth, CARD_HEIGHT * 0.017, CARD_HEIGHT * 0.0105, true);

  // Verso : grille 2x2 par défaut (Statut/Année/Classe/Matricule). Pour
  // l'Université, Faculté/Programme/Matricule passent en pleine largeur
  // (jamais à 2 colonnes) : un nom de faculté réel ("Faculté des Sciences
  // de la Santé") est trop long pour une demi-largeur — chevauchement réel
  // trouvé en audit visuel sur DEVTEST avec une vraie donnée (moteur PNG),
  // corrigé ici en parité pour les deux moteurs.
  const versoTiles: { label: string; value: string; full?: boolean }[] = facultyLabel
    ? [
        { label: "Statut", value: statusLabel },
        { label: "Année", value: yearLabel },
        { label: "Faculté", value: facultyLabel, full: true },
        { label: "Programme / Filière", value: classOrFunction, full: true },
        { label: "Matricule", value: matricule, full: true },
      ]
    : [
        { label: "Statut", value: statusLabel },
        { label: "Année", value: yearLabel },
        { label: "Classe / Fonction", value: classOrFunction },
        { label: "Matricule", value: matricule },
      ];

  // Une fonction/classe réelle peut être trop longue pour tenir, même au
  // plancher de taille lisible (`minSize`), dans une colonne à mi-largeur
  // ("Coordonnateur Pédagogique Adjoint", "9e Année Fondamentale — Section
  // B" — cas réels du plan de test de cette mission) : réduire encore la
  // police la rendrait illisible, ce qui reviendrait à échanger un défaut
  // (débordement) contre un autre (illisibilité). Dans ce cas précis (et
  // seulement celui-là), "Classe / Fonction" ET "Matricule" passent tous les
  // deux en pleine largeur (même mécanisme déjà utilisé pour Faculté/
  // Programme à l'Université, jamais un nouveau design) — mesuré avec la
  // même police que le rendu réel (`measureTextWidthPt`, fontkit), pas une
  // estimation.
  const valueFitsAtHalfWidth = (value: string) => {
    const maxWidth = VERSO_TILE_HALF_WIDTH * 0.92;
    const size = fitFontSizePt(value, maxWidth, CARD_HEIGHT * 0.0168, CARD_HEIGHT * 0.0105, true);
    return measureTextWidthPt(value, size, true) <= VERSO_TILE_HALF_WIDTH;
  };
  const needsFullWidthPromotion =
    !facultyLabel &&
    versoTiles.some((t) => (t.label === "Classe / Fonction" || t.label === "Matricule") && !valueFitsAtHalfWidth(t.value));
  const versoTilesResolved = needsFullWidthPromotion
    ? versoTiles.map((t) => (t.label === "Classe / Fonction" || t.label === "Matricule" ? { ...t, full: true } : t))
    : versoTiles;

  // Taille de police calculée PAR CASE (pas une taille fixe partagée) :
  // "Classe / Fonction" (libellé fixe) et un matricule réel doivent chacun
  // tenir sur une seule ligne dans leur colonne, qu'elle soit à mi-largeur
  // (grille 2x2) ou pleine largeur (Faculté/Programme Université, ou
  // promotion ci-dessus) — une seule taille pour tous aurait forcé soit un
  // gaspillage d'espace sur les libellés courts, soit un débordement sur les
  // plus longs.
  const versoTilesSized = versoTilesResolved.map((tile) => {
    const maxWidth = (tile.full ? VERSO_TILE_FULL_WIDTH : VERSO_TILE_HALF_WIDTH) * 0.92;
    return {
      ...tile,
      labelSize: fitFontSizePt(tile.label, maxWidth, CARD_HEIGHT * 0.0135, CARD_HEIGHT * 0.0085, false),
      valueSize: fitFontSizePt(tile.value, maxWidth, CARD_HEIGHT * 0.0168, CARD_HEIGHT * 0.0105, true),
    };
  });

  return (
    <Document>
      {/* RECTO */}
      <Page size={[CARD_WIDTH, CARD_HEIGHT]} style={styles.page}>
        <View style={styles.face}>
          <View style={styles.hole} />
          <HeaderBand logoBase64={logoBase64} institutionLine={institutionLine} />

          <View style={[styles.photoBox, { borderColor: accent }]}>
            {photoBase64 ? (
              <Image style={styles.photoImage} src={photoBase64} />
            ) : (
              <Text style={[styles.avatarText, { color: accent }]}>{initials}</Text>
            )}
          </View>

          <View style={styles.identityBlock}>
            <Text style={[styles.studentName, { fontSize: nameFontSize }]} hyphenationCallback={NO_HYPHENATION}>
              {fullName}
            </Text>
            <View style={styles.rolePill}>
              <Text style={styles.rolePillText}>{roleLabel.toUpperCase()}</Text>
            </View>
            <Text style={[styles.classText, { fontSize: classFontSize }]} hyphenationCallback={NO_HYPHENATION}>
              {classOrFunction}
            </Text>
          </View>

          <View style={[styles.rectoBottomPanel, { borderLeftColor: accent }]}>
            <View style={styles.rectoBottomField}>
              <Text style={styles.fieldLabel}>Matricule</Text>
              <Text style={styles.fieldValue} hyphenationCallback={NO_HYPHENATION}>
                {matricule}
              </Text>
            </View>
            <View style={styles.rectoBottomDivider} />
            <View style={styles.rectoBottomField}>
              <Text style={styles.fieldLabel}>Année</Text>
              <Text style={styles.fieldValue} hyphenationCallback={NO_HYPHENATION}>
                {yearLabel}
              </Text>
            </View>
          </View>

          <View style={styles.footerWrap}>
            <FooterWave />
          </View>
        </View>
      </Page>

      {/* VERSO */}
      <Page size={[CARD_WIDTH, CARD_HEIGHT]} style={styles.page}>
        <View style={styles.face}>
          <View style={styles.hole} />
          <HeaderBand logoBase64={logoBase64} institutionLine={institutionLine} />

          <View style={styles.versoBody}>
            <View style={[styles.profilePanel, { borderLeftColor: accent }]}>
              <Text style={styles.profileName}>{fullName}</Text>
              <View style={styles.profileRow}>
                <View style={styles.profileGrid}>
                  {versoTilesSized.map((tile) => (
                    <View key={tile.label} style={tile.full ? styles.profileTileFull : styles.profileTile}>
                      <Text style={[styles.profileTileLabel, { fontSize: tile.labelSize }]} hyphenationCallback={NO_HYPHENATION}>
                        {tile.label}
                      </Text>
                      <Text style={[styles.profileTileValue, { fontSize: tile.valueSize }]} hyphenationCallback={NO_HYPHENATION}>
                        {tile.value}
                      </Text>
                    </View>
                  ))}
                </View>
                {qrDataUri && (
                  <View style={styles.versoQrCell}>
                    <View style={styles.versoQrCard}>
                      <Image style={styles.versoQrImage} src={qrDataUri} />
                    </View>
                    <Text style={styles.versoQrCaption}>Vérification</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.consignesPanel}>
              <Text style={styles.consignesTitle}>Consignes importantes</Text>
              <View style={styles.consigneRow}>
                <View style={[styles.consigneBulletBox, { backgroundColor: accent }]} />
                <Text style={styles.consigneText}>Ce badge est strictement personnel. Il doit être porté en tout temps.</Text>
              </View>
              <View style={styles.consigneRow}>
                <View style={[styles.consigneBulletBox, { backgroundColor: accent }]} />
                <Text style={styles.consigneText}>En cas de perte, informer immédiatement l&apos;administration.</Text>
              </View>
              <View style={styles.consigneRow}>
                <View style={[styles.consigneBulletBox, { backgroundColor: accent }]} />
                <Text style={styles.consigneText}>Toute utilisation frauduleuse est interdite.</Text>
              </View>
            </View>

            <View style={styles.contactPanel}>
              <View style={styles.contactRow}>
                <PhoneIcon color={NAVY} size={contactIconSize} />
                <Text style={styles.contactText}>(+509) 3220-1749 / 3617-9944</Text>
              </View>
              <View style={styles.contactRow}>
                <EmailIcon color={NAVY} size={contactIconSize} />
                <Text style={styles.contactText}>{contactEmail}</Text>
              </View>
              <View style={styles.contactRow}>
                <GlobeIcon color={NAVY} size={contactIconSize} />
                <Text style={styles.contactText}>www.cciga.edu.ht</Text>
              </View>
            </View>
          </View>

          <Text style={styles.versoDisclaimer}>
            N° {badgeNumber} — Émis le {issuedLabel} — scannez le QR pour vérifier.
          </Text>

          <View style={styles.footerWrap}>
            <FooterWave />
          </View>
        </View>
      </Page>
    </Document>
  );
}
