import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lib/pdf/fonts.ts loads assets/fonts/*.woff via a runtime-constructed
  // fs path (path.join(process.cwd(), ...)), which Next.js's automatic
  // serverless file tracing cannot follow statically — without this, the
  // fonts are silently missing from every deployed PDF-generating route
  // (ENOENT at render time, in production only, never locally).
  outputFileTracingIncludes: {
    "/api/**": ["./assets/fonts/**"],
  },
};

export default nextConfig;
