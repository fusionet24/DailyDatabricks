import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";
import { SplitLayout } from "../ui/SplitLayout";

// Code line component
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

  const jsonProgress = spring({ frame, fps, delay: 200, config: { damping: 200 } });
  const calloutProgress = spring({ frame, fps, delay: 280, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["THE", "MAGIC", "LINE"]}
      pageNumber="3/7"
      darkContent={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 30,
        }}
      >
        {/* Code window */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            padding: 30,
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* Window controls */}
          <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
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

          {/* Code content */}
          <div>
            <CodeLine lineNumber={1} delay={40}>
              <span style={{ color: COLORS.cardCodeComment }}># Add metadata to your Delta write</span>
            </CodeLine>

            <CodeLine lineNumber={2} delay={70}>
              <span style={{ color: COLORS.codeVariable }}>df</span>
              <span style={{ color: COLORS.textLight }}>.</span>
              <span style={{ color: COLORS.codeFunction }}>write</span>
              <span style={{ color: COLORS.textLight }}>.</span>
              <span style={{ color: COLORS.codeFunction }}>format</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.codeString }}>"delta"</span>
              <span style={{ color: COLORS.textLight }}>)</span>
            </CodeLine>

            <CodeLine lineNumber={3} delay={100} highlight={true}>
              <span style={{ color: COLORS.textLight }}>  .</span>
              <span style={{ color: COLORS.codeFunction }}>option</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.primary, fontWeight: 700 }}>"userMetadata"</span>
              <span style={{ color: COLORS.textLight }}>, </span>
              <span style={{ color: COLORS.codeVariable }}>json</span>
              <span style={{ color: COLORS.textLight }}>.</span>
              <span style={{ color: COLORS.codeFunction }}>dumps</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.codeVariable }}>metadata</span>
              <span style={{ color: COLORS.textLight }}>))</span>
            </CodeLine>

            <CodeLine lineNumber={4} delay={130}>
              <span style={{ color: COLORS.textLight }}>  .</span>
              <span style={{ color: COLORS.codeFunction }}>mode</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.codeString }}>"append"</span>
              <span style={{ color: COLORS.textLight }}>)</span>
            </CodeLine>

            <CodeLine lineNumber={5} delay={160}>
              <span style={{ color: COLORS.textLight }}>  .</span>
              <span style={{ color: COLORS.codeFunction }}>saveAsTable</span>
              <span style={{ color: COLORS.textLight }}>(</span>
              <span style={{ color: COLORS.codeString }}>"customer_data"</span>
              <span style={{ color: COLORS.textLight }}>)</span>
            </CodeLine>
          </div>
        </div>

        {/* JSON metadata preview */}
        <div
          style={{
            display: "flex",
            gap: 30,
            alignItems: "flex-start",
            opacity: jsonProgress,
            transform: `translateY(${interpolate(jsonProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.bgDarkSecondary,
              borderRadius: 8,
              padding: 20,
              borderLeft: `4px solid ${COLORS.primary}`,
              flex: 1,
            }}
          >
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 12,
                color: COLORS.textGray,
                textTransform: "uppercase",
                letterSpacing: 1,
                margin: 0,
                marginBottom: 12,
              }}
            >
              Your Metadata Object
            </p>
            <pre
              style={{
                fontFamily: FONTS.code,
                fontSize: 16,
                color: COLORS.textLight,
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              <span>{"{"}</span>
              {"\n"}
              <span style={{ color: COLORS.codeVariable }}>  "pipeline_id"</span>
              <span>: </span>
              <span style={{ color: COLORS.codeString }}>"ETL_123"</span>
              <span>,</span>
              {"\n"}
              <span style={{ color: COLORS.codeVariable }}>  "source_system"</span>
              <span>: </span>
              <span style={{ color: COLORS.codeString }}>"CRM"</span>
              <span>,</span>
              {"\n"}
              <span style={{ color: COLORS.codeVariable }}>  "timestamp"</span>
              <span>: </span>
              <span style={{ color: COLORS.codeString }}>"2024-12-02"</span>
              {"\n"}
              <span>{"}"}</span>
            </pre>
          </div>

          {/* Callout */}
          <div
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 8,
              padding: 20,
              flex: 1,
              opacity: calloutProgress,
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
              <strong>One line of code</strong> embeds rich context with every write operation
            </p>
          </div>
        </div>
      </div>
    </SplitLayout>
  );
};
