import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

// Code Line Component with syntax highlighting
const CodeLine: React.FC<{
  lineNumber: number;
  children: React.ReactNode;
  delay: number;
}> = ({ lineNumber, children, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const translateX = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 12,
        fontFamily: FONTS.code,
        fontSize: 26,
        opacity: progress,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <span
        style={{
          color: COLORS.cardCodeLineNum,
          marginRight: 24,
          userSelect: "none",
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

export const OpeningHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation progress for different elements
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
            fontSize: 36,
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
          TRACK EVERY CHANGE TO
        </h3>

        {/* Main Title */}
        <h1
          style={{
            color: "white",
            fontSize: 120,
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
          YOUR DATA
        </h1>
      </div>

      {/* Code Window Card */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: "36px 48px",
          width: "75%",
          maxWidth: 1000,
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
          {/* Comment */}
          <CodeLine lineNumber={1} delay={55}>
            <span style={{ color: COLORS.cardCodeComment }}># Embed metadata with every write</span>
          </CodeLine>

          {/* Code line 2 */}
          <CodeLine lineNumber={2} delay={65}>
            <span style={{ color: COLORS.cardCodeMethod }}>df</span>
            <span style={{ color: "#333" }}>.</span>
            <span style={{ color: COLORS.cardCodeMethod }}>write</span>
            <span style={{ color: "#333" }}>.</span>
            <span style={{ color: COLORS.cardCodeMethod }}>format</span>
            <span style={{ color: "#333" }}>(</span>
            <span style={{ color: COLORS.cardCodeString }}>"delta"</span>
            <span style={{ color: "#333" }}>)</span>
          </CodeLine>

          {/* Code line 3 - the magic line */}
          <CodeLine lineNumber={3} delay={75}>
            <span style={{ color: "#333" }}>  .</span>
            <span style={{ color: COLORS.cardCodeMethod }}>option</span>
            <span style={{ color: "#333" }}>(</span>
            <span style={{ color: COLORS.cardCodeString, fontWeight: 600 }}>"userMetadata"</span>
            <span style={{ color: "#333" }}>, </span>
            <span style={{ color: COLORS.cardCodeMethod }}>metadata</span>
            <span style={{ color: "#333" }}>)</span>
          </CodeLine>

          {/* Code line 4 */}
          <CodeLine lineNumber={4} delay={85}>
            <span style={{ color: "#333" }}>  .</span>
            <span style={{ color: COLORS.cardCodeMethod }}>save</span>
            <span style={{ color: "#333" }}>()</span>
          </CodeLine>
        </div>
      </div>
    </AbsoluteFill>
  );
};
