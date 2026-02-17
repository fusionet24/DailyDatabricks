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

export const Slide3_Read: React.FC = () => {
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
        READ &
        <br />
        FILTER
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
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
      lineNumber: 2,
      content: <Plain />,
    },
    {
      lineNumber: 3,
      content: (
        <>
          <Plain>dt = </Plain>
          <Method>DeltaTable</Method>
          <Plain>(</Plain>
          <Str>"/tmp/products"</Str>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 4,
      content: <Plain />,
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Comment># Read as pandas</Comment>
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
          <Comment># Predicate pushdown — only reads relevant files</Comment>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Plain>filtered = dt.</Plain>
          <Method>to_pandas</Method>
          <Plain>(</Plain>
        </>
      ),
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Plain>    </Plain>
          <Method>filters</Method>
          <Plain>=[(</Plain>
          <Str>"revenue"</Str>
          <Plain>, </Plain>
          <Str>"&gt;"</Str>
          <Plain>, </Plain>
          <Str>300</Str>
          <Plain>)]</Plain>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: (
        <>
          <Plain>)</Plain>
        </>
      ),
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="3/6"
    >
      <h2
        style={{
          color: CAROUSEL_COLORS.bgRed,
          fontSize: 38,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        EFFICIENT READS WITH PUSHDOWN
      </h2>

      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
