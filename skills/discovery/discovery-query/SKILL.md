---
name: discovery-query
tier: discovery
wedge: discovery
level: intermediate
summary: Answers a discovery question by interrogating the graph — returning grounded findings with provenance, the explicit gaps in the evidence, and the discovery questions that would close them. Refuses to answer beyond what the corpus supports, and names every gap.
inputs:
  - graph/graph.json (produced by graphify)
  - a discovery question stated by the PM
outputs:
  - a three-part scaffold (findings · gaps · discovery questions); never speculation past the evidence
methodology: Continuous Discovery (Torres); JTBD; provenance-first qualitative analysis
---

## Purpose

The PM has a specific question — "what do users say about the import
flow?", "who has churned and why?", "what's the strongest pain in
mid-market?" This skill answers it by reading the graph and returning
only what the graph supports — with the supporting quotes attached.

Where the graph is silent, the skill says so. Where the evidence is
thin (single source, no triangulation), it labels the finding accordingly.
Where the question is genuinely unanswerable from the current corpus, the
skill refuses to guess and names the gap as a finding in its own right.

It does NOT produce confident-sounding answers based on inference. It
does not extend a single quote into a population-level claim. It does
not stitch together adjacent statements into a story the sources do not
themselves tell.

## Procedure

1. Read `graph/graph.json`. If it does not exist, tell the PM to run
   `graphify` first and stop.
2. Read `meta.health`. **Cold-start branch:** if `health === "thin"`,
   state this at the top of the response. Most of the answer will be
   gaps; that is the correct, useful result. Continue with the
   procedure, but do not soften the gap-heavy output.
3. Parse the PM's question. Identify:
   - The entity or relationship it asks about (a Pain, a Segment, a
     Feature, an Outcome, etc.).
   - Whether it is a *what* question (description) or a *why*/*how*
     question (causal). Causal questions require evidence at the edge
     level, not just nodes.
   - Whether it has a population scope ("most users", "mid-market",
     "everyone who churned"). Population claims require multi-source
     support.
4. Search the graph:
   - Find all nodes and edges that match the question's entities.
   - For each, collect provenance.
   - Note the *source count* and *source-type spread* behind each
     finding. A finding backed by three sources across two types is
     materially different from one backed by one ticket.
5. Classify what you found into:
   - **Multi-source findings** — at least 2 sources, ideally across
     types. These can be stated with reasonable confidence.
   - **Single-source findings** — one source only. State plainly; do
     not generalize.
   - **Assumption-adjacent** — the question's territory contains
     `Assumption` nodes. State that the territory is partly assumed,
     not evidenced.
   - **Silent** — the graph has no nodes or edges relevant to the
     question. This is itself a finding.
6. **Refusal branch:** if the question is fundamentally unsupportable
   from the corpus (e.g. asks for a quantitative claim the corpus does
   not contain, or asks about a population the corpus does not sample),
   do *not* fabricate. Say so plainly under "Findings", and shift all
   the work into "Gaps" and "Discovery questions".
7. For each gap, formulate a discovery question that would close it.
   Questions must be non-leading, JTBD-grounded (about behaviour and
   context, not hypotheticals), and concrete enough to actually go ask.
8. Emit the output contract.

## Output contract

Emit exactly these three sections, in this order.

### Findings
What the graph supports for this question. For each finding:
- the claim in one line
- the source count and type spread (e.g. "3 sources / 2 types: interview,
  ticket")
- 1–3 verbatim quotes with their source path, drawn from provenance
- a confidence tag: **Multi-source**, **Single-source**, or **Assumed**
  (the territory is partly Assumption nodes)

If the question is unanswerable from the corpus, this section contains
exactly one line: "the corpus does not support an answer to this
question." Move on.

### Gaps
The explicit unknowns the question exposes. Each gap as one line.
Include silent regions, single-source claims that need triangulation,
and Assumption nodes the answer depends on.

### Discovery questions
The 2–5 questions a PM should go ask to close the most load-bearing
gaps. Each question tied to a named gap above. Non-leading, behavioural.

End with one line: "answer your question from the findings. fill the
gaps before you commit to anything."

## Guardrails

- NEVER state a finding without provenance. Every "Findings" item must
  trace to at least one verbatim quote in `provenance`. If you cannot
  quote, the finding is not a finding — it is a gap.
- NEVER generalize a single-source quote into a population claim. "One
  mid-market admin said X" is fine; "mid-market admins say X" is not,
  unless the graph has multi-source `supports` evidence.
- NEVER answer a question the corpus does not support. If the question
  is unsupportable, the refusal in "Findings" is the deliverable —
  followed by the gaps and questions. That is the principled, useful
  output.
- NEVER ignore `Assumption` nodes adjacent to the question. If the
  answer relies on territory that is partly assumed, the confidence
  tag must reflect that and the assumption must appear in "Gaps".
- On a thin corpus, do not pad findings with weak inferences to seem
  more useful. Three lines of honest findings + a long gap list is
  better than ten lines of confident-sounding speculation.
- Do NOT propose solutions or recommend actions. This skill answers
  questions and surfaces gaps. The PM owns what to do next.
