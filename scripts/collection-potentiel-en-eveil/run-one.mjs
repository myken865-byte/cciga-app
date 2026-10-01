import { brandManual } from "./brand-manual.mjs";

const [, , input, logo, output] = process.argv;
const res = await brandManual(input, logo, { dryRunOutputPath: output });
console.log("OK ->", res.outPath, res.size, "bytes");
