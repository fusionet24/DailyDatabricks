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
          <Plain> pyspark.sql.functions </Plain>
          <Method>as</Method>
          <Plain> F</Plain>
        </>
      ),
    },
    {
      lineNumber: 2,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 3,
      content: <Comment># Multiple hash options</Comment>,
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>xxhash64</Method>
          <Plain>(*df.columns)  </Plain>
          <Comment># Fast</Comment>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>md5</Method>
          <Plain>(</Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>concat</Method>
          <Plain>(*df.columns))  </Plain>
          <Comment># Crypto</Comment>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>sha2</Method>
          <Plain>(..., </Plain>
          <Method>256</Method>
          <Plain>)  </Plain>
          <Comment># Secure</Comment>
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
        NEED TO HASH YOUR DATA?
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
        SPARK HASHING
        <br />
        FUNCTIONS
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
