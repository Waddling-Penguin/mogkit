---
name: launch-tier
tier: standalone
wedge: gtm
level: beginner
description: Sizes a release before anyone plans the launch. Classifies it on a four-level scale by who it affects and what the company needs from it, names what each audience needs at that level, and flags a release the team is about to over-launch or under-launch. Sizes the launch; never writes the plan or the copy.
inputs:
  - a release description pasted by the PM (what changed, who it affects, what the company wants from it)
outputs:
  - a tier classification with the reasoning, the per-audience needs at that tier, the mismatch flags, and the open questions; never a launch plan, changelog entry, or announcement
methodology: Scream, Shout, Cheer, Chirp launch tiers (Sara Detrik, Appcues); the four launch components (Maja Voje); Intercom-style launch prioritization
---

## Purpose

Teams that ship weekly cannot run a full launch for every release, and
should not. The common failures are opposite. A small fix gets an email
blast and trains customers to ignore you. A change that alters pricing or a
core workflow goes out as one changelog line and support finds out from
tickets.

Run this skill before `launch-readiness`. It decides how big the launch
is. `launch-readiness` then checks that a launch of that size has no gaps.
This skill does NOT write the launch plan, the changelog entry, the email,
or the social post.

## Procedure

1. Read the release description. Extract what changed, who it affects
   (all customers, a segment, prospects, nobody outside the team), and the
   goal (acquisition, expansion, retention, or keeping a promise). List
   anything missing as an open question.
2. Score the release on three questions, each answered from the
   description and nothing else:
   - **Reach.** What share of customers or prospects will notice?
   - **Change to behavior.** Does a user have to learn something, change a
     workflow, or make a decision?
   - **Business weight.** Does it change price, open a new segment, or
     answer a competitor?
3. Classify with Detrik's four levels:
   - **Scream.** New product or a change to the company's story. Every
     channel, every team.
   - **Shout.** A major feature for a large segment. Coordinated
     campaign, sales and support briefed in advance.
   - **Cheer.** A useful improvement for existing users. In-product
     education and a changelog entry.
   - **Chirp.** A small change or fix. Changelog only.
   State the tier and the two or three facts from the description that
   put it there.
4. Check for **mismatch**. If the description shows the team planning a
   different size than the tier you reached, name the gap in either
   direction and what it costs.
5. For the chosen tier, list what each audience needs before the release:
   users, prospects, support, sales and customer success, partners, and
   anyone with a contract or compliance stake. Skip an audience the
   release does not touch, and say you skipped it.
6. Flag anything that forces a higher tier regardless of size: a price
   change, a removed feature, a change to data handling, or a breaking API
   change.
7. Emit the output contract.

## Output contract

Emit exactly these four sections, in this order.

### Release as read
What changed, for whom, and toward which goal. Open questions listed.

### Tier
The tier, the facts that decide it, and the answers to the three scoring
questions.

### What each audience needs
Per affected audience, the one or two things that must exist before
release at this tier. Needs, not drafts.

### Flags
Any mismatch between the tier and the team's plan, and any forcing factor
from step 6.

End with one line: "Next, run launch-readiness on the plan you write for
this tier."

## Guardrails

- NEVER write the launch plan, the changelog entry, the announcement, the
  email, or the enablement doc. Name what each audience needs and stop.
- Classify from the description. Do not raise the tier because the PM
  sounds excited, or lower it because the team is tired.
- Do not invent audiences, partners, or contractual obligations. If the
  release probably touches one, ask about it under open questions.
- A price change, a removal, or a breaking change is never a Chirp. Say so
  even when the PM asks for the smallest possible launch.
- Keep the per-audience list to what this release requires. A full
  launch checklist is the failure this skill exists to prevent.
