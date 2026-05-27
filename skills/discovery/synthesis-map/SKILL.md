---
name: synthesis-map
tier: discovery
wedge: discovery
level: advanced
summary: Takes a fresh batch of interviews and turns them into an opportunity map — the input to an Opportunity Solution Tree. Maps opportunities (the underlying jobs and pains that would move outcomes), not solutions; keeps provenance on every opportunity.
inputs:
  - graph/graph.json (the current graph, for context and de-duplication)
  - a fresh batch of interview files in sources/ that have not yet been synthesized (typically newly added since the last graphify run)
outputs:
  - an opportunity map structured as input to an Opportunity Solution Tree (a desired outcome, then opportunities under it, each with provenance); never a solution list, feature backlog, or roadmap
methodology: Continuous Discovery — Opportunity Solution Tree (Torres); JTBD synthesis; provenance-anchored thematic clustering
---

## Purpose

After a round of discovery interviews, the temptation is to leap straight
to solutions: "we should build X, Y, Z." That move skips the synthesis
step — clustering what users were trying to *do* and what was getting in
their way — and the resulting backlog ends up being a list of solutions
to vaguely-articulated problems. The strongest product organizations
synthesize *opportunities* first, then map solutions under each.

This skill produces the opportunity layer. It clusters the interviews
into the underlying jobs and pains that, if addressed, would move the
named outcome — each cluster traceable to specific quotes in specific
interviews. The PM then decides which opportunities to pursue and what
solutions to consider under each.

It does NOT produce solutions, features, recommendations, prioritization,
or any version of "and here's what to build." That step happens in a
separate working session, with the PM and the team.

## Procedure

1. Read `graph/graph.json` for context. If it does not exist, treat the
   batch as standalone and note that the synthesis cannot draw on prior
   graph structure.
2. Read `meta.health` (if present). **Cold-start branch:** on a thin
   corpus, even a fresh batch may not be enough to produce a stable
   opportunity map. State this and produce a sparse map honestly — do
   not generate opportunities a single interview hints at as if they
   were established.
3. Identify the **outcome** the synthesis is mapping toward. Sources of
   this:
   - The `Outcome` nodes in the current graph (e.g. trial-to-paid
     conversion, week-1 activation).
   - The strategic memo or PRD intent, if one is in `sources/`.
   - If unclear, ask the PM to name the outcome before proceeding. An
     opportunity map without a target outcome is unmoored.
4. Read every file in the fresh batch (typically the most recently
   added interviews; the PM may list them explicitly). Extract candidate
   **opportunities** — underlying jobs, needs, or pains that, if
   addressed, would plausibly move the outcome.
5. Cluster opportunities. Rules:
   - Cluster only when ≥2 sources independently describe the same
     underlying job or pain. A single-source candidate stays as a
     `Single-source opportunity` so its evidentiary thinness is
     visible — do not promote it into a cluster of one.
   - Cluster by the *user's job*, not by the surface mechanic.
     "Importing comments fully", "preserving deal history",
     "keeping audit trail" might cluster as "preserve historical
     context when switching tools."
   - Distinguish opportunities from solutions. "Decide admin
     questions before inviting the team" is an opportunity. "Add a
     four-question setup wizard" is a solution to that opportunity.
     This skill only emits the former.
6. For each cluster, attach **provenance**: 2–4 verbatim quotes drawn
   from the interviews, with file paths. The provenance must include at
   least two distinct source files.
7. For each cluster, note its **plausible link to the outcome** —
   one short sentence on the causal story connecting this opportunity
   to the named outcome. If the link is not plausible, the cluster is
   noise; cut it.
8. Append a `Single-source opportunities` section listing standalone
   candidates with their one source. These are not clusters; they are
   leads for the next round of interviews.
9. Emit the output contract.

## Output contract

Emit exactly these four sections, in this order.

### Outcome
One sentence: the outcome this map is targeted at (drawn from the
graph, the memo, or the PM's stated target). If thin or ambiguous, say
so.

### Opportunities (multi-source clusters)
For each cluster:
- **Label** — one line naming the underlying job or pain.
- **Provenance** — 2–4 verbatim quotes with file paths, drawn from at
  least two distinct interviews.
- **Link to outcome** — one sentence on the causal connection.

Order clusters by how much support they have (most sources first).

### Single-source opportunities
A short list of single-source candidates that did not cluster. For
each: one-line label, the source, and one specific second interview
that would test whether this is a real cluster or a one-off.

### Open contradictions
Any opportunities that conflict with existing graph nodes or with each
other across the batch. Each contradiction stated as a short pair of
positions and the files behind them. Do not resolve.

End with one line: "this is the opportunity layer. pick what to
explore next; the solutions discussion happens with the team."

## Guardrails

- NEVER emit solutions, features, recommendations, prioritization, or
  anything resembling "and here's what to build." If you find yourself
  writing "we could add…" or "the team should ship…", stop. That
  belongs in a different session.
- NEVER cluster on a single source. The whole point of clustering is
  triangulation across sources. A "cluster of one" is a single-source
  opportunity and lives in its own section, where its thinness is
  visible.
- NEVER soften a contradiction. If two interviews say opposite things,
  the contradiction is the finding. Surface it and let the PM decide.
- Every multi-source cluster MUST include verbatim quotes from at
  least two distinct files. If you cannot, demote the cluster to
  single-source.
- Do NOT invent the link to the outcome. If you cannot articulate a
  plausible causal story in one sentence, the cluster does not belong
  on the map.
- On a thin corpus or a small fresh batch, produce a small honest map.
  Padding the opportunity list to seem comprehensive violates principle
  3 and produces a worse downstream solution discussion.
