---
name: assumption-audit
tier: discovery
wedge: discovery
level: intermediate
summary: Reads the graph and ranks every claim with single-source or zero-source backing by risk — surfacing what the team would be betting on without evidence, each tied to the decision it would affect. Surfaces risk; does not resolve it.
inputs:
  - graph/graph.json (produced by graphify)
outputs:
  - a ranked list of assumptions and single-source claims, each tagged with the decision at risk; never a resolution
methodology: Continuous Discovery (Torres); riskiest-assumption tests (Lean Startup); evidence-quality grading
---

## Purpose

The most dangerous claims in a PM's research corpus are the ones that
feel obvious. A team sees an entity in the graph, treats it as fact, and
plans against it — never noticing it came from a single ticket, or from
nowhere at all. This skill makes that invisible risk visible.

It returns every `Assumption` node (zero sources) and every node/edge
with only one source of provenance, ranked by *how much the team would
be betting on it*. Each item is tied to the decision it would affect, so
the PM can decide which to validate before committing.

It does NOT resolve the assumptions. It does not say which are likely
true or false. It does not propose tests, mock evidence, or assign
probabilities. Surfacing the risk is the deliverable; deciding what to
do with it is the PM's call.

## Procedure

1. Read `graph/graph.json`. If it does not exist, tell the PM to run
   `graphify` first and stop.
2. Read `meta.health`. **Cold-start branch:** if `health === "thin"`,
   state at the top that on a thin corpus *most* claims will be
   single-source — single-source is the default state, not an anomaly.
   The triage is still useful, but the bar for "this needs validating"
   resets accordingly.
3. Collect items to audit:
   a. Every `Assumption` node (zero provenance) — these are first-class
      risks by definition.
   b. Every node whose `provenance` array has length 1 — single-source
      claims.
   c. Every edge whose `provenance` array has length 1, *if* it
      contributes meaningfully to the graph's structure (e.g.
      `contradicts` edges with a single source, or `blocks` edges
      between major nodes).
4. For each item, infer the **decision at risk** — what product or
   strategy call would change if this claim turned out to be wrong?
   Examples:
   - "Mid-market wants SSO before invites" — affects scope of the
     onboarding admin walkthrough.
   - "Jira import is the cause of churn, not the trigger" — affects
     whether GA-ing the native Jira import alone will move conversion.
   If you cannot identify a specific decision at risk, the item is
   probably not load-bearing — but still list it as "low".
5. Rank items by risk. Three levels:
   - **High** — a major decision (scope of a quarter, a public
     positioning claim, a one-way-door commitment) depends on this
     being true.
   - **Medium** — affects prioritization or framing but is recoverable.
   - **Low** — interesting but not load-bearing.
6. For `Assumption` nodes specifically, copy the `risk` field if
   present, or write one in if missing. The combination of "no
   evidence" + "the decision at risk if wrong" is the entire point.
7. Emit the output contract.

## Output contract

Emit exactly these four sections, in this order.

### Health context
One short paragraph: corpus health, total assumption count, total
single-source claim count, and (on thin corpus) the cold-start note.

### Assumptions (zero provenance)
A ranked list (High → Medium → Low). For each:
- the claim
- the decision at risk if it is wrong
- the source of the assumption (the file where the PM/team stated it
  *without* evidence — usually a memo or PRD intent doc; the schema
  says provenance is empty, but knowing *where the assumption was
  voiced* is still useful — derive from the graph context if possible,
  else state "voiced internally")

### Single-source claims (one provenance entry)
A ranked list (High → Medium → Low). For each:
- the claim
- the decision at risk if it is wrong
- the single source it rests on
- one specific second source that would triangulate it (a segment to
  re-interview, a ticket cohort to read, a data query to run)

### Triage recommendation
Two or three sentences: which Highs deserve the next validation cycle,
in what order, and *why* — drawn from the decisions at risk above.

End with one line: "the team will plan against whatever it does not
question. these are the things to question first."

## Guardrails

- NEVER resolve an assumption. Do not write "this is probably true
  because…" or "this is likely false." The skill exposes risk; the PM
  closes it.
- NEVER invent the decision at risk. If the graph and surrounding
  documents do not let you identify what would change if a claim were
  wrong, label it "low" and say so. Inventing stakes to look thorough
  is worse than honest "low".
- NEVER skip an `Assumption` node because its risk is "obvious." Every
  Assumption gets listed, even the ones the team treats as common
  knowledge — those are often the most dangerous.
- NEVER promote a single-source ticket into a multi-source claim by
  describing the ticket as "users" or "customers." One ticket is one
  user.
- On a thin corpus, do NOT pad the list with every single-source claim
  rated High. Most of the corpus *is* single-source by definition —
  recalibrate the High bar to the *decisions* at stake, not the
  evidence-thinness.
- Do NOT recommend product solutions. "We should ship X to validate Y"
  is out of scope. Validation tactics may be named (a research
  approach, a data check); product decisions are not.
