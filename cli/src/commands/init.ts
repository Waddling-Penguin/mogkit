import * as p from "@clack/prompts";
import kleur from "kleur";
import { scaffoldWorkspace } from "../lib/workspace.js";

export type InitOptions = {
  yes?: boolean;
};

export async function runInit(
  dir: string | undefined,
  opts: InitOptions,
): Promise<number> {
  p.intro(kleur.bold("mogkit init"));

  let target = dir;
  if (!target) {
    if (opts.yes) {
      target = "mogkit-workspace";
    } else {
      const ans = await p.text({
        message: "workspace directory name?",
        placeholder: "mogkit-workspace",
        defaultValue: "mogkit-workspace",
      });
      if (p.isCancel(ans)) {
        p.cancel("cancelled.");
        return 1;
      }
      target = ans;
    }
  }

  const spinner = p.spinner();
  spinner.start(`scaffolding ${target}`);
  let result;
  try {
    result = scaffoldWorkspace(target);
  } catch (e: unknown) {
    spinner.stop(kleur.red("scaffold failed"));
    p.log.error((e as Error).message);
    return 1;
  }
  spinner.stop(kleur.green(`scaffolded ${result.root}`));

  p.log.info(
    `installed ${kleur.bold(String(result.installedSkills.length))} skill(s): ` +
      result.installedSkills.join(", "),
  );
  if (result.gitInitialized) {
    p.log.info(`git initialized — your corpus is now versioned.`);
  } else {
    p.log.warn(
      `git not initialized (couldn't find git on PATH). install git, then run ` +
        kleur.cyan("git init") +
        ` inside the workspace.`,
    );
  }

  p.note(
    [
      `${kleur.bold("Next:")}`,
      `  ${kleur.cyan("cd " + target)}`,
      ``,
      `  ${kleur.dim("# install mogkit globally so it's on your PATH")}`,
      `  ${kleur.cyan("npm install -g mogkit")}`,
      ``,
      `  ${kleur.cyan("mogkit doctor")}  — verify your setup`,
      `  ${kleur.cyan("mogkit demo")}    — load the sample corpus to play with`,
      `  ${kleur.cyan("mogkit add")}     — ingest your own research file`,
      ``,
      `  ${kleur.dim("then open this directory in Claude Code and run a skill")}`,
    ].join("\n"),
    "workspace ready",
  );
  p.outro(
    kleur.green("✓") +
      " workspace ready. " +
      kleur.dim("you are now legally allowed to mog."),
  );
  return 0;
}
