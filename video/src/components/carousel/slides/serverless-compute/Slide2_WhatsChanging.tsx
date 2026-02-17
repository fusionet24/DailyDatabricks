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
      title: "Auto-Enablement",
      description:
        "Serverless compute will be automatically enabled for all eligible accounts and workspaces if not already enabled.",
    },
    {
      title: "No Disruption",
      description:
        "Your existing workloads will not be affected. You can continue to use classic compute as before.",
    },
    {
      title: "Toggle Removed",
      description:
        "The account-level serverless toggle will be removed. Serverless will be available in all eligible workspaces.",
    },
    {
      title: "What is Serverless?",
      description:
        "Databricks' most stable compute product with auto-optimizing infrastructure and versionless Spark.",
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
        AUTOMATIC ENABLEMENT FOR ALL WORKSPACES
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
