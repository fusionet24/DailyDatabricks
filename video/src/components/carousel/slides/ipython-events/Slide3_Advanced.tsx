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

export const Slide3_Advanced: React.FC = () => {
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
        USE
        <br />
        CASE
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: <Comment># Auto-track DataFrame counts</Comment>,
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>def</Method>
          <Plain> </Plain>
          <Method>inspect_dataframes</Method>
          <Plain>(ns):</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: (
        <>
          <Plain>    </Plain>
          <Method>for</Method>
          <Plain> name, obj </Plain>
          <Method>in</Method>
          <Plain> ns.items():</Plain>
        </>
      ),
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Plain>        </Plain>
          <Method>if</Method>
          <Plain> </Plain>
          <Method>isinstance</Method>
          <Plain>(obj, DataFrame):</Plain>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Plain>            </Plain>
          <Method>print</Method>
          <Plain>(</Plain>
          <Str>f"</Str>
          <Plain>{"{"}name{"}"}</Plain>
          <Str>: </Str>
          <Plain>{"{"}obj.count(){"}"}</Plain>
          <Str> rows"</Str>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Method>def</Method>
          <Plain> </Plain>
          <Method>post_counts</Method>
          <Plain>(info):</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Plain>    </Plain>
          <Method>inspect_dataframes</Method>
          <Plain>(</Plain>
          <Method>globals</Method>
          <Plain>())</Plain>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Method>ipython</Method>
          <Plain>.</Plain>
          <Method>events</Method>
          <Plain>.</Plain>
          <Method>register</Method>
          <Plain>(</Plain>
          <Str>'post_run_cell'</Str>
          <Plain>, post_counts)</Plain>
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
          fontSize: 38,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        AUTOMATIC DATAFRAME VALIDATION
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
        Automatically track DataFrame row counts before and after every cell
        execution
      </p>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
