import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ht.cciga.app',
  appName: 'CCIGA App',
  webDir: 'public',
  server: {
    // Shell local-first (mandat "OPTION shell local / cold start offline",
    // 2026-09-10) : aucun server.url ici. Sans lui, Capacitor charge
    // nativement https localhost slash en servant webDir (public/)
    // directement depuis l'APK — donc public/index.html — au lieu de
    // dépendre d'une requête réseau comme toute première condition
    // d'affichage. Ce fichier détecte ensuite la connexion et navigue
    // lui-même vers la constante REMOTE_ORIGIN qu'il définit en JS, une fois
    // celle-ci joignable.
    //
    // Séparation DEVTEST / Production (mandat "Correction des 3 blocages
    // Play Store", 2026-09-12) : REMOTE_ORIGIN, dans public/index.html,
    // pointe par défaut vers l'environnement DEVTEST partagé de cette
    // session — c'est la valeur utilisée par tout build de développement
    // (android-debug-apk.yml, web) et jamais modifiée ici. Seul le workflow
    // de build Release destiné au Play Store
    // (.github/workflows/android-release-aab.yml et
    // google-play-internal-test-upload.yml) réécrit cette constante vers la
    // Production officielle (docs/GOOGLE_PLAY.md) dans sa propre copie
    // buildée des assets, juste avant l'empaquetage Gradle — jamais dans ce
    // fichier source, jamais dans public/index.html lui-même.
    //
    // allowNavigation doit lister les DEUX hôtes (DEVTEST et Production) :
    // sans un hôte dans cette liste, Capacitor traite la navigation JS du
    // shell vers cet hôte comme un lien externe et ouvre le navigateur
    // système au lieu de rester dans l'app (voir Bridge.java::launchIntent).
    // Lister les deux ici ne change le comportement d'aucun build : seule la
    // valeur de REMOTE_ORIGIN réellement embarquée décide où l'app navigue.
    allowNavigation: ['cciga-app-devtest.vercel.app', 'cciga-app.vercel.app'],
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
