import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";

export const CallToAction: React.FC = () => {
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
      <h1
        style={{
          fontFamily: FONTS.display,
          fontSize: 120,
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
        TRY DELTA-RS
      </h1>

      <p
        style={{
          fontFamily: FONTS.code,
          fontSize: 36,
          fontWeight: 400,
          color: "white",
          marginTop: 30,
          marginBottom: 60,
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        pip install deltalake
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: brandProgress,
          transform: `translateY(${interpolate(brandProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon points="30,5 55,20 55,40 30,55" fill="white" opacity="0.9" />
          <polygon points="30,5 5,20 5,40 30,55" fill="white" opacity="0.7" />
          <polygon points="30,20 45,28 45,42 30,50" fill="white" opacity="0.5" />
        </svg>

        <span
          style={{
            fontFamily: FONTS.code,
            fontSize: 48,
            color: "white",
          }}
        >
          Databricks<span style={{ fontWeight: 700 }}>.news</span>
        </span>
      </div>

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
