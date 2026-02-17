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
      content: (
        <>
          <Method>import</Method>
          <Plain> ipywidgets </Plain>
          <Method>as</Method>
          <Plain> widgets</Plain>
        </>
      ),
    },
    {
      lineNumber: 2,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 3,
      content: <Comment># Create interactive controls</Comment>,
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Method>slider</Method>
          <Plain> = widgets.</Plain>
          <Method>IntSlider</Method>
          <Plain>(</Plain>
          <Method>min</Method>
          <Plain>=0, </Plain>
          <Method>max</Method>
          <Plain>=100)</Plain>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Method>dropdown</Method>
          <Plain> = widgets.</Plain>
          <Method>Dropdown</Method>
          <Plain>(</Plain>
          <Method>options</Method>
          <Plain>=[</Plain>
          <Str>'A'</Str>
          <Plain>, </Plain>
          <Str>'B'</Str>
          <Plain>])</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Method>display</Method>
          <Plain>(slider, dropdown)</Plain>
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
        WANT INTERACTIVE NOTEBOOKS?
      </h3>

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
          marginBottom: 50,
        }}
      >
        IPYTHON WIDGETS
        <br />
        IN DATABRICKS
      </h1>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} style={{ width: "70%" }} />

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
