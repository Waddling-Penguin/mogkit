import kleur from "kleur";
import { existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { findWorkspaceRoot, isMogkitClaudeMd } from "../lib/workspace.js";
import { workspacePaths } from "../lib/paths.js";
import { listInstalledSkillNames } from "../lib/skills-registry.js";

type CheckStatus = "ok" | "warn" | "fail";
type Check = { name: string; status: CheckStatus; detail?: string; fix?: string };

function nodeMajor(): number {
  const m = process.versions.node.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function commandExists(cmd: string): boolean {
  try {
    execSync(`command -v ${cmd}`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

export function runDoctor(): number {
  const checks: Check[] = [];

  // Node version
  const nv = nodeMajor();
  checks.push(
    nv >= 20
      ? { name: "node >= 20", status: "ok", detail: `v${process.versions.node}` }
      : {
          name: "node >= 20",
          status: "fail",
          detail: `you have v${process.versions.node}`,
          fix:
            "install Node 20+. recommended: use nvm (https://github.com/nvm-sh/nvm) and run `nvm install 20`.",
        },
  );

  // git
  checks.push(
    commandExists("git")
      ? { name: "git on PATH", status: "ok" }
      : {
          name: "git on PATH",
          status: "fail",
          fix:
            "install git. macOS: `xcode-select --install` (or via brew); Linux: your package manager (e.g. `apt install git`).",
        },
  );

  // claude CLI (optional)
  checks.push(
    commandExists("claude")
      ? { name: "claude CLI on PATH", status: "ok" }
      : {
          name: "claude CLI on PATH",
          status: "warn",
          detail: "optional but recommended",
          fix:
            "install Claude Code from https://claude.com/claude-code so you can run skills against this workspace.",
        },
  );

  // Workspace presence
  const root = findWorkspaceRoot();
  if (!root) {
    checks.push({
      name: "mogkit workspace",
      status: "warn",
      detail: "not in a mogkit workspace",
      fix: "run `mogkit init <name>` to scaffold one, then `cd` into it before re-running `mogkit doctor`.",
    });
    printChecks(checks);
    return summarize(checks);
  }
  checks.push({ name: "mogkit workspace", status: "ok", detail: root });

  const paths = workspacePaths(root);

  // CLAUDE.md
  if (!existsSync(paths.claudeMd)) {
    checks.push({
      name: "CLAUDE.md present",
      status: "fail",
      fix: "this workspace is missing CLAUDE.md. re-scaffold with `mogkit init` in a fresh dir, or copy from another workspace.",
    });
  } else if (!isMogkitClaudeMd(paths.claudeMd)) {
    checks.push({
      name: "CLAUDE.md is mogkit's",
      status: "warn",
      detail: "CLAUDE.md exists but doesn't look like the mogkit template",
      fix: "this workspace has its own CLAUDE.md — that's fine if intentional. otherwise re-init in a fresh dir.",
    });
  } else {
    checks.push({ name: "CLAUDE.md present", status: "ok" });
  }

  // sources/
  checks.push(
    existsSync(paths.sources)
      ? { name: "sources/ exists", status: "ok" }
      : {
          name: "sources/ exists",
          status: "fail",
          fix: "create the directory: `mkdir sources`. mogkit expects raw research to live there.",
        },
  );

  // .claude/skills/
  if (!existsSync(paths.claudeSkills)) {
    checks.push({
      name: ".claude/skills/ exists",
      status: "fail",
      fix: "no skills installed. run `mogkit skills list` and `mogkit skills add <name>`, or re-init.",
    });
  } else {
    const installed = listInstalledSkillNames(paths.claudeSkills);
    checks.push(
      installed.length > 0
        ? {
            name: ".claude/skills/ has skills",
            status: "ok",
            detail: `${installed.length} installed`,
          }
        : {
            name: ".claude/skills/ has skills",
            status: "warn",
            detail: "directory exists but no skills found",
            fix: "run `mogkit skills list` and add what you need with `mogkit skills add <name>`.",
          },
    );
  }

  // git
  checks.push(
    existsSync(join(root, ".git"))
      ? { name: "git initialized", status: "ok" }
      : {
          name: "git initialized",
          status: "warn",
          fix: "run `git init` in the workspace. the corpus is a versioned asset — that's the point.",
        },
  );

  printChecks(checks);
  return summarize(checks);
}

function printChecks(checks: Check[]): void {
  console.log("");
  console.log(kleur.bold("mogkit doctor"));
  console.log("");
  for (const c of checks) {
    const icon =
      c.status === "ok"
        ? kleur.green("✓")
        : c.status === "warn"
          ? kleur.yellow("!")
          : kleur.red("✗");
    const line = `  ${icon} ${c.name}${c.detail ? kleur.dim(" — " + c.detail) : ""}`;
    console.log(line);
    if (c.status !== "ok" && c.fix) {
      console.log(kleur.dim(`      fix: ${c.fix}`));
    }
  }
  console.log("");
}

function summarize(checks: Check[]): number {
  const failed = checks.filter((c) => c.status === "fail").length;
  const warned = checks.filter((c) => c.status === "warn").length;
  if (failed === 0 && warned === 0) {
    console.log(
      "  " +
        kleur.green("✓ everything checks out.") +
        kleur.dim(" you are mogging within acceptable parameters."),
    );
    console.log("");
    return 0;
  }
  if (failed === 0) {
    console.log(
      "  " +
        kleur.yellow(`! ${warned} warning(s)`) +
        kleur.dim(" — not blocking, but worth fixing."),
    );
    console.log("");
    return 0;
  }
  console.log(
    "  " +
      kleur.red(`✗ ${failed} failed`) +
      kleur.dim(`, ${warned} warning(s). fix the failures above, then re-run.`),
  );
  console.log("");
  return 1;
}
