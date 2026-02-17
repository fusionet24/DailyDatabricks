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

export const Slide3_Examples: React.FC = () => {
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
          fontSize: 90,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        CODE
      </h2>
    </div>
  );

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
      content: <Comment># Fast non-cryptographic (best for performance)</Comment>,
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Plain>df.</Plain>
          <Method>withColumn</Method>
          <Plain>(</Plain>
          <Str>"hash"</Str>
          <Plain>, </Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>xxhash64</Method>
          <Plain>(*df.columns))</Plain>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 6,
      content: <Comment># Standard hash function</Comment>,
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Plain>df.</Plain>
          <Method>withColumn</Method>
          <Plain>(</Plain>
          <Str>"hash"</Str>
          <Plain>, </Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>hash</Method>
          <Plain>(*df.columns))</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 9,
      content: <Comment># Cryptographic hashes (for fingerprinting)</Comment>,
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Plain>df.</Plain>
          <Method>withColumn</Method>
          <Plain>(</Plain>
          <Str>"hash"</Str>
          <Plain>, </Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>md5</Method>
          <Plain>(</Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>concat</Method>
          <Plain>(*df.columns)))</Plain>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: (
        <>
          <Plain>df.</Plain>
          <Method>withColumn</Method>
          <Plain>(</Plain>
          <Str>"hash"</Str>
          <Plain>, </Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>sha1</Method>
          <Plain>(</Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>concat</Method>
          <Plain>(*df.columns)))</Plain>
        </>
      ),
    },
    {
      lineNumber: 12,
      content: (
        <>
          <Plain>df.</Plain>
          <Method>withColumn</Method>
          <Plain>(</Plain>
          <Str>"hash"</Str>
          <Plain>, </Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>sha2</Method>
          <Plain>(</Plain>
          <Method>F</Method>
          <Plain>.</Plain>
          <Method>concat</Method>
          <Plain>(*df.columns), </Plain>
          <Method>256</Method>
          <Plain>))</Plain>
        </>
      ),
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
          fontSize: 36,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        HASH ALL COLUMNS IN YOUR DATAFRAME
      </h2>

      {/* Description */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 16,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 15,
          lineHeight: 1.4,
        }}
      >
        Use df.columns or df.schema.names to hash all columns dynamically
      </p>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
