import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ListMusic,
  Pause,
  Play,
  X,
} from "lucide-react";
import birthdayData from "../data/birthdayData.js";

function loadYouTubeApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };

    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

export default function MusicPlayer() {
  const playlist = birthdayData.playlist;
  const playerRef = useRef(null);
  const hostRef = useRef(null);
  const indexRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  const current = playlist[index];

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    let cancelled = false;
    let player;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current) return;

      player = new YT.Player(hostRef.current, {
        height: "1",
        width: "1",
        videoId: playlist[0].id,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
          onStateChange: (event) => {
            if (cancelled) return;

            if (event.data === YT.PlayerState.PLAYING) {
              setPlaying(true);
            } else if (event.data === YT.PlayerState.PAUSED) {
              setPlaying(false);
            } else if (event.data === YT.PlayerState.ENDED) {
              const next = (indexRef.current + 1) % playlist.length;
              setIndex(next);
              player.loadVideoById(playlist[next].id);
            }
          },
        },
      });

      playerRef.current = player;
    });

    return () => {
      cancelled = true;
      try {
        player?.destroy?.();
      } catch {
        // ignore cleanup errors
      }
      playerRef.current = null;
    };
  }, [playlist]);

  function playTrack(nextIndex, autoplay = true) {
    const player = playerRef.current;
    if (!player || !ready) return;

    const track = playlist[nextIndex];
    setIndex(nextIndex);

    if (autoplay) {
      player.loadVideoById(track.id);
    } else {
      player.cueVideoById(track.id);
      setPlaying(false);
    }
  }

  function toggle() {
    const player = playerRef.current;
    if (!player || !ready) return;

    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function prev() {
    const nextIndex = (index - 1 + playlist.length) % playlist.length;
    playTrack(nextIndex, true);
  }

  function next() {
    const nextIndex = (index + 1) % playlist.length;
    playTrack(nextIndex, true);
  }

  return (
    <div className={`music-wrap ${open ? "is-open" : ""}`}>
      <div className={`music ${playing ? "is-playing" : ""}`}>
        <div className="yt-host" aria-hidden="true">
          <div ref={hostRef} />
        </div>

        <span className="disc" aria-hidden="true" />

        <span className="music-meta">
          <small>
            {playing ? "now playing" : current.artist}
            <span className="music-count">
              {" "}
              · {index + 1}/{playlist.length}
            </span>
          </small>
          <span>{current.title}</span>
        </span>

        <div className="music-controls">
          <button
            className="music-icon"
            onClick={prev}
            disabled={!ready}
            aria-label="Previous song"
          >
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <button
            className="music-btn"
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? `Pause ${current.title}` : `Play ${current.title}`}
          >
            {playing ? (
              <Pause size={15} fill="currentColor" strokeWidth={0} />
            ) : (
              <Play size={15} fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <button
            className="music-icon"
            onClick={next}
            disabled={!ready}
            aria-label="Next song"
          >
            <ChevronRight size={16} strokeWidth={2} />
          </button>
          <button
            className={`music-icon ${open ? "is-active" : ""}`}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close playlist" : "Open playlist"}
            aria-expanded={open}
          >
            {open ? <X size={15} strokeWidth={2} /> : <ListMusic size={15} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="playlist" role="listbox" aria-label="Birthday K-pop playlist">
          <p className="playlist-title">Birthday playlist ♡</p>
          {playlist.map((track, trackIndex) => (
            <button
              key={track.id}
              className={`playlist-item ${trackIndex === index ? "is-current" : ""}`}
              onClick={() => playTrack(trackIndex, true)}
              role="option"
              aria-selected={trackIndex === index}
            >
              <span className="playlist-num">
                {String(trackIndex + 1).padStart(2, "0")}
              </span>
              <span className="playlist-copy">
                <strong>{track.title}</strong>
                <small>{track.artist}</small>
              </span>
              {trackIndex === index && playing && (
                <span className="playlist-eq" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
