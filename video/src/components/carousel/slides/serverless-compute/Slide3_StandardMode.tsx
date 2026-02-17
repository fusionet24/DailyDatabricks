import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide3_StandardMode: React.FC = () => {
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
          fontSize: 70,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        STANDARD
        <br />
        MODE
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="3/6"
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
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        NEW LOWER-COST COMPUTE MODE
      </h2>

      {/* Subtitle */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 20,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 40,
          lineHeight: 1.5,
        }}
      >
        Standard mode is now generally available for serverless Lakeflow Jobs
        and Declarative Pipelines
      </p>

      {/* Savings highlight */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            backgroundColor: CAROUSEL_COLORS.bgRed,
            borderRadius: 16,
            padding: "24px 48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: CAROUSEL_COLORS.textWhite,
              fontSize: 72,
              fontFamily: FONTS.display,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            UP TO 70%
          </span>
          <span
            style={{
              color: CAROUSEL_COLORS.textWhite,
              fontSize: 28,
              fontFamily: FONTS.display,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            LOWER COST
          </span>
        </div>
      </div>

      {/* Feature list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {[
          "Fully managed compute by Databricks",
          "Versionless — receives updates automatically",
          "Compared to performance optimized mode",
          "Best for scheduled workloads with flexible latency",
        ].map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={CAROUSEL_COLORS.bgRed}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 21,
                fontFamily: FONTS.body,
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
