import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";
import { SplitLayout } from "../ui/SplitLayout";

const benefits = [
  {
    icon: "",
    title: "DATA LINEAGE",
    description: "Track the origin and transformations of every record",
  },
  {
    icon: "",
    title: "GOVERNANCE",
    description: "Maintain compliance with audit trails and approvals",
  },
  {
    icon: "",
    title: "OBSERVABILITY",
    description: "Understand what happened to your data and when",
  },
];

export const BenefitsSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const taglineProgress = spring({ frame, fps, delay: 150, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["WHY IT", "MATTERS"]}
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
        {/* Benefits grid */}
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
                {/* Icon circle */}
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    backgroundColor: COLORS.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    flexShrink: 0,
                  }}
                >
                  {benefit.icon}
                </div>

                {/* Text content */}
                <div>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 32,
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

        {/* Tagline */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            opacity: taglineProgress,
            transform: `translateY(${interpolate(taglineProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 26,
              color: COLORS.textLight,
              margin: 0,
            }}
          >
            Your future self will{" "}
            <span style={{ color: COLORS.primary, fontWeight: 700 }}>thank you</span>
          </p>
        </div>
      </div>
    </SplitLayout>
  );
};
