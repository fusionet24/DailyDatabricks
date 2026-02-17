import React from "react";
import { useCurrentFrame } from "remotion";

type TypewriterTextProps = {
  text: string;
  startFrame?: number;
  framesPerChar?: number;
  style?: React.CSSProperties;
  showCursor?: boolean;
  cursorColor?: string;
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  framesPerChar = 2,
  style = {},
  showCursor = true,
  cursorColor = "#E63946",
}) => {
  const frame = useCurrentFrame();

  const charactersToShow = Math.floor(
    Math.max(0, frame - startFrame) / framesPerChar
  );
  const displayText = text.slice(0, charactersToShow);
  const isComplete = charactersToShow >= text.length;
  const showBlinkingCursor = showCursor && !isComplete;

  // Cursor blinks every 15 frames
  const cursorVisible = showBlinkingCursor && Math.floor(frame / 15) % 2 === 0;

  return (
    <span style={style}>
      {displayText}
      {cursorVisible && (
        <span
          style={{
            backgroundColor: cursorColor,
            width: "3px",
            height: "1.2em",
            display: "inline-block",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
          }}
        />
      )}
    </span>
  );
};
