import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";
import {
  CarouselCodeBlock,
  Comment,
  Method,
  Str,
  Plain,
} from "../../CarouselCodeBlock";

export const Slide1_Title: React.FC = () => {
  const codeLines = [
    {
      lineNumber: 1,
      content: <Comment>-- Define window once, use everywhere</Comment>,
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>SELECT</Method>
          <Plain> product,</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: (
        <>
          <Plain>       </Plain>
          <Method>SUM</Method>
          <Plain>(sales) </Plain>
          <Method>OVER</Method>
          <Plain> monthly_window,</Plain>
        </>
      ),
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Plain>       </Plain>
          <Method>AVG</Method>
          <Plain>(sales) </Plain>
          <Method>OVER</Method>
          <Plain> monthly_window</Plain>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Method>WINDOW</Method>
          <Plain> monthly_window </Plain>
          <Method>AS</Method>
          <Plain> (</Plain>
          <Method>PARTITION BY</Method>
          <Plain> product)</Plain>
        </>
      ),
    },
  ];

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
        TIRED OF REPEATING WINDOW SPECS?
      </h3>

      {/* Main Title */}
      <h1
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 120,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        REUSABLE
        <br />
        WINDOW FUNCTIONS
      </h1>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} style={{ width: "75%" }} />

      {/* Logo at bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 40,
        }}
      >
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
