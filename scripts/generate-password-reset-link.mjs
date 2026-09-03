// One-off script — run this yourself against production when someone is
// locked out and doesn't know their current password (so the self-service
// change-password flow, which requires the current password, can't help).
// Generates a single-use, time-limited reset link. The raw token is shown
// only once here in your terminal and is never stored anywhere — only its
// SHA-256 hash is written to the database, so nobody who can read the
// database (including this script re-run later, or a backup) can recover
// a usable token from it. Never touches roles, email, or any other account.
//
// Usage (from the project root, with your production env loaded):
//   node --env-file=.env.production scripts/generate-password-reset-link.mjs admin@cciga.edu
//
// Optional: change the expiry window (minutes) as a second argument, default 30:
//   node --env-file=.env.production scripts/generate-password-reset-link.mjs admin@cciga.edu 60

import { createClient } from "@libsql/client";
import { randomBytes, createHash } from "crypto";

const email = process.argv[2];
const expiryMinutes = Number(process.argv[3]) || 30;
if (!email) {
  console.error("Usage: node scripts/generate-password-reset-link.mjs <email> [expiry-minutes]");
  process.exit(1);
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Load your .env.production first (--env-file=.env.production).");
  process.exit(1);
}

const siteUrl = process.env.SITE_URL || "https://cciga-app.vercel.app";

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const existing = await client.execute({
  sql: "SELECT id, email, roles FROM User WHERE email = ?",
  args: [email],
});
if (existing.rows.length !== 1) {
  console.error(`Expected exactly 1 match for ${email}, got ${existing.rows.length}. Aborting — nothing changed.`);
  client.close();
  process.exit(1);
}
console.log("Compte cible confirmé :", JSON.stringify(existing.rows[0]));

const token = randomBytes(32).toString("base64url");
const tokenHash = createHash("sha256").update(token).digest("hex");
const expiresAt = new Date(Date.now() + expiryMinutes * 60_000).toISOString();

await client.execute({
  sql: "UPDATE User SET passwordResetTokenHash = ?, passwordResetExpires = ? WHERE email = ?",
  args: [tokenHash, expiresAt, email],
});

console.log(`\nLien de réinitialisation (valable ${expiryMinutes} minutes, usage unique) :`);
console.log(`${siteUrl}/reinitialiser-mot-de-passe/${token}`);
console.log("\nNe partagez ce lien avec personne d'autre. Il ne sera plus jamais affiché.");

client.close();
