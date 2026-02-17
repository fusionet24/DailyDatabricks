import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import {
  OpeningHook,
  ConceptIntro,
  CodeDemo,
  UseCases,
  QueryDemo,
  BenefitsSummary,
  CallToAction,
} from "./components/scenes";

// Scene durations in frames (30fps)
const SCENES = {
  openingHook: 150,      // 0-5s
  conceptIntro: 270,     // 5-14s
  codeDemo: 420,         // 14-28s
  useCases: 180,         // 28-34s (shortened by 8s)
  queryDemo: 330,        // 34-45s (extended by 3s)
  benefits: 270,         // 45-54s (extended by 3s)
  cta: 120,              // 54-58s
};

const TRANSITION_DURATION = 20; // Smooth 20-frame fade transitions

export const DeltaMetadataVideo: React.FC = () => {
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

      {/* Scene 2: Concept Introduction - Explain what it is */}
      <TransitionSeries.Sequence durationInFrames={SCENES.conceptIntro}>
        <ConceptIntro />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 3: Code Demo - Show the implementation */}
      <TransitionSeries.Sequence durationInFrames={SCENES.codeDemo}>
        <CodeDemo />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 4: Use Cases - Practical applications */}
      <TransitionSeries.Sequence durationInFrames={SCENES.useCases}>
        <UseCases />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 5: Query Demo - How to access the data */}
      <TransitionSeries.Sequence durationInFrames={SCENES.queryDemo}>
        <QueryDemo />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 6: Benefits Summary - Reinforce value */}
      <TransitionSeries.Sequence durationInFrames={SCENES.benefits}>
        <BenefitsSummary />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 7: Call to Action - Drive engagement */}
      <TransitionSeries.Sequence durationInFrames={SCENES.cta}>
        <CallToAction />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
