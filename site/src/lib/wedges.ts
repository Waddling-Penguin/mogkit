export const WEDGE_META = {
  discovery: {
    title: "Discovery",
    subtitle: "Customer research as a versioned, compounding asset.",
  },
  strategy: {
    title: "Strategy",
    subtitle: "Six-pagers and metric trees that survive a smart skeptic.",
  },
  planning: {
    title: "Planning & Roadmapping",
    subtitle: "Specs that hold up under attack.",
  },
  gtm: {
    title: "GTM & Launch",
    subtitle: "Pre-flight interrogation specific to this launch.",
  },
  conflict: {
    title: "Stakeholder & Conflict",
    subtitle: "Name the incentive before you argue the position.",
  },
} as const;

export type WedgeSlug = keyof typeof WEDGE_META;

export const WEDGE_ORDER: WedgeSlug[] = [
  "discovery",
  "strategy",
  "planning",
  "gtm",
  "conflict",
];
