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

export const Slide5_NotebookTimeout: React.FC = () => {
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
        NOTEBOOK
        <br />
        TIMEOUT
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: <Comment># Default: 2.5 hours (9000s)</Comment>,
    },
    {
      lineNumber: 2,
      content: <Comment># Set custom timeout in seconds</Comment>,
    },
    {
      lineNumber: 3,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Method>spark</Method>
          <Plain>.</Plain>
          <Method>conf</Method>
          <Plain>.</Plain>
          <Method>set</Method>
          <Plain>(</Plain>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Plain>    </Plain>
          <Str>"spark.databricks.execution.timeout"</Str>
          <Plain>,</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>    </Plain>
          <Str>"14400s"</Str>
          <Plain>  </Plain>
          <Comment># 4 hours</Comment>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: <Plain>)</Plain>,
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="5/6"
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
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        CONTROL LONG-RUNNING QUERIES
      </h2>

      {/* Description */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 20,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 30,
          lineHeight: 1.5,
        }}
      >
        Serverless notebooks have a default execution timeout of{" "}
        <span style={{ fontWeight: 700 }}>2.5 hours</span>. You can manually
        set the timeout length by configuring a Spark property.
      </p>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />

      {/* Tip callout */}
      <div
        style={{
          backgroundColor: "#E8F5E9",
          borderLeft: `6px solid #4CAF50`,
          borderRadius: 8,
          padding: "16px 24px",
          marginTop: 24,
        }}
      >
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 18,
            fontFamily: FONTS.body,
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 700 }}>Tip: </span>
          This also works for serverless jobs. See the Spark properties
          documentation for more options.
        </p>
      </div>
    </CarouselLayout>
  );
};
