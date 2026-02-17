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

export const Slide3_Example: React.FC = () => {
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
        EXAMPLE
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Method>import</Method>
          <Plain> ipywidgets </Plain>
          <Method>as</Method>
          <Plain> widgets</Plain>
        </>
      ),
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>from</Method>
          <Plain> IPython.display </Plain>
          <Method>import</Method>
          <Plain> display</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 4,
      content: <Comment># Create slider and output area</Comment>,
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Method>slider</Method>
          <Plain> = widgets.</Plain>
          <Method>IntSlider</Method>
          <Plain>(</Plain>
          <Method>value</Method>
          <Plain>=50, </Plain>
          <Method>min</Method>
          <Plain>=0, </Plain>
          <Method>max</Method>
          <Plain>=100)</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Method>output</Method>
          <Plain> = widgets.</Plain>
          <Method>Output</Method>
          <Plain>()</Plain>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 8,
      content: <Comment># React to changes</Comment>,
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Method>def</Method>
          <Plain> </Plain>
          <Method>on_change</Method>
          <Plain>(change):</Plain>
        </>
      ),
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Plain>    </Plain>
          <Method>with</Method>
          <Plain> output:</Plain>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: (
        <>
          <Plain>        output.</Plain>
          <Method>clear_output</Method>
          <Plain>()</Plain>
        </>
      ),
    },
    {
      lineNumber: 12,
      content: (
        <>
          <Plain>        </Plain>
          <Method>print</Method>
          <Plain>(</Plain>
          <Str>f"Value: </Str>
          <Plain>{"{"}change[</Plain>
          <Str>'new'</Str>
          <Plain>]{"}"}</Plain>
          <Str>"</Str>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 13,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 14,
      content: (
        <>
          <Plain>slider.</Plain>
          <Method>observe</Method>
          <Plain>(on_change, </Plain>
          <Method>names</Method>
          <Plain>=</Plain>
          <Str>'value'</Str>
          <Plain>)</Plain>
        </>
      ),
    },
    {
      lineNumber: 15,
      content: (
        <>
          <Method>display</Method>
          <Plain>(slider, output)</Plain>
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
        INTERACTIVE SLIDER WITH CALLBACK
      </h2>

      {/* Description */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 16,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 12,
          lineHeight: 1.4,
        }}
      >
        Use observe() to react to widget changes in real-time
      </p>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
