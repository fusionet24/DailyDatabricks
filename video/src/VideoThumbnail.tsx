import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CAROUSEL_COLORS } from "./lib/constants";
import { FONTS } from "./lib/fonts";

export interface VideoThumbnailProps {
  title?: string;
  subtitle?: string;
  showCode?: boolean;
  codeSnippet?: string;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  title = "YOUR TITLE HERE",
  subtitle,
  showCode = false,
  codeSnippet,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CAROUSEL_COLORS.bgRed,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* Main Title */}
      <h1
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 80,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1,
          textAlign: "center",
          maxWidth: 1100,
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            color: CAROUSEL_COLORS.textWhite,
            fontSize: 28,
            fontFamily: FONTS.body,
            fontWeight: 400,
            margin: 0,
            marginTop: 20,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 900,
            opacity: 0.9,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Code Snippet */}
      {showCode && codeSnippet && (
        <div
          style={{
            marginTop: 30,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: 8,
            padding: "16px 24px",
            maxWidth: 800,
          }}
        >
          <pre
            style={{
              color: CAROUSEL_COLORS.textWhite,
              fontSize: 20,
              fontFamily: FONTS.code,
              margin: 0,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
            }}
          >
            {codeSnippet}
          </pre>
        </div>
      )}

      {/* Logo at bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 30,
        }}
      >
        <Img
          src={staticFile("logo.jpg")}
          style={{
            height: 50,
            width: "auto",
            borderRadius: 4,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
