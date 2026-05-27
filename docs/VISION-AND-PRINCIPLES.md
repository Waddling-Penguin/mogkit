# mogkit — Vision & Principles

The grounding document. Every other doc, skill, command, and page derives from this. When a feature request and a principle conflict, the principle wins.

---

## The thesis

`mogkit` is the **on-ramp that takes a PM from "lives in Notion" to "works like an engineer"** — version-controlled artifacts, composable skills, a local knowledge system, terminal fluency, and a habit of building rather than only specifying.

The strongest product organizations are the ones whose PMs reason and build with rigor. The gap between a strong product team and a weak one is the gap between teams that build and teams that just write specs. `mogkit` ships the literacy that closes that gap.

The tooling is the *artifact*. The *transformation* is the product. We are not building "PM tools." We are building the path, and making each step on it non-scary enough that a PM takes the next one.

## Who it is for

PMs who are willing to level up. Not "non-technical PMs we must keep non-technical" — PMs at the *start* of a path. The site's job is to make step one easy and make every step after it earn the next. We do not apologize for the terminal; we make it approachable.

## What it consists of

1. **A skills library** — methodology-backed PM skills that run inside Claude Code.
2. **A CLI** (`mogkit`) — a thin scaffolder and corpus manager.
3. **A site** — an ed-tech directory of the five PM wedges, plus a **Workflow Library** of implementable AI-for-PM workflows.

The five wedges: **Discovery · Strategy · Planning & Roadmapping · GTM & Launch · Stakeholder & Conflict.**

---

## The non-negotiable principles

### 1. Interrogator, not generator
No skill outputs a finished deliverable. Skills output **reasoning scaffolds**: grounded findings (or a red-team) + explicit gaps + the questions or actions that close them. When a PM asks for "the PRD," the tool produces the interrogation — what the evidence supports, what is an untested assumption, who hasn't been talked to — and the PM writes the PRD. A tool that auto-generates the artifact lets the PM skip synthesis, destroying the exact muscle the product claims to build. This is the most important principle. Violating it kills the project's reason to exist.

### 2. Provenance or it doesn't exist
*(Discovery knowledge engine)* Every claim the knowledge layer makes traces to a specific source quote. A claim with no source backing is labeled an **Assumption**, never a fact. Assumptions are first-class objects in the graph.

### 3. Cold-start honesty
*(Discovery knowledge engine)* Most users start — and many stay — with a thin corpus. With a thin corpus the tools say so loudly and pivot to "here is what you'd need to collect." Never fabricate a rich graph from five documents. The thin-corpus state is the *primary* state; design for it first.

### 4. One deep system, many sharp tools
There is exactly **one** stateful, multi-step, corpus-backed system: the Discovery knowledge engine. It is Discovery-only and it is deep. Everything else is a **standalone skill** — a sharp, single-shot utility that needs nothing but Claude Code and a pasted input. Standalone skills may span all five wedges *because they do not pretend to be deep systems*. Never build a fake knowledge engine for a shallow wedge. Breadth comes from sharp tools, not from shallow imitations of the deep one.

### 5. The CLI is thin; the intelligence is in skills
The CLI scaffolds, ingests sources, reports corpus health, and installs skills. All LLM reasoning happens inside the user's Claude Code via skills. The CLI never needs an API key and never calls a model.

### 6. Teach the habit through structure
The workspace is git-initialized. The corpus is a versioned asset that visibly grows. The folder structure itself is pedagogy — it teaches the PM to treat research as a compounding asset.

### 7. Every recipe teaches its mechanism
*(Workflow Library)* Every workflow entry has two tiers: a copy-paste **implement it** path, and a **how it works** explainer that teaches the mechanism. A PM can ship the workflow today *or* understand it well enough to build their own variant. We never ship a black box. This is principle 1 applied to the Library.

### 8. Portable, contributable formats
Skills are plain markdown following a documented spec. Workflow entries are MDX following a documented spec. Claude Code is the v1 target, but no format hard-couples to it. The community is the moat — the formats must be easy to contribute to.

---

## What success looks like

A PM finds the site, picks their problem, follows a visual setup walkthrough, installs Claude Code and `mogkit`, and within an hour has run a skill that made their thinking sharper — not just their output faster. They come back, contribute a skill or a workflow, and the library compounds. Six months in, the PM works in a way their past self would not recognize.

## What failure looks like

A polished site fronting generic tools. A skill that writes the PRD. A knowledge graph confidently built on five documents. A Workflow Library that is a link dump. A CLI that needs an API key and a debugging session before it runs. Any of these and we have built an AI-average product. Generic is the failure mode.
