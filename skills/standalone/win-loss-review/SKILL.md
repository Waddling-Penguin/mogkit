---
name: win-loss-review
tier: standalone
wedge: gtm
level: intermediate
description: Reads a batch of won and lost deal notes or call transcripts and reports why deals went the way they did, with a quote behind every reason. Separates what buyers said from what sellers recorded, counts how often each reason appears, and names the product gaps and the misunderstood capabilities. Reports the pattern; never writes the battlecard.
inputs:
  - deal notes, CRM close reasons, or sales and buyer call transcripts pasted by the PM, each marked won or lost
outputs:
  - a quote-backed readout of decision reasons with counts, the split between buyer-stated and seller-recorded reasons, roadmap signals, and the buyer interviews worth running; never a battlecard, an objection script, or a roadmap decision
methodology: Four layers of win-loss intelligence (Adam McQueen, Product Marketing Alliance); buyer-interview win-loss practice (Clozd, Anova); Jobs to Be Done switch timeline
---

## Purpose

The CRM says the deal was lost on price. The buyer, asked directly, says
the demo never showed the one integration they needed. Seller-recorded
close reasons lean toward price and missing features, because those are
the reasons that are nobody's fault.

PMs own the path from deal outcomes back to the roadmap. This skill reads
the raw material and reports the pattern with the evidence attached. It
does NOT write a battlecard, an objection-handling script, or a
competitor teardown, and it does not decide what goes on the roadmap.

## Procedure

1. Read every item. For each deal record the outcome (won or lost), the
   source type (**buyer** words from a transcript or interview, or
   **seller** notes and CRM fields), and the competitor or alternative
   named, if any.
2. Report the sample first: how many deals, how many won and lost, how
   many have any buyer words at all. If fewer than about ten deals, or if
   there are no buyer words, state that the readout is a hypothesis list.
3. Extract the **decision reasons** per deal. A reason needs a verbatim
   quote. A reason you inferred with no quote goes in a separate list
   marked as inference.
4. Group the reasons. Count how many deals each reason appears in, split
   by won and lost and by buyer versus seller source. Keep the groups
   concrete ("no SSO on the mid tier"), not abstract ("security").
5. Compare **buyer-stated against seller-recorded**. Where the same deal
   has both, note where they disagree. Where a reason appears only in
   seller notes across many deals, flag it as unverified.
6. Sort the product-related reasons into two lists:
   - **Real gaps.** The product does not do the thing.
   - **Misunderstood capabilities.** The product does it and the buyer
     did not know. The PM must confirm which list each item belongs in,
     so mark your sorting as provisional.
7. Note what the **wins** have in common that the losses lack, with
   counts. This matters as much as the loss reasons.
8. Name the deals most worth a direct buyer interview, with the one
   question the notes leave open for each.
9. Emit the output contract.

## Output contract

Emit exactly these five sections, in this order.

### Sample
Deal counts, won and lost, share with buyer words, and the confidence
statement.

### Why deals were won and lost
Grouped reasons, each with its counts and one or two verbatim quotes
with the deal they came from. Inferred reasons in a separate, labeled
list.

### Where buyers and sellers disagree
The deals or reasons where the two sources tell different stories, and
the reasons that rest on seller notes alone.

### Signals for the roadmap
The provisional lists of real gaps and misunderstood capabilities, each
with its deal count. No ranking of what to build.

### Interviews worth running
Up to five deals, each with the open question.

End with one line: "This is what the notes say. A buyer interview beats
a CRM field, so run the interviews before you move the roadmap."

## Guardrails

- NEVER state a reason without a verbatim quote and the deal it came
  from. No quote means it goes in the inference list.
- NEVER write a battlecard, talk track, objection response, or competitor
  comparison. Those are artifacts for PMM and sales to write from this
  readout.
- Do not invent quotes, deals, competitors, or counts. Do not smooth a
  quote into something the buyer did not say.
- Do not rank roadmap items or recommend what to build. Report frequency
  and evidence and leave the decision with the PM.
- State the sample size next to every pattern. Three lost deals are not
  a trend.
- Strip personal details the output does not need. Refer to buyers by
  role and company, not by name.
