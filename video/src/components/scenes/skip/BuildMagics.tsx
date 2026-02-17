import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS } from "../../../lib/constants";
import { FONTS } from "../../../lib/fonts";
import { SplitLayout } from "../../ui/SplitLayout";

const steps = [
  { num: "1.", text: "IMPORT LIBRARIES" },
  { num: "2.", text: "REGISTER YOUR NEW MAGIC" },
  { num: "3.", text: "CALL YOUR NEW MAGIC" },
];

export const BuildMagics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const codeProgress = spring({ frame, fps, delay: 20, config: { damping: 200 } });
  const stepsProgress = spring({ frame, fps, delay: 80, config: { damping: 200 } });
  const descProgress = spring({ frame, fps, delay: 140, config: { damping: 200 } });

  return (
    <SplitLayout
      sidebarTitle={["BUILD", "YOUR OWN", "MAGICS"]}
      pageNumber="4/5"
      darkContent={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 24,
        }}
      >
        {/* Code example */}
        <div
          style={{
            backgroundColor: COLORS.bgDarkSecondary,
            borderRadius: 12,
            padding: 24,
            opacity: codeProgress,
            transform: `translateY(${interpolate(codeProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <pre
            style={{
              fontFamily: FONTS.code,
              fontSize: 16,
              color: COLORS.textLight,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: COLORS.codeKeyword }}>import</span> argparse{"\n"}
            <span style={{ color: COLORS.codeKeyword }}>from</span> IPython.core.magic <span style={{ color: COLORS.codeKeyword }}>import</span>{" "}
            <span style={{ color: COLORS.codeVariable }}>magics_class</span>, <span style={{ color: COLORS.codeVariable }}>Magics</span>,{" "}
            <span style={{ color: COLORS.codeVariable }}>cell_magic</span>{"\n"}
            <span style={{ color: COLORS.codeKeyword }}>from</span> IPython <span style={{ color: COLORS.codeKeyword }}>import</span>{" "}
            <span style={{ color: COLORS.codeFunction }}>get_ipython</span>
            {"\n\n"}
            <span style={{ color: COLORS.primary }}>@magics_class</span>
            {"                        "}
            <span style={{ color: COLORS.codeComment }}>{"<-- Import Magic Library"}</span>
            {"\n"}
            <span style={{ color: COLORS.codeKeyword }}>class</span>{" "}
            <span style={{ color: COLORS.codeVariable }}>NoopMagics</span>(
            <span style={{ color: COLORS.codeVariable }}>Magics</span>):{"\n"}
            {"    "}<span style={{ color: COLORS.primary }}>@cell_magic</span>
            {"                   "}
            <span style={{ color: COLORS.codeComment }}>{"<-- Register Magic function"}</span>
            {"\n"}
            {"    "}<span style={{ color: COLORS.codeKeyword }}>def</span>{" "}
            <span style={{ color: COLORS.codeFunction }}>noop</span>(
            <span style={{ color: COLORS.codeVariable }}>self</span>,{" "}
            <span style={{ color: COLORS.codeVariable }}>line</span>: str,{" "}
            <span style={{ color: COLORS.codeVariable }}>cell</span>: str):
            {"\n"}
            {"        "}<span style={{ color: COLORS.codeKeyword }}>pass</span>
          </pre>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "flex",
            gap: 20,
            opacity: stepsProgress,
            transform: `translateX(${interpolate(stepsProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          {steps.map((step, i) => {
            const stepDelay = 90 + i * 20;
            const stepProgress = spring({ frame, fps, delay: stepDelay, config: { damping: 200 } });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: stepProgress,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.primary,
                  }}
                >
                  {step.num}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.textLight,
                  }}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <div
          style={{
            opacity: descProgress,
            transform: `translateY(${interpolate(descProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 16,
              color: COLORS.textLight,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            You can register new magic's to do anything you want to either cells or single lines.
          </p>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: 14,
              color: COLORS.textGray,
              margin: 0,
              marginTop: 12,
              lineHeight: 1.6,
            }}
          >
            This example creates a <span style={{ color: COLORS.primary }}>NOOP</span> cell magic similar to{" "}
            <span style={{ fontFamily: FONTS.code, color: COLORS.codeFunction }}>spark.write.format("NOOP")</span>.
            Perfect for validating syntax when developing notebooks.
          </p>
        </div>
      </div>
    </SplitLayout>
  );
};
