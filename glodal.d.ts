interface Window {
  SC: {
    Widget: {
      (iframeEl: string | HTMLIFrameElement): SoundCloudWidget; // Adjust the parameter and return type as needed
      Events: {
        LOAD_PROGRESS: string; // fired periodically while the sound is loading.
        PLAY_PROGRESS: string; // fired periodically while the sound is playing.
        PLAY: string; // fired when the sound begins to play.
        PAUSE: string; // fired when the sound pauses.
        FINISH: string; // fired when the sound finishes.
        SEEK: string; // fired when the user seeks.
        READY: string; // fired when the widget has loaded its data and is ready to accept external calls.
        CLICK_DOWNLOAD: string; // Fired when the user clicks the download button.
        CLICK_BUY: string; // Fired when the user clicks the buy button.
        OPEN_SHARE_PANEL: string; // Fired when the share panel is opened. This happens when the user clicks the "Share" button, and at the end of the last sound.
        ERROR: string; // Fired when an error message is displayed.
      };
    };
  };
}
