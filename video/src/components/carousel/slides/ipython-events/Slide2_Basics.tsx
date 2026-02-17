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

export const Slide2_Basics: React.FC = () => {
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
        THE
        <br />
        BASICS
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: <Comment># Available IPython Events</Comment>,
    },
    {
      lineNumber: 2,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 3,
      content: (
        <>
          <Str>'pre_run_cell'</Str>
          <Plain>   </Plain>
          <Comment># Before cell execution</Comment>
        </>
      ),
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Str>'post_run_cell'</Str>
          <Plain>  </Plain>
          <Comment># After cell execution</Comment>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Str>'pre_execute'</Str>
          <Plain>    </Plain>
          <Comment># Before any code</Comment>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Str>'post_execute'</Str>
          <Plain>   </Plain>
          <Comment># After any code</Comment>
        </>
      ),
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
          fontSize: 42,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        HOOK INTO THE NOTEBOOK EXECUTION LIFECYCLE
      </h2>

      {/* Description points */}
      <div style={{ marginBottom: 30 }}>
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 20,
            fontFamily: FONTS.body,
            textAlign: "center",
            margin: 0,
            marginBottom: 16,
            lineHeight: 1.5,
          }}
        >
          IPython provides event hooks that execute code before and after cell
          execution
        </p>
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 20,
            fontFamily: FONTS.body,
            textAlign: "center",
            margin: 0,
            marginBottom: 16,
            lineHeight: 1.5,
            fontWeight: 600,
          }}
        >
          Cross-Language Support: Events registered in Python work for SQL,
          Scala, and R cells too!
        </p>
      </div>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
