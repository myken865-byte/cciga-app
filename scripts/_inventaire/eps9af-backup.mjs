import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const ROOT = "C:\\Users\\Me. Alcide\\Desktop\\Collection_Potentiel_en_Eveil_12_Manuels";
const SRC = path.join(ROOT, "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER", "EPS", "9AF", "Manuel_EPS_9AF_2026_2027_FINAL.docx");
const BACKUP_DIR = path.join(ROOT, "10_SAUVEGARDE_AVANT_CORRECTIONS", "EPS_9AF");
const TRAVAIL_DIR = path.join(ROOT, "02_ILLUSTRATIONS_COMPLETES_MISE_EN_PAGE_A_FINALISER", "EPS", "9AF");

fs.mkdirSync(BACKUP_DIR, { recursive: true });

const buf = fs.readFileSync(SRC);
const hash = crypto.createHash("sha256").update(buf).digest("hex");
const stat = fs.statSync(SRC);

const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backupName = `Manuel_EPS_9AF_2026_2027_FINAL_BACKUP_${timestamp}.docx`;
const backupPath = path.join(BACKUP_DIR, backupName);
fs.copyFileSync(SRC, backupPath);

const travailPath = path.join(TRAVAIL_DIR, "Potentiel_en_Eveil_EPS_9AF_TRAVAIL_PHASE4.docx");
fs.copyFileSync(SRC, travailPath);

// Verify backup integrity
const backupHash = crypto.createHash("sha256").update(fs.readFileSync(backupPath)).digest("hex");
const travailHash = crypto.createHash("sha256").update(fs.readFileSync(travailPath)).digest("hex");

console.log(JSON.stringify({
  source: SRC,
  sourceHash: hash,
  sourceSize: stat.size,
  sourceDate: stat.mtime.toISOString(),
  backupPath,
  backupHashMatches: backupHash === hash,
  travailPath,
  travailHashMatches: travailHash === hash,
}, null, 2));
