import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type SpringScaleProps = {
  children: React.ReactNode;
  delay?: number;
  from?: number;
  to?: number;
  bouncy?: boolean;
  style?: React.CSSProperties;
};

export const SpringScale: React.FC<SpringScaleProps> = ({
  children,
  delay = 0,
  from = 0,
  to = 1,
  bouncy = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: bouncy
      ? { damping: 12, stiffness: 170 }
      : { damping: 200 },
  });

  const scale = interpolate(progress, [0, 1], [from, to]);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
