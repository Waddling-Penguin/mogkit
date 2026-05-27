# mogkit — Skill Authoring Spec

The format every `SKILL.md` must follow. Also the contributor reference: a new contributor reads this and `VISION-AND-PRINCIPLES.md` and can ship a valid skill. This file is mirrored into the repo as `skills/SKILL-SPEC.md`.

---

## File and folder

One skill = one folder = one `SKILL.md`.

```
skills/standalone/<skill-name>/SKILL.md     # Tier A
skills/discovery/<skill-name>/SKILL.md      # Tier B
```

`<skill-name>` is kebab-case and matches the `name` in frontmatter.

---

## Frontmatter (YAML, required)

```yaml
name: prd-interrogate
tier: discovery              # standalone | discovery
wedge: discovery             # discovery | strategy | planning | gtm | conflict
level: advanced              # beginner | intermediate | advanced
summary: One sentence. What the skill does and what the PM walks away with.
inputs:
  - graph/graph.json
  - a stated PRD intent
outputs:
  - an interrogation scaffold (supported / assumed / unvalidated / who-to-talk-to)
methodology: Continuous Discovery (Torres); Working Backwards (Amazon)
```

`methodology` names the craft tradition the skill encodes. A skill with no methodology is probably a generic wrapper — reconsider it.

---

## Body (markdown, required sections in order)

### `## Purpose`
One short paragraph. What the skill is for and — explicitly — what it deliberately does **not** do.

### `## Procedure`
Numbered steps, written *to the agent*. Each step is one action. Tier B skills must include a step that reads corpus `health` and branches on it.

### `## Output contract`
The exact structure the skill returns. Every interrogator skill returns a three-part shape:
1. **What we know** — grounded findings or a red-team, with provenance where a corpus exists.
2. **What we don't** — explicit gaps, unknowns, untested assumptions.
3. **What to do next** — the questions or actions that close the gaps.

State the headings the skill will emit so output is consistent and parseable.

### `## Guardrails`
The relevant principles from `VISION-AND-PRINCIPLES.md`, restated as hard rules for *this* skill. Every skill that produces or implies a deliverable must explicitly forbid generating the finished artifact. This section is not optional and not boilerplate — write it for the specific skill.

---

## Validation

CI validates every `SKILL.md`: frontmatter present and typed; all required body sections present and in order; `## Guardrails` non-empty. A skill that fails validation does not merge.

---

## Worked example — `skills/discovery/prd-interrogate/SKILL.md`

This is the gold standard. It is the load-bearing skill for principle 1 (interrogator, not generator). Build the other skills to this level.

```markdown
---
name: prd-interrogate
tier: discovery
wedge: discovery
level: advanced
summary: Turns a PRD intent into an interrogation — what your evidence supports, what is assumed, and what to validate — so you write a sharper PRD yourself.
inputs:
  - graph/graph.json
  - a stated PRD intent from the PM
outputs:
  - an interrogation scaffold with four sections; never a PRD
methodology: Continuous Discovery (Torres); Working Backwards (Amazon)
---

## Purpose

The PM is about to write a PRD. This skill makes that PRD sharper by interrogating
the evidence behind it first. It identifies what the source corpus actually supports,
what the PM is assuming without evidence, and who has not been talked to.

It does NOT write the PRD. The PM writes the PRD. Producing the document would let
the PM skip the synthesis that this skill exists to force. The output is a scaffold
the PM thinks against, not a draft they edit.

## Procedure

1. Read `graph/graph.json`. If it does not exist, tell the PM to run `graphify`
   first and stop.
2. Read `meta.health`. If `thin`, state this prominently: the interrogation will be
   mostly gaps, and that is the correct and useful result — it shows what to collect.
3. Take the PM's stated PRD intent (the feature or problem the PRD will cover).
4. From the graph, gather every node and edge relevant to that intent. For each,
   note its provenance.
5. Separate the relevant material into: claims with multi-source support; claims
   with single-source support; `Assumption` nodes (no support); and intent elements
   the graph says nothing about at all.
6. Identify which user segments and personas relevant to the intent have zero or
   thin representation in `sources/`.
7. Emit the output contract below. Do not emit a PRD, an outline of a PRD, or
   prose that could be pasted into a PRD.

## Output contract

Emit exactly these four sections:

### Supported by evidence
Claims behind the PRD that the corpus backs, each with its provenance. These are
the parts of the PRD the PM can write with confidence.

### Assumed without evidence
`Assumption` nodes and single-source claims the PRD would rely on. For each: state
the assumption plainly and name the risk if it is wrong.

### Unvalidated entirely
Elements of the PRD intent the corpus is silent on. The PM is flying blind here.

### Who you haven't talked to
Segments/personas relevant to this PRD that are absent or thin in the corpus, and
the single most important question to ask each.

End with one line: "Write the PRD yourself. Use this to know which parts are solid,
which parts to hedge, and what to go validate first."

## Guardrails

- NEVER output a PRD, a PRD draft, a PRD outline, or paste-ready PRD prose. If the
  PM asks again for the document itself, restate that the scaffold is the
  deliverable and why.
- Every claim in "Supported by evidence" MUST carry provenance. No provenance, no
  claim — move it to "Assumed without evidence."
- On a thin corpus, do not soften the result to seem more useful. A scaffold that
  is 80% gaps is the honest and valuable answer.
- Do not invent segments, quotes, or evidence not present in the graph.
```

---

## Notes for building the other 12 skills

- **Tier A skills** have no `graph/graph.json` input — their input is pasted text. Drop the corpus-reading procedure steps; keep the same three-part output contract and the same `## Guardrails` rigor.
- The three-part output shape is universal. `spec-stress-test`'s "what we know" is a red-team; `metrics-tree`'s is a decomposition; `interview-coach`'s is a coaching review. The shape holds; the content differs.
- A skill whose `## Guardrails` could be copy-pasted into another skill unchanged is under-specified. Write guardrails for the specific failure mode of the specific skill.
