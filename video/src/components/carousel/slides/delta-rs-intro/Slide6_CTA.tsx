import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide6_CTA: React.FC = () => {
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
          marginBottom: 30,
        }}
      >
        TRY DELTA-RS TODAY
      </h1>

      {/* Install command */}
      <h2
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 36,
          fontFamily: FONTS.code,
          fontWeight: 400,
          margin: 0,
          lineHeight: 1.1,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        pip install deltalake
      </h2>

      {/* Signup CTA */}
      <p
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 26,
          fontFamily: FONTS.display,
          fontWeight: 400,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 20,
          letterSpacing: 2,
        }}
      >
        SIGN UP TO THE NEWSLETTER
      </p>

      {/* Logo */}
      <Img
        src={staticFile("databricks-news-white.png")}
        style={{ height: 80, marginBottom: 30 }}
      />

      {/* Website */}
      <p
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 32,
          fontFamily: FONTS.display,
          fontWeight: 600,
          margin: 0,
        }}
      >
        dailydatabricks.tips
      </p>
    </AbsoluteFill>
  );
};
