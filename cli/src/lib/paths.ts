import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { existsSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));

/**
 * Locate the bundled skills directory. The CLI ships with a `skills/`
 * folder at the package root (next to `dist/`). In dev (running from
 * `cli/src`), we fall back to the monorepo `skills/` directory.
 */
export function findBundledSkillsDir(): string {
  const candidates = [
    // published: dist/lib -> ../skills (relative to cli/dist/lib/paths.js)
    resolve(HERE, "..", "..", "skills"),
    // dev (tsx, running src/lib/paths.ts): cli/src/lib -> monorepo/skills
    resolve(HERE, "..", "..", "..", "skills"),
    // last resort: cwd has a skills/ (dev from repo root)
    resolve(process.cwd(), "skills"),
  ];
  for (const c of candidates) {
    if (existsSync(join(c, "SKILL-SPEC.md"))) return c;
  }
  throw new Error(
    "could not locate bundled skills directory. " +
      "expected one of:\n  " +
      candidates.join("\n  "),
  );
}

/**
 * Locate the templates directory (CLAUDE.md, gitignore.tmpl). Same
 * dev/published resolution as skills.
 */
export function findTemplatesDir(): string {
  const candidates = [
    // published: dist/lib -> ./templates (compiled into dist/templates)
    resolve(HERE, "..", "templates"),
    // dev: src/lib -> src/templates
    resolve(HERE, "..", "templates"),
  ];
  for (const c of candidates) {
    if (existsSync(join(c, "CLAUDE.md"))) return c;
  }
  throw new Error("could not locate templates directory");
}

export type WorkspacePaths = {
  root: string;
  claudeMd: string;
  gitignore: string;
  sources: string;
  graph: string;
  knowledge: string;
  claudeSkills: string;
  graphJson: string;
};

export function workspacePaths(root: string): WorkspacePaths {
  return {
    root,
    claudeMd: join(root, "CLAUDE.md"),
    gitignore: join(root, ".gitignore"),
    sources: join(root, "sources"),
    graph: join(root, "graph"),
    knowledge: join(root, "knowledge"),
    claudeSkills: join(root, ".claude", "skills"),
    graphJson: join(root, "graph", "graph.json"),
  };
}

/**
 * Decide whether `dir` looks like a mogkit workspace. The signature is
 * CLAUDE.md + sources/ + .claude/skills/ — present together. Missing any
 * piece is OK for `doctor` to flag.
 */
export function looksLikeWorkspace(dir: string): boolean {
  const p = workspacePaths(dir);
  return existsSync(p.claudeMd) && existsSync(p.sources);
}
