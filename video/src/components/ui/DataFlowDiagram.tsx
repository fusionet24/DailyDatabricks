import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

type DataFlowDiagramProps = {
  startFrame?: number;
  style?: React.CSSProperties;
};

export const DataFlowDiagram: React.FC<DataFlowDiagramProps> = ({
  startFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation progress for each element
  const pipelineProgress = spring({ frame, fps, delay: startFrame, config: { damping: 200 } });
  const arrow1Progress = spring({ frame, fps, delay: startFrame + 15, config: { damping: 200 } });
  const metadataProgress = spring({ frame, fps, delay: startFrame + 30, config: { damping: 12, stiffness: 170 } });
  const arrow2Progress = spring({ frame, fps, delay: startFrame + 45, config: { damping: 200 } });
  const deltaProgress = spring({ frame, fps, delay: startFrame + 60, config: { damping: 200 } });

  const boxStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 30px",
    borderRadius: 12,
    fontFamily: FONTS.heading,
    fontWeight: 600,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        ...style,
      }}
    >
      {/* Data Pipeline */}
      <div
        style={{
          ...boxStyle,
          backgroundColor: COLORS.accent2,
          color: "white",
          opacity: pipelineProgress,
          transform: `scale(${interpolate(pipelineProgress, [0, 1], [0.8, 1])})`,
          fontSize: 20,
        }}
      >
        <span style={{ fontSize: 36, marginBottom: 8 }}>{"{ }"}</span>
        Data Pipeline
      </div>

      {/* Arrow 1 */}
      <svg width="60" height="30" style={{ opacity: arrow1Progress }}>
        <defs>
          <marker id="arrowhead1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.textGray} />
          </marker>
        </defs>
        <line
          x1="0"
          y1="15"
          x2={interpolate(arrow1Progress, [0, 1], [0, 45])}
          y2="15"
          stroke={COLORS.textGray}
          strokeWidth="3"
          markerEnd="url(#arrowhead1)"
        />
      </svg>

      {/* Metadata Badge */}
      <div
        style={{
          ...boxStyle,
          backgroundColor: COLORS.primary,
          color: "white",
          opacity: metadataProgress,
          transform: `scale(${interpolate(metadataProgress, [0, 1], [0.5, 1])})`,
          fontSize: 18,
          boxShadow: `0 0 20px ${COLORS.primary}50`,
        }}
      >
        <span style={{ fontSize: 28, marginBottom: 8 }}>+</span>
        userMetadata
      </div>

      {/* Arrow 2 */}
      <svg width="60" height="30" style={{ opacity: arrow2Progress }}>
        <defs>
          <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.textGray} />
          </marker>
        </defs>
        <line
          x1="0"
          y1="15"
          x2={interpolate(arrow2Progress, [0, 1], [0, 45])}
          y2="15"
          stroke={COLORS.textGray}
          strokeWidth="3"
          markerEnd="url(#arrowhead2)"
        />
      </svg>

      {/* Delta Table */}
      <div
        style={{
          ...boxStyle,
          backgroundColor: COLORS.accent1,
          color: "white",
          opacity: deltaProgress,
          transform: `scale(${interpolate(deltaProgress, [0, 1], [0.8, 1])})`,
          fontSize: 20,
        }}
      >
        <span style={{ fontSize: 36, marginBottom: 8 }}></span>
        Delta Table
      </div>
    </div>
  );
};
