// One-off script — run this yourself against production after the Phase 2
// deployment. It promotes your existing admin account to SUPER_ADMIN so you
// can then create/edit Secrétariat and other Administration accounts from
// the UI. Safe to run once; it's a no-op if the account is already
// SUPER_ADMIN, and it never touches any other user or table.
//
// Usage (from the project root, with your production env loaded):
//   node --env-file=.env.production scripts/promote-super-admin.mjs admin@cciga.edu
//
// Or set DATABASE_URL / TURSO_AUTH_TOKEN in your shell first, then:
//   node scripts/promote-super-admin.mjs admin@cciga.edu

import { createClient } from "@libsql/client";

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/promote-super-admin.mjs <email>");
  process.exit(1);
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Load your .env.production first.");
  process.exit(1);
}

const client = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });

const existing = await client.execute({
  sql: "SELECT id, roles FROM User WHERE email = ?",
  args: [email],
});

if (existing.rows.length === 0) {
  console.error(`No user found with email ${email}`);
  process.exit(1);
}

const row = existing.rows[0];
const roles = JSON.parse(row.roles);

if (roles.includes("SUPER_ADMIN")) {
  console.log(`${email} is already SUPER_ADMIN. Nothing to do.`);
  client.close();
  process.exit(0);
}

const updatedRoles = Array.from(new Set([...roles, "SUPER_ADMIN"]));
await client.execute({
  sql: "UPDATE User SET roles = ? WHERE email = ?",
  args: [JSON.stringify(updatedRoles), email],
});

console.log(`Promoted ${email} to SUPER_ADMIN. New roles: ${updatedRoles.join(", ")}`);
client.close();
