const NOTES = [
  { f: 523.25, t: 0.0, d: 0.42 },
  { f: 659.25, t: 0.42, d: 0.42 },
  { f: 783.99, t: 0.84, d: 0.55 },
  { f: 880.0, t: 1.45, d: 0.7 },
  { f: 783.99, t: 2.2, d: 0.4 },
  { f: 659.25, t: 2.65, d: 0.45 },
  { f: 698.46, t: 3.15, d: 0.5 },
  { f: 523.25, t: 3.7, d: 0.8 },
  { f: 392.0, t: 4.6, d: 0.4 },
  { f: 523.25, t: 5.05, d: 0.4 },
  { f: 659.25, t: 5.5, d: 0.55 },
  { f: 587.33, t: 6.1, d: 0.7 },
  { f: 523.25, t: 6.9, d: 1.1 },
];

export function createMelodyPlayer() {
  let context = null;
  let loopId = null;
  let playing = false;

  function playOnce() {
    if (!context) return;
    const now = context.currentTime;

    NOTES.forEach((note) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = note.f;
      gain.gain.setValueAtTime(0, now + note.t);
      gain.gain.linearRampToValueAtTime(0.045, now + note.t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + note.t);
      oscillator.stop(now + note.t + note.d + 0.05);
    });
  }

  return {
    async play() {
      if (playing) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      context = context || new AudioContext();
      if (context.state === "suspended") {
        await context.resume();
      }
      playing = true;
      playOnce();
      loopId = window.setInterval(playOnce, 8600);
    },
    stop() {
      playing = false;
      if (loopId) {
        window.clearInterval(loopId);
        loopId = null;
      }
      if (context && context.state === "running") {
        context.suspend();
      }
    },
  };
}
