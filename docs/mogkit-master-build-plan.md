# mogkit — Master Build Plan

> **To Claude Code:** You are building an open-source project from scratch. This is one of six context documents. Read them in this order before writing code:
>
> 1. `VISION-AND-PRINCIPLES.md` — the why and the non-negotiable rules
> 2. `ARCHITECTURE.md` — system shape, stack, repo layout, the two-tier skill model
> 3. `mogkit-master-build-plan.md` — **this file**: what to build, in what order
> 4. `SKILLS-CATALOG.md` — every skill to build, both tiers
> 5. `SKILL-SPEC.md` — the format every skill must follow (+ a full worked example)
> 6. `WORKFLOW-FEED-SPEC.md` — the Workflow Library content type (+ two worked examples)
> 7. `BRAND.md` — the verbal brand: name, voice, messaging. Read before Phase 4 (site copy).
>
> Build **phase by phase, in order**. After each phase, stop, run the acceptance checks, summarize, and wait. When a decision is fixed in these docs, do not re-litigate it.

`mogkit` is the project name. The CLI command and npm package use `mogkit` — always lowercase, one word. The repo is published on the maintainer's personal GitHub account (`github.com/<maintainer>/mogkit`), not a separate org. See `BRAND.md` for naming conventions and brand voice.

---

## What is being built

An open-source monorepo (MIT) with three parts:

1. **A skills library** — methodology-backed PM skills that run inside Claude Code. Two tiers: a deep Discovery knowledge engine, and standalone single-shot skills across all five PM wedges. See `SKILLS-CATALOG.md`.
2. **A CLI** — `mogkit`, a thin scaffolder and corpus manager. Sets up a PM workspace, installs skills. Does no LLM work itself.
3. **A site** — a static ed-tech directory plus a **Workflow Library**: a growing, newest-first collection of implementable AI-for-PM workflows (e.g. a Linear automated-QA gate, an Intercom→Mintlify docs agent). Each entry is both a copy-paste recipe and a "how it works" explainer.

The full rationale is in `VISION-AND-PRINCIPLES.md`. Do not start without reading it.

---

## Build phases

Each phase ships a **working increment** — something a PM could actually use. The deep detail for each deliverable lives in the sibling docs; this file is the sequence and the acceptance bar.

### Phase 1 — Foundations + standalone skills

**Goal:** Monorepo scaffolded; the standalone skills shipped. A PM can copy any one into Claude Code and use it today — no CLI, no corpus, no dependencies.

**Deliverables**
- Monorepo scaffold: pnpm workspaces, root `package.json`, `docs/` (these six files), `skills/`, `.github/workflows/ci.yml`.
- `skills/SKILL-SPEC.md` (per `SKILL-SPEC.md` in docs) and `skills/_example/SKILL.md`.
- The **seven standalone skills** — full `SKILL.md` for each, per `SKILLS-CATALOG.md` §Standalone tier: `metrics-tree`, `spec-stress-test`, `narrative-review`, `tradeoff-frame`, `stakeholder-map`, `launch-readiness`, `interview-coach`.

**Acceptance**
- Every skill validates against `SKILL-SPEC.md`.
- Each standalone skill, copied into a fresh Claude Code project, runs against a pasted input and returns its contracted three-part scaffold (findings/red-team · gaps · next actions) — and **never** a finished deliverable.
- CI green: lint, typecheck, skill-format validation.

### Phase 2 — CLI scaffolder + corpus manager

**Goal:** `npx mogkit init` scaffolds a complete, git-initialized PM workspace with skills installed.

**Deliverables**
- The `mogkit` CLI: `init`, `add`, `status`, `skills`, `doctor` (full reference in `ARCHITECTURE.md` §CLI).
- `init` scaffolds `sources/ graph/ knowledge/ CLAUDE.md .gitignore`, runs `git init`, installs skills to `.claude/skills/`.
- The generated `CLAUDE.md` encodes the §Principles so every Claude Code session in the workspace inherits them.
- `add` — interactive `@clack/prompts` flow: ingest files into `sources/`, tag by type.
- `status` — corpus health report. `doctor` — verifies Claude Code setup with plain-language fixes.

**Acceptance**
- `npx mogkit init my-workspace` produces a working git-initialized workspace on macOS + Linux.
- `mogkit add` ingests/tags correctly; `status` reflects it; `doctor` detects a broken setup and explains the fix.
- CLI has zero LLM/API dependencies.

### Phase 3 — Discovery knowledge engine

**Goal:** The graphify → interrogate → feedback loop works end to end against a real corpus.

**Deliverables**
- `engine/graph-schema.json` — JSON Schema for `graph/graph.json` (schema defined in `ARCHITECTURE.md` §Graph).
- `engine/sample-corpus/` — a realistic 6–10 document mixed-type demo corpus.
- The **six corpus skills**, hardened: `graphify`, `discovery-query`, `assumption-audit`, `prd-interrogate`, `interview-guide`, `synthesis-map` (specs in `SKILLS-CATALOG.md` §Discovery engine).

**Acceptance**
- `graphify` on `sample-corpus/` → schema-valid `graph.json`, provenance on every node/edge.
- `assumption-audit` flags single-source and zero-source claims correctly.
- `discovery-query` answers a supported question and correctly refuses an unsupported one, naming the gap.
- On a deliberately thin 3-document corpus, every skill triggers cold-start honesty instead of confident output.
- `prd-interrogate` produces an interrogation scaffold and **never** a PRD.

### Phase 4 — Site + Workflow Library

**Goal:** A static ed-tech directory and a growing Workflow Library.

**Deliverables**
- Astro + Tailwind + Pagefind, deployed to Netlify.
- **Landing page** — pitch is the *transformation*, not the tools.
- **Five wedge pages** — problem framed with taste · level-up path · visual setup walkthrough · skills to install · curated material. Discovery fully built; the other four are problem + material + standalone skills, with an honest "knowledge engine coming" note.
- **Setup 101 page** — terminal basics, Claude Code install, `mogkit` install, with screenshots/GIFs. Followable by someone who has never opened a terminal.
- **Workflow Library** — content-collection-driven, newest-first, filterable by wedge/tool/difficulty, with RSS. Built per `WORKFLOW-FEED-SPEC.md`. (Framed as a Library, not a Feed — see that doc for why.)
- Content lives in `src/content/` collections so non-developers contribute via MDX.

**Acceptance**
- Static build, Netlify deploy, Lighthouse performance ≥ 95.
- All five wedge pages render; Discovery complete; Setup 101 genuinely novice-followable.
- Workflow Library renders, filters, sorts newest-first, RSS valid.

### Phase 5 — Launch readiness

**Goal:** The repo is contributable, documented, seeded, CI-green.

**Deliverables**
- `README.md`, `CONTRIBUTING.md` (links `SKILL-SPEC.md` + `WORKFLOW-FEED-SPEC.md`), MIT `LICENSE`.
- **3–5 seed workflow entries** in the Workflow Library — including the two worked examples from `WORKFLOW-FEED-SPEC.md` (Linear automated-QA, Intercom→Mintlify).
- CI: lint, typecheck, build, test, schema-validate all skills + sample graph + workflow entries.

**Acceptance**
- A new contributor can ship a valid skill *and* a valid workflow entry from the docs alone.
- CI green on a clean clone.

---

## Definition of done (v1)

- Monorepo builds clean; CI green on a fresh clone.
- `npx mogkit init` scaffolds a working workspace (macOS + Linux).
- All 13 skills (7 standalone + 6 corpus) run in Claude Code and respect every principle.
- Discovery knowledge engine: schema-valid graphs, provenance, cold-start honesty.
- Site live: 5 wedge pages, Discovery complete, Setup 101 novice-followable, Workflow Library with 3–5 seeded entries + RSS.
- `SKILL-SPEC.md`, `WORKFLOW-FEED-SPEC.md`, `CONTRIBUTING.md`, `README.md`, MIT `LICENSE` published.

## Out of scope for v1

- Any web app, hosted compute, backend, or accounts. The tooling is fully local; the site is fully static.
- The Discovery knowledge engine (graph/corpus) for any wedge other than Discovery.
- Expert Q&A surfaces. The site links to where real expert content lives; it does not build Q&A.
- Agents other than Claude Code. The skill format stays portable, but only Claude Code is targeted.

---

> **Start with Phase 1.** Scaffold the monorepo, write `SKILL-SPEC.md` into `skills/`, build the seven standalone skills. Stop, run acceptance checks, summarize, wait.
