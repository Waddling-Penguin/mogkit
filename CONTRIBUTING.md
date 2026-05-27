# Contributing to mogkit

There are two main ways to contribute, and both are designed to be reachable
from the docs alone. If you need the orientation, read
[`docs/VISION-AND-PRINCIPLES.md`](docs/VISION-AND-PRINCIPLES.md) first — every
contribution has to live inside those principles, and the rest of this guide
assumes you've read it.

---

## Ship a skill

Skills are plain markdown. One skill = one folder = one `SKILL.md`.

1. Read [`docs/SKILL-SPEC.md`](docs/SKILL-SPEC.md). The worked example for
   `prd-interrogate` is the gold standard — match its level of rigor.
2. Decide the tier:
   - **Tier A — standalone** under `skills/standalone/<name>/SKILL.md`.
     Single-shot, paste-input, no corpus.
   - **Tier B — Discovery engine** under `skills/discovery/<name>/SKILL.md`.
     Corpus-backed, stateful. **Discovery wedge only.**
3. Write the `SKILL.md` per the spec: required frontmatter (typed),
   then `## Purpose`, `## Procedure`, `## Output contract`, `## Guardrails`,
   in that order.
4. Guardrails are not boilerplate. Write the failure mode specific to your
   skill. A `## Guardrails` section that could be copy-pasted into another
   skill is a sign you haven't pinned what your skill must *not* do.
5. Run `pnpm run validate:skills` locally. CI runs the same check.

**The non-negotiable rule:** no skill writes a finished deliverable. Your
skill outputs a reasoning scaffold — findings or a red-team, explicit gaps,
and the actions/questions that close them. If your skill drafts the PRD,
writes the memo, or scripts the conversation, it doesn't merge.

---

## Ship a Workflow Library entry

Workflows are MDX. One entry = one `.mdx` file.

1. Read [`docs/WORKFLOW-FEED-SPEC.md`](docs/WORKFLOW-FEED-SPEC.md). The two
   worked examples (`linear-automated-qa`, `intercom-to-mintlify-docs`) are
   the bar.
2. Drop your file at `site/src/content/workflows/<slug>.mdx`.
3. Include the required frontmatter (the zod schema enforces it at build
   time) and the **7 required body sections in order**:
   - The problem
   - What you'll build
   - Prerequisites
   - Build it
   - How it works
   - Variations & next
   - Limits & honesty
4. The "How it works" section is principle 7 in practice: every workflow
   teaches its mechanism. A workflow that gives you commands without telling
   you what they do isn't a mogkit workflow.
5. Be specific and honest about cost and limits. "Use AI to be more
   productive" is the failure mode — name the tools, the cost, what it
   does badly.
6. Run `pnpm run validate:workflows` locally. CI runs the same check.

---

## Improve an existing skill or page

Open a PR. The bar:

- The skill or page still respects every principle in
  `docs/VISION-AND-PRINCIPLES.md`.
- The change is described in the PR with a sentence on *why*, not just
  *what*.
- All CI checks pass.

If you're proposing a non-trivial change to a principle or to the
architecture, open an issue first so we can talk about it before you write
code.

---

## Local development

Prereqs: Node 20+, pnpm 9+, git.

```bash
# install all workspace deps
pnpm install

# typecheck across the monorepo (cli + site)
pnpm run typecheck

# run all validators + CLI tests
pnpm run test

# build the CLI and the site
pnpm run build
```

What `pnpm run test` does:

1. `validate:skills` — every `SKILL.md` matches `docs/SKILL-SPEC.md`
2. `validate:graph` — `engine/sample-graph.json` (and any committed
   `*.graph.json`) validates against `engine/graph-schema.json`
3. `validate:workflows` — every `site/src/content/workflows/*.mdx` has the
   required body sections
4. The CLI's node:test suite (workspace scaffolding, corpus, health,
   skills registry)

If any of these fail, the PR doesn't merge.

---

## What we don't ship

- Skills that generate finished deliverables. The principle isn't
  negotiable — see `docs/VISION-AND-PRINCIPLES.md` §1.
- Knowledge engines for wedges other than Discovery. The two-tier model
  is load-bearing.
- Workflow entries that are link-dumps, vague "use AI" essays, or things
  the contributor hasn't actually run.
- Anything that adds a SaaS dependency to the CLI. The CLI is thin; it
  scaffolds and ingests, and never calls a model. All LLM work happens in
  the user's Claude Code session.

---

## Questions

Open a discussion or issue on the repo. If your contribution is a draft and
you'd like feedback before it's polished, mark the PR as a draft and say so.

Welcome.
