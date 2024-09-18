import React from "react";

export type SoundCloudWidget = {
  bind(eventName: string, listener: (arg?: any) => void): void; // adds a listener function for the specified eventName. See below for the list of possible event names.
  unbind(eventName: string): void; // removes all listener functions previously added for the specified eventName. See below for the list of possible event names.
  load(url: string, options: any): void; // reloads the iframe element with a new widget specified by the url. All previously added event listeners will continue working. options is an object which allows you to define all possible widget parameters as well as a callback function which will be executed as soon as new widget is ready. See below for detailed list of widget parameters.
  play(): void; // plays the sound.
  pause(): void; // pauses the sound.
  toggle(): void; // toggles the sound.
  seekTo(milliseconds: number): void; // jumps to a certain position in a sound.
  setVolume(volume: number): void; // sets the widget volume to a certain value in the range 0-100.
  next(): void; // skips to the next sound (only if the widget contains multiple sounds).
  prev(): void; // skips to the previous sound (only if the widget contains multiple sounds).
  skip(soundIndex: number): void; // jumps to the soundIndex sound, starting from 0 (only if the widget contains multiple sounds).
  getVolume(callback: (volume: number) => void): void; // returns the current volume, in the range of [0, 100].
  getDuration(callback: (duration: number) => void): void; // returns current sound duration in milliseconds.
  getPosition(callback: (position: number) => void): void; // returns current sound position in milliseconds.
  getSounds(callback: (sounds: any) => void): void; // returns the list of sound objects.
  getCurrentSound(callback: (currentSound: any) => void): void; // returns current sound object.
  getCurrentSoundIndex(callback: (currentSoundIndex: number) => void): void; // returns the index of current sound.
  isPaused(callback: (isPaused: boolean) => void): void; // whether the widget is paused.
};

export const useWidget = (iframeID: string) => {
  const [widget, setWidget] = React.useState<SoundCloudWidget>();
  const [iframeEl, setIframeEl] = React.useState<HTMLIFrameElement | null>(
    null
  );

  const [widgetState, setWidgetState] = React.useState<{
    isPlaying: boolean;
    isPaused: boolean;
  }>({
    isPaused: false,
    isPlaying: false,
  });

  React.useEffect(() => {
    const iframe = document.getElementById(iframeID) as HTMLIFrameElement;

    if (!iframe) return;

    const onIframeLoad = () => {
      setIframeEl(iframe);
    };

    if (iframe) {
      iframe.addEventListener("load", onIframeLoad);
    }

    return () => {
      iframe?.removeEventListener("load", onIframeLoad);
    };
  }, [iframeID]);

  React.useEffect(() => {
    if (iframeEl && window.SC) {
      const widget = window.SC.Widget(iframeEl) as SoundCloudWidget;
      setWidget(widget);
    }
  }, [iframeID, iframeEl]);

  React.useEffect(() => {
    const onReady = () => {
      setWidgetState((state) => ({ ...state, isReady: true }));
    };

    const onPlay = () => {
      setWidgetState((state) => ({
        ...state,
        isPlaying: true,
        isPaused: false,
      }));
    };

    const onPause = () => {
      setWidgetState((state) => ({
        ...state,
        isPlaying: false,
        isPaused: true,
      }));
    };

    widget?.bind(window.SC?.Widget.Events.READY, onReady);
    widget?.bind(window.SC?.Widget.Events.PLAY, onPlay);
    widget?.bind(window.SC?.Widget.Events.PAUSE, onPause);

    return () => {
      widget?.unbind(window.SC?.Widget.Events.PAUSE);
      widget?.unbind(window.SC?.Widget.Events.READY);
      widget?.unbind(window.SC?.Widget.Events.PLAY);
    };
  }, [widget]);

  return { widget, widgetState };
};
