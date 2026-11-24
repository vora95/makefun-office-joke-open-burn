// Make the AI Judge Laugh: the Office Joke Open — burn entry.
// Writes one single-line office joke (<=200 chars) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. The joke is a reply-all disaster: one
// wrong click turns a private thought into a company-wide announcement.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "I hit reply-all on a company-wide email, so now 400 strangers know my cat is called Muffin and what I really think of Karen from HR.";

// Validation: 1-200 chars, single line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 200) throw new Error(`length ${ENTRY.length} out of 1-200`);
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${ENTRY.length} chars, sha256 ${sha}, read-back OK`);
