import React from "react";
import { Sequence } from "remotion";
import {
  Slide1_Title,
  Slide2_SQL,
  Slide3_PySpark,
  Slide4_Benefits,
  Slide5_CTA,
} from "./components/carousel/slides/window-functions";

// Each slide is 1 frame for static image export
const FRAME_PER_SLIDE = 1;

export const WindowFunctionsCarousel: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={FRAME_PER_SLIDE}>
        <Slide1_Title />
      </Sequence>

      <Sequence from={1} durationInFrames={FRAME_PER_SLIDE}>
        <Slide2_SQL />
      </Sequence>

      <Sequence from={2} durationInFrames={FRAME_PER_SLIDE}>
        <Slide3_PySpark />
      </Sequence>

      <Sequence from={3} durationInFrames={FRAME_PER_SLIDE}>
        <Slide4_Benefits />
      </Sequence>

      <Sequence from={4} durationInFrames={FRAME_PER_SLIDE}>
        <Slide5_CTA />
      </Sequence>
    </>
  );
};
