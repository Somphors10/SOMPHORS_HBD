import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import { createMelodyPlayer } from "../utils/melody.js";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const melodyRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    // Replace public/music/birthday.mp3 with your own song anytime.
    const audio = new Audio(birthdayData.musicSrc);
    audio.loop = true;
    audioRef.current = audio;
    melodyRef.current = createMelodyPlayer();

    const onError = () => {
      if (!audio.dataset.triedWav) {
        audio.dataset.triedWav = "true";
        audio.src = "/music/birthday.wav";
        return;
      }
      setUsingFallback(true);
    };
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("error", onError);
      melodyRef.current?.stop();
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      melodyRef.current?.stop();
      setPlaying(false);
      return;
    }

    if (usingFallback) {
      await melodyRef.current?.play();
      setPlaying(true);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      try {
        audio.src = "/music/birthday.wav";
        audio.loop = true;
        await audio.play();
        setPlaying(true);
      } catch {
        await melodyRef.current?.play();
        setUsingFallback(true);
        setPlaying(true);
      }
    }
  }

  return (
    <div className={`music ${playing ? "is-playing" : ""}`}>
      <span className="disc" aria-hidden="true" />
      <span className="music-meta">
        <small>{playing ? "now playing" : "birthday song"}</small>
        <span>happy birthday, me</span>
      </span>
      <span className="eq" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <button
        className="music-btn"
        onClick={toggle}
        aria-label={playing ? "Pause birthday music" : "Play birthday music"}
      >
        {playing ? (
          <Pause size={15} fill="currentColor" strokeWidth={0} />
        ) : (
          <Play size={15} fill="currentColor" strokeWidth={0} />
        )}
      </button>
    </div>
  );
}
