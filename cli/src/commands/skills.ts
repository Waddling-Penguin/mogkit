import kleur from "kleur";
import { findWorkspaceRoot } from "../lib/workspace.js";
import { workspacePaths } from "../lib/paths.js";
import {
  listBundledSkills,
  findBundledSkill,
  isSkillInstalled,
} from "../lib/skills-registry.js";
import { installSkillToWorkspace } from "../lib/workspace.js";

export function runSkillsList(): number {
  const root = findWorkspaceRoot();
  const claudeSkills = root ? workspacePaths(root).claudeSkills : null;

  const skills = listBundledSkills();
  if (skills.length === 0) {
    console.log("no bundled skills found.");
    return 1;
  }

  console.log("");
  console.log(kleur.bold("mogkit skills"));
  if (!root) {
    console.log(
      kleur.dim(
        "(not in a workspace — install state unknown. cd into one for install state.)",
      ),
    );
  }
  console.log("");

  const byTier: Record<string, typeof skills> = {};
  for (const s of skills) (byTier[s.tier] ??= []).push(s);

  for (const tier of ["standalone", "discovery"] as const) {
    const ts = byTier[tier];
    if (!ts || ts.length === 0) continue;
    console.log(kleur.bold(`  ${tier}`));
    for (const s of ts) {
      const installed =
        claudeSkills && isSkillInstalled(claudeSkills, s.name);
      const tag = installed
        ? kleur.green("[installed]")
        : claudeSkills
          ? kleur.dim("[available]")
          : kleur.dim("[bundled]");
      console.log(
        `    ${tag}  ${kleur.bold(s.name).padEnd(22)} ${kleur.dim(
          `${s.wedge} · ${s.level}`,
        )}`,
      );
      console.log(`              ${kleur.dim(s.summary)}`);
    }
    console.log("");
  }
  return 0;
}

export function runSkillsAdd(name: string): number {
  const root = findWorkspaceRoot();
  if (!root) {
    console.error(
      kleur.red("no mogkit workspace found here.") +
        " run `mogkit init` first.",
    );
    return 1;
  }
  const paths = workspacePaths(root);
  const skill = findBundledSkill(name);
  if (!skill) {
    console.error(
      kleur.red(`unknown skill: ${name}.`) +
        ` run \`mogkit skills list\` to see what's available.`,
    );
    return 1;
  }
  if (isSkillInstalled(paths.claudeSkills, skill.name)) {
    console.log(
      kleur.dim(`${skill.name} is already installed in .claude/skills/`),
    );
    return 0;
  }
  installSkillToWorkspace(paths.claudeSkills, skill);
  console.log(
    kleur.green("✓") +
      ` installed ${kleur.bold(skill.name)} into .claude/skills/${skill.name}/`,
  );
  return 0;
}
