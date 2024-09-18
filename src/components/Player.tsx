import React from "react";
import { SoundCloudWidget, useWidget } from "../utils/widget";

const SoundcloudPlayer = () => {
  const { widget, widgetState } = useWidget("player");

  const onPlayPauseButtonClick = () => {
    if (widgetState.isPlaying) {
      widget?.pause();
    } else {
      widget?.play();
    }
  };

  return (
    <>
      <iframe
        id="player"
        className="hidden"
        title="player"
        width="100%"
        height="166"
        scrolling="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp"
      />
      <button onClick={onPlayPauseButtonClick}>
        {widgetState.isPlaying ? "Pause" : "Play"}
      </button>
    </>
  );
};

export default SoundcloudPlayer;
