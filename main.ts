import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry is a single letter A-Z standing for the word behind the day.
// The hidden word itself is never written to the output file.
const ENTRY = "Q";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

if (!/^[A-Z]$/.test(ENTRY)) {
  console.error(`Invalid entry: expected exactly one letter A-Z, got ${JSON.stringify(ENTRY)}`);
  process.exit(1);
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

const roundTrip = readFileSync(OUTPUT_PATH, "utf8");
if (roundTrip !== ENTRY) {
  console.error("Verification failed: file contents do not match the entry byte-for-byte.");
  process.exit(1);
}

console.log(`Entry: ${ENTRY}`);
console.log(`Character count: ${ENTRY.length}`);
console.log(`Wrote ${OUTPUT_PATH}`);
