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
        fontSize: 20,
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

export const MergeDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calloutProgress = spring({ frame, fps, delay: 200, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["MERGE &", "TIME", "TRAVEL"]}
      pageNumber="5/7"
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
        {/* Merge code */}
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
            <CodeLine lineNumber={1} delay={30}>
              <span style={{ color: COLORS.cardCodeComment }}># CDC-style upsert</span>
            </CodeLine>
            <CodeLine lineNumber={2} delay={50}>
              <span style={{ color: COLORS.textLight }}>(</span>
            </CodeLine>
            <CodeLine lineNumber={3} delay={70}>
              <span style={{ color: COLORS.textLight }}>  dt.</span>
              <span style={{ color: COLORS.codeFunction }}>merge</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.codeVariable }}>source</span>
              <span style={{ color: COLORS.textLight }}>=new_data,</span>
            </CodeLine>
            <CodeLine lineNumber={4} delay={90} highlight={true}>
              <span style={{ color: COLORS.textLight }}>    </span>
              <span style={{ color: COLORS.codeVariable }}>predicate</span>
              <span style={{ color: COLORS.textLight }}>=</span>
              <span style={{ color: COLORS.codeString }}>"t.id = s.id"</span>
              <span style={{ color: COLORS.textLight }}>)</span>
            </CodeLine>
            <CodeLine lineNumber={5} delay={110}>
              <span style={{ color: COLORS.textLight }}>  .</span>
              <span style={{ color: COLORS.codeFunction }}>when_matched_update_all</span>
              <span style={{ color: COLORS.textLight }}>()</span>
            </CodeLine>
            <CodeLine lineNumber={6} delay={130}>
              <span style={{ color: COLORS.textLight }}>  .</span>
              <span style={{ color: COLORS.codeFunction }}>when_not_matched_insert_all</span>
              <span style={{ color: COLORS.textLight }}>()</span>
            </CodeLine>
            <CodeLine lineNumber={7} delay={150}>
              <span style={{ color: COLORS.textLight }}>  .</span>
              <span style={{ color: COLORS.codeFunction }}>execute</span>
              <span style={{ color: COLORS.textLight }}>()</span>
            </CodeLine>
            <CodeLine lineNumber={8} delay={170}>
              <span style={{ color: COLORS.textLight }}>)</span>
            </CodeLine>
          </div>
        </div>

        {/* Callout */}
        <div
          style={{
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            padding: 20,
            opacity: calloutProgress,
            transform: `translateY(${interpolate(calloutProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              color: "white",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            <strong>Full merge API</strong> — update, insert, and delete with predicate matching, just like Spark Delta
          </p>
        </div>
      </div>
    </SplitLayout>
  );
};
