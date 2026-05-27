---
name: tradeoff-frame
tier: standalone
wedge: conflict
level: intermediate
summary: Frames a contested decision honestly — names the real axes of disagreement, what each option optimizes versus sacrifices, whether the decision is a one-way or two-way door, and the evidence that would actually move a reasonable person. Frames; does not pick.
inputs:
  - a contested decision and its candidate options, pasted by the PM (the decision in one or two sentences; the options as a short list)
outputs:
  - a tradeoff-frame scaffold with axes, per-option optimize-vs-sacrifice, reversibility classification, and the decisive evidence to seek; never a recommendation
methodology: Bezos one-way / two-way door framing; ladder of inference; multi-attribute decision analysis stripped to its essentials
---

## Purpose

Most contested product decisions are stuck not because the answer is hard but
because the disagreement is on a different axis than the conversation. People
argue about *option A vs option B* when the real disagreement is about *what
we're optimizing for*. This skill exposes the structure so the humans can
actually decide.

It frames the decision: the axes that matter, what each option wins and loses
on each axis, whether the decision is reversible, and the evidence that would
genuinely change a reasonable person's mind.

It does NOT pick the answer. It does not weight the axes. It does not say
"Option B is best." Picking the answer is the human's call — and often the
choice is properly the call of someone *not* the PM (an exec, a customer, the
market). Outsourcing the choice to a tool removes the act of judgment that
the role exists to perform.

## Procedure

1. Read the decision and the candidate options. If the options listed are not
   genuinely distinct (one is a strict superset of another, or two are the
   same thing in different words), say so and ask the PM to clarify before
   continuing.
2. Identify the **real axes of disagreement** — the underlying dimensions on
   which the options differ in ways that matter. Common axes include speed
   to ship, scope of bet, reversibility, organizational cost, customer
   surface area, technical debt, optionality. Pick the axes specific to
   *this* decision; do not list every possible axis.
3. For each option, write its **optimize / sacrifice** profile across the
   axes. Be specific. "Optimizes for speed" is too vague; "Ships in two
   weeks but locks the data model in a way we'd need to migrate to change"
   is the bar.
4. Classify the decision's **reversibility**. One-way door (hard to undo —
   data model changes, public commitments, hires, deprecations of paying
   customers' surfaces) or two-way door (reversible at low cost). If
   different options have different reversibility, call that out — sometimes
   the right move is the two-way-door option *because* it's reversible.
5. Identify the **decisive evidence** — what would a reasonable proponent
   of one option accept as a reason to change their mind? If the answer is
   "nothing would," the disagreement is values-based, not evidence-based,
   and that itself is the most important finding.
6. Optionally, identify any **hidden axis** — a real consideration nobody is
   naming in the conversation that is actually doing a lot of the work.
   Common ones: career incentive, sunk-cost loyalty to a prior decision,
   blast radius if it goes wrong.
7. Emit the output contract. Do not recommend an option.

## Output contract

Emit exactly these five sections, in this order.

### The decision
Restate the decision in one sentence and list the options being compared.

### Real axes
The two to five axes on which the options actually differ in load-bearing
ways. One line per axis explaining what's on it.

### Option profiles
For each option: what it optimizes for, what it sacrifices, expressed against
the axes above. Be concrete; avoid generic adjectives.

### Reversibility
One-way door or two-way door? Apply to each option if they differ. If the
answer changes the right way to decide (e.g. "two-way-door so just try it"),
say so.

### Decisive evidence
What a reasonable proponent would accept as a reason to update. If the
disagreement is values-based and no evidence would move it, state that
plainly — and name the values clash.

If a hidden axis is doing real work in the room, append a short **Unspoken**
section naming it.

End with one line: "Frame the decision. Then make the call yourself, or
escalate to whoever owns it."

## Guardrails

- NEVER recommend an option, rank the options, or say which one "seems best."
  Not even gently. If the PM asks, restate that the frame is the deliverable
  and naming the call is theirs.
- Do not weight the axes. The axes' relative importance is a values judgment
  — exposing it without resolving it is the entire point.
- Do not invent options the PM didn't list. If a real option is missing,
  note that as a gap; do not silently smuggle it into the comparison.
- "Decisive evidence" must be evidence a *reasonable proponent of the other
  side* would accept. Confirmation evidence for the side you suspect is
  right does not count.
- If you find yourself naming a hidden axis that is about a specific named
  person's incentives, stop. Generalize ("there is an incentive to defend
  the prior decision") rather than identifying or attacking an individual.
  The frame describes the room; it does not litigate the people in it.
