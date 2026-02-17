import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import { SplitLayout } from "../../ui/SplitLayout";

const CodeLine: React.FC<{
  lineNumber: number;
  children: React.ReactNode;
  delay: number;
  highlight?: boolean;
}> = ({ lineNumber, children, delay, highlight = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, delay, config: { damping: 200 } });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 8,
        fontFamily: FONTS.code,
        fontSize: 22,
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [30, 0])}px)`,
        backgroundColor: highlight ? `${COLORS.primary}20` : "transparent",
        padding: highlight ? "4px 8px" : "4px 0",
        borderRadius: 4,
      }}
    >
      <span
        style={{
          color: COLORS.cardCodeLineNum,
          marginRight: 20,
          width: 24,
          textAlign: "right",
        }}
      >
        {lineNumber}
      </span>
      <span>{children}</span>
    </div>
  );
};

export const CodeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const secondBlockProgress = spring({ frame, fps, delay: 200, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["WRITE &", "READ"]}
      pageNumber="3/7"
      darkContent={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 24,
        }}
      >
        {/* Write example */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid #555",
                }}
              />
            ))}
          </div>

          <div>
            <CodeLine lineNumber={1} delay={40}>
              <span style={{ color: COLORS.cardCodeComment }}># Write a Delta table</span>
            </CodeLine>
            <CodeLine lineNumber={2} delay={60}>
              <span style={{ color: COLORS.codeKeyword }}>from</span>
              <span style={{ color: COLORS.textLight }}> deltalake </span>
              <span style={{ color: COLORS.codeKeyword }}>import</span>
              <span style={{ color: COLORS.textLight }}> write_deltalake</span>
            </CodeLine>
            <CodeLine lineNumber={3} delay={80} highlight={true}>
              <span style={{ color: COLORS.codeFunction }}>write_deltalake</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.codeString }}>"/tmp/sales"</span>
              <span style={{ color: COLORS.textLight }}>, df)</span>
            </CodeLine>
          </div>
        </div>

        {/* Read example */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            opacity: secondBlockProgress,
            transform: `translateY(${interpolate(secondBlockProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid #555",
                }}
              />
            ))}
          </div>

          <div>
            <CodeLine lineNumber={1} delay={210}>
              <span style={{ color: COLORS.cardCodeComment }}># Read without Spark</span>
            </CodeLine>
            <CodeLine lineNumber={2} delay={230}>
              <span style={{ color: COLORS.codeVariable }}>dt</span>
              <span style={{ color: COLORS.textLight }}> = </span>
              <span style={{ color: COLORS.codeFunction }}>DeltaTable</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.codeString }}>"/tmp/sales"</span>
              <span style={{ color: COLORS.textLight }}>)</span>
            </CodeLine>
            <CodeLine lineNumber={3} delay={250} highlight={true}>
              <span style={{ color: COLORS.codeVariable }}>df</span>
              <span style={{ color: COLORS.textLight }}> = dt.</span>
              <span style={{ color: COLORS.codeFunction }}>to_pandas</span>
              <span style={{ color: COLORS.textLight }}>()</span>
            </CodeLine>
          </div>
        </div>
      </div>
    </SplitLayout>
  );
};
