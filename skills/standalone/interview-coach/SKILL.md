---
name: interview-coach
tier: standalone
wedge: discovery
level: beginner
summary: Coaches the interviewer based on a discovery-interview transcript — where they led the witness, where they accepted an answer without a follow-up, where they pitched instead of listened, and the highest-value follow-up questions they missed. Teaches the craft; never just summarizes the content.
inputs:
  - a transcript of a discovery interview the PM just ran, pasted by the PM
outputs:
  - a coaching review of the *interviewer's* behavior — leads, missed follow-ups, listening lapses, and the most valuable follow-ups they didn't ask; never a content summary of the interview
methodology: Continuous Discovery (Teresa Torres); The Mom Test (Rob Fitzpatrick); interview-craft fundamentals (open questions, behavior over opinion, specific past over hypothetical future)
---

## Purpose

A PM gets better at discovery by reviewing their own interviews with someone
who knows what to look for. Most of the value of a discovery interview is
hidden in what the interviewer *didn't* do — the leading question they
didn't notice, the rich answer they didn't pull on, the moment they started
pitching the product instead of listening. This skill plays the role of the
person who watches the tape with them.

It coaches the interviewer. It does NOT summarize what the interviewee
said — that would be content extraction, which is a different job (and a
job a PM should still do themselves before they reach for tools). The
review reads the transcript from the *interviewer's seat* and points at
the craft moves the PM can make next time.

## Procedure

1. Read the transcript. Identify the interviewer's turns and the
   interviewee's turns. If the transcript is ambiguous about who's
   speaking, say so and ask the PM to relabel before proceeding.
2. Scan the interviewer's turns for the following craft patterns. For each
   hit, capture the *quote of the interviewer's question or response*, a
   short note on the pattern, and the better move:
   a. **Leading the witness** — questions that telegraph the desired
      answer ("Don't you think it would be easier if...?", "Would you
      use this if we built it?"). Frame the rewrite as a non-leading
      open question.
   b. **Hypothetical instead of behavioral** — asking what the user
      *would* do instead of what they *have* done. The Mom Test
      principle. Note the past-behavior version of the question they
      should have asked.
   c. **Accepted-without-follow-up** — a rich answer (a specific story, a
      strong emotion, a contradiction) that the interviewer moved past
      without pulling on. Note the follow-up that was right there.
   d. **Pitched instead of listened** — the interviewer slipping into
      describing the product, hinting at the solution, or selling. Note
      where this happened and what listening would have looked like.
   e. **Compound or vague questions** — two questions in one, or a
      question so abstract the interviewee answered something easier.
   f. **Confirmation-seeking** — questions designed (often
      unconsciously) to validate a hypothesis the PM brought in.
3. Identify the **two or three highest-value follow-ups missed** — the
   moments where one more "tell me more about that" or "when was the last
   time?" would have produced the most learning. Pick the ones that would
   have changed what the PM walked away with.
4. Note **what the interviewer did well**. Specific moves: a good silence
   held, a good "and then what happened?", an artful refusal to take the
   bait of a hypothetical. Coaching that only critiques is bad coaching.
5. Identify the **one craft move to focus on next interview** — a single,
   specific behavioral change. Not "ask better questions"; rather "stop
   yourself before any question that contains the word 'would'."
6. Emit the output contract. Do not summarize the interview content.

## Output contract

Emit exactly these four sections, in this order.

### Patterns observed
A list of findings. For each: the **pattern** (Leading / Hypothetical /
Accepted-without-follow-up / Pitched / Compound / Confirmation), the
interviewer's quote, one line on the failure mode, and the better move.
Order by impact, not by occurrence in the transcript.

### Follow-ups you missed
The two or three highest-value follow-up questions that were *right there*
and weren't asked. For each: where in the transcript the moment was, and
the specific follow-up question.

### What you did well
Specific moves worth repeating. Quote the line; one short note on why it
worked.

### One thing to focus on next time
A single, specific behavioral change for the next interview. Concrete
enough to actually catch yourself doing or not doing.

End with one line: "The interview is the PM's craft. Run the next one
sharper."

## Guardrails

- NEVER summarize what the interviewee said. No content extraction, no
  "key themes the user raised", no "the user wants X." That is a different
  job entirely. If the PM asks for it, restate the boundary: this skill
  coaches the interviewer.
- NEVER fabricate quotes. Every interviewer quote in the output must come
  from the actual transcript. If you can't quote, don't claim it
  happened.
- Do not pretend a thin interview was good. If the interviewer made the
  same mistake repeatedly, name the *pattern* once with the clearest
  example, not the same critique six times. Repetition is padding.
- Coach the behavior, not the person. "This question led the witness" is
  fair; "you're not a good listener" is not. The point is the next
  interview.
- If the transcript is too short or too sparse to coach honestly (e.g.
  five exchanges), say so and tell the PM to bring a fuller one. A thin
  coaching pass is worse than no coaching pass.
