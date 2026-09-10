import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import NativeBackButtonHandler from "@/components/NativeBackButtonHandler";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CCIGA — Centre Interdisciplinaire des Génies Agrégées",
    template: "%s | CCIGA",
  },
  description:
    "Site officiel du CCIGA : École Classique, École Professionnelle et Université. Découvrez nos programmes et candidatez en ligne.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* strategy="beforeInteractive" (mandat "OPTION C — app-shell offline
        global", correction 2026-09-10) : enregistre le service worker AVANT
        l'hydratation React, pas depuis un composant client (useEffect) —
        dans une app Capacitor, fermer complètement l'app tue son processus
        immédiatement (contrairement à un onglet de navigateur), donc
        attendre le téléchargement + l'hydratation du bundle React avant
        d'enregistrer le worker risquait de ne jamais l'enregistrer du tout
        si l'app était refermée trop vite après l'ouverture. */}
        <Script id="sw-register" strategy="beforeInteractive">
          {"if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').catch(function () {}); }"}
        </Script>
        <NativeBackButtonHandler />
        {children}
      </body>
    </html>
  );
}
