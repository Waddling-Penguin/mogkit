import { defineCollection, z, reference } from "astro:content";
import { glob } from "astro/loaders";

const WEDGES = ["discovery", "strategy", "planning", "gtm", "conflict"] as const;
const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

const wedges = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/wedges" }),
  schema: z.object({
    title: z.string(),
    slug: z.enum(WEDGES),
    order: z.number(),
    summary: z.string(),
    problem: z.string(),
    engineStatus: z.enum(["full", "coming"]).default("coming"),
    skills: z.array(z.string()).default([]),
    material: z.array(reference("material")).default([]),
  }),
});

const workflows = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/workflows" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    wedge: z.enum(WEDGES),
    tools: z.array(z.string()),
    difficulty: z.enum(DIFFICULTIES),
    timeToImplement: z.string(),
    outcome: z.string(),
    relatedSkill: z.string().nullable().default(null),
    hasCliSetup: z.boolean().default(false),
    costNote: z.string(),
    tags: z.array(z.string()).default([]),
    // Sidepanel — concrete answers to "what does this unlock for me as a PM"
    // and "how does it actually help my week". No fluff. Each is a short
    // bulleted list. `skipIf` is the honest fit-check.
    unlocks: z.array(z.string()).default([]),
    helps: z.array(z.string()).default([]),
    skipIf: z.array(z.string()).default([]),
  }),
});

const material = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/material" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    author: z.string(),
    wedge: z.enum(WEDGES),
    why: z.string(),
    kind: z
      .enum(["book", "essay", "course", "talk", "podcast", "newsletter"])
      .default("essay"),
  }),
});

export const collections = { wedges, workflows, material };
