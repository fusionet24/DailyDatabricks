import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "./lib/constants";
import { FONTS } from "./lib/fonts";
import { RadialGlow, FloatingParticles } from "./components/scenes/logo-reveal";

export const LogoRevealVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation: spring in from frames 25-65
  const logoProgress = spring({
    frame,
    fps,
    delay: 25,
    config: { damping: 200 },
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.85, 1]);
  const logoOpacity = logoProgress;

  // URL text animation: spring in from frames 70-110
  const urlProgress = spring({
    frame,
    fps,
    delay: 70,
    config: { damping: 200 },
  });

  const urlOpacity = urlProgress;
  const urlTranslateY = interpolate(urlProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgLight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial glow layer behind everything */}
      <RadialGlow />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          zIndex: 1,
        }}
      >
        <Img
          src={staticFile("logo.jpg")}
          style={{
            width: 300,
            height: "auto",
          }}
        />
      </div>

      {/* URL text */}
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 32,
          fontWeight: 500,
          color: COLORS.textGray,
          margin: 0,
          marginTop: 24,
          opacity: urlOpacity,
          transform: `translateY(${urlTranslateY}px)`,
          zIndex: 1,
          letterSpacing: 1,
        }}
      >
        dailydatabricks.tips
      </p>
    </AbsoluteFill>
  );
};
