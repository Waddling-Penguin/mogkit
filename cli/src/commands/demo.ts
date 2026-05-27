import * as p from "@clack/prompts";
import kleur from "kleur";
import { cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { findWorkspaceRoot } from "../lib/workspace.js";
import { workspacePaths } from "../lib/paths.js";

const HERE = dirname(fileURLToPath(import.meta.url));

/**
 * Locate the bundled sample corpus. Same dev/published resolution as the
 * skills bundle. Published: cli/sample-corpus/ (build step copies it in).
 * Dev: ../engine/sample-corpus from the monorepo root.
 */
function findSampleCorpus(): string {
  const candidates = [
    // published: dist/commands -> ../../sample-corpus
    resolve(HERE, "..", "..", "sample-corpus"),
    // dev (tsx, src/commands): cli/src/commands -> ../../../engine/sample-corpus
    resolve(HERE, "..", "..", "..", "engine", "sample-corpus"),
  ];
  for (const c of candidates) {
    if (existsSync(c) && existsSync(join(c, "README.md"))) return c;
  }
  throw new Error("could not locate the bundled sample corpus");
}

export async function runDemo(): Promise<number> {
  const root = findWorkspaceRoot();
  if (!root) {
    console.error(
      kleur.red("no mogkit workspace found here.") +
        " run `mogkit init` first.",
    );
    return 1;
  }
  const paths = workspacePaths(root);

  // Bail if sources/ already has tagged files — we don't want to clobber.
  const existing = readdirSync(paths.sources).filter(
    (f) => f !== "README.md" && statSync(join(paths.sources, f)).isFile(),
  );
  if (existing.length > 0) {
    p.log.warn(
      `sources/ already has ${existing.length} file(s). ` +
        "mogkit demo refuses to overwrite. clear sources/ first or use a fresh workspace.",
    );
    return 1;
  }

  const src = findSampleCorpus();
  const spinner = p.spinner();
  spinner.start("loading sample corpus into sources/");
  for (const entry of readdirSync(src)) {
    cpSync(join(src, entry), join(paths.sources, entry));
  }
  const count = readdirSync(paths.sources).filter(
    (f) => statSync(join(paths.sources, f)).isFile(),
  ).length;
  spinner.stop(kleur.green(`loaded ${count} files into sources/`));

  p.note(
    [
      "the demo corpus is a fictional B2B SaaS PM investigating",
      "onboarding drop-off. 3 interviews · 2 tickets · 1 PRD intent ·",
      "1 strategy memo · 1 competitor research note.",
      "",
      "next:",
      `  ${kleur.cyan("mogkit status")}  — see the corpus health`,
      `  open this folder in Claude Code, then try:`,
      `  ${kleur.cyan("/graphify")}             — build the knowledge graph`,
      `  ${kleur.cyan("/discovery-query")}      — ask a question against it`,
      `  ${kleur.cyan("/prd-interrogate")}      — interrogate a PRD intent`,
    ].join("\n"),
    "sample corpus loaded",
  );
  return 0;
}
