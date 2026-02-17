import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CAROUSEL_COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

interface CarouselLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarContent?: React.ReactNode;
  pageNumber?: string;
  showFooter?: boolean;
  showArrow?: boolean;
}

export const CarouselLayout: React.FC<CarouselLayoutProps> = ({
  children,
  showSidebar = false,
  sidebarContent,
  pageNumber,
  showFooter = true,
  showArrow = true,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: CAROUSEL_COLORS.bgRed }}>
      {showSidebar ? (
        // Two-column layout (sidebar + content)
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
          {/* Red Sidebar */}
          <div
            style={{
              width: "28%",
              height: "100%",
              backgroundColor: CAROUSEL_COLORS.bgRed,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "60px 40px",
            }}
          >
            {sidebarContent}

            {/* Footer in sidebar */}
            {showFooter && (
              <div
                style={{
                  position: "absolute",
                  bottom: 40,
                  left: 40,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    color: CAROUSEL_COLORS.textWhite,
                    fontSize: 16,
                    fontFamily: FONTS.body,
                    fontWeight: 500,
                  }}
                >
                  Sign Up to the newsletter
                </span>
                <Img
                  src={staticFile("databricks-news-white.png")}
                  style={{ height: 28, width: "auto", objectFit: "contain" }}
                />
                <span
                  style={{
                    color: CAROUSEL_COLORS.textWhite,
                    fontSize: 14,
                    fontFamily: FONTS.body,
                    marginTop: 8,
                  }}
                >
                  Find more databricks tips @
                </span>
                <span
                  style={{
                    color: CAROUSEL_COLORS.textWhite,
                    fontSize: 14,
                    fontFamily: FONTS.body,
                    fontWeight: 600,
                  }}
                >
                  dailydatabricks.tips
                </span>
              </div>
            )}
          </div>

          {/* White Content Area */}
          <div
            style={{
              flex: 1,
              backgroundColor: CAROUSEL_COLORS.cardBg,
              position: "relative",
              padding: "60px 80px",
            }}
          >
            {children}

            {/* Footer with page number and logo */}
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 40,
                right: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Page Number */}
              {pageNumber && (
                <span
                  style={{
                    color: CAROUSEL_COLORS.textBlack,
                    fontSize: 20,
                    fontFamily: FONTS.body,
                    fontWeight: 500,
                  }}
                >
                  {pageNumber}
                </span>
              )}
              {/* Logo */}
              <Img
                src={staticFile("databricks-news-dark.png")}
                style={{ height: 32, width: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      ) : (
        // Full-width layout
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}

          {/* Footer */}
          {showFooter && (
            <div
              style={{
                position: "absolute",
                bottom: 30,
                left: 40,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Img
                src={staticFile("databricks-news-white.png")}
                style={{ height: 40 }}
              />
            </div>
          )}
        </div>
      )}

      {/* Navigation Arrow */}
      {showArrow && (
        <div
          style={{
            position: "absolute",
            right: 30,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke={showSidebar ? CAROUSEL_COLORS.bgRed : "white"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      )}
    </AbsoluteFill>
  );
};
