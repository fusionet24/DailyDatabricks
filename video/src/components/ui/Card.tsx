import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

type CardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor?: string;
  delay?: number;
  style?: React.CSSProperties;
};

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  accentColor = COLORS.primary,
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

  const scale = interpolate(progress, [0, 1], [0.9, 1]);
  const translateX = interpolate(progress, [0, 1], [-30, 0]);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        borderLeft: `5px solid ${accentColor}`,
        opacity: progress,
        transform: `scale(${scale}) translateX(${translateX}px)`,
        width: 380,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 16,
          color: accentColor,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: 26,
          color: COLORS.textDark,
          marginBottom: 12,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          color: COLORS.textGray,
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
};
