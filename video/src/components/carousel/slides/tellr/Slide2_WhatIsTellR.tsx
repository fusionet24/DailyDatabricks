import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide2_WhatIsTellR: React.FC = () => {
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
        WHAT IS
        <br />
        TELLR?
      </h2>
    </div>
  );

  const bulletPoints = [
    {
      title: "Open-Source App",
      description:
        "Created by Robert Whiffin (Sr. Solutions Architect at Databricks), with Tariq Yaaqba and Puneet Jain.",
    },
    {
      title: "Natural Language",
      description:
        "Describe the presentation you want in plain English — TellR generates it from your live data.",
    },
    {
      title: "Governed by Unity Catalog",
      description:
        "All queries respect your Unity Catalog permissions. Data never leaves your workspace.",
    },
    {
      title: "Foundation Models",
      description:
        "Uses Databricks Foundation Model endpoints (e.g. Claude Sonnet 4.5) to generate interactive slides.",
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="2/6"
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
        AI-POWERED SLIDE DECKS FROM YOUR DATA
      </h2>

      {/* Bullet points */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {bulletPoints.map((point) => (
          <div
            key={point.title}
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
                {point.title}
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
                {point.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
