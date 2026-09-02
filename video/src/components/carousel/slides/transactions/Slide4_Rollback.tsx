import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";
import {
  CarouselCodeBlock,
  Comment,
  Plain,
  Str,
  Keyword,
} from "../../CarouselCodeBlock";

export const Slide4_Rollback: React.FC = () => {
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
          fontSize: 72,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        THE
        <br />
        PROOF
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
          <Comment>-- These two succeed...</Comment>
        </>
      ),
    },
    {
      lineNumber: 3,
      content: (
        <>
          <Plain>{"\u00A0\u00A0"}</Plain>
          <Keyword>INSERT INTO</Keyword>
          <Plain> transfer_log </Plain>
          <Keyword>VALUES</Keyword>
          <Plain> (</Plain>
          <Str>2</Str>
          <Plain>, </Plain>
          <Str>1</Str>
          <Plain>, </Plain>
          <Str>5000.00</Str>
          <Plain>, now());</Plain>
        </>
      ),
    },
    {
      lineNumber: 4,
      content: (
        <>
          <Plain>{"\u00A0\u00A0"}</Plain>
          <Keyword>UPDATE</Keyword>
          <Plain> accounts </Plain>
          <Keyword>SET</Keyword>
          <Plain> balance = balance + </Plain>
          <Str>5000.00</Str>
          <Plain> </Plain>
          <Keyword>WHERE</Keyword>
          <Plain> account_id = </Plain>
          <Str>1</Str>
          <Plain>;</Plain>
        </>
      ),
    },
    { lineNumber: 5, content: <Plain /> },
    {
      lineNumber: 6,
      content: (
        <>
          <Plain>{"\u00A0\u00A0"}</Plain>
          <Comment>-- ...then this trips CHECK (balance &gt;= 0)</Comment>
        </>
      ),
    },
    {
      lineNumber: 7,
      content: (
        <>
          <Plain>{"\u00A0\u00A0"}</Plain>
          <Keyword>UPDATE</Keyword>
          <Plain> accounts </Plain>
          <Keyword>SET</Keyword>
          <Plain> balance = balance - </Plain>
          <Str>5000.00</Str>
          <Plain> </Plain>
          <Keyword>WHERE</Keyword>
          <Plain> account_id = </Plain>
          <Str>2</Str>
          <Plain>;</Plain>
        </>
      ),
    },
    {
      lineNumber: 8,
      content: (
        <>
          <Keyword>END</Keyword>
          <Plain>;</Plain>
        </>
      ),
    },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="4/6"
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
            fontSize: 36,
            fontFamily: FONTS.display,
            fontWeight: 700,
            textTransform: "uppercase",
            margin: 0,
            marginBottom: 22,
            textAlign: "center",
          }}
        >
          THE LAST STATEMENT FAILS. WATCH THE FIRST TWO VANISH.
        </h2>

        <CarouselCodeBlock lines={codeLines} style={{ fontSize: 20 }} />

        {/* Verified aftermath */}
        <div style={{ marginTop: 22, display: "flex", gap: 16 }}>
          {[
            {
              label: "ACCOUNT 1 BALANCE",
              value: "400.00",
              note: "Credit undone",
            },
            {
              label: "LOG ROWS",
              value: "1",
              note: "Insert undone",
            },
            {
              label: "DELTA COMMITS",
              value: "0",
              note: "Nothing written",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                backgroundColor: "#F5F5F5",
                borderRadius: 12,
                padding: "16px 20px",
                borderLeft: `5px solid ${CAROUSEL_COLORS.codeString}`,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#555555",
                  letterSpacing: 1,
                  marginBottom: 4,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 30,
                  fontWeight: 700,
                  color: CAROUSEL_COLORS.textBlack,
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  color: CAROUSEL_COLORS.codeString,
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {stat.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CarouselLayout>
  );
};
