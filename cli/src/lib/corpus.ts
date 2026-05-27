import {
  readdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  statSync,
} from "node:fs";
import { join, basename, extname, resolve } from "node:path";
import type { SourceType } from "./source-types.js";

export type SourceFile = {
  /** Absolute path to the file in sources/ */
  path: string;
  /** Just the filename. */
  name: string;
  type: SourceType | "untagged";
  title: string | null;
  addedAt: string | null;
  sizeBytes: number;
};

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n?/;

function parseFrontmatter(text: string): Record<string, string> {
  const m = text.match(FRONTMATTER_RE);
  if (!m) return {};
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    fm[k] = (v ?? "").replace(/^["']|["']$/g, "").trim();
  }
  return fm;
}

const TEXT_EXTS = new Set([".md", ".markdown", ".txt"]);

export function listSources(sourcesDir: string): SourceFile[] {
  if (!existsSync(sourcesDir)) return [];
  const out: SourceFile[] = [];
  for (const entry of readdirSync(sourcesDir)) {
    if (entry === "README.md") continue;
    const full = join(sourcesDir, entry);
    if (!statSync(full).isFile()) continue;
    const sizeBytes = statSync(full).size;
    let type: SourceType | "untagged" = "untagged";
    let title: string | null = null;
    let addedAt: string | null = null;
    if (TEXT_EXTS.has(extname(entry).toLowerCase())) {
      const text = readFileSync(full, "utf8");
      const fm = parseFrontmatter(text);
      if (fm.type) type = fm.type as SourceType;
      if (fm.title) title = fm.title;
      if (fm.addedAt) addedAt = fm.addedAt;
    }
    out.push({ path: full, name: entry, type, title, addedAt, sizeBytes });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Ingest a file: copies into sources/ with a `---` frontmatter prepended (for
 * supported text formats). Returns the new file path. Skips overwrite if a
 * file of the same target name already exists.
 */
export function ingestFile(
  sourcesDir: string,
  srcPath: string,
  opts: { type: SourceType; title?: string },
): string {
  const filename = basename(srcPath);
  const dst = join(sourcesDir, filename);
  if (existsSync(dst)) {
    throw new Error(`${filename} already exists in sources/. rename and retry.`);
  }

  const ext = extname(filename).toLowerCase();
  if (TEXT_EXTS.has(ext)) {
    const original = readFileSync(srcPath, "utf8");
    // Strip an existing frontmatter so we don't double-stack it.
    const body = original.replace(FRONTMATTER_RE, "");
    const fm: string[] = ["---"];
    fm.push(`type: ${opts.type}`);
    if (opts.title) fm.push(`title: ${JSON.stringify(opts.title)}`);
    fm.push(`addedAt: ${new Date().toISOString()}`);
    fm.push("---");
    writeFileSync(dst, fm.join("\n") + "\n\n" + body);
  } else {
    // Non-text: copy as-is. Tagging will live in a sidecar metadata file
    // in a later phase if needed.
    copyFileSync(srcPath, dst);
  }
  return dst;
}
