---
name: prd-interrogate
tier: discovery
wedge: discovery
level: advanced
summary: Turns a PRD intent into an interrogation — what your evidence supports, what is assumed, what is unvalidated, and who you haven't talked to — so you write a sharper PRD yourself. Never produces the PRD.
inputs:
  - graph/graph.json (produced by graphify)
  - a stated PRD intent from the PM (the feature or problem the PRD will cover)
outputs:
  - an interrogation scaffold with four sections; never a PRD, PRD outline, or paste-ready PRD prose
methodology: Continuous Discovery (Torres); Working Backwards (Amazon)
---

## Purpose

The PM is about to write a PRD. This skill makes that PRD sharper by
interrogating the evidence behind it first. It identifies what the source
corpus actually supports, what the PM is assuming without evidence, what
the corpus is silent on, and who has not been talked to.

It does NOT write the PRD. The PM writes the PRD. Producing the document —
or even an outline of it, or paste-ready paragraphs — would let the PM
skip the synthesis that this skill exists to force. The output is a
scaffold the PM thinks against, not a draft they edit. This is the load-
bearing skill for principle 1; violating it kills the project's reason to
exist.

## Procedure

1. Read `graph/graph.json`. If it does not exist, tell the PM to run
   `graphify` first and stop.
2. Read `meta.health`. **Cold-start branch:** if `health === "thin"`,
   state this prominently at the top of the response. The interrogation
   will be mostly gaps — that is the correct, useful result; it shows
   the PM exactly what to collect before writing.
3. Take the PM's stated PRD intent — the feature or problem the PRD will
   cover. If the intent is vague ("improve onboarding"), ask the PM to
   sharpen it to a specific feature, change, or hypothesis before
   proceeding.
4. From the graph, gather every node and edge relevant to the intent.
   For each, note the provenance count and source-type spread.
5. Separate the relevant material into four buckets:
   a. **Multi-source-backed** — claims supported by 2+ sources, ideally
      across types. These are the parts of the PRD the PM can write with
      confidence.
   b. **Single-source** — claims with one source of provenance. These
      are the parts the PM should hedge or validate before committing.
   c. **Assumption** — `Assumption` nodes in the graph the PRD would
      rely on. Empty provenance is the point.
   d. **Silent** — elements of the PRD intent the graph says nothing
      about at all. The PM would be flying blind here.
6. Identify which user segments and personas relevant to the intent are
   thin or absent in `sources/`. For each, write one specific question
   that segment alone could answer.
7. Emit the output contract below. Do **not** emit a PRD, a PRD outline,
   draft headings for a PRD, or prose that could be pasted into a PRD.

## Output contract

Emit exactly these four sections, in this order.

### Supported by evidence
Claims behind the PRD that the corpus backs with 2+ sources. Each:
- the claim in one line
- the source count + type spread
- 1–2 verbatim quotes with file paths
These are the parts of the PRD the PM can write with confidence.

### Single-source and assumed
Claims with one source of provenance, and `Assumption` nodes the PRD
would rely on. For each:
- the claim
- whether it is single-source (with the source) or assumed (no source)
- the risk if it is wrong
The PM should hedge these in the PRD and validate the load-bearing ones.

### Unvalidated entirely
Elements of the PRD intent the corpus is silent on. One line per
element. The PM is flying blind in this territory.

### Who you haven't talked to
Segments and personas relevant to this PRD that are absent or thin in
the corpus. For each: the segment + one specific question they alone
can answer.

End with one line: "Write the PRD yourself. Use this to know which
parts are solid, which parts to hedge, and what to go validate first."

## Guardrails

- NEVER output a PRD, a PRD draft, a PRD outline, draft headings, an
  executive summary "you could use", suggested PRD section titles, or
  any prose that could be pasted into a PRD. If the PM asks for the
  document itself, restate that the scaffold is the deliverable and
  *why* — the synthesis is what makes the PM's PRD sharper.
- Every claim in "Supported by evidence" MUST carry verbatim provenance
  with a file path. No provenance, no claim — move it to "Single-source
  and assumed" or further down.
- On a thin corpus, do not soften the result to seem more useful. A
  scaffold that is 80% gaps is the honest and high-value answer for a
  thin corpus. Padding it with weak inferences violates principle 3.
- Do not invent segments, quotes, or evidence not present in the graph.
- Do not propose product solutions or recommend scope. The PRD scope is
  the PM's call after they read this scaffold; pre-committing scope
  here removes the very judgment the skill is forcing them to do.
- If the PM provides a PRD intent so vague the interrogation cannot
  bite (e.g. "improve activation"), refuse to proceed and ask for a
  sharper intent. A scaffold against a vague intent is theater.
