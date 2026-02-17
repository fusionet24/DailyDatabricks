import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide4_EgressControl: React.FC = () => {
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
        EGRESS
        <br />
        CONTROL
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
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        SERVERLESS EGRESS CONTROL (GA)
      </h2>

      {/* Subtitle */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 20,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 36,
          lineHeight: 1.5,
        }}
      >
        Control outbound connections from serverless compute resources to the
        Internet and cloud storage
      </p>

      {/* Warning callout */}
      <div
        style={{
          backgroundColor: "#FFF3E0",
          borderLeft: `6px solid #FF9800`,
          borderRadius: 8,
          padding: "20px 28px",
          marginBottom: 30,
        }}
      >
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 19,
            fontFamily: FONTS.body,
            fontWeight: 600,
            margin: 0,
            marginBottom: 8,
          }}
        >
          Important: Default Behavior
        </p>
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 18,
            fontFamily: FONTS.body,
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Serverless Notebooks, Jobs, and Lakeflow Declarative Pipelines have
          unrestricted access to the public internet by default.
        </p>
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
          "Configure a Network Policy to restrict outbound traffic",
          "Only allow explicitly permitted destinations",
          "Mitigate data exfiltration risks",
          "Enable dry-run mode first to safely test on production",
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
            {/* Shield icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={CAROUSEL_COLORS.bgRed}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
