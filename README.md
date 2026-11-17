<p align="center">
  <img src="logomark.png" alt="mogkit logomark" width="160" />
</p>

# mogkit

**A free toolkit that makes product managers sharper at the job, using AI
as a tough reviewer. Works with Claude, Codex, Cursor and ChatGPT.**

You paste in something you are working on: a spec, a launch plan, a pricing
idea, a decision your team is stuck on. mogkit reads it and hands back what
a sharp, skeptical colleague would: the gaps, the assumptions you have not
tested, and the questions to answer next.

It does not write the document for you. You write it, and it comes out
better.

- **Site:** [mogkit.com](https://mogkit.com)
- **Cost:** free and open source (MIT). You bring your own AI assistant.
- **Version:** 0.2, updated November 2026

---

## What you get

| | What it is | In plain words |
|---|---|---|
| **21 skills** | Instructions your AI assistant follows | Each one reviews one kind of PM work, such as a spec, a launch, or a price |
| **Workflow Library** | 11 step-by-step guides | Ways to put AI to work on recurring PM chores, each explained so you understand how it works |
| **A workspace** | One folder on your computer | Keeps your research, decisions and the reviews you ran, with history |

## Start in 15 minutes

**Never used a terminal?** Follow [Setup 101](https://mogkit.com/setup). It
goes one step at a time, from opening the Terminal app to running your
first skill.

**Comfortable with a terminal?** You need
[Node.js](https://nodejs.org) and one assistant:
[Claude Code](https://claude.com/claude-code),
[Codex](https://developers.openai.com/codex) or
[Cursor](https://cursor.com). Then:

```bash
npx mogkit init my-workspace
cd my-workspace
claude        # or: codex, or open the folder in Cursor
```

Ask for a skill by name and paste your input:

```
Use the tradeoff-frame skill on this decision:
We are deciding whether to build a Slack integration ourselves or
partner through Zapier. Engineering wants to build. Growth wants to
partner.
```

You get back the real points of disagreement, what each option gives up,
and whether the decision is easy to reverse. mogkit saves a copy in your
workspace under `knowledge/`. In Claude Code and Cursor you can also type
`/tradeoff-frame` as a shortcut.

## Which AI tools does it work with?

| Tool | How | Setup |
|---|---|---|
| Claude Code | Skills install into `.claude/skills/` | Setup 101 |
| Codex (OpenAI) | Skills install into `.agents/skills/` | Setup 101 |
| Cursor | Reads the same `.agents/skills/` folder | Setup 101 |
| ChatGPT, Gemini, any chat app | Press "Copy for ChatGPT or any AI chat" on a skill at [mogkit.com/wedges](https://mogkit.com/wedges), paste it into a chat, then paste your work | None |

`mogkit init` sets up all three coding assistants at once, so you can
switch between them. The six customer-research skills read files in your
workspace, so they need Claude Code, Codex or Cursor. The other fifteen
also work pasted into a chat.

## What can I use it for?

Pick the job in front of you.

### Launching and selling (go-to-market)

| I need to... | Use | You get |
|---|---|---|
| Check our positioning holds up | `positioning-check` | Which claims rest on customer evidence and which are opinion |
| Decide who the product is for | `icp-sharpen` | Who to target now, who to turn away, and the data that would prove it |
| Test a pricing idea, including AI features that cost money per use | `pricing-pressure-test` | Where the price confuses customers or loses money on heavy users |
| Decide how big a launch should be | `launch-tier` | A size for the launch and what each audience needs |
| Find the holes in a launch plan | `launch-readiness` | What nobody owns, what cannot be undone, when to pull the plug |
| Learn why deals are won and lost | `win-loss-review` | Reasons with customer quotes and counts |
| See if AI assistants can find and use our product | `agent-readiness` | Where ChatGPT, Claude and other assistants get stuck or get facts wrong |

### Planning and building

| I need to... | Use | You get |
|---|---|---|
| Find the holes in a spec | `spec-stress-test` | Edge cases and failure modes, ranked by severity |
| Turn a fuzzy goal into numbers | `metrics-tree` | The metrics that move the goal and which to move first |
| Check an AI feature is any good | `eval-plan` | The specific ways it fails, with counts, and what to measure |
| Decide what a prototype should prove | `prototype-brief` | The one assumption to test and the result that kills the idea |

### Strategy and people

| I need to... | Use | You get |
|---|---|---|
| Get a strategy doc ready for executives | `narrative-review` | Logic gaps and the strongest counterargument |
| Unstick a contested decision | `tradeoff-frame` | The real disagreement and how reversible each option is |
| Work out who needs convincing | `stakeholder-map` | Positions, incentives, and the fewest conversations to unblock |

### Customer research (discovery)

| I need to... | Use | You get |
|---|---|---|
| Get better at interviewing | `interview-coach` | Where you led the witness and the follow-ups you missed |
| Build a research library that answers questions | `graphify`, then `discovery-query` | Answers that quote your own interviews, with the gaps named |
| Find what we are assuming without proof | `assumption-audit` | Claims with one source or none, ranked by risk |
| Prepare to write a spec | `prd-interrogate` | What the research supports and what to validate first |
| Plan the next interviews | `interview-guide` | Questions aimed at the biggest gaps |
| Make sense of a batch of interviews | `synthesis-map` | A map of customer opportunities |

The six research skills in the last table work together on a folder of
your own interviews and tickets. Everything else needs only what you
paste in.

## The Workflow Library

Step-by-step guides for putting AI to work on PM chores. Every guide has
the steps to copy and a "How it works" section, so you can adapt it.

Recent entries:

- [Pre-launch bug bash with a browser agent](https://mogkit.com/workflows/browser-agent-bug-bash)
- [Weekly check: what does an AI assistant tell buyers about your product?](https://mogkit.com/workflows/weekly-ai-answer-check)
- [Read 100 traces before you measure anything](https://mogkit.com/workflows/error-analysis-before-evals)
- [A shared product context folder, plus a morning brief](https://mogkit.com/workflows/team-context-repo-morning-brief)
- [Prototype before the spec](https://mogkit.com/workflows/prototype-before-the-spec)
- [Ask your product analytics in plain English](https://mogkit.com/workflows/plain-english-analytics-posthog-mcp)

Browse all of them at [mogkit.com/workflows](https://mogkit.com/workflows).

## Where the skills come from

The best advice on building products is spread across books, newsletters
and podcasts, and the job keeps changing. mogkit turns that published work
into skills you can run on your own work, in one place, so you are never
the person on the team who is behind.

- **People whose methods the skills follow:** Teresa Torres (customer
  discovery), April Dunford (positioning), Marty Cagan (product risk),
  Hamel Husain and Shreya Shankar (AI evals), Elena Verna (growth and AI
  agents as users), Kyle Poyar (pricing), Maja Voje (go-to-market),
  Madhavan Ramanujam (monetization), Rob Fitzpatrick (customer
  interviews), Gary Klein (pre-mortems).
- **Published practice from teams at:** Amazon, Figma, a16z, Appcues,
  HubSpot, Amplitude and the Product Marketing Alliance.

Each skill names its sources in its `methodology` line. Names are listed
to give credit. mogkit is an independent project, and none of these people
or companies are affiliated with it or endorse it.

## Why it will not write the document for you

A tool that writes your spec lets you skip the thinking, and the thinking
is the job. Every mogkit skill returns three things: what your evidence
supports, what you are assuming, and what to do next. You stay the
author.

The full set of rules is in
[`docs/VISION-AND-PRINCIPLES.md`](docs/VISION-AND-PRINCIPLES.md).

## Common questions

**Do I need to code?** No. You type a few commands during setup, and
Setup 101 gives you each one to copy.

**What does it cost?** mogkit is free. You pay for whichever AI assistant
you use. Cursor has a free tier, Codex comes with paid ChatGPT plans, and
Claude Code needs a paid Claude plan.

**Where does my data go?** Your files stay in a folder on your computer.
What you paste into a skill goes to the AI assistant you chose, the same
as any chat with it.
mogkit has no server and no account.

---

## For contributors

```
mogkit/
├─ docs/      the context documents (read these first)
├─ skills/    the 21 skills (15 standalone + 6 for customer research)
├─ cli/       the mogkit command-line tool (TypeScript, published as `mogkit`)
├─ engine/    data format and sample files for the research skills
├─ site/      the website and the Workflow Library (Astro, MDX)
└─ scripts/   format checks that run on every change
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md). In short:

- **Add a skill.** One folder, one `SKILL.md`, following
  [`docs/SKILL-SPEC.md`](docs/SKILL-SPEC.md).
- **Add a workflow.** One `.mdx` file under `site/src/content/workflows/`,
  following [`docs/WORKFLOW-FEED-SPEC.md`](docs/WORKFLOW-FEED-SPEC.md).

Local development:

```bash
pnpm install
pnpm run typecheck
pnpm run test     # checks skills, sample data and workflows, then runs CLI tests
pnpm run build    # builds the CLI and the site
```

### Site design: Voidchrome

The site (`site/`) is built on a single design system called **Voidchrome**:
dark, monolithic, calm. Every visible color is a CSS variable declared in
`site/src/styles/global.css` and re-exposed as Tailwind utilities in
`site/tailwind.config.mjs`. There are no hard-coded colors in components.

**Components.** Four shared primitives carry the system:

- `Eyebrow.astro`: mono, uppercase, mercury. Above every headline.
- `Section.astro`: vertical band with the scroll-fade `.reveal` treatment.
- `Card.astro`: obsidian fill, graphite border, hover lifts toward mercury
  with a top-edge glow (the single-light motif).
- `Button.astro`: `variant="primary"` (silver-sweep highlight, loops slowly
  and sweeps on hover) or `variant="ghost"` (transparent + graphite border).

**Motion.** Slow and weighty. Standard transition 450–600ms with
`cubic-bezier(0.22, 1, 0.36, 1)`. Nothing bounces. Three motion utilities
shipped in `global.css`: `.reveal` (IntersectionObserver-driven scroll
fade), `.lift-in` (page-load stagger), `.silver-sweep` /
`.silver-sweep-ambient` (the chrome button highlight). All gated behind
`prefers-reduced-motion: reduce`.

**The 3D prop.** The chrome surfboard hero is a React Three Fiber island
mounted with `client:only="react"` so the canvas never blocks first paint.
A static `ChromeGlyph` placeholder renders while React hydrates. Procedural
geometry, no GLB download. See `/credits` for the provenance decision.

## Read next

1. [`docs/VISION-AND-PRINCIPLES.md`](docs/VISION-AND-PRINCIPLES.md), the why
2. [`docs/SKILLS-CATALOG.md`](docs/SKILLS-CATALOG.md), every skill in detail
3. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), how the parts fit
4. [`docs/SKILL-SPEC.md`](docs/SKILL-SPEC.md), how skills are written
5. [`docs/WORKFLOW-FEED-SPEC.md`](docs/WORKFLOW-FEED-SPEC.md), how workflows are written
6. [`docs/BRAND.md`](docs/BRAND.md), voice and naming

---

`mogkit`. MIT license, no account, no lock-in. Out-craft the room.
