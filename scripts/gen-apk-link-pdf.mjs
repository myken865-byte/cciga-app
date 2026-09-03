import { renderToFile } from "@react-pdf/renderer";
import { Document, Page, Text, View, Link, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const APK_URL =
  "https://bkhtvsnvgbnxrpyz.public.blob.vercel-storage.com/test-builds/cciga-app-test-v1.1-2-xi6Xiu7Q5R6MP6eMtR0CuQipAEt3Cl.apk";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 11, fontFamily: "Helvetica", color: "#1a1a1a" },
  title: { fontSize: 20, fontWeight: 700, color: "#0f2d52", marginBottom: 4 },
  subtitle: { fontSize: 12, color: "#555", marginBottom: 20 },
  badge: {
    fontSize: 10,
    fontWeight: 700,
    color: "#8a5a00",
    backgroundColor: "#fff3cd",
    padding: 8,
    borderRadius: 4,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: "#0f2d52", marginTop: 18, marginBottom: 6 },
  linkBox: {
    padding: 12,
    backgroundColor: "#eef4ff",
    borderRadius: 4,
    marginBottom: 4,
  },
  link: { fontSize: 11, color: "#0b5fff", textDecoration: "underline" },
  li: { marginBottom: 5, lineHeight: 1.4 },
  portalRow: { marginBottom: 3 },
  footer: { marginTop: 24, fontSize: 9, color: "#888" },
});

const portals = [
  "Super Administrateur",
  "Administration",
  "Secrétariat",
  "Étudiant",
  "Parent",
  "Enseignant",
  "Responsable académique",
  "Conseiller / Psychologue",
];

const doc = React.createElement(
  Document,
  {},
  React.createElement(
    Page,
    { size: "A4", style: styles.page },
    React.createElement(Text, { style: styles.title }, "CCIGA App — Version privée de test"),
    React.createElement(
      Text,
      { style: styles.subtitle },
      "Lien de téléchargement direct pour les testeurs Android",
    ),
    React.createElement(
      Text,
      { style: styles.badge },
      "VERSION PRIVÉE DE TEST — Ceci n'est PAS la version Google Play. Aucune donnée réelle, uniquement des données de démonstration DEV/TEST.",
    ),

    React.createElement(Text, { style: styles.sectionTitle }, "Lien de téléchargement"),
    React.createElement(
      View,
      { style: styles.linkBox },
      React.createElement(Link, { src: APK_URL, style: styles.link }, APK_URL),
    ),

    React.createElement(Text, { style: styles.sectionTitle }, "Installation sur Android"),
    React.createElement(Text, { style: styles.li }, "1. Ouvrez le lien ci-dessus depuis votre téléphone Android — le fichier .apk se télécharge directement."),
    React.createElement(Text, { style: styles.li }, "2. Ouvrez le fichier téléchargé. Android peut afficher un avertissement pour une application installée hors Google Play — c'est normal ; vous pouvez consulter l'avertissement et choisir vous-même de continuer."),
    React.createElement(Text, { style: styles.li }, "3. Ouvrez CCIGA App une fois l'installation terminée."),

    React.createElement(Text, { style: styles.sectionTitle }, "Portails à tester (8)"),
    React.createElement(
      Text,
      { style: styles.li },
      "Depuis l'écran d'accueil de l'app, choisissez un portail et cliquez « Entrer » — aucun compte ni mot de passe requis. Merci de vérifier chacun des 8 portails suivants :",
    ),
    ...portals.map((p, i) =>
      React.createElement(Text, { key: i, style: styles.portalRow }, `   •  ${p}`),
    ),

    React.createElement(Text, { style: styles.sectionTitle }, "Important"),
    React.createElement(Text, { style: styles.li }, "Toutes les données affichées sont des données de démonstration (DEV/TEST) — rien de réel n'est utilisé ni modifié. N'effectuez aucun paiement réel, même si un écran de paiement apparaît."),

    React.createElement(
      Text,
      { style: styles.footer },
      "CCIGA App — document généré automatiquement pour la distribution privée aux testeurs.",
    ),
  ),
);

const outPath = process.argv[2];
await renderToFile(doc, outPath);
console.log("PDF written to", outPath);
