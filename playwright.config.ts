import { defineConfig } from "@playwright/test";

/**
 * Targets the live, isolated DEV/TEST preview deployment directly — no
 * local dev server involved (this sandbox's Turbopack dev server has a
 * known, unrelated permission limitation). This is the same URL already
 * manually verified via curl throughout this session; these tests
 * automate that same verification as a reusable regression suite.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  // Kept modest: all tests hit the same live shared preview deployment,
  // so high parallelism causes request contention/timeouts, not real bugs.
  workers: 3,
  retries: 1,
  use: {
    baseURL: "https://cciga-app-devtest.vercel.app",
    trace: "retain-on-failure",
  },
});
