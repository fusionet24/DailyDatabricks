import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";

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
      <div style={{ textAlign: "center", marginBottom: 50 }}>
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
          NO SPARK. NO JVM.
        </h3>

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
          DELTA LAKE
          <br />
          WITHOUT SPARK
        </h1>
      </div>

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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <CodeLine lineNumber={1} delay={55}>
            <span style={{ color: COLORS.cardCodeComment }}># pip install deltalake</span>
          </CodeLine>
          <CodeLine lineNumber={2} delay={65}>
            <span style={{ color: COLORS.cardCodeMethod }}>from</span>
            <span style={{ color: "#333" }}> deltalake </span>
            <span style={{ color: COLORS.cardCodeMethod }}>import</span>
            <span style={{ color: "#333" }}> DeltaTable</span>
          </CodeLine>
          <CodeLine lineNumber={3} delay={75}>
            <span style={{ color: "#333" }}>dt = </span>
            <span style={{ color: COLORS.cardCodeMethod }}>DeltaTable</span>
            <span style={{ color: "#333" }}>(</span>
            <span style={{ color: COLORS.cardCodeString }}>"/path/to/delta"</span>
            <span style={{ color: "#333" }}>)</span>
          </CodeLine>
          <CodeLine lineNumber={4} delay={85}>
            <span style={{ color: "#333" }}>df = dt.</span>
            <span style={{ color: COLORS.cardCodeMethod }}>to_pandas</span>
            <span style={{ color: "#333" }}>()</span>
          </CodeLine>
        </div>
      </div>
    </AbsoluteFill>
  );
};
