import React from "react";
import { Sequence } from "remotion";
import {
  Slide1_Title,
  Slide2_WhatIsDeltaRS,
  Slide3_KeyFeatures,
  Slide4_WhenToUse,
  Slide5_QuickStart,
  Slide6_CTA,
} from "./components/carousel/slides/delta-rs-intro";

// Each slide is 1 frame for static image export
const FRAME_PER_SLIDE = 1;

export const DeltaRSIntroCarousel: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={FRAME_PER_SLIDE}>
        <Slide1_Title />
      </Sequence>

      <Sequence from={1} durationInFrames={FRAME_PER_SLIDE}>
        <Slide2_WhatIsDeltaRS />
      </Sequence>

      <Sequence from={2} durationInFrames={FRAME_PER_SLIDE}>
        <Slide3_KeyFeatures />
      </Sequence>

      <Sequence from={3} durationInFrames={FRAME_PER_SLIDE}>
        <Slide4_WhenToUse />
      </Sequence>

      <Sequence from={4} durationInFrames={FRAME_PER_SLIDE}>
        <Slide5_QuickStart />
      </Sequence>

      <Sequence from={5} durationInFrames={FRAME_PER_SLIDE}>
        <Slide6_CTA />
      </Sequence>
    </>
  );
};
