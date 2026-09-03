"use client";

import { useEffect } from "react";

/**
 * Lets the @capacitor/app plugin own the Android hardware/gesture back
 * button (see android/.../MainActivity.java for why no native override
 * exists). Web/Vercel preview never loads @capacitor/core natively, so this
 * is a no-op there.
 */
export default function NativeBackButtonHandler() {
  useEffect(() => {
    let removeListener: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform() || cancelled) return;

      const { App } = await import("@capacitor/app");
      const handle = await App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back();
        } else {
          App.exitApp();
        }
      });
      removeListener = () => handle.remove();
    })();

    return () => {
      cancelled = true;
      removeListener?.();
    };
  }, []);

  return null;
}
