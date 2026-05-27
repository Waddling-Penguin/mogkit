#!/usr/bin/env node
// Validates every site/src/content/workflows/*.mdx has the 7 required body
// sections in order per docs/WORKFLOW-FEED-SPEC.md. Frontmatter shape is
// already enforced by Astro's zod schema at build time, so this script only
// checks the prose contract.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WORKFLOWS_DIR = join(ROOT, "site", "src", "content", "workflows");

// Order matters. Each entry can match a heading by exact text or by
// regex when the spec phrasing varies slightly across entries. We
// validate ORDER, not just presence — a workflow with the 7 sections
// shuffled is also broken.
const REQUIRED_SECTIONS = [
  { name: "The problem", re: /^##\s+The problem\b/m },
  { name: "What you'll build", re: /^##\s+What you['’]ll build\b/m },
  { name: "Prerequisites", re: /^##\s+Prerequisites\b/m },
  { name: "Build it", re: /^##\s+Build it\b/m },
  { name: "How it works", re: /^##\s+How it works\b/m },
  { name: "Variations & next", re: /^##\s+Variations\s*&\s*next\b/m },
  { name: "Limits & honesty", re: /^##\s+Limits\s*&\s*honesty\b/m },
];

function stripFrontmatter(md) {
  if (!md.startsWith("---\n")) return md;
  const end = md.indexOf("\n---", 4);
  if (end === -1) return md;
  return md.slice(end + 4).replace(/^\n/, "");
}

function validateFile(file) {
  const errors = [];
  const text = stripFrontmatter(readFileSync(file, "utf8"));

  // For each required section in order, find its position and ensure
  // it comes after the previous one's position.
  let prevIdx = -1;
  for (const { name, re } of REQUIRED_SECTIONS) {
    const m = re.exec(text);
    if (!m) {
      errors.push(`missing section: ${name}`);
      continue;
    }
    const idx = m.index;
    if (idx < prevIdx) {
      errors.push(`section out of order: ${name} (must come after the previous required section)`);
    }
    prevIdx = idx;
  }
  return errors;
}

function listMdx(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => join(dir, f));
}

const files = listMdx(WORKFLOWS_DIR);
if (files.length === 0) {
  console.log(
    "validate:workflows — no workflow MDX files found under site/src/content/workflows/. nothing to validate.",
  );
  process.exit(0);
}

let failed = 0;
for (const f of files) {
  const rel = relative(ROOT, f);
  const errors = validateFile(f);
  if (errors.length === 0) {
    console.log(`ok   ${rel}`);
  } else {
    failed++;
    console.log(`FAIL ${rel}`);
    for (const e of errors) console.log(`     - ${e}`);
  }
}
console.log(`\n${files.length - failed}/${files.length} workflow(s) valid`);
process.exit(failed === 0 ? 0 : 1);
