import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide1_Title: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CAROUSEL_COLORS.bgRed,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Pre-title */}
      <h3
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 36,
          fontFamily: FONTS.display,
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: 4,
          margin: 0,
          marginBottom: 10,
        }}
      >
        DELTALAKE PYTHON LIBRARY
      </h3>

      {/* Main Title */}
      <h1
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 100,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        DELTA-RS
        <br />
        CODE PATTERNS
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 30,
          fontFamily: FONTS.body,
          fontWeight: 400,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 1200,
        }}
      >
        Write, read, merge, and time-travel — all without Spark
      </p>

      {/* Logo at bottom left */}
      <div style={{ position: "absolute", bottom: 30, left: 40 }}>
        <Img
          src={staticFile("databricks-news-white.png")}
          style={{ height: 40 }}
        />
      </div>

      {/* Navigation Arrow */}
      <div
        style={{
          position: "absolute",
          right: 30,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="white"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
