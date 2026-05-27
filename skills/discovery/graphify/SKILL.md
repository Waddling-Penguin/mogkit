---
name: graphify
tier: discovery
wedge: discovery
level: advanced
summary: Reads every file in `sources/` and produces a schema-valid `graph/graph.json` plus a human-readable `graph/graph.md`. Every node and edge carries provenance; unsourced claims become explicit `Assumption` nodes. Rates corpus `health` and says so loudly when it is thin.
inputs:
  - all files in sources/
  - engine/graph-schema.json (the contract the output must satisfy)
outputs:
  - graph/graph.json (schema-valid)
  - graph/graph.md (human-readable summary)
methodology: Continuous Discovery (Torres); evidence-graph traditions adapted for PM corpora; the graph is a *map of what the corpus says*, not a model of the world
---

## Purpose

`graphify` turns a folder of raw research into a structured, evidence-backed
graph the rest of the Discovery skills can interrogate. The graph is a
*map of what the corpus actually says* — it does not extend, summarize, or
infer beyond what the sources support.

It does NOT generate insights. It does not "complete" the picture. It does
not silently fill in plausible-sounding entities. Where the corpus is silent,
the graph is silent (or surfaces the silence as an explicit `Assumption`
node). Where the corpus is thin, the graph says so prominently — the thin
state is the primary state, not a problem to paper over.

## Procedure

1. List every file in `sources/`. Skip `README.md` and any file without a
   readable text extension (`.md`, `.markdown`, `.txt`) — note skipped files
   in `meta.notes`.
2. For each file, read it end to end. Parse the YAML frontmatter for `type`
   (e.g. `interview`, `ticket`, `prd`, `memo`, `research`, `transcript`,
   `note`, `other`). If a file has no `type`, treat it as `untagged` and
   note it in `meta.notes`.
3. Compute `meta`:
   - `generated`: current ISO-8601 timestamp.
   - `sourceCount`: number of files contributing to the graph.
   - `sourceTypes`: unique types observed.
   - `health`: derived per the rule below.
   - `notes`: any skipped files, ambiguities, parse warnings.

   **Health rule:**
   - `thin` if `sourceCount < 8` OR `uniqueTypes < 2` (where untagged
     counts as zero distinct types).
   - `rich` if `sourceCount >= 20` AND `uniqueTypes >= 3`.
   - `developing` otherwise.

4. **Branch on health before extraction:**
   - If health is `thin`: extract entities normally but state prominently
     in `graph.md` that the corpus is thin and the downstream skills will
     gate confidence accordingly. Do *not* invent additional entities to
     pad the graph. A small honest graph is the correct output.
   - If health is `developing` or `rich`: proceed to full extraction.

5. For each source, extract entities into nodes. Allowed node types and the
   evidence they require:
   - **Person** — a specific named or pseudonymous individual mentioned in
     the source (e.g. an interviewee). Evidence: their name plus a quote.
   - **Segment** — a customer/user category the source names (e.g. SMB,
     mid-market, enterprise; or a role like "ops lead"). Evidence: the
     source describes them, even briefly.
   - **Pain** — a specific friction or failure the source describes from
     the user's perspective. Evidence: a quote that describes the friction.
     Generalize lightly across near-duplicate phrasings within a single
     source but never across sources without a separate `supports` edge.
   - **Need** (Jobs-to-be-Done) — what the user is trying to get done.
     Evidence: the source must say or imply this; a `Need` is not a `Pain`
     restated.
   - **Feature** — a product capability the source requests, mentions, or
     describes. Evidence: a quote that names it.
   - **Competitor** — a competing product the source names. Evidence: the
     name and the context.
   - **Insight** — a non-trivial finding the source itself draws, or a
     direct logical consequence of two quotes in the *same* source. Cross-
     source Insights must be a separate `Insight` node justified by edges
     to its supporting nodes.
   - **Quote** — a verbatim quote you want to preserve as a node so other
     edges can attach to it.
   - **Outcome** — a measurable result or metric the source mentions
     (e.g. "trial-to-paid 28% → 19%").
6. For every extracted node, attach **provenance** — at minimum one entry
   `{ source, quote, loc? }`. The `quote` must appear verbatim in the
   source. If you cannot quote, you cannot create the node.
7. Generate `Assumption` nodes for every claim that appears in the corpus
   *without* an evidentiary quote — e.g. the PM's stated hypotheses in a
   PRD intent doc, an exec memo's "we believe…", or any claim the source
   itself flags as untested. `Assumption` nodes:
   - have an EMPTY `provenance` array (this is the schema requirement),
   - SHOULD include a `risk` field naming what is at risk if the assumption
     is wrong,
   - use id prefix `assumption-`.
8. Extract edges. Allowed edge types and when to use them:
   - `experiences` — `(Person|Segment) → (Pain|Need)` — the source shows
     this person/segment experiencing this pain or need.
   - `requests` — `(Person|Segment) → Feature` — they asked for it.
   - `blocks` — `Pain → Outcome` (or `Feature → Outcome`) — this pain or
     missing feature is preventing this outcome.
   - `contradicts` — `Node → Node` — two nodes (or two pieces of evidence)
     directly disagree. Both sides must have provenance.
   - `supports` — `Node → Node` — evidence in source A backs a claim
     extracted from source B. This is how cross-source insights are
     justified.
   - `belongs-to` — `Person → Segment` — assigns a person to a segment.
   - `competes-with` — `Competitor → Feature` (or `Competitor →
     Competitor`) — names a competitive relationship the source describes.
   - `evidences` — `Quote → (Pain|Need|Insight|Outcome)` — promotes a
     specific quote to a piece of evidence for a higher-level node.
   - `assumes` — `(Node) → Assumption` — names a node that depends on a
     specific assumption being true.
9. Every edge gets `provenance` (at least one quote). If you cannot quote
   the edge into existence, do not create it.
10. Assign stable ids. Convention: `<type-prefix>-<slug>` where
    type-prefix is one of `person`, `segment`, `pain`, `need`, `feature`,
    `competitor`, `insight`, `quote`, `outcome`, `assumption`. Lowercase
    kebab-case slugs.
11. Validate the final JSON object against `engine/graph-schema.json`
    mentally before emitting. If a node lacks provenance, either find the
    quote or convert it to an `Assumption`. Do not weaken the schema.
12. Write `graph/graph.json` (formatted JSON).
13. Write `graph/graph.md` — a human-readable summary:
    - one paragraph stating the health, the source count, and the spread
    - per-type node tables (`Segments`, `Pains`, `Needs`, `Features`,
      `Outcomes`, `Competitors`, `Insights`, `Assumptions`) with the label
      and a count of distinct provenance sources
    - a clearly labeled `## Assumptions` section listing every assumption
      and its risk
    - if `health === "thin"`, a prominent banner at the top: "this corpus
      is thin. the graph is necessarily sparse. interrogation against it
      will surface mostly gaps — that is the correct, useful result."
14. Emit the output contract below.

## Output contract

Emit a short report to the PM with exactly these sections.

### Files processed
A short list of files read, files skipped, and any parse warnings.

### Health
The derived health (`thin`/`developing`/`rich`), the source count, and the
unique source types. If thin, state plainly that downstream skills will be
gap-heavy and that this is correct.

### Counts
A small table of node counts by type and edge counts by type.

### Assumptions surfaced
A bulleted list of every `Assumption` node, each with the implied risk if
wrong. If there are zero assumptions, say so explicitly — usually that
means you missed some, not that there were none.

### Next
One line: point the PM at `assumption-audit` (to triage the assumptions)
and `discovery-query` (to interrogate the graph).

End with one line: "the graph is a map of what your corpus says, not a
model of the world. it grows when your sources do."

## Guardrails

- NEVER create a node or edge without a verbatim provenance quote — except
  `Assumption` nodes, whose empty `provenance` array is the schema
  requirement and the entire point. If you cannot quote, the node does
  not exist.
- NEVER infer entities the corpus does not mention. No "the user
  *probably* meant…", no "this likely implies…". If the corpus is silent,
  the graph is silent.
- NEVER soften the `thin` health state to be encouraging. On a thin
  corpus, the banner in `graph.md` is mandatory and the report's "Health"
  section must be loud about it. Thin is not a failure — it is the
  honest starting state for most workspaces.
- NEVER write to any file other than `graph/graph.json` and
  `graph/graph.md`. The PM owns `sources/` and `knowledge/`.
- The output JSON MUST validate against `engine/graph-schema.json`. If
  in doubt, prefer omitting a node over emitting an invalid one.
- Do NOT generalize across sources silently. If source A says "admins are
  blocked on permissions" and source B says "buyers are blocked on
  pricing", those are two `Pain` nodes — combining them into one is a
  cross-source claim that needs an explicit `supports` edge and its own
  provenance reasoning.
- If a source contains an obvious contradiction with another source (e.g.
  one interview says onboarding was painful, another says it was fine),
  emit a `contradicts` edge rather than silently picking a side. The
  contradiction is itself a finding.
