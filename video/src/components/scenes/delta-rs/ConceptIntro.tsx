import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import { SplitLayout } from "../../ui/SplitLayout";

const bulletPoints = [
  { title: "RUST CORE", description: "Fast, memory-safe, compiled to native code" },
  { title: "PYTHON BINDINGS", description: "pip install deltalake — full Delta protocol" },
  { title: "NO JVM", description: "No Spark, no Java, no heavy runtime needed" },
  { title: "ARROW-NATIVE", description: "Zero-copy interop with pandas and Polars" },
];

export const ConceptIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SplitLayout
      sidebarTitle={["WHAT IS", "DELTA-RS?"]}
      pageNumber="2/7"
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
        {bulletPoints.map((point, i) => {
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
                borderLeft: `5px solid ${COLORS.primary}`,
                opacity: cardProgress,
                transform: `translateX(${interpolate(cardProgress, [0, 1], [50, 0])}px)`,
              }}
            >
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
                  {point.title}
                </h3>
                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 20,
                    color: COLORS.textGray,
                    margin: 0,
                  }}
                >
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SplitLayout>
  );
};
