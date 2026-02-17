import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const sparkCases = [
  {
    icon: "\u{1F4CA}",
    title: "Big Data at Scale",
    description: "Datasets too large for a single machine",
  },
  {
    icon: "\u{1F5C3}\u{FE0F}",
    title: "Complex SQL Analytics",
    description: "Full SQL engine with joins, aggregations, windowing",
  },
  {
    icon: "\u{1F504}",
    title: "Distributed ETL",
    description: "Multi-node processing across a cluster",
  },
  {
    icon: "\u{1F4A1}",
    title: "ML & Streaming",
    description: "MLlib, Structured Streaming, and the full Spark ecosystem",
  },
];

export const Slide3_WhenSpark: React.FC = () => {
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
        SPARK
        <br />
        WHEN
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="3/6"
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          height: "100%",
          alignContent: "center",
          paddingBottom: 60,
        }}
      >
        {sparkCases.map((item) => (
          <div
            key={item.title}
            style={{
              width: "calc(50% - 10px)",
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
            }}
          >
            <span style={{ fontSize: 32 }}>{item.icon}</span>
            <span
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 22,
                fontFamily: FONTS.body,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {item.title}
            </span>
            <span
              style={{
                color: "#555555",
                fontSize: 18,
                fontFamily: FONTS.body,
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
