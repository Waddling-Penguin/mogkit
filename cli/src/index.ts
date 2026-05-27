import { Command } from "commander";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";
import { runStatus } from "./commands/status.js";
import { runSkillsList, runSkillsAdd } from "./commands/skills.js";
import { runDoctor } from "./commands/doctor.js";
import { runDemo } from "./commands/demo.js";

const program = new Command();

program
  .name("mogkit")
  .description(
    "the open-source toolkit for product managers. scaffolds a PM workspace and installs Claude Code skills.",
  )
  .version("0.1.0");

program
  .command("init")
  .description("scaffold a mogkit workspace; git init; install bundled skills")
  .argument("[dir]", "workspace directory name")
  .option("-y, --yes", "accept defaults; non-interactive")
  .action(async (dir, opts) => {
    process.exitCode = await runInit(dir, opts);
  });

program
  .command("add")
  .description("ingest a file into sources/, tag by type")
  .option("-f, --file <path>", "file to ingest (skips the prompt)")
  .option("-t, --type <type>", "source type (skips the prompt)")
  .option("--title <title>", "optional title")
  .action(async (opts) => {
    process.exitCode = await runAdd(opts);
  });

program
  .command("status")
  .description("corpus health report — count, type spread, gaps")
  .action(() => {
    process.exitCode = runStatus();
  });

program
  .command("demo")
  .description("load the bundled 8-file sample corpus into sources/")
  .action(async () => {
    process.exitCode = await runDemo();
  });

const skills = program.command("skills").description("manage installed skills");
skills
  .command("list")
  .description("list bundled skills + install state")
  .action(() => {
    process.exitCode = runSkillsList();
  });
skills
  .command("add <name>")
  .description("install a skill into .claude/skills/")
  .action((name) => {
    process.exitCode = runSkillsAdd(name);
  });

program
  .command("doctor")
  .description("verify Claude Code + skills setup; plain-language fixes")
  .action(() => {
    process.exitCode = runDoctor();
  });

program.parseAsync(process.argv);
