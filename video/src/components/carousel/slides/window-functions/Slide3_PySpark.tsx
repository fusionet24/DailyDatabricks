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
} from "../../CarouselCodeBlock";

export const Slide3_PySpark: React.FC = () => {
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
        PY
        <br />
        SPARK
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Method>from</Method>
          <Plain> pyspark.sql </Plain>
          <Method>import</Method>
          <Plain> Window</Plain>
        </>
      ),
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>from</Method>
          <Plain> pyspark.sql.functions </Plain>
          <Method>import</Method>
          <Plain> *</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 4,
      content: <Comment># Define window spec once</Comment>,
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Method>window</Method>
          <Plain> = Window \</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>    .</Plain>
          <Method>partitionBy</Method>
          <Plain>(</Plain>
          <Str>"product"</Str>
          <Plain>) \</Plain>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Plain>    .</Plain>
          <Method>orderBy</Method>
          <Plain>(</Plain>
          <Str>"date"</Str>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 9,
      content: <Comment># Reuse it multiple times</Comment>,
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Method>df</Method>
          <Plain> = sales_data.</Plain>
          <Method>select</Method>
          <Plain>(</Plain>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: (
        <>
          <Plain>    </Plain>
          <Str>"product"</Str>
          <Plain>,</Plain>
        </>
      ),
    },
    {
      lineNumber: 12,
      content: (
        <>
          <Plain>    </Plain>
          <Method>sum</Method>
          <Plain>(</Plain>
          <Str>"sales"</Str>
          <Plain>).</Plain>
          <Method>over</Method>
          <Plain>(window).</Plain>
          <Method>alias</Method>
          <Plain>(</Plain>
          <Str>"total"</Str>
          <Plain>),</Plain>
        </>
      ),
    },
    {
      lineNumber: 13,
      content: (
        <>
          <Plain>    </Plain>
          <Method>avg</Method>
          <Plain>(</Plain>
          <Str>"sales"</Str>
          <Plain>).</Plain>
          <Method>over</Method>
          <Plain>(window).</Plain>
          <Method>alias</Method>
          <Plain>(</Plain>
          <Str>"avg"</Str>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 14,
      content: <Plain>)</Plain>,
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="3/5"
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
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        PYSPARK WINDOW SPECIFICATIONS
      </h2>

      {/* Description */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 17,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 15,
          lineHeight: 1.4,
        }}
      >
        Store window spec in a variable and pass it to multiple aggregations
      </p>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
