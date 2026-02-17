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
  Keyword,
} from "../CarouselCodeBlock";

export const Slide4_Implementation: React.FC = () => {
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
        MAKE
        <br />
        YOUR
        <br />
        OWN
        <br />
        DATA
        <br />
        SOURCE
      </h2>
    </div>
  );

  // Class definition preview (dark background)
  const classPreview = (
    <div
      style={{
        backgroundColor: "#2D3748",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 20,
        fontFamily: FONTS.code,
        fontSize: 16,
      }}
    >
      <div style={{ color: "#CBD5E0", marginBottom: 8 }}>
        <span style={{ color: "#F687B3" }}>class </span>
        <span style={{ color: "#68D391" }}>OpenMeteoDataSource</span>
        <span style={{ color: "#CBD5E0" }}>(</span>
        <span style={{ color: "#68D391" }}>DataSource</span>
        <span style={{ color: "#CBD5E0" }}>):</span>
      </div>
      <div style={{ color: "#718096", marginLeft: 20 }}>"""</div>
      <div style={{ color: "#718096", marginLeft: 20 }}>
        Open-Meteo weather data source for PySpark.
      </div>
      <div style={{ color: "#718096", marginLeft: 20 }}>"""</div>
      <div style={{ color: "#CBD5E0", marginTop: 12, marginLeft: 20 }}>
        <span style={{ color: "#F687B3" }}>@classmethod</span>
      </div>
      <div style={{ color: "#CBD5E0", marginLeft: 20 }}>
        <span style={{ color: "#63B3ED" }}>{">"}</span>
        <span style={{ color: "#F687B3" }}> def </span>
        <span style={{ color: "#68D391" }}>name</span>
        <span style={{ color: "#CBD5E0" }}>(cls) -{">"} str:...</span>
      </div>
      <div style={{ color: "#CBD5E0", marginLeft: 20, marginTop: 8 }}>
        <span style={{ color: "#63B3ED" }}>{">"}</span>
        <span style={{ color: "#F687B3" }}> def </span>
        <span style={{ color: "#68D391" }}>schema</span>
        <span style={{ color: "#CBD5E0" }}>(self) -{">"} str:...</span>
      </div>
      <div style={{ color: "#CBD5E0", marginLeft: 20, marginTop: 8 }}>
        <span style={{ color: "#63B3ED" }}>{">"}</span>
        <span style={{ color: "#F687B3" }}> def </span>
        <span style={{ color: "#68D391" }}>reader</span>
        <span style={{ color: "#CBD5E0" }}>
          (self, schema: StructType) -{">"} DataSourceReader:...
        </span>
      </div>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Method>import</Method>
          <Plain> openmeteo_datasource  </Plain>
          <Comment>
            # You might want to move your datasource to it's own py file
          </Comment>
        </>
      ),
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Method>from</Method>
          <Plain> pyspark.sql.datasource </Plain>
          <Method>import</Method>
          <Plain> </Plain>
          <Method>DataSource</Method>
          <Plain>, </Plain>
          <Method>DataSourceReader</Method>
          <Plain> </Plain>
          <Comment>#Import to register data sources</Comment>
        </>
      ),
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
          <Method>dataSource</Method>
          <Plain>.</Plain>
          <Method>register</Method>
          <Plain>(openmeteo_datasource.</Plain>
          <Method>OpenMeteoDataSource</Method>
          <Plain>) </Plain>
          <Comment># Register Data Source</Comment>
        </>
      ),
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
          <Plain>        .</Plain>
          <Method>format</Method>
          <Plain>(</Plain>
          <Str>"openmeteo"</Str>
          <Plain>) \</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Plain>        .</Plain>
          <Method>option</Method>
          <Plain>(</Plain>
          <Str>"latitude"</Str>
          <Plain>, </Plain>
          <Str>"52.52"</Str>
          <Plain>) \ </Plain>
          <Comment># add your own data source specific options e.g. co-ordinates</Comment>
        </>
      ),
    },
    {
      lineNumber: 9,
      content: (
        <>
          <Plain>        .</Plain>
          <Method>option</Method>
          <Plain>(</Plain>
          <Str>"longitude"</Str>
          <Plain>, </Plain>
          <Str>"13.41"</Str>
          <Plain>) \</Plain>
        </>
      ),
    },
    {
      lineNumber: 10,
      content: (
        <>
          <Plain>        .</Plain>
          <Method>option</Method>
          <Plain>(</Plain>
          <Str>"start_date"</Str>
          <Plain>, </Plain>
          <Str>"2024-01-01"</Str>
          <Plain>) \ </Plain>
          <Comment># Options that can support features like predicate pushdown or pagination</Comment>
        </>
      ),
    },
    {
      lineNumber: 11,
      content: (
        <>
          <Plain>        .</Plain>
          <Method>option</Method>
          <Plain>(</Plain>
          <Str>"end_date"</Str>
          <Plain>, </Plain>
          <Str>"2024-01-31"</Str>
          <Plain>) \</Plain>
        </>
      ),
    },
    {
      lineNumber: 12,
      content: (
        <>
          <Plain>        .</Plain>
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
      pageNumber="4/5"
    >
      {/* Class Preview */}
      {classPreview}

      {/* Subtitle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <h3
          style={{
            color: CAROUSEL_COLORS.bgRed,
            fontSize: 28,
            fontFamily: FONTS.display,
            fontWeight: 700,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          LOAD THE DATA SOURCE LIBRARY
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 16,
          fontFamily: FONTS.body,
          margin: 0,
          marginBottom: 16,
        }}
      >
        Create a Datasource for your custom data source like above. This Example
        is the Open-Meteo Weather API that provides access to high-resolution
        weather data (1-11km resolution) from national weather services
      </p>

      {/* Code Block */}
      <CarouselCodeBlock lines={codeLines} style={{ fontSize: 14 }} />
    </CarouselLayout>
  );
};
