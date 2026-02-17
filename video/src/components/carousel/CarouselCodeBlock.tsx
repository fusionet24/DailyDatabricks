import React from "react";
import { CAROUSEL_COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

interface CodeLine {
  lineNumber: number;
  content: React.ReactNode;
}

interface CarouselCodeBlockProps {
  lines: CodeLine[];
  style?: React.CSSProperties;
}

export const CarouselCodeBlock: React.FC<CarouselCodeBlockProps> = ({
  lines,
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: CAROUSEL_COLORS.cardBg,
        borderRadius: 16,
        padding: "28px 36px",
        boxShadow: "0px 20px 50px rgba(0,0,0,0.25)",
        ...style,
      }}
    >
      {/* Window Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: `2px solid ${CAROUSEL_COLORS.windowDot}`,
              backgroundColor: "transparent",
            }}
          />
        ))}
      </div>

      {/* Code Lines */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {lines.map((line) => (
          <div
            key={line.lineNumber}
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 8,
              fontFamily: FONTS.code,
              fontSize: 22,
            }}
          >
            <span
              style={{
                color: CAROUSEL_COLORS.codeLineNum,
                marginRight: 20,
                userSelect: "none",
                width: 24,
                textAlign: "right",
              }}
            >
              {line.lineNumber}
            </span>
            <span>{line.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper components for syntax highlighting
export const Comment: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span style={{ color: CAROUSEL_COLORS.codeComment }}>{children}</span>;

export const Method: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <span style={{ color: CAROUSEL_COLORS.codeMethod }}>{children}</span>;

export const Str: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ color: CAROUSEL_COLORS.codeString }}>{children}</span>
);

export const Plain: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <span style={{ color: CAROUSEL_COLORS.textBlack }}>{children}</span>;

export const Keyword: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span style={{ color: CAROUSEL_COLORS.codeMethod, fontWeight: 500 }}>
    {children}
  </span>
);
