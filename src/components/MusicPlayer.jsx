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
    <div className={`music-player ${playing ? "is-playing" : ""}`}>
      <div className="vinyl" aria-hidden="true" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause birthday music" : "Play birthday music"}
      >
        <span className="music-mark">♡ ♪</span>
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
}
