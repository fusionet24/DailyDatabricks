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

export const Slide5_Merge: React.FC = () => {
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
        MERGE
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Comment># CDC-style upsert</Comment>
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
      content: <Plain />,
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Plain>(</Plain>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Plain>  dt.</Plain>
          <Method>merge</Method>
          <Plain>(</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>    </Plain>
          <Method>source</Method>
          <Plain>=new_data,</Plain>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Plain>    </Plain>
          <Method>predicate</Method>
          <Plain>=</Plain>
          <Str>"t.product = s.product"</Str>
          <Plain>,</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Plain>    </Plain>
          <Method>source_alias</Method>
          <Plain>=</Plain>
          <Str>"s"</Str>
          <Plain>,</Plain>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Plain>    </Plain>
          <Method>target_alias</Method>
          <Plain>=</Plain>
          <Str>"t"</Str>
          <Plain>,</Plain>
        </>
      ),
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Plain>  )</Plain>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: (
        <>
          <Plain>  .</Plain>
          <Method>when_matched_update_all</Method>
          <Plain>()</Plain>
        </>
      ),
    },
    {
      lineNumber: 12,
      content: (
        <>
          <Plain>  .</Plain>
          <Method>when_not_matched_insert_all</Method>
          <Plain>()</Plain>
        </>
      ),
    },
    {
      lineNumber: 13,
      content: (
        <>
          <Plain>  .</Plain>
          <Method>execute</Method>
          <Plain>()</Plain>
        </>
      ),
    },
    {
      lineNumber: 14,
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
      pageNumber="5/6"
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
        UPSERT WITH THE MERGE API
      </h2>

      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
