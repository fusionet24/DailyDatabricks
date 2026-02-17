import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";
import { SplitLayout } from "../ui/SplitLayout";

const useCases = [
  {
    icon: "",
    title: "Pipeline Tracking",
    fields: ["pipeline_id", "source_system", "processing_timestamp"],
    color: COLORS.accent2,
  },
  {
    icon: "",
    title: "Data Quality",
    fields: ["null_percentage", "distinct_values", "quality_score"],
    color: COLORS.accent1,
  },
  {
    icon: "",
    title: "Compliance & Audit",
    fields: ["approved_by", "approval_ticket", "retention_policy"],
    color: COLORS.accent3,
  },
];

export const UseCases: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SplitLayout
      sidebarTitle={["POWERFUL", "USE", "CASES"]}
      pageNumber="4/7"
      darkContent={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
        }}
      >
        {useCases.map((useCase, i) => {
          const cardProgress = spring({
            frame,
            fps,
            delay: 20 + i * 25,
            config: { damping: 200 },
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: COLORS.bgDarkSecondary,
                borderRadius: 12,
                padding: 24,
                display: "flex",
                alignItems: "center",
                gap: 24,
                borderLeft: `5px solid ${useCase.color}`,
                opacity: cardProgress,
                transform: `translateX(${interpolate(cardProgress, [0, 1], [50, 0])}px)`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  backgroundColor: useCase.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                }}
              >
                {useCase.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.textLight,
                    margin: 0,
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  {useCase.title}
                </h3>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {useCase.fields.map((field, j) => {
                    const fieldProgress = spring({
                      frame,
                      fps,
                      delay: 40 + i * 25 + j * 8,
                      config: { damping: 200 },
                    });

                    return (
                      <span
                        key={j}
                        style={{
                          fontFamily: FONTS.code,
                          fontSize: 14,
                          color: useCase.color,
                          backgroundColor: `${useCase.color}20`,
                          padding: "4px 10px",
                          borderRadius: 4,
                          opacity: fieldProgress,
                        }}
                      >
                        {field}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SplitLayout>
  );
};
