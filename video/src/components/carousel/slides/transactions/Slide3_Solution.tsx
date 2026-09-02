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

export const Slide3_Solution: React.FC = () => {
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
          fontSize: 78,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        THE
        <br />
        FIX
      </h2>
    </div>
  );

  const codeLines = [
    {
      lineNumber: 1,
      content: (
        <>
          <Keyword>BEGIN ATOMIC</Keyword>
        </>
      ),
    },
    {
      lineNumber: 2,
      content: (
        <>
          <Plain>{"\u00A0\u00A0"}</Plain>
          <Keyword>UPDATE</Keyword>
          <Plain> accounts </Plain>
          <Keyword>SET</Keyword>
          <Plain> balance = balance - </Plain>
          <Str>100.00</Str>
          <Plain> </Plain>
          <Keyword>WHERE</Keyword>
          <Plain> account_id = </Plain>
          <Str>1</Str>
          <Plain>;</Plain>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: (
        <>
          <Plain>{"\u00A0\u00A0"}</Plain>
          <Keyword>UPDATE</Keyword>
          <Plain> accounts </Plain>
          <Keyword>SET</Keyword>
          <Plain> balance = balance + </Plain>
          <Str>100.00</Str>
          <Plain> </Plain>
          <Keyword>WHERE</Keyword>
          <Plain> account_id = </Plain>
          <Str>2</Str>
          <Plain>;</Plain>
        </>
      ),
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Plain>{"\u00A0\u00A0"}</Plain>
          <Keyword>INSERT INTO</Keyword>
          <Plain> transfer_log</Plain>
        </>
      ),
    },
    {
      lineNumber: 5,
      content: (
        <>
          <Plain>{"\u00A0\u00A0\u00A0\u00A0"}</Plain>
          <Keyword>VALUES</Keyword>
          <Plain> (</Plain>
          <Str>1</Str>
          <Plain>, </Plain>
          <Str>2</Str>
          <Plain>, </Plain>
          <Str>100.00</Str>
          <Plain>, </Plain>
          <Method>current_timestamp</Method>
          <Plain>());</Plain>
        </>
      ),
    },
    {
      lineNumber: 6,
      content: (
        <>
          <Keyword>END</Keyword>
          <Plain>;</Plain>
        </>
      ),
    },
    { lineNumber: 7, content: <Plain /> },
    {
      lineNumber: 8,
      content: (
        <>
          <Comment>-- Two tables. One commit. One Delta log entry.</Comment>
        </>
      ),
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="3/6"
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: 50,
        }}
      >
        <h2
          style={{
            color: CAROUSEL_COLORS.bgRed,
            fontSize: 38,
            fontFamily: FONTS.display,
            fontWeight: 700,
            textTransform: "uppercase",
            margin: 0,
            marginBottom: 26,
            textAlign: "center",
          }}
        >
          WRAP THEM AND THEY MOVE AS ONE
        </h2>

        <CarouselCodeBlock lines={codeLines} />

        {/* Prerequisite strip */}
        <div
          style={{
            marginTop: 26,
            display: "flex",
            gap: 16,
          }}
        >
          {[
            { label: "UC MANAGED TABLES", icon: "\u{1F5C4}\u{FE0F}" },
            { label: "CATALOG COMMITS ON", icon: "\u{2705}" },
            { label: "DBR 18.0+ OR SQL WAREHOUSE", icon: "\u{26A1}" },
          ].map((p) => (
            <div
              key={p.label}
              style={{
                flex: 1,
                backgroundColor: "#F5F5F5",
                borderRadius: 12,
                padding: "16px 18px",
                borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{p.icon}</span>
              <span
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontFamily: FONTS.display,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CarouselLayout>
  );
};
