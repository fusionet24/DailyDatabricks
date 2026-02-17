import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import { SplitLayout } from "../../ui/SplitLayout";

const lineMagics = [
  "%alias", "%cd", "%clear", "%debug", "%env", "%gui",
  "%hist", "%load", "%ls", "%lsmagic", "%macro", "%pip",
  "%pwd", "%run", "%save", "%time", "%who"
];

const cellMagics = [
  "%%bash", "%%capture", "%%html", "%%javascript",
  "%%markdown", "%%python", "%%script", "%%time"
];

export const ListMagics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, delay: 20, config: { damping: 200 } });
  const lineProgress = spring({ frame, fps, delay: 50, config: { damping: 200 } });
  const cellProgress = spring({ frame, fps, delay: 100, config: { damping: 200 } });
  const tipProgress = spring({ frame, fps, delay: 150, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["LIST ALL", "YOUR", "MAGICS", "AVAILABLE"]}
      pageNumber="3/5"
      darkContent={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 24,
        }}
      >
        {/* Code window showing %lsmagic */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            overflow: "hidden",
            opacity: headerProgress,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              borderBottom: `1px solid ${COLORS.bgDark}`,
            }}
          >
            <span style={{ fontSize: 14 }}></span>
            <span style={{ color: "#4CAF50", fontSize: 14 }}></span>
            <span style={{ fontFamily: FONTS.code, fontSize: 12, color: COLORS.textGray }}>
              10:01 PM (1s)
            </span>
            <span style={{ marginLeft: "auto", fontFamily: FONTS.code, fontSize: 12, color: COLORS.textGray }}>
              Python
            </span>
          </div>

          {/* %lsmagic command */}
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${COLORS.bgDark}` }}>
            <span style={{ fontFamily: FONTS.code, fontSize: 20, color: COLORS.primary, fontWeight: 600 }}>
              %lsmagic
            </span>
          </div>

          {/* Output */}
          <div style={{ padding: 20 }}>
            {/* Line magics */}
            <div
              style={{
                opacity: lineProgress,
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 14,
                  color: COLORS.textGray,
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Available line magics:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {lineMagics.map((magic, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: FONTS.code,
                      fontSize: 13,
                      color: COLORS.codeKeyword,
                      backgroundColor: `${COLORS.codeKeyword}15`,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {magic}
                  </span>
                ))}
              </div>
            </div>

            {/* Cell magics */}
            <div style={{ opacity: cellProgress }}>
              <p
                style={{
                  fontFamily: FONTS.code,
                  fontSize: 14,
                  color: COLORS.textGray,
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Available cell magics:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cellMagics.map((magic, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: FONTS.code,
                      fontSize: 13,
                      color: COLORS.codeFunction,
                      backgroundColor: `${COLORS.codeFunction}15`,
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {magic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            opacity: tipProgress,
            transform: `translateY(${interpolate(tipProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 18,
              color: COLORS.textLight,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            You can list magics available using <span style={{ color: COLORS.primary, fontWeight: 600 }}>%lsmagic</span>
          </p>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              color: COLORS.textGray,
              margin: 0,
              marginTop: 12,
              lineHeight: 1.6,
            }}
          >
            Unlock different use cases from python logging, to native perl execution, environment variables, and more.
          </p>
        </div>
      </div>
    </SplitLayout>
  );
};
