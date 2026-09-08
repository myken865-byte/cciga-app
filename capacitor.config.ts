import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ht.cciga.app',
  appName: 'CCIGA App',
  webDir: 'public',
  server: {
    // TEMPORAIRE (mandat "Option 2 confirmée : DEVTEST/PREPROD", 2026-09-08).
    // La valeur normale ici est https://cciga-app.vercel.app (Production) —
    // voir docs/ANDROID_RELEASE_CONFIG.md §9 pour la restauration exacte.
    // Production n'a pas été redéployée depuis un incident antérieur cette
    // session : tant qu'elle sert une interface obsolète, la version testeur
    // Internal Testing pointe explicitement vers PREPROD/devtest (déjà
    // validée) au lieu de Production, pour que les testeurs voient la
    // dernière interface réelle. Le garde-fou CI (android-release-aab.yml,
    // google-play-internal-test-upload.yml) vérifie que l'AAB correspond
    // exactement à CETTE valeur — il ne "laisse pas passer" une URL devtest
    // par erreur, il confirme la cohérence source/artifact.
    // À REVENIR à 'https://cciga-app.vercel.app' dès que Production est
    // remise à jour (redéploiement + migration explicitement autorisés),
    // puis relancer android-release-aab.yml avec un nouveau versionCode.
    url: 'https://cciga-app-devtest.vercel.app',
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
