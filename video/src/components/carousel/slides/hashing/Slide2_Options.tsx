import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide2_Options: React.FC = () => {
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
          fontSize: 90,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        THE
        <br />
        OPTIONS
      </h2>
    </div>
  );

  const hashOptions = [
    {
      name: "xxhash64",
      speed: "Fastest",
      use: "Deduplication, partitioning",
      output: "64-bit integer",
    },
    {
      name: "hash",
      speed: "Fast",
      use: "General purpose hashing",
      output: "32-bit integer",
    },
    {
      name: "md5",
      speed: "Medium",
      use: "Data fingerprinting",
      output: "128-bit hex string",
    },
    {
      name: "sha1",
      speed: "Slower",
      use: "Legacy compatibility",
      output: "160-bit hex string",
    },
    {
      name: "sha2",
      speed: "Slowest",
      use: "Security-sensitive hashing",
      output: "256/512-bit hex",
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="2/5"
    >
      {/* Title */}
      <h2
        style={{
          color: CAROUSEL_COLORS.bgRed,
          fontSize: 38,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        CHOOSE THE RIGHT HASH FOR YOUR USE CASE
      </h2>

      {/* Table */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 12,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            padding: "12px 16px",
            backgroundColor: CAROUSEL_COLORS.bgRed,
            borderRadius: 8,
          }}
        >
          <span
            style={{
              flex: 1,
              color: CAROUSEL_COLORS.textWhite,
              fontSize: 16,
              fontFamily: FONTS.display,
              fontWeight: 600,
            }}
          >
            FUNCTION
          </span>
          <span
            style={{
              flex: 1,
              color: CAROUSEL_COLORS.textWhite,
              fontSize: 16,
              fontFamily: FONTS.display,
              fontWeight: 600,
            }}
          >
            SPEED
          </span>
          <span
            style={{
              flex: 2,
              color: CAROUSEL_COLORS.textWhite,
              fontSize: 16,
              fontFamily: FONTS.display,
              fontWeight: 600,
            }}
          >
            BEST FOR
          </span>
        </div>

        {/* Rows */}
        {hashOptions.map((opt, idx) => (
          <div
            key={opt.name}
            style={{
              display: "flex",
              padding: "10px 16px",
              backgroundColor: idx % 2 === 0 ? "#F5F5F5" : "#FFFFFF",
              borderRadius: 6,
            }}
          >
            <span
              style={{
                flex: 1,
                color: CAROUSEL_COLORS.codeMethod,
                fontSize: 16,
                fontFamily: FONTS.code,
                fontWeight: 600,
              }}
            >
              {opt.name}
            </span>
            <span
              style={{
                flex: 1,
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 15,
                fontFamily: FONTS.body,
              }}
            >
              {opt.speed}
            </span>
            <span
              style={{
                flex: 2,
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 15,
                fontFamily: FONTS.body,
              }}
            >
              {opt.use}
            </span>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
