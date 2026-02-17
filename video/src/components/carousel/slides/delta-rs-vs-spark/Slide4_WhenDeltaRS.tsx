import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const deltaRSCases = [
  {
    icon: "\u{1F4BB}",
    title: "Local Development",
    description: "Develop and test Delta pipelines on your laptop",
  },
  {
    icon: "\u{2699}\u{FE0F}",
    title: "CI/CD Pipelines",
    description: "Schema validation in lightweight GitHub Actions jobs",
  },
  {
    icon: "\u{1F310}",
    title: "Microservices",
    description: "Serve Delta data in APIs without JVM overhead",
  },
  {
    icon: "\u{1F680}",
    title: "Edge & Embedded",
    description: "Run Delta where a JVM can't go",
  },
];

export const Slide4_WhenDeltaRS: React.FC = () => {
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
          fontSize: 60,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        USE
        <br />
        DELTA-RS
        <br />
        WHEN
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="4/6"
    >
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
        {deltaRSCases.map((item) => (
          <div
            key={item.title}
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
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <span
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 22,
                fontFamily: FONTS.body,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {item.title}
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
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
