---
name: pricing-pressure-test
tier: standalone
wedge: gtm
level: advanced
description: Pressure-tests a pricing and packaging proposal, with extra attention to AI features that carry a real cost per use. Checks whether the pricing metric matches the value a customer gets, whether the customer can predict the bill, what the heaviest users do to the margin, and what evidence of willingness to pay exists. Tests the proposal; never sets the price.
inputs:
  - a pricing or packaging proposal pasted by the PM (tiers, what is metered, proposed prices if any)
  - optional, usage distribution, cost per unit of AI work, and any willingness-to-pay evidence
outputs:
  - a pressure test covering metric fit, bill predictability, margin under heavy use, packaging fences and evidence gaps; never a recommended price or a finished pricing page
methodology: Price the layer you sell (Tugce Erten and Sarah Wang, a16z); CAMP test for outcome pricing (Kyle Poyar, Growth Unhinged); Monetizing Innovation (Madhavan Ramanujam); Van Westendorp price sensitivity
---

## Purpose

Seat pricing assumed that one more user cost the vendor almost nothing. An
AI feature breaks that. Every run costs money, the top few percent of users
can consume most of it, and a price that looked healthy at the median can
lose money on the accounts that love the product most.

PMs now sit in the pricing decision with finance and sales. This skill
pressure-tests a proposal before it reaches that room. It does NOT pick the
price, design the tiers, or write the pricing page. It reports where the
proposal breaks and what the PM has to measure.

## Procedure

1. Read the proposal. Restate it as a table: what the customer pays for
   (the metric), what each tier includes, what triggers an overage or an
   upgrade. If the proposal does not say, list each missing cell as a gap.
2. Check **metric fit**. Name the unit the customer pays for and the unit
   of value the customer gets. Apply the rule from Erten and Wang, which is
   to price the layer you sell: tokens for model access, a recognizable
   unit of work or credits for an application, an outcome only when you can
   attribute it. Flag a proposal that charges an application customer per
   token, or that charges per outcome with no way to attribute one.
3. If the proposal uses **outcome pricing**, run Poyar's CAMP test. Is the
   outcome consistent across customers, attributable to the product,
   measurable by both sides, and predictable enough to budget? Report each
   of the four as pass, fail, or unknown.
4. Check **bill predictability**. Walk through a new customer's first
   invoice and the first invoice after heavy use. Ask whether the buyer
   could have predicted both. Flag opaque credits, overages with no cap or
   warning, and any metric the customer cannot see in the product.
5. Run the **margin test**. Using the cost and usage data the PM pasted,
   work the margin for the median account and for the heaviest tenth.
   Include retries, failed runs, retrieval, tool calls and human review if
   the PM listed them. If the PM pasted no cost or usage data, do not
   estimate. List the exact numbers needed.
6. Check the **packaging fences**. For each tier boundary, name what stops
   a customer in the higher tier's target segment from staying on the
   lower one. A fence the customer can route around is a flag.
7. Check the **evidence of willingness to pay**. Sort what the PM has into
   stated (a survey or interview answer), revealed (someone paid, or
   upgraded, or churned over price), or none.
8. Emit the output contract.

## Output contract

Emit exactly these six sections, in this order.

### Proposal as read
The table from step 1, with missing cells marked.

### Metric fit
The paid unit, the value unit, whether they match, and the CAMP result if
outcome pricing is in play.

### Bill predictability
What a customer can and cannot predict, with the specific surprise each
gap would produce on an invoice.

### Margin under heavy use
The worked margin for the median and the heaviest tenth, showing the
arithmetic, or the list of numbers the PM must supply before this test can
run.

### Packaging fences
Per tier boundary, the fence and how a customer gets around it.

### Evidence gaps
What is stated, what is revealed, what is missing, and up to five actions
that would close the largest gaps.

End with one line: "The price is a decision for you, finance and sales.
Bring this list to that meeting."

## Guardrails

- NEVER recommend a specific price, a tier structure, or a discount. The
  output tests a proposal. It does not replace one.
- NEVER invent a cost per run, a usage distribution, a competitor's price,
  or a willingness-to-pay figure. Every number in the output comes from the
  PM's input or is marked "you must measure this".
- Do not quote industry benchmarks as targets. A median margin from a
  survey describes other companies.
- Do not treat a survey answer as proof someone will pay. Label stated and
  revealed evidence separately every time.
- Do not write customer-facing pricing copy, FAQ entries, or a migration
  email for existing customers.
