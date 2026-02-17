import React from "react";
import { Sequence } from "remotion";
import {
  Slide1_Title,
  Slide2_Write,
  Slide3_Read,
  Slide4_TimeTravel,
  Slide5_Merge,
  Slide6_CTA,
} from "./components/carousel/slides/delta-rs-code";

// Each slide is 1 frame for static image export
const FRAME_PER_SLIDE = 1;

export const DeltaRSCodeCarousel: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={FRAME_PER_SLIDE}>
        <Slide1_Title />
      </Sequence>

      <Sequence from={1} durationInFrames={FRAME_PER_SLIDE}>
        <Slide2_Write />
      </Sequence>

      <Sequence from={2} durationInFrames={FRAME_PER_SLIDE}>
        <Slide3_Read />
      </Sequence>

      <Sequence from={3} durationInFrames={FRAME_PER_SLIDE}>
        <Slide4_TimeTravel />
      </Sequence>

      <Sequence from={4} durationInFrames={FRAME_PER_SLIDE}>
        <Slide5_Merge />
      </Sequence>

      <Sequence from={5} durationInFrames={FRAME_PER_SLIDE}>
        <Slide6_CTA />
      </Sequence>
    </>
  );
};
