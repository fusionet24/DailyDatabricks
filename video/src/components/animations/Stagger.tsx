import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

type StaggerProps = {
  children: React.ReactNode[];
  delayPerItem?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  startDelay?: number;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
};

export const Stagger: React.FC<StaggerProps> = ({
  children,
  delayPerItem = 8,
  direction = "up",
  distance = 30,
  startDelay = 0,
  style = {},
  itemStyle = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getTransform = (offset: number) => {
    switch (direction) {
      case "up":
        return `translateY(${offset}px)`;
      case "down":
        return `translateY(${-offset}px)`;
      case "left":
        return `translateX(${-offset}px)`;
      case "right":
        return `translateX(${offset}px)`;
    }
  };

  return (
    <div style={style}>
      {React.Children.map(children, (child, i) => {
        const progress = spring({
          frame,
          fps,
          delay: startDelay + i * delayPerItem,
          config: { damping: 200 },
        });

        const offset = interpolate(progress, [0, 1], [distance, 0]);

        return (
          <div
            key={i}
            style={{
              opacity: progress,
              transform: getTransform(offset),
              ...itemStyle,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
