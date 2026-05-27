#!/usr/bin/env node
// Add the shebang to dist/index.js and chmod it so `bin` works.

import { readFileSync, writeFileSync, chmodSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const bin = resolve(HERE, "..", "dist", "index.js");
if (!existsSync(bin)) {
  console.error(`fix-bin: ${bin} not found`);
  process.exit(1);
}
const src = readFileSync(bin, "utf8");
if (!src.startsWith("#!")) {
  writeFileSync(bin, `#!/usr/bin/env node\n${src}`);
}
chmodSync(bin, 0o755);
console.log(`fix-bin: shebang + chmod applied to ${bin}`);
