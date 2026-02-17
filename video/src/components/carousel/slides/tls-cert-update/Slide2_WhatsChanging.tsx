import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide2_WhatsChanging: React.FC = () => {
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
        WHAT'S
        <br />
        CHANGING?
      </h2>
    </div>
  );

  const bulletPoints = [
    {
      title: "New Trusted CAs",
      description:
        "Databricks is migrating certificates for public-facing websites and API endpoints to new Certificate Authorities.",
    },
    {
      title: "Security & Reliability",
      description:
        "This ensures continued compliance with industry best practices and improved resilience.",
    },
    {
      title: "Gradual Rollout",
      description:
        "The update will begin rolling out gradually starting March 15, 2026.",
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
        TLS CERTIFICATE MIGRATION
      </h2>

      {/* Bullet points */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
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
