package ht.cciga.app;

import com.getcapacitor.BridgeActivity;

// Back navigation is intentionally NOT overridden here: the @capacitor/app
// plugin (see NativeBackButtonHandler.tsx) owns the hardware/gesture back
// button via its own OnBackPressedCallback registration, which is what makes
// Android 13+ predictive back work and lets JS decide history vs. exit.
// A custom onBackPressed() override here would intercept the event before
// the plugin ever sees it, silencing its "backButton" JS event entirely.
public class MainActivity extends BridgeActivity {}
