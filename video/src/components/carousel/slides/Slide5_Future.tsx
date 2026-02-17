import React from "react";
import { CarouselLayout } from "../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import {
  DatabaseIcon,
  FilterIcon,
  GearIcon,
  ColumnsIcon,
  ChartIcon,
  SearchIcon,
} from "../FeatureIcon";

export const Slide5_Future: React.FC = () => {
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
        FUTURE
        <br />
        CAPABILITIES
      </h2>
    </div>
  );

  const features = [
    { icon: <DatabaseIcon size={36} />, label: "COMMUNITY CONNECTORS" },
    { icon: <FilterIcon size={36} />, label: "FILTER PUSHDOWN" },
    { icon: <GearIcon size={36} />, label: "PERFORMANCE OPTIMISATIONS" },
    { icon: <ColumnsIcon size={36} />, label: "COLUMN PRUNING" },
    { icon: <ChartIcon size={36} />, label: "CUSTOM STATISTICS" },
    { icon: <SearchIcon size={36} />, label: "OBSERVABILITY IMPROVEMENTS" },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="5/5"
    >
      {/* 6 Feature Icons in 2x3 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: 60,
          width: "100%",
          height: "100%",
          padding: "40px 60px",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {/* Icon Circle */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: CAROUSEL_COLORS.bgRed,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {feature.icon}
            </div>

            {/* Label */}
            <h3
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 22,
                fontFamily: FONTS.display,
                fontWeight: 600,
                textTransform: "uppercase",
                margin: 0,
                letterSpacing: 1,
              }}
            >
              {feature.label}
            </h3>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
