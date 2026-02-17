import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS } from "../../../lib/constants";

export const RadialGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  const glowOpacity = interpolate(glowProgress, [0, 1], [0, 0.08]);
  const glowScale = interpolate(glowProgress, [0, 1], [0.5, 1.2]);

  // Subtle breathing pulse after logo is fully revealed
  const breathePhase = Math.max(0, frame - 90);
  const breatheScale =
    breathePhase > 0
      ? 1 + Math.sin((breathePhase / 60) * Math.PI * 2) * 0.03
      : 1;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 900,
        height: 900,
        marginTop: -450,
        marginLeft: -450,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 70%)`,
        opacity: glowOpacity,
        transform: `scale(${glowScale * breatheScale})`,
        pointerEvents: "none",
      }}
    />
  );
};
