import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS } from "./lib/constants";
import { FONTS } from "./lib/fonts";

export interface EndCardProps {
  endCard1?: string;
  endCard2?: string;
  title1?: string;
  title2?: string;
}

export const EndCardGenerator: React.FC<EndCardProps> = ({
  endCard1 = staticFile("logo.jpg"),
  endCard2 = staticFile("logo.jpg"),
  title1,
  title2,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgDark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Red accent bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: COLORS.primary,
        }}
      />

      {/* Logo centered at top */}
      <div
        style={{
          position: "absolute",
          top: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Img
          src={staticFile("logo.jpg")}
          style={{
            height: 60,
            width: "auto",
            borderRadius: 6,
          }}
        />
      </div>

      {/* Two cards side by side */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 40,
          marginTop: 20,
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 760,
              height: 428,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Img
              src={endCard1}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {title1 && (
            <p
              style={{
                color: COLORS.textLight,
                fontSize: 24,
                fontFamily: FONTS.body,
                fontWeight: 600,
                margin: 0,
                textAlign: "center",
                maxWidth: 700,
              }}
            >
              {title1}
            </p>
          )}
        </div>

        {/* Card 2 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 760,
              height: 428,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Img
              src={endCard2}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          {title2 && (
            <p
              style={{
                color: COLORS.textLight,
                fontSize: 24,
                fontFamily: FONTS.body,
                fontWeight: 600,
                margin: 0,
                textAlign: "center",
                maxWidth: 700,
              }}
            >
              {title2}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <p
        style={{
          position: "absolute",
          bottom: 40,
          color: COLORS.textLight,
          fontSize: 22,
          fontFamily: FONTS.body,
          fontWeight: 400,
          margin: 0,
          opacity: 0.8,
        }}
      >
        More tips at{" "}
        <span style={{ fontWeight: 700 }}>dailydatabricks.tips</span>
      </p>
    </AbsoluteFill>
  );
};
