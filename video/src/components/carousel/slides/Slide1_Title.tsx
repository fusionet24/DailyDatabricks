import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CAROUSEL_COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import {
  CarouselCodeBlock,
  Comment,
  Method,
  Str,
  Plain,
} from "../CarouselCodeBlock";

export const Slide1_Title: React.FC = () => {
  const codeLines = [
    {
      lineNumber: 1,
      content: <Comment># Register my Data Source</Comment>,
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>spark</Method>
          <Plain>.</Plain>
          <Method>dataSource</Method>
          <Plain>.</Plain>
          <Method>register</Method>
          <Plain>(</Plain>
          <Method>MyNewDataSource</Method>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 4,
      content: <Comment># Load data from your own data source</Comment>,
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Method>spark</Method>
          <Plain>.</Plain>
          <Method>read</Method>
          <Plain>.</Plain>
          <Method>format</Method>
          <Plain>(</Plain>
          <Str>'MyNewDataSource'</Str>
          <Plain>).</Plain>
          <Method>load</Method>
          <Plain>()</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 7,
      content: <Comment># Write data to your own data source</Comment>,
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Method>spark</Method>
          <Plain>.</Plain>
          <Method>write</Method>
          <Plain>.</Plain>
          <Method>format</Method>
          <Plain>(</Plain>
          <Str>"MyNewDataSource"</Str>
          <Plain>).</Plain>
          <Method>save</Method>
          <Plain>()</Plain>
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
        HAVE YOU EVER WANTED TO
      </h3>

      {/* Main Title */}
      <h1
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 130,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1,
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        BUILD YOUR OWN DATA
        <br />
        SOURCE
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
