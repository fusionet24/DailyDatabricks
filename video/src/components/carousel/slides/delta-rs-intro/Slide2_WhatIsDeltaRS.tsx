import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide2_WhatIsDeltaRS: React.FC = () => {
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
        WHAT IS
        <br />
        DELTA-RS?
      </h2>
    </div>
  );

  const bulletPoints = [
    {
      title: "Rust Core",
      description:
        "Built in Rust for speed and memory safety — compiled to native code, no garbage collector.",
    },
    {
      title: "Python Bindings",
      description:
        "pip install deltalake and you're ready. Full Delta Lake protocol support from Python.",
    },
    {
      title: "No JVM Required",
      description:
        "No Spark, no Java, no heavy runtime. Runs anywhere Python runs.",
    },
    {
      title: "Arrow-Native",
      description:
        "Built on Apache Arrow for zero-copy interop with pandas, Polars, and other Arrow tools.",
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
        NATIVE DELTA LAKE FOR PYTHON
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
