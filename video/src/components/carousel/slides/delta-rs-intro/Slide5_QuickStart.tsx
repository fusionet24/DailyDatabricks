import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";
import {
  CarouselCodeBlock,
  Comment,
  Method,
  Str,
  Plain,
  Keyword,
} from "../../CarouselCodeBlock";

export const Slide5_QuickStart: React.FC = () => {
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
          fontSize: 80,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        QUICK
        <br />
        START
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Comment># pip install deltalake</Comment>
        </>
      ),
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Keyword>from</Keyword>
          <Plain> deltalake </Plain>
          <Keyword>import</Keyword>
          <Plain> DeltaTable</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: <Plain />,
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Comment># Read a Delta table — no Spark!</Comment>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Plain>dt = </Plain>
          <Method>DeltaTable</Method>
          <Plain>(</Plain>
          <Str>"/path/to/delta"</Str>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>df = dt.</Plain>
          <Method>to_pandas</Method>
          <Plain>()</Plain>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: <Plain />,
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Comment># Time travel to any version</Comment>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Plain>old = </Plain>
          <Method>DeltaTable</Method>
          <Plain>(</Plain>
          <Str>"/path/to/delta"</Str>
          <Plain>, </Plain>
          <Method>version</Method>
          <Plain>=</Plain>
          <Str>0</Str>
          <Plain>)</Plain>
        </>
      ),
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="5/6"
    >
      {/* Title */}
      <h2
        style={{
          color: CAROUSEL_COLORS.bgRed,
          fontSize: 38,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        4 LINES TO READ ANY DELTA TABLE
      </h2>

      {/* Code block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
