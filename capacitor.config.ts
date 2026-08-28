import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ht.cciga.app',
  appName: 'CCIGA App',
  webDir: 'public',
  server: {
    // TEMPORARY — private test APK build, DEV/TEST bypass preview only.
    // Points at the isolated preprod preview alias, never the real Production URL.
    // Not used for the signed Release AAB — that build uses Production.
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
