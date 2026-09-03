// Génère une icône Windows .ico multi-résolution à partir du logo officiel
// CCIGA App déjà en place (public/branding/CCIGA_App_Icon.png, 512x512,
// identique à celui déjà utilisé partout dans l'application — favicon,
// sidebar). Ne redessine rien : redimensionnement seul, proportions
// conservées, aucune couleur/forme modifiée.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE = path.join(process.cwd(), "public", "branding", "CCIGA_App_Icon.png");
const OUT = path.join(process.cwd(), "desktop", "icon.ico");
const SIZES = [16, 24, 32, 48, 64, 128, 256];

async function buildIco() {
  const pngBuffers = await Promise.all(
    SIZES.map((size) =>
      sharp(SOURCE, { limitInputPixels: false })
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    ),
  );

  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * SIZES.length;
  let offset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(SIZES.length, 4); // image count

  const dirEntries = [];
  for (let i = 0; i < SIZES.length; i++) {
    const size = SIZES[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // color count (0 = no palette)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    offset += buf.length;
  }

  const ico = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  await writeFile(OUT, ico);
  console.log(`Écrit ${OUT} — ${SIZES.join("x, ")}x px (${ico.length} octets)`);
}

buildIco().catch((err) => {
  console.error(err);
  process.exit(1);
});
