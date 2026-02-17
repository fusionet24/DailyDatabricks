import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";
import { SplitLayout } from "../ui/SplitLayout";
import { TypewriterText } from "../animations/TypewriterText";

const tableData = [
  {
    version: "3",
    timestamp: "2024-12-02 14:30",
    operation: "WRITE",
    metadata: '{"pipeline": "ETL_123"}',
  },
  {
    version: "2",
    timestamp: "2024-12-01 09:15",
    operation: "WRITE",
    metadata: '{"quality": 0.98}',
  },
  {
    version: "1",
    timestamp: "2024-11-30 16:45",
    operation: "CREATE",
    metadata: '{"approved_by": "..."}',
  },
];

export const QueryDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tableProgress = spring({ frame, fps, delay: 80, config: { damping: 200 } });
  const calloutProgress = spring({ frame, fps, delay: 200, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["QUERY", "YOUR", "HISTORY"]}
      pageNumber="5/7"
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
        {/* SQL Command */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            padding: 24,
            opacity: spring({ frame, fps, delay: 10, config: { damping: 200 } }),
          }}
        >
          {/* Window controls */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div
              style={{
                backgroundColor: "#4CAF50",
                width: 14,
                height: 14,
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontFamily: FONTS.code,
                fontSize: 14,
                color: COLORS.textGray,
                marginLeft: 8,
              }}
            >
              SQL Query
            </span>
          </div>

          {/* SQL code */}
          <div
            style={{
              fontFamily: FONTS.code,
              fontSize: 26,
              color: COLORS.textLight,
            }}
          >
            <span style={{ color: COLORS.codeKeyword }}>DESCRIBE</span>{" "}
            <span style={{ color: COLORS.codeKeyword }}>HISTORY</span>{" "}
            <TypewriterText
              text="customer_data;"
              startFrame={30}
              framesPerChar={3}
              cursorColor={COLORS.accent1}
              style={{ color: COLORS.codeVariable }}
            />
          </div>
        </div>

        {/* Results Table */}
        <div
          style={{
            backgroundColor: COLORS.bgLight,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            opacity: tableProgress,
            transform: `translateY(${interpolate(tableProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 180px 120px 1fr",
              backgroundColor: COLORS.bgLightSecondary,
              padding: "12px 20px",
              borderBottom: "1px solid #ddd",
            }}
          >
            {["Version", "Timestamp", "Operation", "userMetadata"].map((header, i) => (
              <span
                key={i}
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 12,
                  fontWeight: 700,
                  color: i === 3 ? COLORS.primary : COLORS.textGray,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {header}
              </span>
            ))}
          </div>

          {/* Table rows */}
          {tableData.map((row, i) => {
            const rowProgress = spring({
              frame,
              fps,
              delay: 100 + i * 30,
              config: { damping: 200 },
            });

            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 180px 120px 1fr",
                  padding: "14px 20px",
                  borderBottom: i < tableData.length - 1 ? "1px solid #eee" : "none",
                  opacity: rowProgress,
                  transform: `translateX(${interpolate(rowProgress, [0, 1], [20, 0])}px)`,
                }}
              >
                <span style={{ fontFamily: FONTS.code, fontSize: 14, color: COLORS.textDark }}>
                  {row.version}
                </span>
                <span style={{ fontFamily: FONTS.code, fontSize: 14, color: COLORS.textGray }}>
                  {row.timestamp}
                </span>
                <span style={{ fontFamily: FONTS.code, fontSize: 14, color: COLORS.textDark }}>
                  {row.operation}
                </span>
                <span style={{ fontFamily: FONTS.code, fontSize: 14, color: COLORS.primary, fontWeight: 500 }}>
                  {row.metadata}
                </span>
              </div>
            );
          })}
        </div>

        {/* Callout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: calloutProgress,
          }}
        >
          <span style={{ fontSize: 24, color: COLORS.primary }}></span>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              color: COLORS.textLight,
              margin: 0,
            }}
          >
            Metadata is <strong style={{ color: COLORS.primary }}>immutable</strong> and permanently linked to each commit
          </p>
        </div>
      </div>
    </SplitLayout>
  );
};
