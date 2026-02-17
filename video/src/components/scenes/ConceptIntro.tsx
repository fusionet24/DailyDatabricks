import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";
import { SplitLayout } from "../ui/SplitLayout";

export const ConceptIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const metadataTags = [
    { key: "pipeline_id", value: '"ETL_123"' },
    { key: "source_system", value: '"CRM"' },
    { key: "timestamp", value: '"2024-12-02"' },
  ];

  // Animation for diagram elements
  const diagramProgress = spring({ frame, fps, delay: 30, config: { damping: 200 } });
  const tagsProgress = spring({ frame, fps, delay: 80, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["CUSTOM", "METADATA", "LOGGING"]}
      pageNumber="2/7"
      darkContent={true}
    >
      {/* Content area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 40,
        }}
      >
        {/* Subtitle */}
        <div
          style={{
            opacity: spring({ frame, fps, delay: 20, config: { damping: 200 } }),
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 28,
              color: COLORS.textLight,
              textAlign: "center",
              margin: 0,
            }}
          >
            Embed valuable context into every{" "}
            <span style={{ color: COLORS.primary, fontWeight: 600 }}>Delta commit</span>
          </p>
        </div>

        {/* Flow diagram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            opacity: diagramProgress,
            transform: `translateY(${interpolate(diagramProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          {/* Data Pipeline */}
          <div
            style={{
              backgroundColor: COLORS.accent2,
              padding: "20px 30px",
              borderRadius: 12,
              color: "white",
              fontFamily: FONTS.display,
              fontSize: 20,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}>{"{ }"}</div>
            DATA PIPELINE
          </div>

          {/* Arrow */}
          <svg width="50" height="30">
            <polygon points="0,15 40,5 40,25" fill={COLORS.textGray} />
          </svg>

          {/* Metadata Badge */}
          <div
            style={{
              backgroundColor: COLORS.primary,
              padding: "20px 30px",
              borderRadius: 12,
              color: "white",
              fontFamily: FONTS.display,
              fontSize: 18,
              fontWeight: 600,
              textAlign: "center",
              boxShadow: `0 0 30px ${COLORS.primary}50`,
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>+</div>
            userMetadata
          </div>

          {/* Arrow */}
          <svg width="50" height="30">
            <polygon points="0,15 40,5 40,25" fill={COLORS.textGray} />
          </svg>

          {/* Delta Table */}
          <div
            style={{
              backgroundColor: COLORS.accent1,
              padding: "20px 30px",
              borderRadius: 12,
              color: "white",
              fontFamily: FONTS.display,
              fontSize: 20,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 8 }}></div>
            DELTA TABLE
          </div>
        </div>

        {/* Metadata tags */}
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: tagsProgress,
            transform: `translateY(${interpolate(tagsProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          {metadataTags.map((tag, i) => {
            const tagDelay = 90 + i * 10;
            const tagProgress = spring({ frame, fps, delay: tagDelay, config: { damping: 200 } });

            return (
              <div
                key={i}
                style={{
                  backgroundColor: COLORS.bgDarkSecondary,
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontFamily: FONTS.code,
                  fontSize: 18,
                  opacity: tagProgress,
                  transform: `translateY(${interpolate(tagProgress, [0, 1], [10, 0])}px)`,
                }}
              >
                <span style={{ color: COLORS.codeVariable }}>{tag.key}</span>
                <span style={{ color: COLORS.textLight }}>: </span>
                <span style={{ color: COLORS.codeString }}>{tag.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </SplitLayout>
  );
};
