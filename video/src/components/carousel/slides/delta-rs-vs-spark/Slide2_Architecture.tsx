import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide2_Architecture: React.FC = () => {
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
        ARCHI-
        <br />
        TECTURE
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="2/6"
    >
      <h2
        style={{
          color: CAROUSEL_COLORS.bgRed,
          fontSize: 36,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        TWO DIFFERENT APPROACHES
      </h2>

      <div style={{ display: "flex", gap: 24, width: "100%" }}>
        {/* Spark stack */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            borderRadius: 16,
            padding: 28,
            borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
          }}
        >
          <h3
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 26,
              fontFamily: FONTS.display,
              fontWeight: 700,
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 16,
            }}
          >
            APACHE SPARK
          </h3>
          {["Python / Scala / SQL", "Spark Runtime (JVM)", "Delta Lake Library", "Distributed Cluster", "Cloud Storage"].map(
            (layer, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: i === 1 ? CAROUSEL_COLORS.bgRed : "#E8E8E8",
                  color: i === 1 ? CAROUSEL_COLORS.textWhite : CAROUSEL_COLORS.textBlack,
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 8,
                  fontSize: 17,
                  fontFamily: FONTS.body,
                  fontWeight: i === 1 ? 700 : 400,
                  textAlign: "center",
                }}
              >
                {layer}
              </div>
            )
          )}
        </div>

        {/* Delta-RS stack */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            borderRadius: 16,
            padding: 28,
            borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
          }}
        >
          <h3
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 26,
              fontFamily: FONTS.display,
              fontWeight: 700,
              textTransform: "uppercase",
              margin: 0,
              marginBottom: 16,
            }}
          >
            DELTA-RS
          </h3>
          {["Python", "Rust Core (Native)", "Apache Arrow", "Single Machine", "Cloud Storage"].map(
            (layer, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: i === 1 ? CAROUSEL_COLORS.bgRed : "#E8E8E8",
                  color: i === 1 ? CAROUSEL_COLORS.textWhite : CAROUSEL_COLORS.textBlack,
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 8,
                  fontSize: 17,
                  fontFamily: FONTS.body,
                  fontWeight: i === 1 ? 700 : 400,
                  textAlign: "center",
                }}
              >
                {layer}
              </div>
            )
          )}
        </div>
      </div>
    </CarouselLayout>
  );
};
