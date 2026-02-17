import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";
import { CheckIcon, DatabaseIcon, GearIcon } from "../../FeatureIcon";

export const Slide4_Benefits: React.FC = () => {
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
        WHY
        <br />
        USE
        <br />
        THIS?
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
        {/* Reusability */}
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
            REUSABILITY
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
            Define complex window specs once and reuse across multiple
            aggregations
          </p>
        </div>

        {/* Readability */}
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
            <CheckIcon size={50} />
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
            READABILITY
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
            Cleaner, more concise queries that are easier to understand and
            maintain
          </p>
        </div>

        {/* Error Reduction */}
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
            ERROR REDUCTION
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
            Avoid copy-paste errors from repeating window definitions
          </p>
        </div>
      </div>
    </CarouselLayout>
  );
};
