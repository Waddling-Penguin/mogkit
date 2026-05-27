---
type: prd
title: "DRAFT — Onboarding v2 intent (NOT THE PRD)"
addedAt: 2026-05-02T10:00:00Z
status: pre-discovery
author: PM
---

## What I think we're going to do

This is the intent doc I'm carrying into the discovery cycle. It is NOT the
PRD. The mogkit principle says I write the PRD after I've interrogated the
evidence — this is the starting hypothesis, not the answer.

## Hypothesis

We are losing too many teams during the trial because the first-week
setup is dominated by *admin decisions* (seats, permissions, plan tier)
and *data migration*, neither of which we currently address head-on.
The team has to figure out both before they get to actual product
value.

## Proposed scope (to be validated, not committed)

1. **Pre-setup admin walkthrough** — surface seat/permission/plan
   implications before the team is invited, so the admin can decide
   confidently in one sitting.
2. **Native Jira import (with comments)** — graduate the existing beta to
   GA. Includes attachments and comment threads.
3. **Anchor activity in the first week** — a "build your first board"
   moment that creates immediate utility, modeled on what spread
   adoption inside GreenCo.

## Outcome we want to move

Trial → paid conversion in the SMB and mid-market cohorts. Activation
proxied by *number of seats actively using Pebble within 14 days*.

## What I'm specifically unsure about

- Whether the pre-setup admin step solves the "I'll come back later"
  problem or just delays it.
- Whether mid-market admins actually want the walkthrough, or whether
  they'd rather have docs and SSO and otherwise be left alone (Sam at
  GreenCo strongly hinted at the latter).
- Whether the import is the *cause* of churn or just the visible
  trigger for an already-leaning-out user (Jordan at RocketCo).

These are the things I want this PRD interrogation to sharpen before I
commit a quarter of engineering to it.
