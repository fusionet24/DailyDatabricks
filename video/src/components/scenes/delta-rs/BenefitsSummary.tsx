import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import { SplitLayout } from "../../ui/SplitLayout";

const benefits = [
  {
    title: "NO JVM REQUIRED",
    description: "No Spark, no Java — runs anywhere Python runs",
  },
  {
    title: "ARROW-NATIVE",
    description: "Zero-copy interop with pandas, Polars, and DuckDB",
  },
  {
    title: "BLAZING FAST",
    description: "Rust core compiles to native code — no garbage collector",
  },
  {
    title: "CLOUD-AGNOSTIC",
    description: "Works with S3, ADLS, GCS, and local filesystems",
  },
];

export const BenefitsSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const taglineProgress = spring({ frame, fps, delay: 150, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["WHY", "DELTA-RS?"]}
      pageNumber="6/7"
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {benefits.map((benefit, i) => {
            const cardProgress = spring({
              frame,
              fps,
              delay: 20 + i * 30,
              config: { damping: 200 },
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  backgroundColor: COLORS.bgDarkSecondary,
                  borderRadius: 12,
                  padding: 28,
                  opacity: cardProgress,
                  transform: `translateX(${interpolate(cardProgress, [0, 1], [50, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: COLORS.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontFamily: FONTS.display,
                    fontWeight: 700,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 28,
                      fontWeight: 700,
                      color: COLORS.textLight,
                      margin: 0,
                      marginBottom: 8,
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: 18,
                      color: COLORS.textGray,
                      margin: 0,
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            opacity: taglineProgress,
            transform: `translateY(${interpolate(taglineProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 24,
              color: COLORS.textLight,
              margin: 0,
            }}
          >
            Delta Lake everywhere{" "}
            <span style={{ color: COLORS.primary, fontWeight: 700 }}>Python runs</span>
          </p>
        </div>
      </div>
    </SplitLayout>
  );
};
