import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const workflows = (await getCollection("workflows")).sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );
  return rss({
    title: "mogkit Workflow Library",
    description:
      "Implementable AI-for-PM workflows. Each entry teaches its mechanism.",
    site: context.site ?? "https://mogkit.com",
    items: workflows.map((w) => ({
      title: w.data.title,
      pubDate: w.data.published,
      description: w.data.outcome,
      link: `/workflows/${w.data.slug}`,
      categories: [w.data.wedge, ...w.data.tags],
    })),
    customData: `<language>en-us</language>`,
  });
}
