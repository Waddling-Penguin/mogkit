#!/usr/bin/env node
// Validates every SKILL.md in skills/ against SKILL-SPEC.md.
// Fails the build on any violation.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SKILLS_DIR = join(ROOT, "skills");

const REQUIRED_FRONTMATTER = {
  name: "string",
  tier: ["standalone", "discovery"],
  wedge: ["discovery", "strategy", "planning", "gtm", "conflict"],
  level: ["beginner", "intermediate", "advanced"],
  summary: "string",
  inputs: "array",
  outputs: "array",
  methodology: "string",
};

const REQUIRED_SECTIONS = [
  "## Purpose",
  "## Procedure",
  "## Output contract",
  "## Guardrails",
];

function findSkillFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      out.push(...findSkillFiles(full));
    } else if (entry === "SKILL.md") {
      out.push(full);
    }
  }
  return out;
}

function parseFrontmatter(content, file) {
  const errors = [];
  if (!content.startsWith("---\n")) {
    errors.push("missing opening frontmatter `---`");
    return { fm: null, body: content, errors };
  }
  const end = content.indexOf("\n---", 4);
  if (end === -1) {
    errors.push("missing closing frontmatter `---`");
    return { fm: null, body: content, errors };
  }
  const yamlText = content.slice(4, end);
  const body = content.slice(end + 4).replace(/^\n/, "");
  let fm;
  try {
    fm = yaml.load(yamlText);
  } catch (e) {
    errors.push(`yaml parse error: ${e.message}`);
    return { fm: null, body, errors };
  }
  if (!fm || typeof fm !== "object") {
    errors.push("frontmatter is empty or not an object");
    return { fm: null, body, errors };
  }
  return { fm, body, errors };
}

function validateFrontmatter(fm) {
  const errors = [];
  for (const [key, expected] of Object.entries(REQUIRED_FRONTMATTER)) {
    if (!(key in fm)) {
      errors.push(`missing frontmatter field: ${key}`);
      continue;
    }
    const v = fm[key];
    if (expected === "string") {
      if (typeof v !== "string" || v.trim() === "") {
        errors.push(`frontmatter.${key} must be a non-empty string`);
      }
    } else if (expected === "array") {
      if (!Array.isArray(v) || v.length === 0) {
        errors.push(`frontmatter.${key} must be a non-empty array`);
      }
    } else if (Array.isArray(expected)) {
      if (!expected.includes(v)) {
        errors.push(
          `frontmatter.${key} must be one of [${expected.join(", ")}], got "${v}"`,
        );
      }
    }
  }
  return errors;
}

function validateSections(body) {
  const errors = [];
  let cursor = 0;
  for (const heading of REQUIRED_SECTIONS) {
    const idx = body.indexOf(`\n${heading}`, cursor === 0 ? 0 : cursor - 1);
    const headIdx =
      idx === -1 && cursor === 0 && body.startsWith(heading) ? 0 : idx;
    if (headIdx === -1 && !(cursor === 0 && body.startsWith(heading))) {
      errors.push(`missing section heading (or out of order): ${heading}`);
      return errors;
    }
    cursor = headIdx === -1 ? heading.length : headIdx + heading.length;
  }
  // Guardrails non-empty check
  const gIdx = body.lastIndexOf("## Guardrails");
  if (gIdx !== -1) {
    const rest = body.slice(gIdx + "## Guardrails".length).trim();
    const meaningful = rest.replace(/[\s\-*#>]+/g, "");
    if (meaningful.length < 40) {
      errors.push("## Guardrails section is empty or too short");
    }
  }
  return errors;
}

function validateFile(file) {
  const content = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  const errors = [];
  const { fm, body, errors: fmParseErrors } = parseFrontmatter(content, file);
  errors.push(...fmParseErrors);
  if (fm) {
    errors.push(...validateFrontmatter(fm));
    // name must match folder name
    const folder = file.split("/").slice(-2, -1)[0];
    if (fm.name && fm.name !== folder) {
      errors.push(
        `frontmatter.name "${fm.name}" must equal folder name "${folder}"`,
      );
    }
  }
  if (body) {
    errors.push(...validateSections(body));
  }
  return { file: rel, errors };
}

function main() {
  const files = findSkillFiles(SKILLS_DIR);
  if (files.length === 0) {
    console.error("no SKILL.md files found under skills/");
    process.exit(1);
  }
  let failed = 0;
  for (const f of files) {
    const { file, errors } = validateFile(f);
    if (errors.length === 0) {
      console.log(`ok   ${file}`);
    } else {
      failed++;
      console.log(`FAIL ${file}`);
      for (const e of errors) console.log(`     - ${e}`);
    }
  }
  console.log(`\n${files.length - failed}/${files.length} skills valid`);
  process.exit(failed === 0 ? 0 : 1);
}

main();
