---
type: research
title: "Competitor scan — Linear's onboarding"
addedAt: 2026-04-05T12:00:00Z
author: PM
sources: ["linear.app docs", "personal trial of Linear, March 2026"]
---

## What Linear does

Linear's first-run experience asks four questions before showing any
product surface:

1. Team size.
2. What you're currently using.
3. Whether you want to import or start fresh.
4. Whether you want SSO.

Each answer changes the next step. If you say "import from Jira" they
launch a native API connector that handles comments and attachments and
takes 5–10 minutes for a typical workspace. If you say SSO they ship
you to the right setup page for your IdP. If you say "starting fresh"
they create a starter set of teams/labels that match your stated team
size.

## What's clever about it

The four-question gate forces the admin to make exactly the decisions
they were going to have to make anyway, *in the order the product is
about to need them*. It feels like a setup wizard, but functionally
it's a forcing function for the calls the admin was procrastinating on.

It also segments the user before they see the product, which means the
empty state can be tailored. A 6-person team gets a single team default;
a 60-person org gets a multi-team structure with a default labels system.

## Where it might not transfer cleanly to us

- Linear is opinionated about workflow. Pebble is intentionally less
  opinionated. The "starter set" step is harder for us — we don't have
  a single canonical answer to "what should your first board look like."
- Linear's user is overwhelmingly engineering-led. Our SMB segment is
  often ops/team-lead-led with less appetite for a four-step gate
  before seeing the product.

## What I'd take

The "decide admin first, see product second" sequencing. Skip the
opinionated starter set. Make the SSO and import branches first-class.
