import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

const rules = [
  {
    icon: "\u{1F513}",
    title: "Turn on catalog commits",
    description:
      "delta.feature.catalogManaged = 'supported' on every table you write to.",
  },
  {
    icon: "\u{1F6AB}",
    title: "No DDL inside",
    description:
      "CREATE, ALTER and DROP run outside the transaction. So does time travel.",
  },
  {
    icon: "\u{1F3AF}",
    title: "Prefer BEGIN ATOMIC",
    description:
      "Row-level conflict detection and automatic rollback. No open session to leak.",
  },
  {
    icon: "\u{1F504}",
    title: "Build retry logic",
    description:
      "Commits are optimistic. Conflicts surface at commit time and the loser fails.",
  },
  {
    icon: "\u{1F4F8}",
    title: "Reads are repeatable",
    description:
      "First touch pins a snapshot. Later reads ignore everyone else's commits.",
  },
  {
    icon: "\u{23F1}\u{FE0F}",
    title: "Know the ceilings",
    description:
      "100 tables per transaction. Everything rolls back after 48 hours.",
  },
];

export const Slide5_Rules: React.FC = () => {
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
        RULES
      </h2>
    </div>
  );

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="5/6"
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
            marginBottom: 28,
            textAlign: "center",
          }}
        >
          SIX THINGS TO GET RIGHT
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
          }}
        >
          {rules.map((rule) => (
            <div
              key={rule.title}
              style={{
                width: "calc(50% - 9px)",
                backgroundColor: "#F5F5F5",
                borderRadius: 16,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                borderLeft: `5px solid ${CAROUSEL_COLORS.bgRed}`,
              }}
            >
              <span style={{ fontSize: 30, lineHeight: 1 }}>{rule.icon}</span>
              <span
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 22,
                  fontFamily: FONTS.body,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {rule.title}
              </span>
              <span
                style={{
                  color: "#555555",
                  fontSize: 17,
                  fontFamily: FONTS.body,
                  fontWeight: 400,
                  lineHeight: 1.35,
                }}
              >
                {rule.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CarouselLayout>
  );
};
