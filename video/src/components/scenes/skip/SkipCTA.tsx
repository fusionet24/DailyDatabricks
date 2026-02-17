import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";

export const SkipCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const subtitleProgress = spring({ frame, fps, delay: 30, config: { damping: 200 } });
  const brandProgress = spring({ frame, fps, delay: 50, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.socialCardRed,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Main headline */}
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 140,
          fontWeight: 700,
          color: "white",
          textTransform: "uppercase",
          textAlign: "center",
          margin: 0,
          lineHeight: 1.0,
          textShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          opacity: titleProgress,
          transform: `scale(${interpolate(titleProgress, [0, 1], [0.8, 1])})`,
        }}
      >
        WANT MORE TIPS?
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: FONTS.display,
          fontSize: 36,
          fontWeight: 400,
          color: "white",
          textTransform: "uppercase",
          letterSpacing: 4,
          marginTop: 30,
          marginBottom: 60,
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        SIGN UP TO MY DATABRICKS NEWSLETTER
      </p>

      {/* Brand */}
      <div
        style={{
          opacity: brandProgress,
          transform: `translateY(${interpolate(brandProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        <Img
          src={staticFile("databricks-news-white.png")}
          style={{ height: 80 }}
        />
      </div>

      {/* Bottom tips link */}
      <p
        style={{
          position: "absolute",
          bottom: 40,
          fontFamily: FONTS.body,
          fontSize: 20,
          color: "white",
          opacity: 0.8,
        }}
      >
        More tips at <strong>dailydatabricks.tips</strong>
      </p>
    </AbsoluteFill>
  );
};
