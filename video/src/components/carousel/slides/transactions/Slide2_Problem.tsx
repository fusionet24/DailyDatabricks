import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const statements = [
  {
    sql: "UPDATE accounts SET balance = balance - 100 WHERE id = 1;",
    status: "COMMITTED",
    note: "Ada is debited. Durable, on disk, irreversible.",
    ok: true,
  },
  {
    sql: "UPDATE accounts SET balance = balance + 100 WHERE id = 2;",
    status: "FAILED",
    note: "Grace never gets the money.",
    ok: false,
  },
  {
    sql: "INSERT INTO transfer_log VALUES (1, 2, 100, now());",
    status: "NEVER RAN",
    note: "No audit trail of any of it.",
    ok: false,
  },
];

export const Slide2_Problem: React.FC = () => {
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
        PROBLEM
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="2/6"
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
          THREE STATEMENTS, THREE SEPARATE COMMITS
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {statements.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#F5F5F5",
                borderRadius: 14,
                padding: "20px 24px",
                borderLeft: `5px solid ${
                  s.ok ? CAROUSEL_COLORS.codeString : CAROUSEL_COLORS.bgRed
                }`,
                display: "flex",
                alignItems: "center",
                gap: 22,
              }}
            >
              {/* Step number */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: "50%",
                  backgroundColor: CAROUSEL_COLORS.iconBgBlack,
                  color: CAROUSEL_COLORS.textWhite,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.display,
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>

              {/* SQL + note */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: FONTS.code,
                    fontSize: 19,
                    color: CAROUSEL_COLORS.textBlack,
                    marginBottom: 6,
                  }}
                >
                  {s.sql}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 17,
                    color: "#555555",
                  }}
                >
                  {s.note}
                </div>
              </div>

              {/* Status badge */}
              <div
                style={{
                  flexShrink: 0,
                  backgroundColor: s.ok
                    ? CAROUSEL_COLORS.codeString
                    : CAROUSEL_COLORS.bgRed,
                  color: CAROUSEL_COLORS.textWhite,
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontFamily: FONTS.display,
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {s.status}
              </div>
            </div>
          ))}
        </div>

        {/* Consequence banner */}
        <div
          style={{
            marginTop: 26,
            backgroundColor: CAROUSEL_COLORS.bgRed,
            borderRadius: 14,
            padding: "22px 28px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span style={{ fontSize: 34, lineHeight: 1 }}>{"\u{1F4B8}"}</span>
          <span
            style={{
              color: CAROUSEL_COLORS.textWhite,
              fontFamily: FONTS.body,
              fontSize: 23,
              fontWeight: 600,
              lineHeight: 1.35,
            }}
          >
            &pound;100 left one account and reached nobody. Your tables now
            disagree, and you repair them by hand.
          </span>
        </div>
      </div>
    </CarouselLayout>
  );
};
