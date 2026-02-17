import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";
import { GearIcon, SearchIcon, ChartIcon } from "../../FeatureIcon";

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
        USE
        <br />
        CASES
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
        {/* Parameter Tuning */}
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
            <GearIcon size={50} />
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
            PARAMETER TUNING
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
            Adjust ML model hyperparameters interactively and see results
            instantly
          </p>
        </div>

        {/* Data Exploration */}
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
            DATA EXPLORATION
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
            Filter and explore datasets dynamically with dropdowns and sliders
          </p>
        </div>

        {/* Dashboards */}
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
            <ChartIcon size={50} />
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
            DASHBOARDS
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
            Build simple interactive dashboards without external tools
          </p>
        </div>
      </div>
    </CarouselLayout>
  );
};
