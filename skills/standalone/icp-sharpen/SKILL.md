---
name: icp-sharpen
tier: standalone
wedge: gtm
level: intermediate
description: Tests an ideal customer profile against the accounts the PM has won, lost and retained. Separates the customers you can reach now from the customers you hope to serve later, names who the profile should exclude, and lists the data that would confirm or break it. Sharpens the profile; never invents a segment.
inputs:
  - an ICP description pasted by the PM (who the product is for, in whatever form the team has)
  - optional, a list of won, lost, churned and best-retained accounts with any notes
outputs:
  - a profile check with attribute-by-attribute evidence status, an exclusion list, the early-versus-ideal split, and the data pulls that would test it; never a finished ICP document or persona
methodology: Early Customer Profile versus Ideal Customer Profile (Maja Voje, Go-To-Market Strategist); Jobs to Be Done; cohort retention analysis
---

## Purpose

An ICP that reads "B2B SaaS companies with 50 to 500 employees" excludes
almost nobody. Sales cannot use it to drop a lead and the PM cannot use it to
turn down a feature request. The profile only does work when it names the
situation that makes a customer urgent, and when it says who to walk away
from.

This skill checks a profile against whatever account evidence the PM has. It
separates the early customer profile, meaning the urgent and reachable
segment you can win this quarter, from the longer-term ideal. It does NOT
write the ICP document, build personas, or produce a target account list.

## Procedure

1. Read the profile. Break it into attributes and sort each one as
   **firmographic** (size, industry, region), **situational** (the trigger
   or pain that makes them buy now), or **behavioral** (what they do in the
   product once they have it).
2. If the profile has no situational attribute, flag it first. Firmographics
   describe who could buy. They do not explain why anyone would buy now.
3. If the PM pasted accounts, test each attribute against them:
   - Which won and retained accounts match the attribute?
   - Which won accounts do NOT match it? These are counterexamples.
   - Which lost or churned accounts match the profile fully? These are the
     most useful rows in the data.
   State the counts. With fewer than about ten accounts, say that the
   pattern is anecdote and should be treated as a hypothesis.
4. Build the **exclusion list**. Name the kinds of customer the profile
   should rule out, based on churned or stalled accounts, or on the
   product's stated limits. If the profile excludes nobody, say so.
5. Split **early versus ideal**. The early customer profile is the segment
   that is urgent, reachable through a channel the team has today, and
   forgiving of an unfinished product. Name which parts of the pasted
   profile describe the early segment and which describe the hoped-for one.
6. Check **reachability**. For the early segment, ask where these buyers
   are and how the team gets in front of them. If the profile gives no
   channel, flag it as a gap.
7. List the data pulls that would test the profile, each naming the system
   (CRM, product analytics, billing) and the question.
8. Emit the output contract.

## Output contract

Emit exactly these five sections, in this order.

### Profile as read
The attributes, sorted into firmographic, situational and behavioral. Note
any category that is empty.

### Evidence check
Per attribute, what the pasted accounts support, the counterexamples, and
the sample size. If no accounts were pasted, state that every attribute is
untested.

### Who this excludes
The exclusion list with the reason for each entry, or the statement that
the profile as written excludes no one.

### Early versus ideal
Which attributes describe a customer you can win now, which describe the
later ideal, and what would have to be true to move from one to the other.

### Data that would test it
Up to five pulls, each with the system, the question, and what result
would break the profile.

End with one line: "You decide the profile. An ICP nobody is willing to say
no with is a description, not a decision."

## Guardrails

- NEVER write the finished ICP, a persona, or a named target account list.
  Report what the evidence supports and what is untested.
- Do not invent accounts, segments, win rates, or market sizes. Every count
  in the output comes from what the PM pasted.
- Do not treat a pattern in a handful of accounts as a finding. State the
  sample size next to every claim drawn from it.
- Sales-reported loss reasons are biased toward price and missing features.
  If the pasted notes come only from sellers, say that buyer interviews
  would change the picture.
- Do not pad the exclusion list. Three exclusions with reasons beat ten
  generic ones.
