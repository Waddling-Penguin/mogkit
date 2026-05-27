# mogkit

> The PM mogged everyone in the room. He had `mogkit`.

**mogkit** is the open-source toolkit for product managers. It installs PM craft
into your terminal — a library of methodology-backed skills that run in
Claude Code, a thin CLI that scaffolds your workspace, and a growing library of
implementable AI-for-PM workflows.

It won't write your PRD. It'll make you write a better one.

```bash
npx mogkit init my-workspace
cd my-workspace
# open in Claude Code; the skills are already installed
```

- **Site:** [mogkit.dev](https://mogkit.dev) *(once deployed)*
- **License:** MIT
- **Status:** v0.1 — Phase 1–5 shipped (skills + CLI + Discovery engine + site + Workflow Library)

---

## What's inside

```
mogkit/
├─ docs/             — the seven context documents (read these first)
├─ skills/           — the 13 mogkit skills (7 standalone + 6 Discovery engine)
├─ cli/              — the mogkit CLI (TypeScript, ESM, published as `mogkit`)
├─ engine/           — graph schema + sample-corpus + exemplar graph
├─ site/             — astro + tailwind site + Workflow Library (MDX)
└─ scripts/          — schema validators run in CI
```

## The thesis

The strongest product organizations are the ones whose PMs reason and build
with rigor. The gap between a strong product team and a weak one is the gap
between teams that build and teams that just write specs. `mogkit` ships the
literacy that closes that gap.

The tooling is the artifact. The **transformation** is the product.

See [`docs/VISION-AND-PRINCIPLES.md`](docs/VISION-AND-PRINCIPLES.md) for the
non-negotiable rules every skill, command, and page derives from. The single
most important one: **interrogator, not generator**. No skill outputs a
finished deliverable. Skills output reasoning scaffolds — what your evidence
supports, what you're assuming, what to validate.

## Quickstart

**Already comfortable in a terminal?**

```bash
npx mogkit init my-workspace
cd my-workspace
mogkit status      # corpus health report
mogkit doctor      # verify your setup
```

Then open the workspace in [Claude Code](https://claude.com/claude-code) and
run any skill from `.claude/skills/`. Try `tradeoff-frame` against a real
decision you're stuck on, or `spec-stress-test` on a PRD draft.

**New to the terminal?** The [Setup 101 page](https://mogkit.dev/setup) walks
you through every step from opening Terminal to running your first skill.
Genuinely followable from zero.

## The 13 skills

**Tier A — standalone** (paste input, no corpus, no CLI required)

| Skill | Wedge | What it produces |
|---|---|---|
| `metrics-tree` | strategy / planning | top metric + input metrics + instrumentation gaps + "move this first" |
| `spec-stress-test` | planning | severity-ranked attack list against a PRD |
| `narrative-review` | strategy | argument-chain review with steel-manned counter |
| `tradeoff-frame` | conflict / strategy | axes of the real disagreement + reversibility |
| `stakeholder-map` | conflict | positions, incentives, real fault line, unblock conversations |
| `launch-readiness` | gtm | gap list specific to this launch (not a generic checklist) |
| `interview-coach` | discovery | coaches the interviewer from a transcript |

**Tier B — Discovery knowledge engine** (corpus-backed, stateful, Discovery-only)

| Skill | Produces |
|---|---|
| `graphify` | `sources/` → schema-valid `graph.json` with provenance on every claim |
| `discovery-query` | three-part scaffold (findings · gaps · discovery questions) |
| `assumption-audit` | ranked Assumptions + single-source claims, tied to decisions at risk |
| `prd-interrogate` | the interrogation behind your next PRD — never the PRD itself |
| `interview-guide` | guide pointed at the load-bearing gaps in your graph |
| `synthesis-map` | opportunity map (input to an Opportunity Solution Tree) |

Specs in [`skills/`](skills/). Every skill follows [`docs/SKILL-SPEC.md`](docs/SKILL-SPEC.md).

## The Workflow Library

A growing, newest-first collection of implementable AI-for-PM workflows. Each
entry is two things: a copy-paste recipe you can ship today, *and* a "how it
works" explainer that teaches the mechanism. We never ship a black box.

Browse at [/workflows](https://mogkit.dev/workflows) or
[`site/src/content/workflows/`](site/src/content/workflows/). Contribute one
following [`docs/WORKFLOW-FEED-SPEC.md`](docs/WORKFLOW-FEED-SPEC.md).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). The shape is:

- **Ship a skill** — one folder, one `SKILL.md`, follow
  [`docs/SKILL-SPEC.md`](docs/SKILL-SPEC.md). CI validates the format.
- **Ship a workflow** — one `.mdx` under `site/src/content/workflows/`, follow
  [`docs/WORKFLOW-FEED-SPEC.md`](docs/WORKFLOW-FEED-SPEC.md). CI validates the
  shape.
- **Improve a skill or page** — open a PR; the principles in
  `docs/VISION-AND-PRINCIPLES.md` are the bar.

Local dev:

```bash
pnpm install
pnpm run typecheck
pnpm run test         # validates skills + sample graph + workflows; runs CLI tests
pnpm run build        # builds CLI + site
```

## Read next

In order, if you're picking up the project fresh:

1. [`docs/VISION-AND-PRINCIPLES.md`](docs/VISION-AND-PRINCIPLES.md) — the why
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system shape & decisions
3. [`docs/SKILL-SPEC.md`](docs/SKILL-SPEC.md) — how skills are written
4. [`docs/WORKFLOW-FEED-SPEC.md`](docs/WORKFLOW-FEED-SPEC.md) — how workflows are written
5. [`docs/BRAND.md`](docs/BRAND.md) — voice, naming, the bit

---

`mogkit` — discovery-maxxing for product managers. MIT, no SaaS, no login,
no lock-in. Out-craft the room.
