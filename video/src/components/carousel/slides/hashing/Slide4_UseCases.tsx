import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";
import { DatabaseIcon, FilterIcon, SearchIcon } from "../../FeatureIcon";

export const Slide4_UseCases: React.FC = () => {
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
        WHEN
        <br />
        TO
        <br />
        USE?
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="4/5"
    >
      {/* Three Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          paddingTop: 80,
        }}
      >
        {/* Deduplication */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: CAROUSEL_COLORS.bgRed,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <DatabaseIcon size={50} />
          </div>
          <h3
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 22,
              fontFamily: FONTS.display,
              fontWeight: 600,
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 16,
              letterSpacing: 1,
            }}
          >
            DEDUPLICATION
          </h3>
          <p
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 17,
              fontFamily: FONTS.body,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Quickly identify duplicate rows by comparing hash values instead of
            all columns
          </p>
        </div>

        {/* Change Detection */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: CAROUSEL_COLORS.iconBgBlack,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <FilterIcon size={50} />
          </div>
          <h3
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 22,
              fontFamily: FONTS.display,
              fontWeight: 600,
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 16,
              letterSpacing: 1,
            }}
          >
            CHANGE DETECTION
          </h3>
          <p
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 17,
              fontFamily: FONTS.body,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Detect row changes in incremental loads by comparing hash of current
            vs previous data
          </p>
        </div>

        {/* Anonymization */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 280,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: CAROUSEL_COLORS.iconBgBlack,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <SearchIcon size={50} />
          </div>
          <h3
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 22,
              fontFamily: FONTS.display,
              fontWeight: 600,
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 16,
              letterSpacing: 1,
            }}
          >
            ANONYMIZATION
          </h3>
          <p
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 17,
              fontFamily: FONTS.body,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Replace PII with hashed values for privacy while maintaining join
            capability
          </p>
        </div>
      </div>
    </CarouselLayout>
  );
};
