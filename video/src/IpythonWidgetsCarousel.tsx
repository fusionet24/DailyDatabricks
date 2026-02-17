import React from "react";
import { Sequence } from "remotion";
import {
  Slide1_Title,
  Slide2_Basics,
  Slide3_Example,
  Slide4_UseCases,
  Slide5_CTA,
} from "./components/carousel/slides/ipython-widgets";

// Each slide is 1 frame for static image export
const FRAME_PER_SLIDE = 1;

export const IpythonWidgetsCarousel: React.FC = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={FRAME_PER_SLIDE}>
        <Slide1_Title />
      </Sequence>

      <Sequence from={1} durationInFrames={FRAME_PER_SLIDE}>
        <Slide2_Basics />
      </Sequence>

      <Sequence from={2} durationInFrames={FRAME_PER_SLIDE}>
        <Slide3_Example />
      </Sequence>

      <Sequence from={3} durationInFrames={FRAME_PER_SLIDE}>
        <Slide4_UseCases />
      </Sequence>

      <Sequence from={4} durationInFrames={FRAME_PER_SLIDE}>
        <Slide5_CTA />
      </Sequence>
    </>
  );
};
