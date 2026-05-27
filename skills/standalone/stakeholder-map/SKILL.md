---
name: stakeholder-map
tier: standalone
wedge: conflict
level: intermediate
summary: Maps the stakeholders around a decision — each one's stated position, the likely underlying incentive, where the real disagreement sits (often not the surface one), and the minimum set of conversations to unblock. Names dynamics; never scripts manipulation.
inputs:
  - a decision and the people/teams involved, pasted by the PM (the decision in one or two sentences; the stakeholders as a list with roles)
outputs:
  - a stakeholder map scaffold with positions, incentives, the real fault line, and the minimum conversation set; never scripted persuasion tactics
methodology: Interest-based negotiation (Fisher & Ury, "Getting to Yes" — separate positions from interests); RACI thinking adapted for conflict diagnosis
---

## Purpose

A stalled decision usually isn't a logic problem; it's a stakeholder problem.
Each person around the table is responding to a different set of incentives,
and they often disagree about something other than what they say they
disagree about. This skill maps that landscape so the PM can see where the
real fault line runs and which two or three conversations would actually
unblock the situation.

It does NOT script what to say. It does not produce talking points, framing
language, or "how to convince X" tactics. Naming a person's incentive
honestly is useful diagnosis; scripting how to leverage it is manipulation,
and that violates both the brand and the craft. The PM understands the room;
the PM walks into the room as themselves.

## Procedure

1. Read the decision and the stakeholder list. If a stakeholder is listed by
   role only and the dynamic depends on the specific person, note that the
   map will be coarse and the PM should refine it with what they know.
2. For each stakeholder, record their **stated position** in one line — what
   they are publicly arguing for or against on this decision. Use the words
   they (likely) use, not your reframing.
3. For each stakeholder, infer their **likely underlying interest** — the
   incentive structure they are responding to. Frame it as a *role-level*
   incentive ("Engineering lead is on the hook for the platform's
   reliability quarter; new surface area costs them"), not a personal
   attack. If the PM has named specifics about a person, those can sharpen
   the interest; if not, stay at the role level.
4. Identify the **real fault line** — the underlying dimension along which
   the room actually divides. Often this is *not* the surface argument.
   Common patterns: it looks like a build-vs-buy argument and is actually
   a control argument; it looks like a timing argument and is actually a
   trust argument. State the fault line plainly.
5. Identify the **alignment map**: who is genuinely aligned with whom on the
   real fault line (which is sometimes a different grouping than the
   surface). Note any stakeholders whose stated position and underlying
   interest *diverge* — they are arguing for X but their incentive points
   toward Y. That gap is often where the unblock lies.
6. Identify the **minimum unblock set** — the two or three conversations
   that, if held well, would move the situation. Each conversation framed
   as: *who*, *what to surface* (the interest, the gap, the real fault
   line — not a tactic), and *what a good outcome of that conversation
   looks like*.
7. Emit the output contract. Do not script what to say in any conversation.

## Output contract

Emit exactly these five sections, in this order.

### The decision
One-line restatement of the decision and a note on its stakes (one-way vs
two-way door, who owns the call).

### Stakeholder map
A list. For each stakeholder:
- **Role / person**
- **Stated position** — one line
- **Likely underlying interest** — one line, at role level unless the PM has
  named specifics
- **Position–interest gap** — only if their stated position and incentive
  diverge; flag what the gap is

### The real fault line
One paragraph naming the underlying dimension the room is actually divided
on. Distinguish it from the surface argument if they differ.

### Alignment & divergence
Who is actually aligned on the real fault line. Note any surface coalitions
that fall apart once the real fault line is named, and any unexpected
alignments that emerge.

### Minimum conversations to unblock
Two or three conversations. For each: *who*, *what to surface*, *what a good
outcome looks like*. Plain language; no scripting.

End with one line: "Walk into these conversations as yourself. The map is
diagnosis; the room is yours to handle."

## Guardrails

- NEVER write scripted dialogue, "say this to X", suggested framing
  language, talking points, or persuasion tactics. Naming an incentive is
  diagnosis; scripting how to exploit it is manipulation. If the PM asks
  for talking points, restate the boundary and why.
- Do not psychoanalyze named individuals. Stay at the role-and-incentive
  level. "Engineering lead's quarter is graded on reliability" is fair;
  "she's risk-averse because of her last role" is not.
- Do not assume bad faith. The default assumption is that every stakeholder
  is acting rationally inside their own incentive structure. If a
  stakeholder appears to be acting against the company's interest, frame it
  as an incentive misalignment, not a character flaw.
- If the input includes only one or two stakeholders, say so and note that
  most real stalls involve three or more parties; offer to expand the map
  once the PM names them.
- Do not invent stakeholders. If the decision obviously involves a missing
  party the PM didn't name (e.g. a customer segment, a partner, legal),
  flag the omission as a gap rather than mapping a hypothetical person.
