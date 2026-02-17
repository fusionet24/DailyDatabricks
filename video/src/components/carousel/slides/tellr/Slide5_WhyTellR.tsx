import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const benefits = [
  {
    title: "Fully Governed",
    description: "Data never leaves your workspace. Unity Catalog permissions apply to every query.",
  },
  {
    title: "Profiles Are Reusable",
    description:
      "Create different profiles for QBRs, executive summaries, or team updates — swap in seconds.",
  },
  {
    title: "Iterative Refinement",
    description:
      "Keep chatting to adjust your deck. Change charts, add slides, tweak wording conversationally.",
  },
  {
    title: "Interactive Output",
    description:
      "HTML exports include Chart.js visualisations that respond to hover and click. PDF for static sharing.",
  },
  {
    title: "Open Source",
    description:
      "Apache 2.0 licensed. Inspect the code, contribute, or fork it for your own needs.",
  },
];

export const Slide5_WhyTellR: React.FC = () => {
  const sidebarContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 80,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        WHY
        <br />
        TELLR?
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="5/6"
    >
      {/* Title */}
      <h2
        style={{
          color: CAROUSEL_COLORS.bgRed,
          fontSize: 42,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        ENTERPRISE-READY AI PRESENTATIONS
      </h2>

      {/* Benefits */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            {/* Red bullet */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: CAROUSEL_COLORS.bgRed,
                marginTop: 8,
                flexShrink: 0,
              }}
            />
            <div>
              <span
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 22,
                  fontFamily: FONTS.body,
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                {benefit.title}
              </span>
              <span
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 22,
                  fontFamily: FONTS.body,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                {" — "}
                {benefit.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
