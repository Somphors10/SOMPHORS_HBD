import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sampleRate = 44100;

const notes = [
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

const duration = 8.4;
const length = Math.floor(sampleRate * duration);
const samples = new Float32Array(length);

for (const note of notes) {
  const start = Math.floor(note.t * sampleRate);
  const end = Math.min(length, start + Math.floor(note.d * sampleRate));
  for (let i = start; i < end; i += 1) {
    const local = (i - start) / sampleRate;
    const env = Math.min(1, local / 0.04) * Math.exp(-local * 2.4);
    samples[i] += Math.sin(2 * Math.PI * note.f * local) * env * 0.22;
  }
}

const buffer = Buffer.alloc(44 + length * 2);
buffer.write("RIFF", 0);
buffer.writeUInt32LE(36 + length * 2, 4);
buffer.write("WAVE", 8);
buffer.write("fmt ", 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(1, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 2, 28);
buffer.writeUInt16LE(2, 32);
buffer.writeUInt16LE(16, 34);
buffer.write("data", 36);
buffer.writeUInt32LE(length * 2, 40);

for (let i = 0; i < length; i += 1) {
  const clipped = Math.max(-1, Math.min(1, samples[i]));
  buffer.writeInt16LE(Math.round(clipped * 32767), 44 + i * 2);
}

const outDir = path.join(__dirname, "..", "public", "music");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "birthday.wav"), buffer);
