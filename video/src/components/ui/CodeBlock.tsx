import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

type CodeLine = {
  content: string;
  indent?: number;
  highlight?: { start: number; end: number; color?: string };
};

type CodeBlockProps = {
  lines: CodeLine[];
  startFrame?: number;
  framesPerChar?: number;
  lineDelay?: number;
  showLineNumbers?: boolean;
  style?: React.CSSProperties;
};

// Simple syntax highlighting
const highlightSyntax = (code: string): React.ReactNode[] => {
  const patterns = [
    { regex: /(#.*$)/gm, color: COLORS.codeComment }, // Comments
    { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, color: COLORS.codeString }, // Strings
    { regex: /\b(def|class|import|from|return|if|else|for|while|try|except|with|as|True|False|None)\b/g, color: COLORS.codeKeyword }, // Keywords
    { regex: /\b(json|spark|df|datetime)\b/g, color: COLORS.codeVariable }, // Variables
    { regex: /\.(\w+)\(/g, color: COLORS.codeFunction }, // Methods
  ];

  let result = code;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  // For simplicity, just return styled spans
  // In production, use a proper tokenizer
  const parts = code.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g);

  return parts.map((part, i) => {
    if (part.startsWith('"') || part.startsWith("'")) {
      return <span key={i} style={{ color: COLORS.codeString }}>{part}</span>;
    }

    // Highlight keywords
    const keywordRegex = /\b(def|class|import|from|return|if|else|for|while|try|except|with|as|True|False|None|format|option|mode|write|dumps)\b/g;
    const funcRegex = /\.(\w+)(?=\()/g;

    let highlighted = part;

    return (
      <span key={i}>
        {part.split(/(\.\w+\(|\.|\(|\)|,|\s+)/).map((segment, j) => {
          if (segment.match(/^(format|option|mode|write|dumps|saveAsTable|append|set|isoformat|filter|count|select|distinct|isNull|col)$/)) {
            return <span key={j} style={{ color: COLORS.codeFunction }}>{segment}</span>;
          }
          if (segment.match(/^(def|class|import|from|return|if|else|for|while|try|except|with|as|True|False|None|delta|json|spark|df|datetime|pipeline_metadata|quality_metadata|audit_metadata)$/)) {
            return <span key={j} style={{ color: COLORS.codeKeyword }}>{segment}</span>;
          }
          if (segment.match(/^(userMetadata)$/)) {
            return <span key={j} style={{ color: COLORS.primary, fontWeight: "bold" }}>{segment}</span>;
          }
          return <span key={j}>{segment}</span>;
        })}
      </span>
    );
  });
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  lines,
  startFrame = 0,
  framesPerChar = 1,
  lineDelay = 15,
  showLineNumbers = false,
  style = {},
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        backgroundColor: COLORS.codeBg,
        borderRadius: 12,
        padding: "24px 32px",
        fontFamily: FONTS.code,
        fontSize: 24,
        lineHeight: 1.6,
        ...style,
      }}
    >
      {lines.map((line, lineIndex) => {
        const lineStartFrame = startFrame + lineIndex * lineDelay;
        const totalChars = line.content.length;
        const charsToShow = Math.floor(
          Math.max(0, frame - lineStartFrame) / framesPerChar
        );
        const displayContent = line.content.slice(0, Math.min(charsToShow, totalChars));
        const indent = line.indent || 0;

        const opacity = interpolate(
          frame,
          [lineStartFrame, lineStartFrame + 5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        return (
          <div
            key={lineIndex}
            style={{
              opacity,
              paddingLeft: indent * 24,
              color: COLORS.textLight,
              minHeight: "1.6em",
            }}
          >
            {showLineNumbers && (
              <span style={{ color: COLORS.codeComment, marginRight: 16, userSelect: "none" }}>
                {String(lineIndex + 1).padStart(2, " ")}
              </span>
            )}
            {highlightSyntax(displayContent)}
          </div>
        );
      })}
    </div>
  );
};
