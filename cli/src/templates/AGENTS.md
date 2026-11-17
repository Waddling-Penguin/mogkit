# mogkit workspace

This folder is a mogkit product management workspace. These instructions are
for any AI coding assistant that reads AGENTS.md, such as Codex or Cursor.

1. Read `CLAUDE.md` in this folder before you act and follow it as your
   instructions. It applies to every assistant, not only Claude.
2. The skills are in `.agents/skills/`. Each folder has a `SKILL.md` with a
   procedure to follow and an output format to use.
3. When the user names a skill, for example "use the tradeoff-frame skill",
   open that skill's `SKILL.md` and follow it exactly.
4. Save a copy of every skill output to
   `knowledge/<skill-name>/<YYYY-MM-DD>-<short-slug>.md`.
5. Never write the finished deliverable. Return the gaps and the questions.
   The user writes the document.
