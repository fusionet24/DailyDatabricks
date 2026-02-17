import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import { SplitLayout } from "../../ui/SplitLayout";

export const SkipCells: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cell1Progress = spring({ frame, fps, delay: 30, config: { damping: 200 } });
  const cell2Progress = spring({ frame, fps, delay: 100, config: { damping: 200 } });
  const calloutProgress = spring({ frame, fps, delay: 160, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["NOW YOU", "CAN SKIP", "OVER", "NOTEBOOK", "CELLS"]}
      pageNumber="2/5"
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
        {/* Cell 1 - Regular cell that runs */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            overflow: "hidden",
            opacity: cell1Progress,
            transform: `translateY(${interpolate(cell1Progress, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Cell header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              borderBottom: `1px solid ${COLORS.bgDark}`,
            }}
          >
            <span style={{ fontSize: 16 }}></span>
            <span style={{ color: "#4CAF50", fontSize: 16 }}></span>
            <span style={{ fontFamily: FONTS.code, fontSize: 14, color: COLORS.textGray }}>
              09:56 AM (3s)
            </span>
          </div>

          {/* Cell code */}
          <div style={{ padding: 20 }}>
            <pre
              style={{
                fontFamily: FONTS.code,
                fontSize: 20,
                color: COLORS.textLight,
                margin: 0,
              }}
            >
              <span style={{ color: COLORS.codeFunction }}>print</span>
              <span>(</span>
              <span style={{ color: COLORS.codeString }}>"This is a cell that runs"</span>
              <span>)</span>
            </pre>
          </div>

          {/* Cell output */}
          <div
            style={{
              backgroundColor: COLORS.bgDark,
              padding: 16,
              borderTop: `1px solid ${COLORS.bgDarkSecondary}`,
            }}
          >
            <span style={{ fontFamily: FONTS.code, fontSize: 18, color: COLORS.textGray }}>
              This is a cell
            </span>
          </div>
        </div>

        {/* Callout box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: calloutProgress,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.primary,
              padding: "12px 20px",
              borderRadius: 8,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 20,
                fontWeight: 700,
                color: "white",
              }}
            >
              NEW CELL MAGIC %SKIP
            </span>
          </div>
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              color: COLORS.textLight,
            }}
          >
            Just add the %skip magic command to make your cell skip execution
          </span>
        </div>

        {/* Cell 2 - Skipped cell */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            overflow: "hidden",
            opacity: cell2Progress,
            transform: `translateY(${interpolate(cell2Progress, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Cell header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              borderBottom: `1px solid ${COLORS.bgDark}`,
            }}
          >
            <span style={{ fontSize: 16 }}></span>
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: COLORS.textGray,
                fontStyle: "italic",
              }}
            >
              Skipped
            </span>
          </div>

          {/* Cell code with %skip */}
          <div style={{ padding: 20 }}>
            <pre
              style={{
                fontFamily: FONTS.code,
                fontSize: 20,
                color: COLORS.textLight,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: COLORS.primary, fontWeight: 700 }}>%skip</span>
              {"\n"}
              <span style={{ color: COLORS.codeFunction }}>print</span>
              <span>(</span>
              <span style={{ color: COLORS.codeString }}>"This is a cell that doesn't run"</span>
              <span>)</span>
            </pre>
          </div>
        </div>
      </div>
    </SplitLayout>
  );
};
