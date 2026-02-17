import React from "react";
import { Img, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type LogoProps = {
  size?: number;
  delay?: number;
  animate?: boolean;
  style?: React.CSSProperties;
};

export const Logo: React.FC<LogoProps> = ({
  size = 80,
  delay = 0,
  animate = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity = 1;
  let scale = 1;

  if (animate) {
    const progress = spring({
      frame,
      fps,
      delay,
      config: { damping: 200 },
    });
    opacity = progress;
    scale = interpolate(progress, [0, 1], [0.8, 1]);
  }

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      <Img
        src={staticFile("logo.jpg")}
        style={{
          width: size,
          height: "auto",
          borderRadius: 8,
        }}
      />
    </div>
  );
};
