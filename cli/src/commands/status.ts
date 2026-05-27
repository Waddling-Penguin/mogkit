import kleur from "kleur";
import { findWorkspaceRoot } from "../lib/workspace.js";
import { workspacePaths } from "../lib/paths.js";
import { listSources } from "../lib/corpus.js";
import { computeHealth, type Health } from "../lib/health.js";
import { SOURCE_TYPE_LABEL, type SourceType } from "../lib/source-types.js";

const HEALTH_COLOR: Record<Health, (s: string) => string> = {
  empty: kleur.gray,
  thin: kleur.yellow,
  developing: kleur.cyan,
  rich: kleur.green,
};

const HEALTH_QUIP: Record<Health, string> = {
  empty:
    "no sources yet. can't mog on vibes — run `mogkit add` to ingest your first file.",
  thin: "corpus: thin. respectfully, this is not yet a mogging-grade evidence base.",
  developing:
    "corpus: developing. cross-type triangulation is starting to be possible.",
  rich: "corpus: rich. the graph will support real interrogation.",
};

export function runStatus(): number {
  const root = findWorkspaceRoot();
  if (!root) {
    console.error(
      kleur.red("no mogkit workspace found here.") +
        " run `mogkit init` first, then `cd` into the workspace.",
    );
    return 1;
  }
  const paths = workspacePaths(root);
  const sources = listSources(paths.sources);
  const report = computeHealth(sources);

  const color = HEALTH_COLOR[report.health];
  console.log("");
  console.log(kleur.bold("mogkit status"));
  console.log(kleur.dim(root));
  console.log("");
  console.log(`  health        ${color(kleur.bold(report.health))}`);
  console.log(`  sources       ${report.count}`);
  console.log(`  types         ${report.uniqueTypes}`);

  if (report.count > 0) {
    console.log("");
    console.log(kleur.bold("  type spread"));
    const entries = Object.entries(report.typeSpread).sort((a, b) => b[1] - a[1]);
    for (const [t, n] of entries) {
      const label = SOURCE_TYPE_LABEL[t as SourceType] ?? t;
      console.log(`    ${String(n).padStart(3)}  ${label}`);
    }
  }

  if (report.gaps.length > 0) {
    console.log("");
    console.log(kleur.bold("  gaps"));
    for (const g of report.gaps) console.log(`    • ${g}`);
  }

  console.log("");
  console.log("  " + kleur.dim(HEALTH_QUIP[report.health]));
  console.log("");
  return 0;
}
