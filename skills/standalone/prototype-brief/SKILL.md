---
name: prototype-brief
tier: standalone
wedge: discovery
level: beginner
description: Interrogates a feature idea before the PM builds a prototype with a coding agent. Names the one assumption the prototype exists to test, what must be real and what can be faked, who will use it and what they will be asked to do, and the result that would kill the idea. Scopes the test; never writes the prototype prompt or the spec.
inputs:
  - a feature idea or problem statement pasted by the PM
  - optional, what the PM already knows from customers and what the team has already built
outputs:
  - a test scope with the riskiest assumption, the real-versus-faked boundary, the test session outline, and the pass and kill signals; never the build prompt, the prototype, or the PRD
methodology: Assumption testing (Teresa Torres, Continuous Discovery Habits); the four product risks (Marty Cagan); riskiest assumption test; The Mom Test (Rob Fitzpatrick)
---

## Purpose

A PM can now build a clickable prototype in an afternoon with Claude
Code, Lovable or Figma Make. Building got cheap. Learning did not. A
prototype built with no question behind it produces a demo, a round of
"looks great", and a spec for the wrong thing.

Run this skill before you open the coding agent. It forces the question
the prototype has to answer. It does NOT write the prompt for the coding
agent, generate the prototype, or draft the spec. After the test, the PM
writes the spec from what users did.

## Procedure

1. Read the idea. Restate it as the user problem it claims to solve, in
   one sentence. If the input describes only a solution, say so and ask
   what problem it is for.
2. List the assumptions the idea depends on, sorted by Cagan's four
   risks:
   - **Value.** Will the user want this?
   - **Usability.** Can the user work out how to use it?
   - **Feasibility.** Can the team build it with the systems they have?
   - **Viability.** Does it work for the business (cost, legal, sales)?
   Mark each assumption as supported by what the PM pasted, or untested.
3. Pick the **riskiest untested assumption**: the one that is both least
   supported and most damaging if wrong. Name one. If two are tied, say
   what would break the tie.
4. Decide whether a prototype is the right test for it. A value risk is
   often better tested with a conversation or a fake door. A feasibility
   risk needs an engineer's spike, not a clickable mock. If a prototype
   is the wrong tool, say so and name the cheaper test.
5. If a prototype fits, draw the **real-versus-faked boundary**. Name
   what must behave for real so the test is honest (usually the one
   interaction under test, with realistic data), and what can be
   hard-coded or left out. Note anything that must not be faked because
   faking it hides the risk.
6. Outline the **test session**: who the participants are and how many,
   the task you give them stated as a goal and not as instructions, and
   what you observe. Check the task wording for leading language.
7. Set the **signals before the test**. State what you expect to see if
   the assumption holds, and the result that means stop. Both must be
   observable behavior, not opinions about the prototype.
8. Emit the output contract.

## Output contract

Emit exactly these five sections, in this order.

### Problem as read
The one-sentence problem, or the note that the input is a solution with
no stated problem.

### Assumptions
The list by risk type, each marked supported or untested.

### The one to test
The riskiest untested assumption, why it ranks first, and whether a
prototype is the right test for it.

### Scope of the test
What must be real, what can be faked, what must not be faked, and the
session outline.

### Pass and kill signals
The observable result that supports the assumption and the one that
ends the idea, both decided now.

End with one line: "Build only what this scope needs. Write the spec
after the sessions, from what people did."

## Guardrails

- NEVER write the prompt for the coding agent, the prototype code, the
  screens, or the PRD. Scope the test and stop.
- Name one assumption to test. A prototype that tests five things tests
  none of them.
- Signals must be behavior you can observe. "Users liked it" is not a
  signal. If the PM proposes one like that, reject it and say why.
- Do not invent customer evidence. An assumption is supported only by
  what the PM pasted.
- Say so when a prototype is the wrong test. Recommending a
  conversation over a build is a valid output of this skill.
- A prototype is not production code. If the PM plans to ship it, flag
  that it needs an engineer's review first.
