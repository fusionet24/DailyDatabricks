import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../lib/constants";
import { FONTS } from "../../lib/fonts";

type TableRow = {
  version: string;
  timestamp: string;
  operation: string;
  userMetadata: string;
};

type ResultsTableProps = {
  rows: TableRow[];
  startFrame?: number;
  rowDelay?: number;
  style?: React.CSSProperties;
};

export const ResultsTable: React.FC<ResultsTableProps> = ({
  rows,
  startFrame = 0,
  rowDelay = 20,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, delay: startFrame, config: { damping: 200 } });

  const cellStyle: React.CSSProperties = {
    padding: "14px 20px",
    fontFamily: FONTS.code,
    fontSize: 16,
    borderBottom: `1px solid ${COLORS.bgLightSecondary}`,
  };

  const headerStyle: React.CSSProperties = {
    ...cellStyle,
    fontFamily: FONTS.heading,
    fontWeight: 700,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: COLORS.textGray,
    backgroundColor: COLORS.bgLightSecondary,
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        ...style,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ opacity: headerProgress }}>
            <th style={headerStyle}>Version</th>
            <th style={headerStyle}>Timestamp</th>
            <th style={headerStyle}>Operation</th>
            <th style={{ ...headerStyle, color: COLORS.primary }}>userMetadata</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const rowProgress = spring({
              frame,
              fps,
              delay: startFrame + 15 + i * rowDelay,
              config: { damping: 200 },
            });
            const translateX = interpolate(rowProgress, [0, 1], [30, 0]);

            return (
              <tr
                key={i}
                style={{
                  opacity: rowProgress,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                <td style={cellStyle}>{row.version}</td>
                <td style={cellStyle}>{row.timestamp}</td>
                <td style={cellStyle}>{row.operation}</td>
                <td
                  style={{
                    ...cellStyle,
                    color: COLORS.primary,
                    fontWeight: 500,
                    maxWidth: 300,
                  }}
                >
                  {row.userMetadata}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
