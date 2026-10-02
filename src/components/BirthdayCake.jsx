import { useEffect, useRef, useState } from "react";
import { celebrate } from "../utils/celebrate.js";
import Reveal from "./Reveal.jsx";

const CANDLES = [124, 142, 160, 178, 196];

// Deterministic "random" so the sky looks the same on every render.
function seeded(i, n) {
  const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: 56 }, (_, i) => ({
  left: seeded(i, 1) * 100,
  top: seeded(i, 2) * 100,
  size: 1 + seeded(i, 3) * 2.2,
  delay: seeded(i, 4) * -5,
  duration: 2.5 + seeded(i, 5) * 3.5,
}));

// Frosting with rounded drips hanging below `base`.
function dripPath(x0, x1, top, base, drips) {
  const width = (x1 - x0) / drips.length;
  const r = width * 0.3;
  let d = `M${x0},${top} L${x1},${top} L${x1},${base}`;
  for (let i = drips.length - 1; i >= 0; i -= 1) {
    const cx = x0 + width * i + width / 2;
    const bottom = base + drips[i];
    d += ` L${cx + r},${base} C${cx + r},${bottom} ${cx - r},${bottom} ${cx - r},${base}`;
  }
  return `${d} L${x0},${base} Z`;
}

// Points along the front edge of an ellipse, for the pearl borders.
function pearls(cx, cy, rx, ry, spacing, inset) {
  const points = [];
  for (let x = cx - rx + inset; x <= cx + rx - inset; x += spacing) {
    const y = cy + ry * Math.sqrt(1 - ((x - cx) / rx) ** 2);
    points.push([x, y]);
  }
  return points;
}

function Cake() {
  return (
    <svg
      className="cake-svg"
      viewBox="0 0 320 300"
      role="img"
      aria-label="A lavender birthday cake with five candles"
    >
      <defs>
        <linearGradient id="tier-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9c4f0" />
          <stop offset="1" stopColor="#a17fce" />
        </linearGradient>
        <linearGradient id="tier-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf5" />
          <stop offset="1" stopColor="#e9dcf4" />
        </linearGradient>
        <linearGradient id="tier-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#2f2440" stopOpacity="0" />
          <stop offset="1" stopColor="#2f2440" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d8cce4" />
        </linearGradient>
        <radialGradient id="flame-fill" cx="0.5" cy="0.75" r="0.6">
          <stop offset="0" stopColor="#fffdf2" />
          <stop offset="0.35" stopColor="#ffe8a6" />
          <stop offset="0.7" stopColor="#ffb656" />
          <stop offset="1" stopColor="#ff8a4c" />
        </radialGradient>
        <radialGradient id="flame-halo">
          <stop offset="0" stopColor="#ffd78a" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffd78a" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="candle-stripe"
          width="6"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <rect width="6" height="8" fill="#fffdf9" />
          <rect width="6" height="3" fill="#c8afe4" />
        </pattern>
      </defs>

      {/* plate */}
      <ellipse cx="160" cy="280" rx="146" ry="16" fill="#0f0b18" opacity="0.35" />
      <ellipse cx="160" cy="270" rx="140" ry="19" fill="url(#plate)" />
      <ellipse cx="160" cy="266" rx="126" ry="13" fill="#f5f0f9" />

      {/* bottom tier */}
      <ellipse cx="160" cy="262" rx="114" ry="12" fill="#a17fce" />
      <rect x="46" y="186" width="228" height="76" fill="url(#tier-bottom)" />
      <rect x="46" y="186" width="228" height="76" fill="url(#tier-shade)" />
      <path
        d={dripPath(46, 274, 186, 198, [14, 26, 10, 30, 18, 8, 24, 16])}
        fill="#fffaf5"
      />
      <ellipse cx="160" cy="186" rx="114" ry="13" fill="#fffaf5" />
      <text x="160" y="243" textAnchor="middle" className="cake-text">
        13.10
      </text>
      {pearls(160, 258, 114, 12, 12, 8).map(([x, y]) => (
        <circle key={`p-${x}`} cx={x} cy={y} r="3.2" fill="#fffaf5" />
      ))}

      {/* top tier */}
      <ellipse cx="160" cy="188" rx="72" ry="9" fill="#e9dcf4" />
      <rect x="88" y="120" width="144" height="68" fill="url(#tier-top)" />
      <rect x="88" y="120" width="144" height="68" fill="url(#tier-shade)" />
      <path
        d={dripPath(88, 232, 120, 130, [10, 18, 8, 22, 12, 16])}
        fill="#c8afe4"
      />
      <ellipse cx="160" cy="120" rx="72" ry="10" fill="#d4bdee" />
      {pearls(160, 186, 72, 9, 10, 6).map(([x, y]) => (
        <circle key={`q-${x}`} cx={x} cy={y} r="2.4" fill="#c8afe4" />
      ))}

      {/* lavender sprigs */}
      {[100, 220].map((x, side) => (
        <g key={x} transform={`rotate(${side ? 18 : -18} ${x} 124)`}>
          <line x1={x} y1="124" x2={x} y2="96" stroke="#7c9a6d" strokeWidth="1.4" />
          {[0, 1, 2, 3, 4].map((k) => (
            <ellipse
              key={k}
              cx={x + (k % 2 ? 2.4 : -2.4)}
              cy={100 + k * 4.5}
              rx="2.6"
              ry="3.4"
              fill={k % 2 ? "#9b78c8" : "#b495dc"}
            />
          ))}
        </g>
      ))}

      {/* candles */}
      {CANDLES.map((x, index) => (
        <g key={x}>
          <rect x={x - 4} y="78" width="8" height="46" rx="3" fill="url(#candle-stripe)" />
          <line
            x1={x}
            y1="78"
            x2={x}
            y2="71"
            stroke="#4a3b3b"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle className="flame-halo" cx={x} cy="60" r="20" fill="url(#flame-halo)" />
          <g className="flame" style={{ animationDelay: `${index * -0.37}s` }}>
            <path
              d={`M${x},44 C${x + 7},55 ${x + 7.5},66 ${x},72 C${x - 7.5},66 ${x - 7},55 ${x},44Z`}
              fill="url(#flame-fill)"
            />
            <path
              d={`M${x},57 C${x + 3},62 ${x + 3},68 ${x},70 C${x - 3},68 ${x - 3},62 ${x},57Z`}
              fill="#ffffff"
              opacity="0.85"
            />
          </g>
          <path
            className="smoke"
            style={{ animationDelay: `${index * 0.12}s` }}
            d={`M${x},70 C${x - 6},60 ${x + 6},50 ${x},40 C${x - 6},30 ${x + 5},22 ${x},12`}
          />
        </g>
      ))}
    </svg>
  );
}

export default function BirthdayCake() {
  const [stage, setStage] = useState("idle");
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  function makeWish() {
    if (stage !== "idle") return;
    setStage("flicker");
    timers.current = [
      window.setTimeout(() => setStage("blown"), 900),
      window.setTimeout(() => {
        celebrate({ confetti: 90, hearts: 24 });
        setStage("wished");
      }, 2000),
    ];
  }

  return (
    <section id="wish" className={`wish-section stage-${stage}`}>
      <div className="night-sky" aria-hidden="true">
        {STARS.map((star, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              "--s": `${star.size}px`,
              "--d": `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        <span className="moon" />
      </div>

      <Reveal className="heading">
        <p className="eyebrow">close your eyes</p>
        <h2>
          Make a <em>Wish</em>…
        </h2>
        <p className="sub">
          One more year. One more chapter. One more chance to dream.
        </p>
      </Reveal>

      <Reveal className="cake-stage" delay={150}>
        <div className="candle-glow" aria-hidden="true" />
        <Cake />
      </Reveal>

      <div className="wish-actions" aria-live="polite">
        {stage === "wished" ? (
          <div className="wish-result">
            <p className="wish-made">My wish has been made</p>
            <p>I hope this year becomes a beautiful chapter of my story.</p>
            <button className="text-btn" onClick={() => setStage("idle")}>
              light the candles again
            </button>
          </div>
        ) : (
          <button
            className="btn btn-gold"
            onClick={makeWish}
            disabled={stage !== "idle"}
          >
            {stage === "idle" ? "Make My Wish ♡" : "Blowing out the candles…"}
          </button>
        )}
      </div>
    </section>
  );
}
