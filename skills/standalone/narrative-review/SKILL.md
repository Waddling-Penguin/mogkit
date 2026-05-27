---
name: narrative-review
tier: standalone
wedge: strategy
level: advanced
summary: Reviews a strategy doc, six-pager, or memo the way a skeptical executive reads it — surfacing logic gaps, hand-waves, claims-as-facts, the strongest counterargument, and what a smart skeptic attacks first. The author keeps authorship.
inputs:
  - a strategy doc, six-pager, memo, or narrative pasted by the PM
outputs:
  - a skeptical-review scaffold with explicit weak points, claims-vs-evidence, and the steel-manned counterargument; never a rewritten narrative
methodology: Working Backwards / Amazon six-pager critique; steel-manning; the Munger inversion ("invert, always invert")
---

## Purpose

A strategy memo's author has the argument fully in their head. Reading their
own draft, they fill the gaps from memory. An exec reading it for the first
time does not have that mental scaffolding — and the *good* execs read with a
question in mind: "where is this weakest?" This skill reads the doc that way.

It surfaces where the narrative leans on hand-waves, where claims are stated
as facts, where the logical chain skips a step, and what the strongest
counterargument is. It explicitly steel-mans the counter-position the doc is
implicitly arguing against.

It does NOT rewrite the narrative. It does not suggest replacement paragraphs.
It does not produce a "stronger version" of the argument. The author wrote the
narrative; the author owns the rewrite. The point of this skill is to make
the *author* a sharper thinker, not to outsource the prose.

## Procedure

1. Read the doc end to end. Note the central claim — the one sentence the
   whole narrative is trying to make true.
2. Map the argument structure as a chain: premise → premise → conclusion.
   Each link should be a discrete claim. If a "premise" is actually three
   claims smashed together, separate them.
3. For each link, classify it:
   a. **Supported** — the doc gives evidence (data, citation, mechanism)
      that would convince a skeptic.
   b. **Asserted** — the doc states it as fact without supporting it. Flag
      this; this is a claim-presented-as-fact.
   c. **Hand-waved** — the doc gestures at the link but does not connect it
      (phrases like "obviously", "clearly", "as is well known", or a single
      sentence covering what should be a paragraph of reasoning).
   d. **Missing** — the conclusion depends on this link but the doc never
      states it.
4. Identify the **strongest counterargument** — the version a smart, informed
   skeptic would mount. Steel-man it: write the version that would actually
   give the author trouble, not a straw man. If the doc engages this
   counter at all, note where; if not, that's a structural gap.
5. Identify what a skeptic **attacks first** — the single weakest link in
   the chain. This is where the author's prep time has the highest return.
6. Note any **claims-presented-as-facts** the doc treats as settled when they
   are actually contested in the field or in the company's own context.
7. Emit the output contract. Do not propose replacement language for any
   section of the doc.

## Output contract

Emit exactly these five sections, in this order.

### Central claim
One sentence: the load-bearing claim the entire narrative is trying to make
true. State it as the doc would, even if you find it weak.

### Argument chain
The doc's logic as a sequence of links. For each link, the classification
(Supported / Asserted / Hand-waved / Missing) and a one-line note on what
makes it that.

### Claims presented as facts
Specific statements the doc treats as settled that a skeptic would contest.
Quote the phrase; one line on why it's contestable.

### The strongest counter
The steel-manned version of the argument *against* this narrative. The version
that would actually challenge the author. One short paragraph.

### What a skeptic attacks first
The single weakest link in the chain and why a sharp reader would go there
before anywhere else. Two or three sentences.

End with one line: "Rewrite the narrative yourself. Use this to know where it
bleeds."

## Guardrails

- NEVER output a rewritten narrative, replacement paragraphs, or paste-ready
  prose. Not even "here's a clearer way to phrase the thesis." If the PM
  asks, restate that the review is the deliverable.
- The counterargument MUST be steel-manned. If your strongest counter is one
  the author has already pre-empted in the doc, that's a sign you didn't push
  hard enough — try again before emitting.
- Do not soften the review to be kind. If the central claim itself is weak,
  say so under "Central claim" in plain language. Diplomatic vagueness is the
  failure mode here.
- Do not invent flaws to look rigorous. Every flagged link must point at
  something concretely in the doc — a phrase, a paragraph, an absence the
  conclusion depends on.
- "Asserted" and "Hand-waved" are not insults; they are technical
  classifications. Apply them without commentary on the author's competence.
