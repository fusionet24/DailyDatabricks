import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CAROUSEL_COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";

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
          fontSize: 110,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        GOT QUESTIONS?
      </h1>

      {/* Subtitle */}
      <h2
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 70,
          fontFamily: FONTS.display,
          fontWeight: 500,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1.1,
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        JOIN ME ON
        <br />
        NOV 20<sup style={{ fontSize: 40, verticalAlign: "super" }}>TH</sup>
      </h2>

      {/* Description */}
      <h3
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 42,
          fontFamily: FONTS.display,
          fontWeight: 600,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1.2,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        FOR PYSPARK DATASOURCE
        <br />
        WEBINAR
      </h3>

      {/* Signup CTA */}
      <p
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 26,
          fontFamily: FONTS.display,
          fontWeight: 400,
          textTransform: "uppercase",
          margin: 0,
          marginTop: 30,
          letterSpacing: 2,
        }}
      >
        SIGN UP TO MY DATABRICKS NEWSLETTER
      </p>
      <p
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 26,
          fontFamily: FONTS.display,
          fontWeight: 400,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 40,
          letterSpacing: 2,
        }}
      >
        FOR DETAILS
      </p>

      {/* Logo */}
      <Img
        src={staticFile("databricks-news-white.png")}
        style={{ height: 80 }}
      />

      {/* No arrow on last slide */}
    </AbsoluteFill>
  );
};
