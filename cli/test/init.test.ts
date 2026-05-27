import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, existsSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scaffoldWorkspace } from "../src/lib/workspace.js";
import { workspacePaths } from "../src/lib/paths.js";

function tmp(): string {
  return mkdtempSync(join(tmpdir(), "mogkit-test-"));
}

test("scaffoldWorkspace creates the expected structure", () => {
  const base = tmp();
  const target = join(base, "ws");
  const result = scaffoldWorkspace(target);

  const p = workspacePaths(target);
  assert.equal(existsSync(p.claudeMd), true, "CLAUDE.md present");
  assert.equal(existsSync(p.gitignore), true, ".gitignore present");
  assert.equal(existsSync(p.sources), true, "sources/ exists");
  assert.equal(existsSync(p.graph), true, "graph/ exists");
  assert.equal(existsSync(p.knowledge), true, "knowledge/ exists");
  assert.equal(existsSync(p.claudeSkills), true, ".claude/skills exists");
  assert.equal(
    existsSync(join(target, ".git")),
    result.gitInitialized,
    "git init reflected in result",
  );

  // CLAUDE.md is the mogkit one
  const claude = readFileSync(p.claudeMd, "utf8");
  assert.match(claude, /mogkit workspace/);
  assert.match(claude, /Interrogator, not generator/);
  assert.match(claude, /provenance/i);

  // All Phase 1 standalone skills + all Phase 3 discovery skills installed
  for (const name of [
    "metrics-tree",
    "spec-stress-test",
    "narrative-review",
    "tradeoff-frame",
    "stakeholder-map",
    "launch-readiness",
    "interview-coach",
    "graphify",
    "discovery-query",
    "assumption-audit",
    "prd-interrogate",
    "interview-guide",
    "synthesis-map",
  ]) {
    assert.equal(
      existsSync(join(p.claudeSkills, name, "SKILL.md")),
      true,
      `skill installed: ${name}`,
    );
  }

  rmSync(base, { recursive: true, force: true });
});

test("scaffoldWorkspace refuses to overwrite a non-empty dir", () => {
  const base = tmp();
  const target = join(base, "existing");
  scaffoldWorkspace(target);
  assert.throws(() => scaffoldWorkspace(target), /already exists/);
  rmSync(base, { recursive: true, force: true });
});
