import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide5_Together: React.FC = () => {
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
        BETTER
        <br />
        TOGETHER
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="5/6"
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
        SAME DELTA TABLE, DIFFERENT TOOLS
      </h2>

      {/* Flow diagram */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Delta Table in center */}
        <div
          style={{
            backgroundColor: CAROUSEL_COLORS.bgRed,
            borderRadius: 16,
            padding: "20px 40px",
            width: "80%",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: CAROUSEL_COLORS.textWhite,
              fontSize: 28,
              fontFamily: FONTS.display,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            DELTA TABLE (CLOUD STORAGE)
          </span>
        </div>

        {/* Arrow down */}
        <div style={{ fontSize: 36, color: CAROUSEL_COLORS.bgRed }}>
          {"\\u2195"}
        </div>

        {/* Two access patterns */}
        <div style={{ display: "flex", gap: 20, width: "100%" }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: 24,
              borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
            }}
          >
            <h3
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 22,
                fontFamily: FONTS.display,
                fontWeight: 700,
                margin: 0,
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              WRITE WITH SPARK
            </h3>
            <p
              style={{
                color: "#555555",
                fontSize: 18,
                fontFamily: FONTS.body,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Databricks ETL pipelines write production data at scale
            </p>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "#F5F5F5",
              borderRadius: 16,
              padding: 24,
              borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
            }}
          >
            <h3
              style={{
                color: CAROUSEL_COLORS.textBlack,
                fontSize: 22,
                fontFamily: FONTS.display,
                fontWeight: 700,
                margin: 0,
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              READ WITH DELTA-RS
            </h3>
            <p
              style={{
                color: "#555555",
                fontSize: 18,
                fontFamily: FONTS.body,
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              APIs, microservices, and CI/CD consume data without a cluster
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            backgroundColor: "#F5F5F5",
            borderRadius: 16,
            padding: "16px 32px",
            width: "80%",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          <span
            style={{
              color: CAROUSEL_COLORS.textBlack,
              fontSize: 20,
              fontFamily: FONTS.body,
              fontWeight: 600,
            }}
          >
            Both read and write the same open Delta format
          </span>
        </div>
      </div>
    </CarouselLayout>
  );
};
