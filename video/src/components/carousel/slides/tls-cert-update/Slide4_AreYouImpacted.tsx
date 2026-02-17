import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide4_AreYouImpacted: React.FC = () => {
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
        ARE
        <br />
        YOU
        <br />
        IMPACTED?
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
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        CHECK YOUR CLIENT CONNECTIVITY
      </h2>

      {/* Not impacted callout */}
      <div
        style={{
          backgroundColor: "#E8F5E9",
          borderLeft: `6px solid #4CAF50`,
          borderRadius: 8,
          padding: "20px 24px",
          marginBottom: 28,
        }}
      >
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 19,
            fontFamily: FONTS.body,
            fontWeight: 600,
            margin: 0,
            marginBottom: 6,
          }}
        >
          You are NOT impacted if:
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
          You use a supported browser or a client that already trusts the root
          and intermediate certificates from all four CAs.
        </p>
      </div>

      {/* Test URLs */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 20,
          fontFamily: FONTS.body,
          fontWeight: 700,
          margin: 0,
          marginBottom: 16,
        }}
      >
        Test your connectivity with these URLs:
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[
          { ca: "Let's Encrypt", url: "delta-sharing.westus.azuredatabricks.net" },
          { ca: "Google Trust", url: "help.databricks.com" },
          { ca: "AWS Cert Manager", url: "community.databricks.com" },
          { ca: "DigiCert", url: "nvirginia.cloud.databricks.com" },
        ].map((item) => (
          <div
            key={item.ca}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              backgroundColor: "#F8F9FA",
              borderRadius: 8,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={CAROUSEL_COLORS.bgRed}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 17,
                fontFamily: FONTS.body,
                fontWeight: 600,
                minWidth: 160,
              }}
            >
              {item.ca}
            </span>
            <span
              style={{
                color: CAROUSEL_COLORS.bgRed,
                fontSize: 16,
                fontFamily: FONTS.code,
                fontWeight: 400,
              }}
            >
              {item.url}
            </span>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div
        style={{
          backgroundColor: "#FFF3E0",
          borderLeft: `6px solid #FF9800`,
          borderRadius: 8,
          padding: "14px 20px",
          marginTop: 20,
        }}
      >
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 16,
            fontFamily: FONTS.body,
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          If you see <span style={{ fontWeight: 700 }}>"Your connection is not private"</span> or{" "}
          <span style={{ fontWeight: 700 }}>"certificate verify error"</span>, you need to update
          your configuration.
        </p>
      </div>
    </CarouselLayout>
  );
};
