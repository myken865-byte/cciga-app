import type { NextConfig } from "next";

// Mandat "Android auto-update via Production Web" (2026-09-12) : capturé UNE
// SEULE FOIS, au moment de `next build` — le processus de build a toujours
// accès à VERCEL_URL/VERCEL_GIT_COMMIT_SHA (fournis par la machine de build
// Vercel elle-même), contrairement au runtime de cette fonction déployée où
// ces variables se sont révélées absentes en pratique (vérifié en direct :
// /api/build-info répondait "local-dev" en lisant process.env au runtime).
// En figeant la valeur ici, dans next.config.ts, elle est inlineée dans le
// bundle au build — fiable quel que soit le réglage d'exposition des
// variables système au runtime de ce projet.
const BUILD_ID = process.env.VERCEL_URL || process.env.VERCEL_GIT_COMMIT_SHA || new Date().toISOString();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
  },
  // lib/pdf/fonts.ts loads assets/fonts/*.woff via a runtime-constructed
  // fs path (path.join(process.cwd(), ...)), which Next.js's automatic
  // serverless file tracing cannot follow statically — without this, the
  // fonts are silently missing from every deployed PDF-generating route
  // (ENOENT at render time, in production only, never locally).
  outputFileTracingIncludes: {
    // Same reasoning as assets/fonts/ above — lib/pdf/logo.ts also reads via
    // a runtime-constructed path.join(process.cwd(), ...). Also covers
    // lib/pdf/badgePng.ts, which loads the same font files via opentype.js
    // (pure JS, no wasm/native binary — chosen specifically to avoid the
    // bundling fragility of wasm-based text shapers in this environment).
    "/api/**": ["./assets/fonts/**", "./assets/branding-pdf/**", "./assets/fiches/**"],
  },
};

export default nextConfig;
