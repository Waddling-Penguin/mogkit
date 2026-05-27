#!/usr/bin/env node
// Build-time step: copy ../skills into cli/skills, src/templates into
// dist/templates, and engine/sample-corpus into cli/sample-corpus so they
// ship with the published package.

import { cpSync, existsSync, rmSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = resolve(HERE, "..");
const MONO_ROOT = resolve(CLI_ROOT, "..");

const copies = [
  { src: join(MONO_ROOT, "skills"), dst: join(CLI_ROOT, "skills"), required: true },
  { src: join(CLI_ROOT, "src", "templates"), dst: join(CLI_ROOT, "dist", "templates"), required: true },
  { src: join(MONO_ROOT, "engine", "sample-corpus"), dst: join(CLI_ROOT, "sample-corpus"), required: true },
];

for (const { src, dst, required } of copies) {
  if (!existsSync(src)) {
    if (required) {
      console.error(`bundle-skills: required source not found at ${src}`);
      process.exit(1);
    }
    continue;
  }
  if (existsSync(dst)) rmSync(dst, { recursive: true, force: true });
  mkdirSync(dirname(dst), { recursive: true });
  cpSync(src, dst, { recursive: true });
  console.log(`bundle-skills: copied ${src} -> ${dst}`);
}
