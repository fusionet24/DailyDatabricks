import React from "react";
import { CarouselLayout } from "../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import {
  FeatureIcon,
  SendIcon,
  ClockIcon,
  CheckIcon,
} from "../FeatureIcon";

export const Slide3_Benefits: React.FC = () => {
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
        WHAT
        <br />
        DOES
        <br />
        THIS
        <br />
        MEAN FOR
        <br />
        ME?
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="3/5"
    >
      {/* Three Icons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          paddingTop: 100,
        }}
      >
        {/* Capabilities */}
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
            <SendIcon size={50} />
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
            CAPABILITIES
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
            Build Custom Spark connectors in Python to connect to any data
            source.
          </p>
          <p
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 17,
              fontFamily: FONTS.body,
              margin: 0,
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            Connect your own APIs, file formats or databases
          </p>
          <p
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 17,
              fontFamily: FONTS.body,
              margin: 0,
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            Leverages Apache Arrow for performance
          </p>
        </div>

        {/* Any Cadence, Same Code */}
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
            <ClockIcon size={50} />
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
            ANY CADENCE, SAME CODE
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
            Your Custom Datasource Class Works for batch + streaming
            reads/writes.
          </p>
        </div>

        {/* Unified Execution */}
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
            UNIFIED EXECUTION
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
            Simple Integration with External Services
          </p>
          <p
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 17,
              fontFamily: FONTS.body,
              margin: 0,
              marginTop: 12,
              lineHeight: 1.5,
            }}
          >
            Integration with Declarative Pipelines or Pyspark Notebooks
          </p>
        </div>
      </div>
    </CarouselLayout>
  );
};
