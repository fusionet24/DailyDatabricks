import React from "react";
import { CarouselLayout } from "../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import {
  CarouselCodeBlock,
  Comment,
  Method,
  Str,
  Plain,
} from "../CarouselCodeBlock";

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
      content: (
        <Comment>
          #install the community library with pip install pyspark-data-sources
        </Comment>
      ),
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>from</Method>
          <Plain> pyspark_datasources </Plain>
          <Method>import</Method>
          <Plain> </Plain>
          <Method>GoogleSheetsDataSource</Method>
          <Plain> </Plain>
          <Comment>#Import Google Sheets</Comment>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: (
        <>
          <Method>spark</Method>
          <Plain>.</Plain>
          <Method>dataSource</Method>
          <Plain>.</Plain>
          <Method>register</Method>
          <Plain>(</Plain>
          <Method>GoogleSheetsDataSource</Method>
          <Plain>)</Plain>
          <Comment>#Register Google Sheets DataSource</Comment>
        </>
      ),
    },
    {
      lineNumber: 4,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 5,
      content: <Plain></Plain>,
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Method>df</Method>
          <Plain> = </Plain>
          <Method>spark</Method>
          <Plain>.</Plain>
          <Method>read</Method>
          <Plain> \</Plain>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Plain>    .</Plain>
          <Method>format</Method>
          <Plain>(</Plain>
          <Str>"googlesheets"</Str>
          <Plain>) \</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Plain>    .</Plain>
          <Method>options</Method>
          <Plain>(</Plain>
          <Method>url</Method>
          <Plain>=</Plain>
          <Str>"&lt;your_google_sheets_document_url&gt;"</Str>
          <Plain>) \</Plain>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Plain>    .</Plain>
          <Method>load</Method>
          <Plain>()</Plain>
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
        LOAD A CUSTOM DATA SOURCE AND REGISTER IT IN YOUR SESSION
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
          There are some great examples already available including ones that
          support the Faker library in the{" "}
          <strong>pyspark-data-sources</strong> library
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
          }}
        >
          Once you've loaded the community library, you can easily load a custom
          data source e.g. Google Sheets
        </p>
        <p
          style={{
            color: CAROUSEL_COLORS.textBlack,
            fontSize: 20,
            fontFamily: FONTS.body,
            textAlign: "center",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          These custom data sources can also leverage Spark's parallelism and
          file handling capabilities
        </p>
      </div>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} />
    </CarouselLayout>
  );
};
