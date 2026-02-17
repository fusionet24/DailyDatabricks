import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  useSpring?: boolean;
  style?: React.CSSProperties;
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 20,
  useSpring: useSpringAnimation = false,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let opacity: number;

  if (useSpringAnimation) {
    opacity = spring({
      frame,
      fps,
      delay,
      config: { damping: 200 },
    });
  } else {
    opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  return (
    <div
      style={{
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
