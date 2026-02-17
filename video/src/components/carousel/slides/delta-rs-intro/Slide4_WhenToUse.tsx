import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const useCases = [
  {
    icon: "\u{1F4BB}",
    title: "Local Development",
    description: "Read and write Delta on your laptop — no cluster needed",
  },
  {
    icon: "\u{2699}\u{FE0F}",
    title: "CI/CD Pipelines",
    description: "Validate schemas and row counts in GitHub Actions",
  },
  {
    icon: "\u{1F310}",
    title: "Microservices & APIs",
    description: "Serve Delta data without Spark overhead",
  },
  {
    icon: "\u{2705}",
    title: "Data Validation",
    description: "Quick schema checks before production deploys",
  },
];

export const Slide4_WhenToUse: React.FC = () => {
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
        WHEN
        <br />
        TO USE
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
          fontSize: 38,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        PERFECT FOR LIGHTWEIGHT DELTA ACCESS
      </h2>

      {/* Use case cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignContent: "center",
        }}
      >
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
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
            <span style={{ fontSize: 32 }}>{useCase.icon}</span>
            <span
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 22,
                fontFamily: FONTS.body,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {useCase.title}
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
              {useCase.description}
            </span>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
