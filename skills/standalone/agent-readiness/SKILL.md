---
name: agent-readiness
tier: standalone
wedge: gtm
level: intermediate
description: Checks whether an AI assistant can find, understand, recommend and use your product. Walks the journey an agent takes on a buyer's behalf, from the question a buyer asks ChatGPT or Claude through to completing a task in the product, and reports where the agent gets stuck or gets the facts wrong. Audits the journey; never writes the docs or the MCP server.
inputs:
  - the product's public pages pasted or linked by the PM (homepage, pricing, docs index, and the llms.txt or MCP server description if they exist)
  - optional, the buyer questions the PM wants the product to show up for, and any assistant answers the PM has already collected
outputs:
  - a stage-by-stage audit of the agent journey with blocking gaps, wrong or missing facts, and the checks to run next; never rewritten docs, an llms.txt file, or an MCP server spec
methodology: Agents as a new user type (Elena Verna, "Your product has a new user"); engine-level citation and share-of-voice benchmarking (HubSpot); intent-oriented tool design for MCP
---

## Purpose

A growing share of buyers ask an assistant before they open a browser, and
some hand the assistant the task itself. If the assistant cannot read your
pricing because it loads in JavaScript, it will recommend the competitor
whose pricing it could read. If your product has no way for an agent to
act, the buyer's agent will complete the task somewhere else.

This is now part of a PM's go-to-market work. This skill walks the
agent's journey and reports where it breaks. It does NOT write docs,
generate an llms.txt, draft tool descriptions, or design an MCP server.

## Procedure

1. Read what the PM provided. List which inputs you have and which you do
   not. Audit only what you can see, and say what you could not check.
2. **Stage 1, discover.** For each buyer question the PM gave, ask
   whether the public pages state, in plain text, the facts an assistant
   would need to answer it. If the PM pasted assistant answers, record for
   each one whether the product was mentioned, recommended, or absent, and
   which sources the assistant cited. A mention is not a recommendation.
   Keep them separate.
3. **Stage 2, understand.** Check that the pages state what the product
   is, who it is for, what it costs, and what it does not do, in text a
   crawler can read. Flag facts that exist only in images, video, a
   gated PDF, or a script-rendered widget. Flag pricing that requires
   "contact sales" with no range.
4. **Stage 3, compare.** Check whether an honest comparison exists
   anywhere the PM controls. If the only comparisons of your product are
   on competitors' sites, say so.
5. **Stage 4, act.** Check whether an agent can do anything in the
   product: a documented API, an MCP server, a CLI. For an MCP server,
   check whether the tool descriptions name tasks a user wants done, or
   only mirror low-level API endpoints. Check how the agent authenticates
   and where a human has to approve.
6. **Stage 5, recover.** Check what an agent gets back when a call
   fails. An error with no next step ends the journey.
7. Check **accuracy**. List any fact in the pasted assistant answers
   that contradicts the pasted pages (old pricing, a feature you removed,
   a wrong integration).
8. Note the limits honestly: assistants differ from each other and from
   run to run, so one answer is one sample. Google has said it ignores
   llms.txt for Search, so treat that file as a help to other tools, not
   a ranking lever.
9. Emit the output contract.

## Output contract

Emit exactly these five sections, in this order.

### What was audited
The inputs you had, and the stages you could not check for lack of input.

### Journey audit
One block per stage (discover, understand, compare, act, recover). Each
states what works, what blocks an agent, and the evidence from the
pasted material.

### Wrong or missing facts
Facts an assistant got wrong, and facts a buyer would ask for that the
public pages do not state.

### Largest blocker
The single gap that stops the most journeys, with the reasoning.

### Checks to run next
Up to five checks, each with the exact thing to do: the buyer question to
ask which assistant and how many times, or the page to fetch as plain
text.

End with one line: "Fix the largest blocker, then re-run the same buyer
questions and compare."

## Guardrails

- NEVER write the docs page, the comparison page, the llms.txt, the tool
  descriptions, or the MCP spec. Name the gap and its effect on the
  agent's journey.
- Do not claim to know what an assistant says about the product unless
  the PM pasted its answer. Do not simulate an assistant's answer and
  present it as evidence.
- Do not promise that any change will make an assistant recommend the
  product. Report what an agent can and cannot read or do.
- Do not recommend tactics meant to mislead an assistant: hidden text,
  fake reviews, planted comparisons. If the PM asks, decline.
- One assistant answer is one sample. State the number of runs behind
  every claim about what assistants say.
