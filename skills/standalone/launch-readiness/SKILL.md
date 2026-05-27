---
name: launch-readiness
tier: standalone
wedge: gtm
level: intermediate
summary: Interrogates a planned launch — what is unowned, the rollback plan, the comms and enablement gaps, what breaks if adoption is 10x or 0.1x of expectation, and the explicit kill criteria. Produces the gap list specific to this launch; never a generic checklist.
inputs:
  - a launch description pasted by the PM (what's launching, when, to whom, and any plans already in place)
outputs:
  - a launch-specific gap interrogation; never a generic launch checklist
methodology: Pre-mortem (Klein); launch governance practices from Amazon / Stripe-style ops; reversibility-aware planning
---

## Purpose

A launch fails for boring reasons. Nobody owned the docs. The rollback was
theoretical. Support didn't get the briefing. The integration partner found
out from a tweet. Half the failures are visible in advance to anyone who
asks the right questions about *this* launch — not a generic launch.

This skill is the pre-flight interrogation: what is unowned, what is
unprepared, what breaks under unexpected demand or unexpected silence, and
what would tell us we should pull the launch. The output is specific to the
launch described — not the canonical launch checklist a PM could Google.

It does NOT write the launch plan, the rollback runbook, the comms email,
or the FAQ. It surfaces the gaps. The PM closes them.

## Procedure

1. Read the launch description. Extract:
   - **What is launching** — the actual product/feature/change.
   - **To whom** — segment, scope (all users, beta, an account, a region).
   - **When** — date, time, sequencing.
   - **What's already planned** — anything the PM has called out as in
     place (e.g. "we have a rollback flag", "support has been briefed").
   If any of these is genuinely missing from the description, list it as a
   gap rather than guessing.
2. Walk through **ownership**: who owns each load-bearing piece of the
   launch on launch day — product, engineering on-call, support response,
   marketing/PR, customer success, sales enablement, partner comms, data
   instrumentation. For each, name owned/unowned/unclear based on what the
   description says. "Unclear" is a real and common state; flag it.
3. Stress the **rollback plan** against the actual change. A rollback for a
   pricing change is not a rollback for a data-model change. Ask: what
   specifically can be undone, what cannot, and what would the rollback
   leave half-done? If the launch contains a one-way-door element, name it.
4. Identify **comms & enablement gaps**: who hears about this and when —
   internally (support, sales, success, exec), externally (users,
   partners, press if relevant). What does each audience need *to be
   ready*? Where is the briefing missing?
5. Run the **demand stress test**:
   - **10x adoption** — if adoption is ten times expectation, what breaks?
     Capacity, support volume, fraud surface, partner contracts, on-call
     load.
   - **0.1x adoption** — if adoption is one-tenth, what does that tell us?
     What would we then have committed to (engineering load, partner
     promises, marketing spend) that no longer pays back?
6. Define **kill criteria**: the explicit thresholds at which the team
   should pull or pause the launch. Specific, measurable, decided *now*,
   not in the heat of launch day. Common shapes: error rate above X for Y
   minutes, support volume above Z%, a single P0-class issue. If the PM
   already has kill criteria, audit them; if not, propose specific
   placeholders the PM should confirm.
7. Emit the output contract. Do not produce launch plan content (runbooks,
   comms drafts, FAQs).

## Output contract

Emit exactly these six sections, in this order.

### Launch summary as read
Restate what is launching, to whom, when, and what is already in place.
This is the basis the rest of the interrogation is grounded in; if you got
something wrong, the PM corrects it before acting on the rest.

### Ownership gaps
Per load-bearing area: owned / unowned / unclear. List the unowned and
unclear; do not pad with the owned ones.

### Rollback realism
What can be rolled back cleanly, what cannot, what would be left half-done,
and which one-way-door elements exist. Specific to this launch's mechanics.

### Comms & enablement gaps
Per audience (internal first, external second): is the briefing/content
that audience needs in place? Where is it missing?

### Demand stress test
- **At 10x** — what breaks, in concrete terms.
- **At 0.1x** — what would we be on the hook for that no longer pays back.

### Kill criteria
The explicit thresholds at which we pull or pause. If proposed by you
(rather than confirmed by the PM), label them "proposed — confirm with
the team."

End with one line: "Close the gaps; the PM owns the launch. This list is
specific to what you described — re-run it if the scope changes."

## Guardrails

- NEVER produce a generic launch checklist. Every item must be grounded in
  something specific about the launch the PM described (the scope, the
  audience, the change type, the channel). If the input is too vague to
  produce specifics, say so and ask for the missing pieces.
- NEVER write rollback runbooks, comms emails, FAQs, talking points, or
  any artifact that would *be* part of the launch plan. Surface the gap;
  the PM (or the comms/eng leads) writes the artifact.
- Kill criteria must be specific and measurable. "If things go badly" is
  not a kill criterion. If you cannot make them specific from the input,
  propose them as placeholders explicitly labeled for confirmation.
- Do not invent stakeholders, partners, or commitments the PM didn't
  mention. If the launch *probably* involves one (e.g. press for a big
  external launch), flag it as a likely missing piece rather than treating
  it as confirmed.
- Resist completeness theater. A short list of real, specific gaps beats
  a long generic one. If the launch as described is in good shape on a
  dimension, say so in one line and move on.
