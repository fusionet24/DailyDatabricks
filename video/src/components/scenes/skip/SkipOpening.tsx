import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";

// Code line component
const CodeLine: React.FC<{
  lineNumber: number;
  children: React.ReactNode;
  delay: number;
}> = ({ lineNumber, children, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, delay, config: { damping: 200 } });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 12,
        fontFamily: FONTS.code,
        fontSize: 28,
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [30, 0])}px)`,
      }}
    >
      <span
        style={{
          color: COLORS.cardCodeLineNum,
          marginRight: 24,
          width: 30,
          textAlign: "right",
        }}
      >
        {lineNumber}
      </span>
      <span>{children}</span>
    </div>
  );
};

export const SkipOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgProgress = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const preTitleProgress = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const mainTitleProgress = spring({ frame, fps, delay: 20, config: { damping: 200 } });
  const cardProgress = spring({ frame, fps, delay: 40, config: { damping: 200 } });

  const cardScale = interpolate(cardProgress, [0, 1], [0.9, 1]);
  const cardTranslateY = interpolate(cardProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.socialCardRed,
        opacity: bgProgress,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Typography Section */}
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        {/* Pre-title */}
        <h3
          style={{
            color: "white",
            fontSize: 32,
            margin: 0,
            marginBottom: 12,
            fontFamily: FONTS.display,
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: 4,
            opacity: preTitleProgress,
            transform: `translateY(${interpolate(preTitleProgress, [0, 1], [-20, 0])}px)`,
          }}
        >
          DATABRICKS DEVELOPERS... LET'S TALK ABOUT....
        </h3>

        {/* Main Title */}
        <h1
          style={{
            color: "white",
            fontSize: 160,
            margin: 0,
            lineHeight: 0.95,
            fontFamily: FONTS.display,
            fontWeight: 700,
            textTransform: "uppercase",
            textShadow: "0px 4px 15px rgba(0,0,0,0.25)",
            opacity: mainTitleProgress,
            transform: `translateY(${interpolate(mainTitleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          %SKIP
        </h1>
      </div>

      {/* Code Window Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: "36px 48px",
          width: "75%",
          maxWidth: 1100,
          boxShadow: "0px 25px 60px rgba(0,0,0,0.35)",
          opacity: cardProgress,
          transform: `scale(${cardScale}) translateY(${cardTranslateY}px)`,
        }}
      >
        {/* Window Controls */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                border: "2px solid #BDBDBD",
                backgroundColor: "transparent",
              }}
            />
          ))}
        </div>

        {/* Code Content */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CodeLine lineNumber={1} delay={55}>
            <span style={{ color: COLORS.cardCodeComment }}>#Skip your databricks notebook cells with this simple cell magic</span>
          </CodeLine>

          <CodeLine lineNumber={2} delay={70}>
            <span style={{ color: "#333" }}></span>
          </CodeLine>

          <CodeLine lineNumber={3} delay={85}>
            <span style={{ color: COLORS.cardCodeMethod, fontWeight: 700, fontSize: 32 }}>%skip</span>
          </CodeLine>
        </div>
      </div>

      {/* Branding */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 60,
          opacity: cardProgress,
        }}
      >
        <Img
          src={staticFile("databricks-news-white.png")}
          style={{ height: 40 }}
        />
      </div>
    </AbsoluteFill>
  );
};
