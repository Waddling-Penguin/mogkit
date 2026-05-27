export const SOURCE_TYPES = [
  "interview",
  "ticket",
  "prd",
  "memo",
  "research",
  "transcript",
  "note",
  "other",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

export const SOURCE_TYPE_LABEL: Record<SourceType, string> = {
  interview: "discovery interview",
  ticket: "support ticket",
  prd: "PRD / spec",
  memo: "strategy doc / memo",
  research: "external research",
  transcript: "meeting / call transcript",
  note: "PM note",
  other: "other",
};
