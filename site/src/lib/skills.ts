import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

// astro build runs from the site/ directory; the monorepo skills/ dir is one
// level up. Using cwd avoids Vite bundling shenanigans with import.meta.url.
const SKILLS_ROOT = resolve(process.cwd(), "..", "skills");

export type SkillMeta = {
  name: string;
  tier: "standalone" | "discovery";
  wedge: "discovery" | "strategy" | "planning" | "gtm" | "conflict";
  level: "beginner" | "intermediate" | "advanced";
  summary: string;
  methodology?: string;
};

function parseFrontmatter(md: string): Record<string, string> | null {
  if (!md.startsWith("---\n")) return null;
  const end = md.indexOf("\n---", 4);
  if (end === -1) return null;
  const out: Record<string, string> = {};
  for (const line of md.slice(4, end).split("\n")) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!m) continue;
    const [, k, v] = m;
    if (v) out[k] = v.replace(/^["']|["']$/g, "").trim();
  }
  return out;
}

function scanTier(dir: string): SkillMeta[] {
  if (!existsSync(dir)) return [];
  const out: SkillMeta[] = [];
  for (const entry of readdirSync(dir)) {
    const sub = join(dir, entry);
    if (!statSync(sub).isDirectory()) continue;
    const f = join(sub, "SKILL.md");
    if (!existsSync(f)) continue;
    const fm = parseFrontmatter(readFileSync(f, "utf8"));
    if (!fm?.name || !fm.tier || !fm.wedge || !fm.level || !fm.summary) continue;
    out.push({
      name: fm.name,
      tier: fm.tier as SkillMeta["tier"],
      wedge: fm.wedge as SkillMeta["wedge"],
      level: fm.level as SkillMeta["level"],
      summary: fm.summary,
      methodology: fm.methodology,
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

let cache: SkillMeta[] | null = null;
export function getAllSkills(): SkillMeta[] {
  if (cache) return cache;
  cache = [
    ...scanTier(join(SKILLS_ROOT, "standalone")),
    ...scanTier(join(SKILLS_ROOT, "discovery")),
  ];
  return cache;
}

export function getSkill(name: string): SkillMeta | null {
  return getAllSkills().find((s) => s.name === name) ?? null;
}
