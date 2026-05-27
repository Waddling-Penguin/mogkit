---
name: interview-guide
tier: discovery
wedge: discovery
level: intermediate
summary: Reads the graph (specifically its gaps) and produces a discovery interview guide targeted at the biggest current gaps — non-leading, JTBD-grounded questions, each tied to a named gap so the next conversation actually moves the graph.
inputs:
  - graph/graph.json (produced by graphify)
  - optional - the specific segment or persona the PM is about to interview
outputs:
  - an interview guide structured around the corpus's load-bearing gaps; never a list of generic discovery questions
methodology: Continuous Discovery (Torres); The Mom Test (Fitzpatrick); JTBD interview craft (Klement / Christensen)
---

## Purpose

A discovery interview is most valuable when the interviewer walks in
*knowing what the graph currently doesn't know*. This skill reads the
graph and produces a guide pointed at the gaps that would change the
most if filled — not a generic discovery questionnaire that any PM
could have written.

Each question is tied to a named gap in the graph, so the PM understands
*why* it's on the list. The questions follow interview-craft rules: they
ask about past behaviour, not hypothetical futures; they are open-ended
and non-leading; they avoid pitching the product.

It does NOT script a sales conversation, prepare answers, or anticipate
what the interviewee "should" say. The interviewer enters open; the
guide just makes sure they enter pointed at the right gaps.

## Procedure

1. Read `graph/graph.json`. If it does not exist, tell the PM to run
   `graphify` first and stop.
2. Read `meta.health`. **Cold-start branch:** if `health === "thin"`,
   state that on a thin corpus the gaps are *everywhere* — the guide
   should focus on the highest-leverage *first* gap (usually: which
   segment has the most weight on the team's current direction?). One
   well-targeted interview against a thin corpus is more valuable than
   a long guide chasing every gap.
3. Identify the **load-bearing gaps** in the graph. Sources of gaps:
   a. Segments named in the corpus but represented by ≤1 source.
   b. `Assumption` nodes adjacent to a major decision (i.e. the PRD
      intent doc or memo references them).
   c. Pains or Needs supported by only one source — single-source
      pains pointing at scope are high-leverage to triangulate.
   d. `contradicts` edges — the graph itself records that two sources
      disagree; resolving the contradiction often unlocks the
      decision.
4. If the PM has named a specific segment or persona to interview,
   filter the gaps to those that segment alone can fill. If not, pick
   the top 3 load-bearing gaps in the graph regardless of segment.
5. For each chosen gap, write 1–3 interview questions. Rules:
   - **Behavioural, not hypothetical.** Ask about *what happened*, not
     *what would you do if*. Bad: "Would you use feature X?" Good:
     "Walk me through the last time you tried to do X — what did you
     actually do?"
   - **Open, not leading.** Bad: "Don't you find the import frustrating?"
     Good: "Tell me about importing your previous data — what was the
     experience like?"
   - **JTBD-anchored.** Frame around the user's job, not the product.
     "When you were trying to set up the team, what did you need to
     figure out?" over "What do you think of our onboarding?"
   - **One question at a time.** No compound questions.
6. Add a short **warm-up** section (2–3 questions to set context and
   relax the interviewee) and a short **close** section (a single "is
   there anything I didn't ask that I should have?" closer).
7. Emit the output contract.

## Output contract

Emit exactly these four sections, in this order.

### What this guide is for
One short paragraph: the segment/persona this guide is targeted at (or
"any user" if no specific one was named), the load-bearing gaps it
aims to close, and an honest note if the corpus is thin.

### Warm-up
2–3 short, low-friction questions that set context (their role, the
work they were doing, the period the interview covers).

### Targeted questions
The main body. For each chosen gap, a block like:

> **Gap:** *[one-line gap, drawn from the graph]*
>
> 1. *[question one]*
> 2. *[question two]*

Each question follows the rules in step 5. The block makes the
gap-to-question linkage explicit, so the interviewer can drop a
question if the conversation already covered the gap, or follow up
deeper if it landed.

### Close
A single closer question (typically "what didn't I ask that I should
have?"), plus a one-line reminder to leave space and not pitch.

End with one line: "ask, then listen. the guide points you at the
gaps; the conversation is yours to run."

## Guardrails

- NEVER include leading questions, sales questions, or product-pitch
  questions. If the interviewee should leave the conversation knowing
  what the product does, this guide has failed. The interview is for
  learning, not promotion.
- NEVER ask a hypothetical "would you use" or "would you pay for"
  question. The Mom Test: hypotheticals get nice-sounding answers that
  do not predict behaviour. Past behaviour predicts.
- Every targeted question MUST be tied to a named gap in the graph.
  If you cannot name the gap, the question is generic and does not
  belong here — drop it or tighten the gap statement.
- On a thin corpus, do NOT produce a long guide with many questions
  per gap. A thin corpus's leverage is in *one* well-aimed interview;
  pick the single highest-leverage gap and three sharp questions
  around it. Quality over quantity, especially when there is little
  to triangulate against.
- Do NOT script the interviewee's likely answers, prepare counters, or
  anticipate objections. Those framings turn an interview into a
  negotiation.
- Do NOT recommend follow-up product actions in this output. The
  guide's job ends when the interviewer has it in hand.
