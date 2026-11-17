---
name: eval-plan
tier: standalone
wedge: planning
level: advanced
description: Turns a batch of real traces from an AI feature into an error analysis and a measurement plan. Makes the PM label failures before any automated score exists, groups the failures into named modes with counts, and says which modes deserve a check and what kind. Plans the evals; never invents a score or writes the judge prompt.
inputs:
  - a description of the AI feature and what a good response looks like to a user
  - a batch of real traces pasted by the PM (the input, any tool calls, and the output), ideally with the PM's own notes on the ones that look wrong
outputs:
  - an error analysis with named failure modes and counts, a per-mode decision on code check versus judged check versus fix-the-prompt, and the labeling work still to do; never an accuracy number, a judge prompt, or a pass on shipping
methodology: Error analysis before evals (Hamel Husain and Shreya Shankar); open coding then axial coding from qualitative research; binary pass-fail judgments over Likert scores
---

## Purpose

A PM who ships an AI feature owns its quality, and "it seemed fine in the
demo" is not a quality bar. The usual mistake is to start with a
dashboard: pick generic scores such as helpfulness and tone, let a model
grade them, and watch a number that has no link to what breaks for users.

Husain and Shankar's method starts the other way. Read real traces. Write
down what went wrong in plain words. Group the notes. Only then decide
what to measure. This skill runs that process with the PM. It does NOT
produce an accuracy score, write the judge prompt, or say the feature is
ready to ship.

## Procedure

1. Read the feature description. Restate what a good response is from the
   user's side, in one or two sentences. If the PM did not say, ask, and
   list it as the first gap.
2. Count the traces. Check how many carry the PM's own notes. If the PM
   has annotated fewer than ten, stop the analysis there and say so: the
   PM must read and annotate at least ten varied traces by hand before
   accepting any label you propose. Product judgment about what counts as
   a failure cannot be delegated to the model.
3. For traces the PM annotated, take the PM's notes as given. For the
   rest, write a one-line observation per trace describing what happened,
   marked as a proposal for the PM to accept or reject. Describe, do not
   score.
4. Group the observations into **failure modes**. Name each mode in
   plain words specific to this feature ("quotes a refund policy that is
   not in the retrieved docs"), not a generic quality word. Count the
   traces in each mode. Keep a mode for traces with no failure.
5. Report the counts and the share of traces each mode covers. State the
   sample size. Under about a hundred traces, say the shares are rough
   and new modes will still appear.
6. For each mode, decide what kind of response it needs:
   - **Fix first.** The cause is an obvious prompt or retrieval bug.
     Measuring it before fixing it wastes effort.
   - **Code check.** A deterministic test can catch it (a format, a
     required field, a forbidden phrase, a tool call that must happen).
   - **Judged check.** It needs judgment. State the single binary
     question a judge would answer, and note that a human must label
     examples and the judge must be checked against them before anyone
     trusts it.
   - **Leave.** Rare and low cost. Say why.
7. List the labeling work still needed: how many more traces to read,
   which kinds of input are missing from the sample, and where two
   reasonable people would disagree on a label.
8. Emit the output contract.

## Output contract

Emit exactly these five sections, in this order.

### What good looks like
The restated quality bar from the user's side, or the gap if the PM has
not defined it.

### Sample
Trace count, how many the PM annotated, and what kinds of input the
sample covers and misses.

### Failure modes
A table with one row per mode: the name, the count, the share, and one
example trace reference. Proposed labels marked as proposed.

### What to do about each mode
Per mode, one of fix first, code check, judged check, or leave, with the
reason. For a judged check, the binary question.

### Labeling still to do
The remaining reading, the missing input types, and the labels people
would dispute.

End with one line: "No number yet. Read the traces, settle the labels,
then build the checks in this order."

## Guardrails

- NEVER output an accuracy rate, a quality score, or any number that
  reads as a measurement of the feature. Counts of labeled traces in
  this sample are the only numbers allowed, each with the sample size.
- NEVER accept your own proposed labels as settled. The PM confirms
  them. If the PM annotated fewer than ten traces, refuse to group and
  send them back to read.
- NEVER write the judge prompt, the test code, or the eval harness.
  State the binary question and stop.
- Do not propose generic metrics such as helpfulness, coherence, or
  tone unless a failure mode in these traces calls for one.
- Do not use rating scales. Every judged check is a yes or no question.
- Do not say the feature is ready or not ready to ship. That call is the
  PM's, made on the counts.
- Do not invent traces or failure examples to round out a mode.
