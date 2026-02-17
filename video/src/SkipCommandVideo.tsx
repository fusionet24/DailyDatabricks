import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import {
  SkipOpening,
  SkipCells,
  ListMagics,
  BuildMagics,
  SkipCTA,
} from "./components/scenes/skip";

// Scene durations in frames (30fps) - 45 second video
const SCENES = {
  opening: 150,      // 0-5s
  skipCells: 270,    // 5-14s
  listMagics: 270,   // 14-23s
  buildMagics: 330,  // 23-34s
  cta: 120,          // 34-38s
};

const TRANSITION_DURATION = 20;
const SMOOTH_TRANSITION_DURATION = 35;

export const SkipCommandVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Opening Hook */}
      <TransitionSeries.Sequence durationInFrames={SCENES.opening}>
        <SkipOpening />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: SMOOTH_TRANSITION_DURATION })}
      />

      {/* Scene 2: Skip Over Notebook Cells */}
      <TransitionSeries.Sequence durationInFrames={SCENES.skipCells}>
        <SkipCells />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 3: List All Magics */}
      <TransitionSeries.Sequence durationInFrames={SCENES.listMagics}>
        <ListMagics />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 4: Build Your Own Magics */}
      <TransitionSeries.Sequence durationInFrames={SCENES.buildMagics}>
        <BuildMagics />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 5: CTA */}
      <TransitionSeries.Sequence durationInFrames={SCENES.cta}>
        <SkipCTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
