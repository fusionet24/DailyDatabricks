import React from "react";
import { Sequence } from "remotion";
import {
  Slide1_Title,
  Slide2_WhatsChanging,
  Slide3_StandardMode,
  Slide4_EgressControl,
  Slide5_NotebookTimeout,
  Slide6_CTA,
} from "./components/carousel/slides/serverless-compute";

// Each slide is 1 frame for static image export
const FRAME_PER_SLIDE = 1;

export const ServerlessComputeCarousel: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={FRAME_PER_SLIDE}>
        <Slide1_Title />
      </Sequence>

      <Sequence from={1} durationInFrames={FRAME_PER_SLIDE}>
        <Slide2_WhatsChanging />
      </Sequence>

      <Sequence from={2} durationInFrames={FRAME_PER_SLIDE}>
        <Slide3_StandardMode />
      </Sequence>

      <Sequence from={3} durationInFrames={FRAME_PER_SLIDE}>
        <Slide4_EgressControl />
      </Sequence>

      <Sequence from={4} durationInFrames={FRAME_PER_SLIDE}>
        <Slide5_NotebookTimeout />
      </Sequence>

      <Sequence from={5} durationInFrames={FRAME_PER_SLIDE}>
        <Slide6_CTA />
      </Sequence>
    </>
  );
};
