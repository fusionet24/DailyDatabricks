import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const features = [
  {
    icon: "\u{1F4D6}",
    title: "Read Delta Tables",
    description: "Load into pandas, Polars, or PyArrow",
  },
  {
    icon: "\u{270F}\u{FE0F}",
    title: "Write Delta Tables",
    description: "Create and append with write_deltalake()",
  },
  {
    icon: "\u{1F504}",
    title: "Merge / Upsert",
    description: "CDC-style updates with the merge API",
  },
  {
    icon: "\u{23F3}",
    title: "Time Travel",
    description: "Read any version of your table",
  },
  {
    icon: "\u{26A1}",
    title: "Optimize",
    description: "Compact small files for faster reads",
  },
  {
    icon: "\u{1F9F9}",
    title: "Vacuum",
    description: "Clean up old, unreferenced files",
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
