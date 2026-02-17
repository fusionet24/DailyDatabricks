import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

type BadgeProps = {
  text: string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
  style?: React.CSSProperties;
};

export const Badge: React.FC<BadgeProps> = ({
  text,
  icon,
  color = COLORS.primary,
  delay = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: "white",
        padding: "16px 28px",
        borderRadius: 50,
        boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 3px ${color}`,
        opacity: progress,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        ...style,
      }}
    >
      {icon && (
        <div style={{ color, fontSize: 28 }}>
          {icon}
        </div>
      )}
      <span
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 600,
          fontSize: 22,
          color: COLORS.textDark,
        }}
      >
        {text}
      </span>
    </div>
  );
};
