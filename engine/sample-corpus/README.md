# sample-corpus

A realistic 8-document corpus used as the demo and acceptance fixture for the
mogkit Discovery knowledge engine. The fictional product is **Pebble**, a
project management tool for small product teams. The PM is investigating
**onboarding and activation drop-off** ahead of writing a v2 onboarding PRD.

Mix:
- 3 discovery interviews (`interview-*.md`)
- 2 support tickets (`ticket-*.md`)
- 1 PRD draft / intent (`prd-onboarding-v2-draft.md`)
- 1 strategy memo (`memo-q2-activation-strategy.md`)
- 1 competitor research note (`research-competitor-linear-onboarding.md`)

This corpus is intentionally rich enough to produce a non-trivial graph
(`engine/sample-graph.json` is the exemplar) and to surface real Assumptions
and gaps when the discovery skills run against it.

For the cold-start-honesty acceptance, see `../thin-corpus/`.
