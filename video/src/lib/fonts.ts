import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadOswald } from "@remotion/google-fonts/Oswald";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadFiraCode } from "@remotion/google-fonts/FiraCode";

// Load fonts
const poppinsInfo = loadPoppins();
const oswaldInfo = loadOswald();
const jetBrainsInfo = loadJetBrainsMono();
const firaCodeInfo = loadFiraCode();

export const FONTS = {
  heading: poppinsInfo.fontFamily,
  display: oswaldInfo.fontFamily,  // For social card headlines
  body: poppinsInfo.fontFamily,
  code: jetBrainsInfo.fontFamily,
  codeFallback: firaCodeInfo.fontFamily,
} as const;
