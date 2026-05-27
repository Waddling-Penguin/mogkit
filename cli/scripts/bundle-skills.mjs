#!/usr/bin/env node
// Build-time step: copy ../skills into cli/skills so it ships with the package,
// and copy src/templates into dist/templates so the runtime can find them.

import { cpSync, existsSync, rmSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = resolve(HERE, "..");
const MONO_ROOT = resolve(CLI_ROOT, "..");

const srcSkills = join(MONO_ROOT, "skills");
const dstSkills = join(CLI_ROOT, "skills");
const srcTpl = join(CLI_ROOT, "src", "templates");
const dstTpl = join(CLI_ROOT, "dist", "templates");

if (!existsSync(srcSkills)) {
  console.error(`bundle-skills: source not found at ${srcSkills}`);
  process.exit(1);
}

if (existsSync(dstSkills)) rmSync(dstSkills, { recursive: true, force: true });
cpSync(srcSkills, dstSkills, { recursive: true });
console.log(`bundle-skills: copied ${srcSkills} -> ${dstSkills}`);

if (!existsSync(srcTpl)) {
  console.error(`bundle-skills: templates source not found at ${srcTpl}`);
  process.exit(1);
}
mkdirSync(dstTpl, { recursive: true });
cpSync(srcTpl, dstTpl, { recursive: true });
console.log(`bundle-skills: copied ${srcTpl} -> ${dstTpl}`);
