import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";

// Deterministic particle configuration (no Math.random)
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  // Simple deterministic seeding based on index
  const angle = (i / 16) * Math.PI * 2 + (i % 3) * 0.4;
  const speed = 80 + (i * 17) % 120; // 80-200px travel distance
  const size = 4 + (i * 3) % 5; // 4-8px
  const delay = 15 + i * 3;
  const isWhite = i % 3 === 0;

  return { angle, speed, size, delay, isWhite };
});

export const FloatingParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {PARTICLES.map((particle, i) => {
        const particleFrame = Math.max(0, frame - particle.delay);
        const lifespan = 100; // frames

        if (particleFrame <= 0 || particleFrame > lifespan) return null;

        const progress = particleFrame / lifespan;
        const x = Math.cos(particle.angle) * particle.speed * progress;
        const y = Math.sin(particle.angle) * particle.speed * progress;

        const opacity = interpolate(
          progress,
          [0, 0.15, 0.7, 1],
          [0, 0.35, 0.25, 0]
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: particle.isWhite
                ? "rgba(200, 200, 200, 0.6)"
                : COLORS.primary,
              opacity,
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
            }}
          />
        );
      })}
    </div>
  );
};
