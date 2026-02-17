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

export const Slide4_TimeTravel: React.FC = () => {
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
        TIME
        <br />
        TRAVEL
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Comment># Current version</Comment>
        </>
      ),
    },
    {
      lineNumber: 2,
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
      lineNumber: 3,
      content: (
        <>
          <Keyword>print</Keyword>
          <Plain>(dt.</Plain>
          <Method>version</Method>
          <Plain>())  </Plain>
          <Comment># e.g. 2</Comment>
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
          <Comment># Read a specific version</Comment>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>old = </Plain>
          <Method>DeltaTable</Method>
          <Plain>(</Plain>
          <Str>"/tmp/products"</Str>
          <Plain>, </Plain>
          <Method>version</Method>
          <Plain>=</Plain>
          <Str>0</Str>
          <Plain>)</Plain>
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
          <Comment># Full table history</Comment>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Keyword>for</Keyword>
          <Plain> entry </Plain>
          <Keyword>in</Keyword>
          <Plain> dt.</Plain>
          <Method>history</Method>
          <Plain>():</Plain>
        </>
      ),
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Plain>    </Plain>
          <Keyword>print</Keyword>
          <Plain>(entry[</Plain>
          <Str>"version"</Str>
          <Plain>], entry[</Plain>
          <Str>"operation"</Str>
          <Plain>])</Plain>
        </>
      ),
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="4/6"
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
        READ ANY VERSION OF YOUR TABLE
      </h2>

      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
