import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

type SplitLayoutProps = {
  // Left sidebar content
  sidebarTitle: string[];  // Array of lines for multi-line title
  pageNumber?: string;

  // Right content
  children: React.ReactNode;

  // Optional customization
  sidebarWidth?: number;  // Percentage
  darkContent?: boolean;  // Dark or light right panel
};

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  sidebarTitle,
  pageNumber,
  children,
  sidebarWidth = 25,
  darkContent = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sidebarProgress = spring({
    frame,
    fps,
    delay: 0,
    config: { damping: 200 },
  });

  const contentProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Red Sidebar */}
      <div
        style={{
          width: `${sidebarWidth}%`,
          backgroundColor: COLORS.socialCardRed,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
          position: "relative",
          opacity: sidebarProgress,
          transform: `translateX(${interpolate(sidebarProgress, [0, 1], [-50, 0])}px)`,
        }}
      >
        {/* Multi-line title */}
        <div style={{ textAlign: "center" }}>
          {sidebarTitle.map((line, i) => {
            const lineProgress = spring({
              frame,
              fps,
              delay: 15 + i * 8,
              config: { damping: 200 },
            });

            return (
              <h2
                key={i}
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 72,
                  fontWeight: 700,
                  color: "white",
                  textTransform: "uppercase",
                  lineHeight: 1.0,
                  margin: 0,
                  textShadow: "0px 2px 10px rgba(0,0,0,0.2)",
                  opacity: lineProgress,
                  transform: `translateY(${interpolate(lineProgress, [0, 1], [20, 0])}px)`,
                }}
              >
                {line}
              </h2>
            );
          })}
        </div>

        {/* Bottom section with page number and branding */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            right: 40,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Newsletter CTA */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: "white",
                opacity: 0.9,
                margin: 0,
                marginBottom: 4,
              }}
            >
              Sign Up to the newsletter
            </p>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: "white",
                fontWeight: 600,
                margin: 0,
              }}
            >
              @ databricks.news
            </p>
          </div>

          {/* Tips link */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: "white",
                opacity: 0.9,
                margin: 0,
                marginBottom: 4,
              }}
            >
              Find more databricks tips @
            </p>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: "white",
                fontWeight: 600,
                margin: 0,
              }}
            >
              dailydatabricks.tips
            </p>
          </div>

          {/* Page number and branding */}
          {pageNumber && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 16,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {pageNumber}
              </span>
              <Img
                src={staticFile("databricks-news-white.png")}
                style={{ height: 24 }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: darkContent ? COLORS.bgDark : COLORS.bgLight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
          opacity: contentProgress,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
