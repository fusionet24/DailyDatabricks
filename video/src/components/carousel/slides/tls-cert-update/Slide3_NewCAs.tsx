import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide3_NewCAs: React.FC = () => {
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
        NEW
        <br />
        CAs
      </h2>
    </div>
  );

  const cas = [
    {
      name: "Let's Encrypt",
      description: "Free, automated, and open CA trusted globally",
    },
    {
      name: "Google Trust Services",
      description: "Google's publicly trusted Certificate Authority",
    },
    {
      name: "AWS Certificate Manager",
      description: "Amazon's managed public & private certificates",
    },
    {
      name: "DigiCert",
      description: "Enterprise-grade digital certificate provider",
    },
  ];

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
        NEW CERTIFICATE AUTHORITIES
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
        Databricks certificates are being migrated to these trusted CAs
      </p>

      {/* CA Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {cas.map((ca, index) => (
          <div
            key={ca.name}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              backgroundColor: index % 2 === 0 ? "#F8F9FA" : "#FFFFFF",
              borderRadius: 12,
              padding: "20px 24px",
              borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
            }}
          >
            {/* Number badge */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: CAROUSEL_COLORS.bgRed,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: CAROUSEL_COLORS.textWhite,
                  fontSize: 22,
                  fontFamily: FONTS.display,
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </span>
            </div>
            <div>
              <h3
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 24,
                  fontFamily: FONTS.body,
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: 4,
                }}
              >
                {ca.name}
              </h3>
              <p
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 18,
                  fontFamily: FONTS.body,
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {ca.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
