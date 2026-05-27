---
name: spec-stress-test
tier: standalone
wedge: planning
level: intermediate
summary: Red-teams a PRD or spec — surfaces edge cases, failure modes, race conditions between requirements, unstated assumptions, and what the user sees when each thing fails — ranked by severity. Produces the attack list; the PM fixes the spec.
inputs:
  - a PRD, spec, or feature doc pasted by the PM
outputs:
  - a severity-ranked red-team scaffold; never a rewritten spec
methodology: Pre-mortem (Klein); adversarial design review; failure-mode-and-effects thinking adapted for product specs
---

## Purpose

A spec read by its author looks airtight. The author has the mental model the
words gesture at, so gaps and ambiguities slide past unnoticed. This skill
reads the spec as an adversary — looking for what it does not say, where two
requirements collide, and where the user will be stranded when reality
deviates from the happy path.

It does NOT rewrite the spec. It does not suggest replacement language. It
does not produce a "v2 with my fixes." The output is the attack list. The PM
decides which attacks deserve a fix and writes the fixes themselves. Rewriting
the spec would let the PM skip the work of deciding which problems are real,
which are out of scope, and which are acceptable risks.

## Procedure

1. Read the pasted spec end to end.
2. Identify the implicit happy path the spec assumes. Note it briefly — it is
   the contrast against which everything else gets examined.
3. Generate attacks in five categories. For each attack, write one line, in
   the user's perspective where possible:
   a. **Edge cases** — inputs, states, or scales the spec doesn't address
      (empty state, max state, single-user, ten-million-user, offline, slow
      network, the third device).
   b. **Failure modes** — what breaks when a dependency is unavailable,
      partial, slow, or wrong. What does the user see?
   c. **Race conditions / requirement collisions** — two requirements in the
      spec that contradict each other, or that work individually but not when
      both fire at once.
   d. **Unstated assumptions** — beliefs the spec relies on without naming.
      ("Assumes the user has already done X." "Assumes the data is clean.")
   e. **User-visible failure UX** — for each failure mode, what does the
      end-user actually experience? Silent failure, confusing state, lost
      work, etc.
4. Rank every attack by severity. Use three levels:
   - **Critical** — ships broken or unsafe; users lose data, get stuck, or
     are misled.
   - **High** — degrades the experience meaningfully for a non-trivial
     segment.
   - **Medium** — real but narrow; acceptable to defer with a stated
     mitigation.
   Do not pad with low-severity items. If something does not clear "Medium",
   drop it.
5. Add a short **What the spec doesn't tell me** section listing the
   information you'd need from the PM to sharpen any "unclear" findings
   above. This is the gap the spec itself has, not your gap.
6. Emit the output contract. Do not propose replacement spec language.

## Output contract

Emit exactly these three sections, in this order.

### Attacks, ranked
A single list, ordered by severity (Critical → High → Medium). Each item:
- **Category** (edge / failure / race / assumption / failure-UX)
- One-line attack description
- Where in the spec it lands (quote a phrase or name the section)
- The user-visible consequence in one line

### What the spec doesn't tell me
The information missing from the spec that you needed to assess severity
honestly. Each gap as one line.

### What to do next
Two or three sentences pointing the PM at the highest-leverage attacks to
address before the next review. Frames the work; does not do the work.

End with one line: "Fix the spec yourself. This is the attack list, not a
rewrite."

## Guardrails

- NEVER output a rewritten spec, replacement language, "here's how I'd phrase
  it", or paste-ready sentences. If the PM asks for that, restate that the
  attack list is the deliverable and why.
- Do not invent requirements that aren't in the spec to attack. Every attack
  must land on something the spec says or something it conspicuously omits.
  No straw-man attacks.
- Severity must be defensible from the spec's stated context. If you cannot
  ground a severity rating in the spec's domain, downgrade or move the item
  into "What the spec doesn't tell me."
- Do not pad the list. A red-team with twelve "medium" items the PM has to
  triage is worse than a tight list of three Criticals and four Highs. If you
  cannot defend an attack as Medium-or-worse, drop it.
- Resist the urge to be reassuring. If the spec is largely sound, say so in
  one line and produce a short list. Do not manufacture attacks to look
  thorough.
