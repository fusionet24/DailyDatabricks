import React from "react";
import { Sequence } from "remotion";
import {
  Slide1_Title,
  Slide2_Problem,
  Slide3_Solution,
  Slide4_Rollback,
  Slide5_Rules,
  Slide6_CTA,
} from "./components/carousel/slides/transactions";

// Each slide is 1 frame for static image export
const FRAME_PER_SLIDE = 1;

export const TransactionsCarousel: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={FRAME_PER_SLIDE}>
        <Slide1_Title />
      </Sequence>

      <Sequence from={1} durationInFrames={FRAME_PER_SLIDE}>
        <Slide2_Problem />
      </Sequence>

      <Sequence from={2} durationInFrames={FRAME_PER_SLIDE}>
        <Slide3_Solution />
      </Sequence>

      <Sequence from={3} durationInFrames={FRAME_PER_SLIDE}>
        <Slide4_Rollback />
      </Sequence>

      <Sequence from={4} durationInFrames={FRAME_PER_SLIDE}>
        <Slide5_Rules />
      </Sequence>

      <Sequence from={5} durationInFrames={FRAME_PER_SLIDE}>
        <Slide6_CTA />
      </Sequence>
    </>
  );
};
