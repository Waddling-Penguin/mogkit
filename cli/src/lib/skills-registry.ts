import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { findBundledSkillsDir } from "./paths.js";

export type SkillFrontmatter = {
  name: string;
  tier: "standalone" | "discovery";
  wedge: "discovery" | "strategy" | "planning" | "gtm" | "conflict";
  level: "beginner" | "intermediate" | "advanced";
  summary: string;
  methodology?: string;
};

export type Skill = {
  name: string;
  tier: SkillFrontmatter["tier"];
  wedge: SkillFrontmatter["wedge"];
  level: SkillFrontmatter["level"];
  summary: string;
  /** Absolute path to the skill folder (containing SKILL.md). */
  dir: string;
};

function parseFrontmatter(md: string): SkillFrontmatter | null {
  if (!md.startsWith("---\n")) return null;
  const end = md.indexOf("\n---", 4);
  if (end === -1) return null;
  const yamlText = md.slice(4, end);
  const fm: Record<string, string> = {};
  for (const line of yamlText.split("\n")) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!m) continue;
    const [, k, v] = m;
    if (!v) continue;
    // Strip surrounding quotes if present.
    fm[k] = v.replace(/^["']|["']$/g, "").trim();
  }
  if (
    !fm.name ||
    !fm.tier ||
    !fm.wedge ||
    !fm.level ||
    !fm.summary
  )
    return null;
  return fm as unknown as SkillFrontmatter;
}

function scanSkillsTier(tierDir: string, tier: Skill["tier"]): Skill[] {
  if (!existsSync(tierDir)) return [];
  const out: Skill[] = [];
  for (const entry of readdirSync(tierDir)) {
    const sub = join(tierDir, entry);
    if (!statSync(sub).isDirectory()) continue;
    const skillFile = join(sub, "SKILL.md");
    if (!existsSync(skillFile)) continue;
    const md = readFileSync(skillFile, "utf8");
    const fm = parseFrontmatter(md);
    if (!fm) continue;
    if (fm.tier !== tier) continue; // ignore mismatched
    out.push({
      name: fm.name,
      tier: fm.tier,
      wedge: fm.wedge,
      level: fm.level,
      summary: fm.summary,
      dir: sub,
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export function listBundledSkills(): Skill[] {
  const root = findBundledSkillsDir();
  return [
    ...scanSkillsTier(join(root, "standalone"), "standalone"),
    ...scanSkillsTier(join(root, "discovery"), "discovery"),
  ];
}

export function findBundledSkill(name: string): Skill | null {
  return listBundledSkills().find((s) => s.name === name) ?? null;
}

export function isSkillInstalled(
  workspaceClaudeSkills: string,
  name: string,
): boolean {
  return existsSync(join(workspaceClaudeSkills, name, "SKILL.md"));
}

export function listInstalledSkillNames(claudeSkills: string): string[] {
  if (!existsSync(claudeSkills)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(claudeSkills)) {
    if (entry.startsWith("_") || entry.startsWith(".")) continue;
    const skillMd = join(claudeSkills, entry, "SKILL.md");
    if (existsSync(skillMd)) out.push(entry);
  }
  return out.sort();
}
