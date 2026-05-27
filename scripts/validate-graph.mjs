#!/usr/bin/env node
// Validates any committed graph JSON against engine/graph-schema.json.
// Targets: engine/sample-graph.json plus any *.graph.json under engine/.
// Exits non-zero if a target is invalid.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SCHEMA = JSON.parse(
  readFileSync(join(ROOT, "engine", "graph-schema.json"), "utf8"),
);

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(SCHEMA);

function collectTargets() {
  const targets = [];
  const exemplar = join(ROOT, "engine", "sample-graph.json");
  if (existsSync(exemplar)) targets.push(exemplar);

  // Any file under engine/ ending in .graph.json
  const engineDir = join(ROOT, "engine");
  if (existsSync(engineDir)) {
    walk(engineDir, (f) => {
      if (f.endsWith(".graph.json") && !targets.includes(f)) targets.push(f);
    });
  }
  return targets;
}

function walk(dir, cb) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

function validateFile(file) {
  let data;
  try {
    data = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    return { ok: false, errors: [`JSON parse error: ${e.message}`] };
  }
  const ok = validate(data);
  if (ok) return { ok: true, errors: [] };
  const errors = (validate.errors ?? []).map((e) => {
    const path = e.instancePath || "(root)";
    return `${path}: ${e.message}${
      e.params ? " " + JSON.stringify(e.params) : ""
    }`;
  });
  return { ok: false, errors };
}

const targets = collectTargets();
if (targets.length === 0) {
  console.log(
    "validate:graph — no graph JSON files found (looked for engine/sample-graph.json and *.graph.json under engine/). nothing to validate.",
  );
  process.exit(0);
}

let failed = 0;
for (const f of targets) {
  const rel = relative(ROOT, f);
  const { ok, errors } = validateFile(f);
  if (ok) {
    console.log(`ok   ${rel}`);
  } else {
    failed++;
    console.log(`FAIL ${rel}`);
    for (const e of errors) console.log(`     - ${e}`);
  }
}
console.log(`\n${targets.length - failed}/${targets.length} graph file(s) valid`);
process.exit(failed === 0 ? 0 : 1);
