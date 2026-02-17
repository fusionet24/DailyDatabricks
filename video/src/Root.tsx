import { Composition, staticFile } from "remotion";
import { DeltaMetadataVideo } from "./DeltaMetadataVideo";
import { SkipCommandVideo } from "./SkipCommandVideo";
import { DataSourceCarousel } from "./DataSourceCarousel";
import { IpythonEventsCarousel } from "./IpythonEventsCarousel";
import { WindowFunctionsCarousel } from "./WindowFunctionsCarousel";
import { HashingExamplesCarousel } from "./HashingExamplesCarousel";
import { IpythonWidgetsCarousel } from "./IpythonWidgetsCarousel";
import { ServerlessComputeCarousel } from "./ServerlessComputeCarousel";
import { TlsCertCarousel } from "./TlsCertCarousel";
import { TellRCarousel } from "./TellRCarousel";
import { DeltaRSIntroCarousel } from "./DeltaRSIntroCarousel";
import { DeltaRSCodeCarousel } from "./DeltaRSCodeCarousel";
import { DeltaRSComparisonCarousel } from "./DeltaRSComparisonCarousel";
import { DeltaRSVideo } from "./DeltaRSVideo";
import { LogoRevealVideo } from "./LogoRevealVideo";
import { EndCardGenerator } from "./EndCardGenerator";
import { VideoThumbnail } from "./VideoThumbnail";
import {
  VIDEO_CONFIG,
  CAROUSEL_CONFIG,
  LOGO_REVEAL_CONFIG,
  END_CARD_CONFIG,
  THUMBNAIL_CONFIG,
} from "./lib/constants";

// Number of slides per carousel
const CAROUSEL_SLIDES = 5;

// %SKIP video is 38 seconds = 1140 frames at 30fps
const SKIP_VIDEO_FRAMES = 1140;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DeltaMetadataLogging"
        component={DeltaMetadataVideo}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
      <Composition
        id="SkipCommand"
        component={SkipCommandVideo}
        durationInFrames={SKIP_VIDEO_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DataSourceCarousel"
        component={DataSourceCarousel}
        durationInFrames={CAROUSEL_CONFIG.totalSlides}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="IpythonEventsCarousel"
        component={IpythonEventsCarousel}
        durationInFrames={CAROUSEL_SLIDES}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="WindowFunctionsCarousel"
        component={WindowFunctionsCarousel}
        durationInFrames={CAROUSEL_SLIDES}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="HashingExamplesCarousel"
        component={HashingExamplesCarousel}
        durationInFrames={CAROUSEL_SLIDES}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="IpythonWidgetsCarousel"
        component={IpythonWidgetsCarousel}
        durationInFrames={CAROUSEL_SLIDES}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="ServerlessComputeCarousel"
        component={ServerlessComputeCarousel}
        durationInFrames={CAROUSEL_CONFIG.totalSlides}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="TlsCertCarousel"
        component={TlsCertCarousel}
        durationInFrames={CAROUSEL_CONFIG.totalSlides}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="TellRCarousel"
        component={TellRCarousel}
        durationInFrames={CAROUSEL_CONFIG.totalSlides}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="DeltaRSIntroCarousel"
        component={DeltaRSIntroCarousel}
        durationInFrames={CAROUSEL_CONFIG.totalSlides}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="DeltaRSCodeCarousel"
        component={DeltaRSCodeCarousel}
        durationInFrames={CAROUSEL_CONFIG.totalSlides}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="DeltaRSComparisonCarousel"
        component={DeltaRSComparisonCarousel}
        durationInFrames={CAROUSEL_CONFIG.totalSlides}
        fps={CAROUSEL_CONFIG.fps}
        width={CAROUSEL_CONFIG.width}
        height={CAROUSEL_CONFIG.height}
      />
      <Composition
        id="DeltaRSVideo"
        component={DeltaRSVideo}
        durationInFrames={1710}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LogoRevealVideo"
        component={LogoRevealVideo}
        durationInFrames={LOGO_REVEAL_CONFIG.durationInFrames}
        fps={LOGO_REVEAL_CONFIG.fps}
        width={LOGO_REVEAL_CONFIG.width}
        height={LOGO_REVEAL_CONFIG.height}
      />
      <Composition
        id="EndCardGenerator"
        component={EndCardGenerator}
        durationInFrames={END_CARD_CONFIG.durationInFrames}
        fps={END_CARD_CONFIG.fps}
        width={END_CARD_CONFIG.width}
        height={END_CARD_CONFIG.height}
        defaultProps={{
          endCard1: staticFile("logo.jpg"),
          endCard2: staticFile("logo.jpg"),
          title1: "Previous Video",
          title2: "Next Video",
        }}
      />
      <Composition
        id="VideoThumbnail"
        component={VideoThumbnail}
        durationInFrames={THUMBNAIL_CONFIG.durationInFrames}
        fps={THUMBNAIL_CONFIG.fps}
        width={THUMBNAIL_CONFIG.width}
        height={THUMBNAIL_CONFIG.height}
        defaultProps={{
          title: "YOUR TITLE HERE",
          subtitle: "",
          showCode: false,
        }}
      />
    </>
  );
};
