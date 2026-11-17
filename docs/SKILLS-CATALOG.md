# mogkit — Skills Catalog

The complete skill set as of v0.2 (November 2026): **15 standalone (Tier A)** + **6 Discovery engine (Tier B)** = 21 skills. v0.2 added six go-to-market skills and two for AI-era product work. Every skill follows `SKILL-SPEC.md` and obeys `VISION-AND-PRINCIPLES.md`. Every skill is an **interrogator, not a generator** — it produces a reasoning scaffold, never a finished deliverable.

The skill set may be extended over time. The first 13 were the v1 commitment. If a genuinely needed PM skill is missing here, it may be added — but it must (a) fit a tier, (b) follow the spec, (c) obey principle 1, and (d) be sharp and specific, not a generic wrapper.

---

## Tier A — Standalone skills

No corpus, no graph, no CLI. Input is pasted by the PM. Built in Phase 1. Each spans one or more wedges.

### `metrics-tree` · Strategy, Planning · intermediate
- **Input:** a fuzzy goal or objective ("increase activation").
- **Output:** the top metric and its defining equation; the input metrics that compose it; the leading indicators; the instrumentation/data gaps; and the single metric most worth moving first, with the reasoning.
- **Hard rule:** never invents benchmark numbers. Every quantity is marked "you must measure this." Maps the structure, not the targets.

### `spec-stress-test` · Planning, Discovery · intermediate
- **Input:** a PRD, spec, or feature doc.
- **Output:** a red-team — edge cases, failure modes, race conditions between requirements, unstated assumptions, and "what does the user see when this fails." Ranked by severity.
- **Hard rule:** does not rewrite the spec. Produces the attack list; the PM fixes it.

### `narrative-review` · Strategy · advanced
- **Input:** a strategy doc, six-pager, or memo.
- **Output:** a skeptical exec review — logic gaps, hand-waves, claims presented as facts, the strongest counterargument, and what a smart skeptic attacks first.
- **Hard rule:** reviews, does not rewrite. The author keeps authorship.

### `tradeoff-frame` · Conflict, Strategy · intermediate
- **Input:** a contested decision and its candidate options.
- **Output:** an explicit tradeoff frame — the real axes of disagreement; what each option optimizes versus sacrifices; reversibility (one-way vs two-way door); and the evidence that would actually decide it.
- **Hard rule:** does not pick the answer. Frames the decision so humans can decide well.

### `stakeholder-map` · Conflict · intermediate
- **Input:** a decision and the people/teams involved.
- **Output:** a map — each stakeholder's stated position; their likely underlying incentive; where the *real* disagreement sits (often not the surface one); and the minimum set of conversations to unblock.
- **Hard rule:** names dynamics and incentives; never scripts manipulation or persuasion tactics.

### `launch-readiness` · GTM · intermediate
- **Input:** a launch description.
- **Output:** an interrogation — what is unowned; the rollback plan; comms/enablement gaps; what breaks if adoption is 10x or 0.1x of expectation; and explicit kill criteria.
- **Hard rule:** produces the gap list specific to *this* launch; never a generic checklist.

### `interview-coach` · Discovery · beginner
- **Input:** a transcript of a discovery interview the PM just ran.
- **Output:** a coaching review — where the PM led the witness; where they accepted an answer without a follow-up; where they pitched instead of listened; the highest-value follow-up questions they missed.
- **Hard rule:** coaches the *interviewer*. Teaches the craft; does not merely summarize the interview content.

### `positioning-check` · GTM · intermediate
- **Input:** a positioning draft, homepage copy, or pitch, plus any customer evidence.
- **Output:** a check of the five Dunford components (competitive alternatives, unique attributes, value, best-fit customers, market category), each marked evidence-backed, opinion, or missing; the weakest link; the conversations that would settle it.
- **Hard rule:** never writes or rewrites the positioning statement, tagline, or copy.

### `icp-sharpen` · GTM · intermediate
- **Input:** an ideal customer profile, plus any won, lost, churned and retained accounts.
- **Output:** attribute-by-attribute evidence with counterexamples and sample sizes; who the profile excludes; the split between the customer you can win now and the later ideal; the data pulls that would test it.
- **Hard rule:** never invents a segment, an account, or a win rate. States the sample size next to every pattern.

### `pricing-pressure-test` · GTM · advanced
- **Input:** a pricing and packaging proposal, plus any usage, cost and willingness-to-pay data.
- **Output:** whether the pricing metric matches the value delivered; whether a customer can predict the bill; the margin for the median account and the heaviest tenth; how customers get around each tier boundary; the evidence gaps.
- **Hard rule:** never recommends a price and never invents a cost or a benchmark.

### `launch-tier` · GTM · beginner
- **Input:** a release description.
- **Output:** a tier on the Scream, Shout, Cheer, Chirp scale with the facts that decide it; what each affected audience needs at that tier; a flag when the team is about to over-launch or under-launch.
- **Hard rule:** sizes the launch; never writes the plan, the changelog, or the announcement. Run it before `launch-readiness`.

### `win-loss-review` · GTM · intermediate
- **Input:** won and lost deal notes, CRM close reasons, or call transcripts.
- **Output:** grouped decision reasons with counts and verbatim quotes; where buyers and sellers disagree; provisional lists of real product gaps and misunderstood capabilities; the buyer interviews worth running.
- **Hard rule:** no reason without a quote. Never writes the battlecard and never ranks the roadmap.

### `agent-readiness` · GTM · intermediate
- **Input:** the product's public pages, plus buyer questions and any AI assistant answers the PM collected.
- **Output:** an audit of the journey an AI agent takes on a buyer's behalf (discover, understand, compare, act, recover); wrong or missing facts; the largest blocker.
- **Hard rule:** never simulates an assistant's answer as evidence, never promises a recommendation, and refuses tactics meant to mislead an assistant.

### `eval-plan` · Planning · advanced
- **Input:** a description of an AI feature and a batch of real traces, annotated by the PM.
- **Output:** named failure modes with counts; per mode, one of fix first, code check, judged check, or leave; the labeling still to do.
- **Hard rule:** never outputs an accuracy score and never groups traces until the PM has annotated at least ten by hand.

### `prototype-brief` · Discovery, Planning · beginner
- **Input:** a feature idea, plus what the PM already knows from customers.
- **Output:** the one riskiest untested assumption; whether a prototype is the right test; what must be real and what can be faked; the pass and kill signals, set before the build.
- **Hard rule:** never writes the build prompt, the prototype, or the spec.

---

## Tier B — Discovery knowledge engine

Corpus-backed, stateful, multi-step. Operate on `sources/` and `graph/graph.json`. Discovery-only. Built in Phase 3. All gate confidence on corpus `health`.

### `graphify`
- **Input:** all files in `sources/`.
- **Output:** schema-valid `graph/graph.json` (entities + relationships, provenance on every node/edge) and a human-readable `graph/graph.md`. Rates corpus health.
- **Hard rule:** every node and edge carries provenance. Unsourced claims become explicit `Assumption` nodes. On a thin corpus, says so loudly.

### `discovery-query`
- **Input:** a question + the graph.
- **Output:** the three-part scaffold — grounded findings (with provenance) · explicit gaps · the discovery questions that would close them.
- **Hard rule:** never answers beyond what sources support. Names every gap.

### `assumption-audit`
- **Input:** the graph.
- **Output:** all claims with single-source or zero-source backing, ranked by risk, each tied to the decision it would affect.
- **Hard rule:** surfaces risk; does not resolve it.

### `prd-interrogate`
- **Input:** a PRD intent + the graph.
- **Output:** the interrogation — what the sources support; what is an untested assumption; who has not been talked to; what to validate before writing.
- **Hard rule:** **never writes the PRD.** Outputs the scaffold; the PM writes the doc. This is the load-bearing skill for principle 1.

### `interview-guide`
- **Input:** the graph (specifically its gaps).
- **Output:** a discovery interview guide targeted at the biggest current gaps in the graph.
- **Hard rule:** questions are non-leading, JTBD-grounded, each tied to a named gap.

### `synthesis-map`
- **Input:** a fresh batch of interviews.
- **Output:** an opportunity map (input to an Opportunity Solution Tree).
- **Hard rule:** maps opportunities, not solutions; keeps provenance.

---

## The Discovery loop

The Tier B skills are not six tools — they are one loop:

```
interview-guide → (collect sources) → graphify → assumption-audit
      ↑                                              ↓
      └──────── prd-interrogate ← discovery-query / synthesis-map
```

Gaps surfaced by `assumption-audit` and `discovery-query` feed the next `interview-guide`, which produces the next sources, which grow the graph. That is continuous discovery encoded as a toolchain. Build the skills so this loop is legible to the PM — the `CLAUDE.md` in the workspace should describe it.
