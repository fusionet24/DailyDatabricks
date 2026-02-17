// DailyDatabricks Brand Colors
export const COLORS = {
  // Brand
  primary: "#E63946", // Red accent from logo
  socialCardRed: "#D83A3A", // Soft matte red for social cards

  // Backgrounds
  bgDark: "#1E1E2E",
  bgDarkSecondary: "#2D2D44",
  bgLight: "#FFFFFF",
  bgLightSecondary: "#F8F9FA",

  // Text
  textLight: "#FFFFFF",
  textDark: "#1A1A2E",
  textGray: "#6C757D",

  // Code syntax highlighting (dark theme)
  codeBg: "#1E1E2E",
  codeKeyword: "#C678DD",
  codeString: "#98C379",
  codeFunction: "#61AFEF",
  codeComment: "#5C6370",
  codeVariable: "#E5C07B",
  codeOperator: "#56B6C2",

  // Code syntax highlighting (light card theme)
  cardCodeMethod: "#E53935", // Red for methods/functions
  cardCodeString: "#4CAF50", // Green for strings
  cardCodeComment: "#757575", // Gray for comments
  cardCodeLineNum: "#9E9E9E", // Gray for line numbers

  // Accent colors for use cases
  accent1: "#00B4D8", // Teal for data quality
  accent2: "#FFB703", // Orange for pipeline
  accent3: "#8338EC", // Purple for compliance
} as const;

// Video configuration
export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 1740, // 58 seconds
} as const;

// Scene timing (in frames)
export const SCENE_TIMING = {
  scene1_openingHook: { start: 0, duration: 150 },      // 0-5s
  scene2_conceptIntro: { start: 150, duration: 270 },   // 5-14s
  scene3_codeDemo: { start: 420, duration: 420 },       // 14-28s
  scene4_useCases: { start: 840, duration: 180 },       // 28-34s
  scene5_queryDemo: { start: 1020, duration: 330 },     // 34-45s
  scene6_benefits: { start: 1350, duration: 270 },      // 45-54s
  scene7_cta: { start: 1620, duration: 120 },           // 54-58s
} as const;

// Spring configurations
export const SPRING_CONFIGS = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 12, stiffness: 170 },
} as const;

// Carousel configuration
export const CAROUSEL_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  slideDurationFrames: 1, // 1 frame per slide for static export
  totalSlides: 6,
} as const;

// Logo Reveal configuration
export const LOGO_REVEAL_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 150, // 5 seconds
} as const;

// End Card configuration
export const END_CARD_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 1, // Static export
} as const;

// Thumbnail configuration (YouTube recommended)
export const THUMBNAIL_CONFIG = {
  width: 1280,
  height: 720,
  fps: 1,
  durationInFrames: 1,
} as const;

// Carousel-specific colors (matching PDF design)
export const CAROUSEL_COLORS = {
  // Main background red (matching PDF exactly)
  bgRed: "#CC3333",

  // Text colors
  textWhite: "#FFFFFF",
  textBlack: "#1A1A1A",

  // Code syntax (light background)
  codeComment: "#757575",
  codeMethod: "#E53935", // Red for methods
  codeString: "#4CAF50", // Green for strings
  codeLineNum: "#9E9E9E",

  // UI elements
  windowDot: "#BDBDBD",
  cardBg: "#FFFFFF",

  // Icon backgrounds
  iconBgRed: "#CC3333",
  iconBgBlack: "#1A1A1A",
} as const;
