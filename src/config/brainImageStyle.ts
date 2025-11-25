export type BrainImageUseCase =
  | "blog-hero"
  | "in-article-graphic"
  | "video-side-graphic"
  | "social-tile";

export const brainImageStyle = {
  palette: {
    primaryBg: "#03050A",
    secondaryBg: "#0A152A",
    cardBg: "#1E2A3B",
    accent1: "#325D87",
    accent2: "#7CA7D1",
    accentText: "#C5DAED",
    cta: "#FFFFFF",
  },
  personality: {
    adjectives: ["geeky", "friendly", "minimalist", "playful"],
    emotionalGoal:
      "People should feel empowered and relieved - 'oh wow, I get this now.'",
  },
  composition: {
    defaultAspectRatio: "16:9",
    sideGraphicFriendly: true,
    guidance: [
      "One clear focal idea with 2-4 supporting elements max.",
      "Leave generous negative space, especially on one side for text.",
      "Target 4/10 on busyness.",
    ],
  },
  character: {
    enabledByDefault: true,
    description:
      "Realistic cartoon BrainDrive Guide: gender-neutral geeky builder, casual hoodie or t-shirt + jeans, simple friendly face (eyes/eyebrows/mouth), not hyper-realistic.",
  },
  dos: [
    "Dark-mode first with deep/midnight blues and clean vector/line-art style.",
    "Use simple visual metaphors (blocks, tiles, flows, side-by-side comparisons).",
    "Keep images minimal, warm, human, with clear structure.",
  ],
  donts: [
    "No corporate stock photo people.",
    "No neon rainbow chaos; keep palette restrained.",
    "No icons purely as decoration; only use when they communicate a specific idea.",
  ],
  textLabels: {
    allowed: true,
    maxLabels: 6,
    examples: ["Ownership", "Freedom", "Big Tech", "Plugins", "Core", "Privacy"],
  },
} as const;

export const useCasePresets: Record<
  BrainImageUseCase,
  { label: string; promptHint: string; aspectRatio: string }
> = {
  "blog-hero": {
    label: "Blog hero (16:9)",
    promptHint:
      "Blog hero image with space for a headline; keep negative space toward the left third.",
    aspectRatio: "16:9",
  },
  "in-article-graphic": {
    label: "In-article graphic (16:9)",
    promptHint:
      "In-article supporting graphic, balanced composition with captions possible.",
    aspectRatio: "16:9",
  },
  "video-side-graphic": {
    label: "Video side graphic (16:9)",
    promptHint:
      "Video side graphic with safe left side for presenter; keep subject slightly right-aligned.",
    aspectRatio: "16:9",
  },
  "social-tile": {
    label: "Social tile (square)",
    promptHint:
      "Square social tile with a single focal point and minimal text label areas.",
    aspectRatio: "1:1",
  },
};

export const brandStyleSummary = [
  "Dark-mode palette with deep and midnight blues, steel and sky blue accents, light blue UI, white CTAs.",
  "Geeky, friendly, minimalist, playful tone; aim for calm, empowering emotion.",
  "Metaphor-first visuals with one clear idea and minimal supporting elements; generous negative space.",
  "Avoid corporate stock photography and neon chaos; keep imagery warm, human, and structured.",
  "Allow short text labels when they clarify concepts like Ownership, Freedom, Big Tech, Plugins, Core, Privacy.",
] as const;
