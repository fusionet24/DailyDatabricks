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

export const Slide2_Write: React.FC = () => {
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
        WRITE
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Keyword>import</Keyword>
          <Plain> pandas </Plain>
          <Keyword>as</Keyword>
          <Plain> pd</Plain>
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
          <Plain> write_deltalake</Plain>
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
          <Comment># Create a DataFrame</Comment>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Plain>df = pd.</Plain>
          <Method>DataFrame</Method>
          <Plain>({"{"}</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>    </Plain>
          <Str>"product"</Str>
          <Plain>: [</Plain>
          <Str>"Croissant"</Str>
          <Plain>, </Plain>
          <Str>"Baguette"</Str>
          <Plain>],</Plain>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Plain>    </Plain>
          <Str>"revenue"</Str>
          <Plain>: [360.0, 255.0],</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Plain>{"}"})</Plain>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: <Plain />,
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Comment># Write as a Delta table</Comment>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: (
        <>
          <Method>write_deltalake</Method>
          <Plain>(</Plain>
          <Str>"/tmp/products"</Str>
          <Plain>, df)</Plain>
        </>
      ),
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="2/6"
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
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        CREATE DELTA TABLES FROM PANDAS
      </h2>

      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
