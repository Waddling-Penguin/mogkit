---
type: ticket
title: "Ticket #08456 — Jira import drops comments"
addedAt: 2026-04-16T09:45:00Z
ticketId: "08456"
status: open
priority: P3
---

## Conversation

**Customer (Devon, Lakeside, mid-market, 22 seats):**

> Tried the Jira CSV import. Issues came over, but every comment thread
> on every issue is gone. We have 18 months of context in those comments
> and we can't lose it. Is there a way to pull comments too?

**Support (Riley):**

> The CSV import doesn't include comments — Jira's CSV export omits them
> for technical reasons. We have a native Jira API import in beta that
> preserves comments and attachments. I can opt your workspace into it.

**Customer:**

> Yes please. We're stalled on the rollout until this works.

**Internal tag:** `import-friction`, `jira-migration`, `data-fidelity`

**Note (Riley, internal):**
This is the 6th request for native-Jira-with-comments this month. The
beta works but we haven't promoted it because the rate limiter is shaky
under high-issue counts. Worth flagging to product.
