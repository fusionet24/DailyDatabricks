import React from "react";
import { Sequence } from "remotion";
import {
  Slide1_Title,
  Slide2_Architecture,
  Slide3_WhenSpark,
  Slide4_WhenDeltaRS,
  Slide5_Together,
  Slide6_CTA,
} from "./components/carousel/slides/delta-rs-vs-spark";

// Each slide is 1 frame for static image export
const FRAME_PER_SLIDE = 1;

export const DeltaRSComparisonCarousel: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={FRAME_PER_SLIDE}>
        <Slide1_Title />
      </Sequence>

      <Sequence from={1} durationInFrames={FRAME_PER_SLIDE}>
        <Slide2_Architecture />
      </Sequence>

      <Sequence from={2} durationInFrames={FRAME_PER_SLIDE}>
        <Slide3_WhenSpark />
      </Sequence>

      <Sequence from={3} durationInFrames={FRAME_PER_SLIDE}>
        <Slide4_WhenDeltaRS />
      </Sequence>

      <Sequence from={4} durationInFrames={FRAME_PER_SLIDE}>
        <Slide5_Together />
      </Sequence>

      <Sequence from={5} durationInFrames={FRAME_PER_SLIDE}>
        <Slide6_CTA />
      </Sequence>
    </>
  );
};
