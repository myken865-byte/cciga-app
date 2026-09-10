import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ht.cciga.app',
  appName: 'CCIGA App',
  webDir: 'public',
  server: {
    // Shell local-first (mandat "OPTION shell local / cold start offline",
    // 2026-09-10) : plus de `url` ici. Sans elle, Capacitor charge nativement
    // https://localhost/ en servant webDir (public/) directement depuis
    // l'APK — donc public/index.html — au lieu de dépendre d'une requête
    // réseau vers le serveur distant comme toute première condition
    // d'affichage. Ce fichier détecte ensuite la connexion et navigue lui-même
    // vers REMOTE_ORIGIN (voir public/index.html) quand elle est disponible.
    // Remplace l'ancien `url: 'https://cciga-app-devtest.vercel.app'` — ce
    // changement a été rendu nécessaire par l'échec confirmé du cold start
    // hors-ligne sur Android physique (service worker distant jamais prêt à
    // temps pour la toute première navigation d'un processus WebView frais).
    // allowNavigation est OBLIGATOIRE avec cette architecture : sans lui,
    // Capacitor traite la navigation JS du shell vers cciga-app-devtest
    // comme un lien externe et ouvre le navigateur système au lieu de rester
    // dans l'app (voir Bridge.java::launchIntent).
    allowNavigation: ['cciga-app-devtest.vercel.app'],
    androidScheme: 'https',
    errorPath: 'offline.html',
  },
  android: {
    backgroundColor: '#0f2d52',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: '#0f2d52',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f2d52',
    },
  },
};

export default config;
