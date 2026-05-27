import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scaffoldWorkspace } from "../src/lib/workspace.js";
import { workspacePaths } from "../src/lib/paths.js";
import { ingestFile, listSources } from "../src/lib/corpus.js";
import { computeHealth } from "../src/lib/health.js";

function tmp(): string {
  return mkdtempSync(join(tmpdir(), "mogkit-test-"));
}

test("ingestFile tags markdown with frontmatter and listSources reads it back", () => {
  const base = tmp();
  const target = join(base, "ws");
  scaffoldWorkspace(target);
  const p = workspacePaths(target);

  const srcPath = join(base, "interview-03.md");
  writeFileSync(srcPath, "## Interview\n\nThey said the onboarding was painful.\n");

  const dst = ingestFile(p.sources, srcPath, {
    type: "interview",
    title: "Validator onboarding interview",
  });

  const written = readFileSync(dst, "utf8");
  assert.match(written, /^---\n/);
  assert.match(written, /type: interview/);
  assert.match(written, /title: "Validator onboarding interview"/);
  assert.match(written, /addedAt: /);

  const sources = listSources(p.sources);
  assert.equal(sources.length, 1);
  assert.equal(sources[0].type, "interview");
  assert.equal(sources[0].title, "Validator onboarding interview");

  rmSync(base, { recursive: true, force: true });
});

test("computeHealth classifies empty / thin / developing / rich", () => {
  // empty
  assert.equal(computeHealth([]).health, "empty");

  // thin: 3 interviews
  const thin = Array.from({ length: 3 }, (_, i) => ({
    path: `/x/${i}`,
    name: `f${i}.md`,
    type: "interview" as const,
    title: null,
    addedAt: null,
    sizeBytes: 1,
  }));
  const tr = computeHealth(thin);
  assert.equal(tr.health, "thin");
  // single type -> gap surfaced
  assert.ok(tr.gaps.some((g) => g.includes("only one source type")));

  // developing: 10 sources across 2 types
  const dev = [
    ...Array.from({ length: 6 }, (_, i) => ({
      path: `/x/${i}`,
      name: `i${i}.md`,
      type: "interview" as const,
      title: null,
      addedAt: null,
      sizeBytes: 1,
    })),
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `/x/t${i}`,
      name: `t${i}.md`,
      type: "ticket" as const,
      title: null,
      addedAt: null,
      sizeBytes: 1,
    })),
  ];
  assert.equal(computeHealth(dev).health, "developing");

  // rich: 22 sources across 3 types
  const rich = [
    ...Array.from({ length: 10 }, (_, i) => ({
      path: `/x/i${i}`,
      name: `i${i}.md`,
      type: "interview" as const,
      title: null,
      addedAt: null,
      sizeBytes: 1,
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      path: `/x/t${i}`,
      name: `t${i}.md`,
      type: "ticket" as const,
      title: null,
      addedAt: null,
      sizeBytes: 1,
    })),
    ...Array.from({ length: 4 }, (_, i) => ({
      path: `/x/m${i}`,
      name: `m${i}.md`,
      type: "memo" as const,
      title: null,
      addedAt: null,
      sizeBytes: 1,
    })),
  ];
  assert.equal(computeHealth(rich).health, "rich");
});

test("computeHealth surfaces no-interviews gap and untagged-files gap", () => {
  const sources = [
    {
      path: "/x/1",
      name: "1.md",
      type: "ticket" as const,
      title: null,
      addedAt: null,
      sizeBytes: 1,
    },
    {
      path: "/x/2",
      name: "2.md",
      type: "untagged" as const,
      title: null,
      addedAt: null,
      sizeBytes: 1,
    },
  ];
  const r = computeHealth(sources);
  assert.ok(r.gaps.some((g) => g.includes("Discovery interviews")));
  assert.ok(r.gaps.some((g) => g.includes("untagged")));
});
