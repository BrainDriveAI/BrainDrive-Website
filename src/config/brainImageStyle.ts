export const brainImageStyle = {
  palette: {
    // Dark mode colors from your Visual Brand Guidelines
    primaryBg: '#03050A', // Deep Blue – primary dark background
    secondaryBg: '#0A152A', // Midnight Blue – secondary dark background
    cardBg: '#1E2A3B', // Gray Blue – cards
    accent1: '#325D87', // Steel Blue – secondary UI
    accent2: '#7CA7D1', // Sky Blue – highlights
    accentText: '#C5DAED', // Light Blue – text/UI
    cta: '#FFFFFF', // CTA White – key actions
  },
  personality: {
    adjectives: ['geeky', 'friendly', 'minimalist', 'playful'],
    emotionalGoal: "People should feel empowered and relieved – 'oh wow, I get this now.'",
  },
  composition: {
    defaultAspectRatio: '16:9',
    sideGraphicFriendly: true,
    guidance: [
      'One clear focal idea with 2–4 supporting elements max.',
      'Leave generous negative space, especially on one side for text.',
      'Target 4/10 on busyness.',
    ],
  },
  character: {
    enabledByDefault: true,
    description:
      'Realistic cartoon BrainDrive Guide: gender-neutral geeky builder, casual hoodie or t-shirt + jeans, simple friendly face (eyes/eyebrows/mouth), not hyper-realistic.',
  },
  dos: [
    'Dark-mode first with deep/midnight blues and clean vector/line-art style.',
    'Use simple visual metaphors (blocks, tiles, flows, side-by-side comparisons).',
    'Keep images minimal, warm, human, with clear structure.',
  ],
  donts: [
    'No corporate stock photo people.',
    'No neon rainbow chaos; keep palette restrained.',
    'No icons purely as decoration; only use when they communicate a specific idea.',
  ],
  textLabels: {
    allowed: true,
    maxLabels: 6,
    examples: ['Ownership', 'Freedom', 'Big Tech', 'Plugins', 'Core', 'Privacy'],
  },
};