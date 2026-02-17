import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import {
  OpeningHook,
  ConceptIntro,
  CodeDemo,
  UseCases,
  MergeDemo,
  BenefitsSummary,
  CallToAction,
} from "./components/scenes/delta-rs";

// Scene durations in frames (30fps)
const SCENES = {
  openingHook: 150,      // 0-5s
  conceptIntro: 270,     // 5-14s
  codeDemo: 420,         // 14-28s
  useCases: 240,         // 28-36s
  mergeDemo: 300,        // 36-46s
  benefits: 210,         // 46-53s
  cta: 120,              // 53-57s
};

const TRANSITION_DURATION = 20; // Smooth 20-frame fade transitions

export const DeltaRSVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Opening Hook - Grab attention */}
      <TransitionSeries.Sequence durationInFrames={SCENES.openingHook}>
        <OpeningHook />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 2: Concept Introduction - What is delta-rs */}
      <TransitionSeries.Sequence durationInFrames={SCENES.conceptIntro}>
        <ConceptIntro />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 3: Code Demo - Write and read examples */}
      <TransitionSeries.Sequence durationInFrames={SCENES.codeDemo}>
        <CodeDemo />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 4: Use Cases - When to use delta-rs */}
      <TransitionSeries.Sequence durationInFrames={SCENES.useCases}>
        <UseCases />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 5: Merge Demo - Merge and time travel */}
      <TransitionSeries.Sequence durationInFrames={SCENES.mergeDemo}>
        <MergeDemo />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 6: Benefits Summary - Why delta-rs */}
      <TransitionSeries.Sequence durationInFrames={SCENES.benefits}>
        <BenefitsSummary />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 7: Call to Action - Try it today */}
      <TransitionSeries.Sequence durationInFrames={SCENES.cta}>
        <CallToAction />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
