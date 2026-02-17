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

export const Slide2_SQL: React.FC = () => {
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
        SQL
        <br />
        SYNTAX
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: <Comment>-- Syntax</Comment>,
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>WINDOW</Method>
          <Plain> {"{"}</Plain>
          <Str>window_name</Str>
          <Plain> </Plain>
          <Method>AS</Method>
          <Plain> </Plain>
          <Str>window_spec</Str>
          <Plain>{"}"} [, ...]</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 4,
      content: <Comment>-- Example</Comment>,
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Method>SELECT</Method>
          <Plain> product,</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>       </Plain>
          <Method>SUM</Method>
          <Plain>(sales) </Plain>
          <Method>OVER</Method>
          <Plain> monthly_window </Plain>
          <Method>AS</Method>
          <Plain> monthly_sales,</Plain>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Plain>       </Plain>
          <Method>AVG</Method>
          <Plain>(sales) </Plain>
          <Method>OVER</Method>
          <Plain> monthly_window </Plain>
          <Method>AS</Method>
          <Plain> avg_sales</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Method>FROM</Method>
          <Plain> sales_data</Plain>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Method>WINDOW</Method>
          <Plain> monthly_window </Plain>
          <Method>AS</Method>
          <Plain> (</Plain>
        </>
      ),
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Plain>    </Plain>
          <Method>PARTITION BY</Method>
          <Plain> product </Plain>
          <Method>ORDER BY</Method>
          <Plain> date</Plain>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: <Plain>)</Plain>,
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="2/5"
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
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        NAMED WINDOW SPECIFICATIONS IN SQL
      </h2>

      {/* Description */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 18,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        Define your window spec once with the WINDOW clause, then reference it
        by name
      </p>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
