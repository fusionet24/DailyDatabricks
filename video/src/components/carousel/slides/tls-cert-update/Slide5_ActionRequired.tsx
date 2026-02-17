import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide5_ActionRequired: React.FC = () => {
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
        ACTION
        <br />
        REQUIRED
      </h2>
    </div>
  );

  const steps = [
    {
      number: "1",
      title: "Test Connectivity",
      description:
        "Visit the test URLs on the previous slide using your client to check if connections succeed without errors.",
    },
    {
      number: "2",
      title: "Update Trust Store",
      description:
        "If your clients don't trust all four CAs, update them to trust the root and intermediate certificates from all providers.",
    },
    {
      number: "3",
      title: "Don't Pin to One CA",
      description:
        "If your clients are set to use only one CA, reconfigure them to trust all four to avoid interruptions.",
    },
    {
      number: "4",
      title: "Need Help?",
      description:
        "Contact your Databricks account team for assistance with verifying or updating your client certificates.",
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="5/6"
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
        WHAT YOU NEED TO DO
      </h2>

      {/* Steps */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 18,
            }}
          >
            {/* Step number */}
            <div
              style={{
                width: 44,
                height: 44,
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
                {step.number}
              </span>
            </div>
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
                {step.title}
              </span>
              <span
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 20,
                  fontFamily: FONTS.body,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                {" — "}
                {step.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
