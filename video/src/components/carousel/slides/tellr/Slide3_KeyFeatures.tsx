import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const features = [
  {
    icon: "\u{1F4AC}",
    title: "Conversational Creation",
    description: "Describe what you want in plain English",
  },
  {
    icon: "\u{1F4CA}",
    title: "Live Data Queries",
    description: "Pulls real numbers from Genie spaces",
  },
  {
    icon: "\u{1F512}",
    title: "Enterprise Security",
    description: "Unity Catalog permissions apply automatically",
  },
  {
    icon: "\u{1F4C8}",
    title: "Interactive Charts",
    description: "Chart.js visualisations you can interact with",
  },
  {
    icon: "\u{1F3A8}",
    title: "Custom Branding",
    description: "Define your own styles, colours, and typography",
  },
  {
    icon: "\u{1F504}",
    title: "Iterative Editing",
    description: "Refine with follow-up prompts like a designer",
  },
];

export const Slide3_KeyFeatures: React.FC = () => {
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
        KEY
        <br />
        FEATURES
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="3/6"
    >
      {/* Feature grid - 2 columns x 3 rows */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          height: "100%",
          alignContent: "center",
          paddingBottom: 60,
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              width: "calc(50% - 10px)",
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
            }}
          >
            <span style={{ fontSize: 32 }}>{feature.icon}</span>
            <span
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 22,
                fontFamily: FONTS.body,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {feature.title}
            </span>
            <span
              style={{
                color: "#555555",
                fontSize: 18,
                fontFamily: FONTS.body,
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              {feature.description}
            </span>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
