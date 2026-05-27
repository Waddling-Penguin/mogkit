import type { SourceFile } from "./corpus.js";

export type Health = "empty" | "thin" | "developing" | "rich";

export type HealthReport = {
  health: Health;
  count: number;
  typeSpread: Record<string, number>;
  uniqueTypes: number;
  gaps: string[];
};

/**
 * Rules (from ARCHITECTURE.md §Graph + extended for CLI use):
 *   empty       — zero sources
 *   thin        — <8 sources OR only one source type
 *   developing  — >=8 sources, >=2 types, <20 sources
 *   rich        — >=20 sources AND >=3 types
 * Plus surfaced gaps for the report.
 */
export function computeHealth(sources: SourceFile[]): HealthReport {
  const count = sources.length;
  const typeSpread: Record<string, number> = {};
  for (const s of sources) {
    const k = s.type;
    typeSpread[k] = (typeSpread[k] ?? 0) + 1;
  }
  const uniqueTypes = Object.keys(typeSpread).filter(
    (k) => k !== "untagged",
  ).length;

  let health: Health;
  if (count === 0) health = "empty";
  else if (count < 8 || uniqueTypes < 2) health = "thin";
  else if (count >= 20 && uniqueTypes >= 3) health = "rich";
  else health = "developing";

  const gaps: string[] = [];
  if (count > 0 && !typeSpread["interview"]) {
    gaps.push("no Discovery interviews — the most load-bearing source type");
  }
  if (uniqueTypes === 1 && count > 0) {
    gaps.push(
      "only one source type — Discovery thrives on cross-type triangulation",
    );
  }
  const untagged = typeSpread["untagged"] ?? 0;
  if (untagged > 0) {
    gaps.push(
      `${untagged} untagged file${untagged === 1 ? "" : "s"} — run \`mogkit add\` to tag them`,
    );
  }
  return { health, count, typeSpread, uniqueTypes, gaps };
}
