---
name: metrics-tree
tier: standalone
wedge: strategy
level: intermediate
summary: Turns a fuzzy goal into a structured metrics tree — the top metric, its defining equation, the input metrics that compose it, the leading indicators, and the single metric most worth moving first — without inventing a number the PM hasn't measured.
inputs:
  - a fuzzy goal or objective pasted by the PM (e.g. "increase activation", "improve retention", "make checkout faster")
outputs:
  - a metrics tree scaffold with explicit instrumentation gaps and a single "move this first" recommendation; never invented benchmark numbers
methodology: North Star + input metrics (Sean Ellis / Amplitude); Goodhart's Law awareness; leading vs lagging indicators
---

## Purpose

A PM has been handed (or has set) a vague goal: "increase activation", "improve
retention", "grow revenue". Before they can plan against it, they need to know
*what the goal actually measures*, *what inputs move it*, and *what they can
observe sooner than the lagging outcome*. This skill produces that structure.

It does NOT recommend targets, benchmarks, or "industry-standard" numbers. It
will not say "good activation is 30%." Those numbers are situational; inventing
them lets the PM plan against a fake target. The skill maps the *structure* of
the goal and tells the PM what to measure. The PM (or the data team) supplies
the numbers.

## Procedure

1. Read the PM's stated goal. If it is two or more goals stuffed into one
   sentence, split them and ask the PM to pick one before continuing.
2. Define the top metric. State it as a single measurable quantity and write
   its defining equation. If the goal admits more than one plausible top metric
   (e.g. "activation" could be % of signups completing setup, or % reaching
   first value), name them, pick one as the primary, and note the others as
   competing definitions the PM should resolve.
3. Decompose the top metric into its **input metrics** — the multiplicands or
   addends in its equation. Each input must be something instrumentable, not a
   vibe.
4. For each input metric, name 1–2 **leading indicators** — earlier signals
   that predict movement in the input. Leading indicators are observable on a
   shorter time horizon than the input itself.
5. List **instrumentation gaps**: every metric in the tree the PM probably
   cannot measure today without new tracking. Mark each "you must measure this
   before you can act on it."
6. Identify the **single metric most worth moving first**. Justify it in one
   short paragraph: why it has the highest expected leverage on the top metric
   given what the tree shows. If the tree is too thin to support that pick
   honestly, say so and name what would need to be known to choose.
7. Emit the output contract. Do not emit target numbers, benchmarks, or
   comparisons to other companies.

## Output contract

Emit exactly these five sections, in this order.

### Top metric
The single primary metric and its defining equation. If competing definitions
exist, list them and note which the rest of the tree assumes.

### Input metrics
The tree, one level deep. Each input metric shown with the operator that
combines it into the top metric (multiplied, summed, conditioned on, etc.).

### Leading indicators
For each input metric, 1–2 earlier-observable signals that predict its
movement.

### Instrumentation gaps
The metrics in the tree the PM likely cannot measure today. Each one labeled
"you must measure this." No assumed values.

### Move this first
The single metric to pursue first, with one short paragraph of reasoning
grounded in the tree above. If the tree is too thin to support a confident
pick, say so explicitly and name the missing structural information.

## Guardrails

- NEVER state a numeric benchmark, target, or "industry standard." No "good
  activation is X%", no "best-in-class retention is Y." If the PM asks for
  numbers, restate that the tree is structural and the numbers come from their
  own measurement.
- NEVER recommend a metric the PM cannot plausibly instrument. If a metric
  belongs in the tree but is uninstrumentable today, put it in
  "Instrumentation gaps", not in the active tree as if it were live.
- Treat Goodhart explicitly: if the chosen "move this first" metric is highly
  gameable (e.g. "logins per week" as a proxy for engagement), call out the
  failure mode in the reasoning paragraph. Don't recommend a target the team
  could juke without moving the top metric.
- Do not invent input metrics that are not derivable from the stated goal. If
  the goal is genuinely ambiguous about its decomposition, say so under "Top
  metric" rather than committing to a guess.
