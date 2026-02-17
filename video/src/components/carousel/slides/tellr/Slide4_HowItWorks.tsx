import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const steps = [
  {
    number: "1",
    title: "Install TellR",
    description:
      "Run pip install databricks-tellr in a notebook, then call tellr.create() to deploy the app and Lakebase database.",
  },
  {
    number: "2",
    title: "Create a Genie Space",
    description:
      "Connect your Unity Catalog tables to a Genie space. Add descriptions for better AI understanding of your data.",
  },
  {
    number: "3",
    title: "Create a Profile",
    description:
      "Bundle your Genie space, custom slide style, and deck prompt template into a reusable profile configuration.",
  },
  {
    number: "4",
    title: "Generate & Export",
    description:
      "Type a natural language prompt and TellR builds your deck. Export as interactive HTML or static PDF.",
  },
];

export const Slide4_HowItWorks: React.FC = () => {
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
        HOW IT
        <br />
        WORKS
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="4/6"
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
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        FROM INSTALL TO SLIDES IN 4 STEPS
      </h2>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            {/* Number circle */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: CAROUSEL_COLORS.bgRed,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: CAROUSEL_COLORS.textWhite,
                  fontSize: 24,
                  fontFamily: FONTS.display,
                  fontWeight: 700,
                }}
              >
                {step.number}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 24,
                  fontFamily: FONTS.body,
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </span>
              <span
                style={{
                  color: "#555555",
                  fontSize: 20,
                  fontFamily: FONTS.body,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                {step.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
