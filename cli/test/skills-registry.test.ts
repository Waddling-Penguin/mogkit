import { test } from "node:test";
import assert from "node:assert/strict";
import {
  listBundledSkills,
  findBundledSkill,
} from "../src/lib/skills-registry.js";

test("listBundledSkills includes all 7 Phase 1 standalone skills", () => {
  const skills = listBundledSkills();
  const names = skills.map((s) => s.name).sort();
  for (const expected of [
    "interview-coach",
    "launch-readiness",
    "metrics-tree",
    "narrative-review",
    "spec-stress-test",
    "stakeholder-map",
    "tradeoff-frame",
  ]) {
    assert.ok(names.includes(expected), `bundled: ${expected}`);
  }
  // All Phase 1 skills are standalone.
  for (const s of skills) {
    if (
      [
        "interview-coach",
        "launch-readiness",
        "metrics-tree",
        "narrative-review",
        "spec-stress-test",
        "stakeholder-map",
        "tradeoff-frame",
      ].includes(s.name)
    ) {
      assert.equal(s.tier, "standalone", `${s.name} tier`);
      assert.ok(s.summary.length > 0);
    }
  }
});

test("findBundledSkill returns null for unknown", () => {
  assert.equal(findBundledSkill("nope-not-a-skill"), null);
});

test("listBundledSkills includes all 6 Phase 3 discovery skills with tier=discovery", () => {
  const skills = listBundledSkills();
  const byName = new Map(skills.map((s) => [s.name, s]));
  for (const name of [
    "graphify",
    "discovery-query",
    "assumption-audit",
    "prd-interrogate",
    "interview-guide",
    "synthesis-map",
  ]) {
    const s = byName.get(name);
    assert.ok(s, `bundled: ${name}`);
    assert.equal(s!.tier, "discovery", `${name} tier`);
    assert.ok(s!.summary.length > 0);
  }
});
