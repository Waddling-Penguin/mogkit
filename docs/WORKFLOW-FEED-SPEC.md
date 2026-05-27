# mogkit — Workflow Library Spec

The Workflow Library is a growing, newest-first collection of **implementable AI-for-PM workflows**. Each entry is two things at once: a copy-paste recipe a PM can ship today, and a "how it works" explainer that teaches the mechanism. This file is mirrored into the repo as the authoring reference for `site/src/content/workflows/`.

---

## Library, not feed — a deliberate framing choice

The user's instinct was a "feed." We ship it as a **Workflow Library**, sorted newest-first, with RSS for anyone who wants push. Reason: a "feed" implies freshness, and a static feed that has not updated in two months reads as abandoned — worse than no feed. A "library" is allowed to grow when it grows. Same content, same newest-first surface, same RSS, none of the dead-feed liability. Use "Workflow Library" in all UI copy.

---

## What a workflow entry is

A self-contained guide to building one AI-powered improvement to a PM's working life. Examples: an automated QA gate on Linear issues; an Intercom agent that reads support tickets and proposes Mintlify doc updates; a weekly competitor-change digest; a meeting-notes-to-action-items pipeline.

A good entry is **specific, runnable, and honest about cost and limits**. A bad entry is a vague "use AI to be more productive" essay. Generic is the failure mode here too.

Most entries are **integration recipes** — copy-paste config connecting real tools (Linear, GitHub Actions, Intercom, Mintlify, Claude). Some reference a `mogkit` skill. Only Discovery-wedge entries touch the knowledge engine. Entries declare which, via frontmatter.

---

## File

One entry = one MDX file: `site/src/content/workflows/<slug>.mdx`.

## Frontmatter (required)

```yaml
title: Automated QA gate for Linear issues
slug: linear-automated-qa
published: 2026-05-26          # drives newest-first sort
updated: 2026-05-26
wedge: planning                # discovery | strategy | planning | gtm | conflict
tools: [Linear, GitHub Actions, Claude API]
difficulty: intermediate       # beginner | intermediate | advanced
timeToImplement: 30m
outcome: Every Linear issue gets an automated QA pass against its own acceptance criteria.
relatedSkill: null             # a skill slug, or null
hasCliSetup: false             # true if the entry includes mogkit commands
costNote: Claude API usage, ~cents per issue.
tags: [automation, qa, linear, ci]
```

## Body — required sections in order

1. **The problem** — the specific pain this kills. Two or three sentences.
2. **What you'll build** — the end state, concretely. The PM should be able to picture it.
3. **Prerequisites** — accounts, tools, access, keys. Honest about what's needed.
4. **Build it** — numbered steps. Copy-paste config and commands in fenced blocks. Each step is one action, plain language, no assumed knowledge.
5. **How it works** — the level-up tier. Explains the *mechanism* — the trigger, the data flow, the model's role — so the PM understands it well enough to build a variant. Never skipped. This is principle 7.
6. **Variations & next** — two or three ways to extend or adapt it.
7. **Limits & honesty** — what this does badly, what it costs, where a human must stay in the loop.

CI validates frontmatter and the presence/order of these sections.

---

## Worked example 1 — `linear-automated-qa.mdx`

> Use as both a format reference and seed content.

**The problem.** Acceptance criteria get written in a Linear issue and then nobody checks the finished work against them. QA drifts to "looks fine." Regressions and missed criteria ship.

**What you'll build.** When a pull request linked to a Linear issue opens, a GitHub Action fetches that issue's acceptance criteria, sends the PR diff and the criteria to Claude, and posts a per-criterion pass/flag comment on the PR before review.

**Prerequisites.** A Linear workspace and API key; a GitHub repo with Actions enabled; an Anthropic API key; the team convention that issues carry an `## Acceptance criteria` section.

**Build it.**
1. In Linear, adopt the convention: every issue has an `## Acceptance criteria` section with one checkbox per criterion.
2. Add `LINEAR_API_KEY` and `ANTHROPIC_API_KEY` to the GitHub repo secrets.
3. Add a workflow file at `.github/workflows/qa-gate.yml` triggered on `pull_request: [opened, synchronize]`.
4. In the job: extract the Linear issue ID from the PR branch name or body; call the Linear API for that issue's body; extract the acceptance-criteria block.
5. Get the PR diff via the GitHub API.
6. Call the Claude API once: system prompt instructs it to evaluate the diff against each criterion and return JSON — `{criterion, verdict: pass|flag|unclear, reason}` per item.
7. Post the parsed result as a single PR comment, one line per criterion.

**How it works.** The workflow is a four-stage pipeline: **trigger** (a PR event) → **fetch** (pull the issue's criteria + the diff, the two things needed to judge) → **evaluate** (one model call that grades the diff against each criterion structurally, returning JSON so the result is parseable not prose) → **report** (render the JSON as a comment). The model never blocks the merge — it informs the human reviewer. The acceptance-criteria convention is what makes it work: it gives the model a concrete, per-issue rubric instead of a vague "is this good."

**Variations & next.** Gate on a label (`qa:auto`) instead of every PR. Have it also check that the issue's criteria are themselves testable, and flag vague ones. Cross-post the verdict back to the Linear issue.

**Limits & honesty.** It catches missed and misread criteria; it does not catch what the criteria failed to specify. It costs a few cents per PR. Keep the human reviewer — this is a second pair of eyes, not the only pair.

---

## Worked example 2 — `intercom-to-mintlify-docs.mdx`

**The problem.** Support answers the same questions weekly. The docs lag behind what users actually ask. Nobody owns closing the gap, so it never closes.

**What you'll build.** A scheduled agent that reads recent Intercom conversations, clusters the recurring questions, maps them to your existing Mintlify docs, and opens a pull request on the docs repo with proposed updates plus a gap report. A human reviews and merges.

**Prerequisites.** Intercom with API access; a Mintlify docs repo on GitHub; an Anthropic API key; permission to open PRs on the docs repo.

**Build it.**
1. Add `INTERCOM_API_KEY`, `ANTHROPIC_API_KEY`, and a repo-scoped `GITHUB_TOKEN` to the docs repo secrets.
2. Add a scheduled GitHub Action (`schedule: cron` weekly) at `.github/workflows/docs-from-support.yml`.
3. In the job: call the Intercom API for conversations from the last 7 days; extract the user-question text from each.
4. Read the Mintlify docs tree from the repo (the `mint.json` nav plus the MDX files) so the agent knows what docs already exist.
5. Call the Claude API: instruct it to cluster the questions, match each cluster to an existing doc or mark it a gap, and return JSON — proposed edits to existing docs and a list of missing docs.
6. For proposed edits, write the changes to a new branch; for gaps, append to a `docs-gaps.md` report.
7. Open a pull request with the branch. Title it with the date and the count of clusters addressed.

**How it works.** Four stages: **ingest** (recent conversations — the signal of what users actually struggle with) → **cluster** (collapse hundreds of conversations into a handful of recurring themes) → **map** (the agent is given the current docs structure, so it proposes *edits to real files* and flags real gaps rather than inventing a parallel structure) → **propose** (the output is a PR, never a direct publish). The human-in-the-loop PR is deliberate and non-negotiable: docs are user-facing, and a model proposing changes is useful exactly because a human still approves them.

**Variations & next.** Run it on a `support-escalation` Intercom tag only, for higher-signal input. Have it also flag docs that contradict recent product changes. Post the weekly gap report to a Slack channel.

**Limits & honesty.** It surfaces *what* to document well; the proposed wording still needs an editor. It will sometimes cluster two distinct issues together — the human reviewer catches that. It does not and must not publish docs without review.

---

## Contribution

A new entry is a PR adding one MDX file to `site/src/content/workflows/`. `CONTRIBUTING.md` points here. CI validates the frontmatter and section structure. The bar for merge: specific, runnable, honest about limits, and the "How it works" section genuinely teaches the mechanism.
