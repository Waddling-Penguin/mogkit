import * as p from "@clack/prompts";
import kleur from "kleur";
import { existsSync, statSync } from "node:fs";
import { resolve, basename } from "node:path";
import { findWorkspaceRoot } from "../lib/workspace.js";
import { workspacePaths } from "../lib/paths.js";
import { SOURCE_TYPES, SOURCE_TYPE_LABEL } from "../lib/source-types.js";
import { ingestFile } from "../lib/corpus.js";

export type AddOptions = {
  file?: string;
  type?: string;
  title?: string;
};

export async function runAdd(opts: AddOptions): Promise<number> {
  const root = findWorkspaceRoot();
  if (!root) {
    p.log.error(
      "no mogkit workspace found here or in any parent directory.\n" +
        "  run `mogkit init` first, then `cd` into the workspace.",
    );
    return 1;
  }
  const paths = workspacePaths(root);

  p.intro(kleur.bold("mogkit add"));

  // File path
  let filePath = opts.file;
  if (!filePath) {
    const ans = await p.text({
      message: "path to the file to ingest?",
      placeholder: "./notes/interview-03.md",
      validate(v) {
        if (!v) return "required";
        const abs = resolve(v);
        if (!existsSync(abs)) return `not found: ${abs}`;
        if (!statSync(abs).isFile()) return "must be a file";
        return undefined;
      },
    });
    if (p.isCancel(ans)) {
      p.cancel("cancelled.");
      return 1;
    }
    filePath = ans;
  }
  const absPath = resolve(filePath);
  if (!existsSync(absPath) || !statSync(absPath).isFile()) {
    p.log.error(`not a file: ${absPath}`);
    return 1;
  }

  // Type
  let type = opts.type as (typeof SOURCE_TYPES)[number] | undefined;
  if (!type) {
    const ans = await p.select({
      message: "what kind of source is this?",
      options: SOURCE_TYPES.map((t) => ({
        value: t,
        label: SOURCE_TYPE_LABEL[t],
      })),
    });
    if (p.isCancel(ans)) {
      p.cancel("cancelled.");
      return 1;
    }
    type = ans as (typeof SOURCE_TYPES)[number];
  }
  if (!SOURCE_TYPES.includes(type as (typeof SOURCE_TYPES)[number])) {
    p.log.error(
      `unknown type "${type}". one of: ${SOURCE_TYPES.join(", ")}`,
    );
    return 1;
  }

  // Title (optional)
  let title = opts.title;
  if (!title) {
    const ans = await p.text({
      message: "optional title (press enter to use the filename)",
      placeholder: basename(absPath),
      defaultValue: "",
    });
    if (p.isCancel(ans)) {
      p.cancel("cancelled.");
      return 1;
    }
    title = ans || undefined;
  }

  // Ingest
  let written: string;
  try {
    written = ingestFile(paths.sources, absPath, {
      type: type as (typeof SOURCE_TYPES)[number],
      title,
    });
  } catch (e) {
    p.log.error((e as Error).message);
    return 1;
  }

  p.outro(
    kleur.green("✓") +
      ` ingested as ` +
      kleur.bold(`sources/${basename(written)}`) +
      kleur.dim(` (type: ${type})`),
  );
  return 0;
}
