import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type Direction = "left" | "right" | "up" | "down";

type SlideInProps = {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  useSpring?: boolean;
  style?: React.CSSProperties;
};

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = "up",
  delay = 0,
  distance = 50,
  useSpring: useSpringAnimation = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = useSpringAnimation
    ? spring({
        frame,
        fps,
        delay,
        config: { damping: 200 },
      })
    : interpolate(frame, [delay, delay + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const getTransform = () => {
    const offset = interpolate(progress, [0, 1], [distance, 0]);
    switch (direction) {
      case "left":
        return `translateX(${-offset}px)`;
      case "right":
        return `translateX(${offset}px)`;
      case "up":
        return `translateY(${offset}px)`;
      case "down":
        return `translateY(${-offset}px)`;
    }
  };

  return (
    <div
      style={{
        opacity: progress,
        transform: getTransform(),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
