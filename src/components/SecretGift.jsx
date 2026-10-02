import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import { celebrate } from "../utils/celebrate.js";
import Reveal from "./Reveal.jsx";
import Sparkle from "./Sparkle.jsx";

function GiftBox() {
  return (
    <svg className="gift-svg" viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <linearGradient id="gift-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6d7f5" />
          <stop offset="1" stopColor="#b194d9" />
        </linearGradient>
        <linearGradient id="gift-lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3ebfa" />
          <stop offset="1" stopColor="#c6abe6" />
        </linearGradient>
        <linearGradient id="gift-ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ecd6ac" />
          <stop offset="0.5" stopColor="#fff6e4" />
          <stop offset="1" stopColor="#d9bb85" />
        </linearGradient>
        <radialGradient id="gift-light">
          <stop offset="0" stopColor="#fff4d6" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff4d6" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="gift-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="4" r="1.5" fill="#fff" opacity="0.5" />
          <circle cx="12" cy="12" r="1.5" fill="#fff" opacity="0.5" />
        </pattern>
      </defs>

      <ellipse cx="120" cy="226" rx="86" ry="9" fill="#3e3150" opacity="0.12" />

      <ellipse
        className="gift-light"
        cx="120"
        cy="112"
        rx="90"
        ry="60"
        fill="url(#gift-light)"
      />

      <g>
        <rect x="42" y="112" width="156" height="110" rx="8" fill="url(#gift-body)" />
        <rect x="42" y="112" width="156" height="110" rx="8" fill="url(#gift-dots)" />
        <rect x="42" y="112" width="156" height="12" fill="#3e3150" opacity="0.08" />
        <rect x="108" y="112" width="24" height="110" fill="url(#gift-ribbon)" />
      </g>

      <g className="gift-lid">
        <rect x="32" y="84" width="176" height="34" rx="7" fill="url(#gift-lid)" />
        <rect x="32" y="84" width="176" height="34" rx="7" fill="url(#gift-dots)" />
        <rect x="106" y="84" width="28" height="34" fill="url(#gift-ribbon)" />
        <g stroke="#cfae74" strokeWidth="1">
          <path
            d="M120,84 C100,44 58,50 70,76 C78,92 104,92 120,84Z"
            fill="url(#gift-ribbon)"
          />
          <path
            d="M120,84 C140,44 182,50 170,76 C162,92 136,92 120,84Z"
            fill="url(#gift-ribbon)"
          />
          <path d="M116,86 L98,118 L107,114 L111,123 L124,88Z" fill="url(#gift-ribbon)" />
          <path d="M124,86 L142,118 L133,114 L129,123 L116,88Z" fill="url(#gift-ribbon)" />
          <path d="M117,81 C105,62 84,62 86,75" fill="none" opacity="0.8" />
          <path d="M123,81 C135,62 156,62 154,75" fill="none" opacity="0.8" />
          <rect x="110" y="75" width="20" height="18" rx="6" fill="url(#gift-ribbon)" />
        </g>
      </g>
    </svg>
  );
}

export default function SecretGift() {
  const [stage, setStage] = useState("idle");
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  function openGift() {
    if (stage !== "idle") return;
    setStage("shake");
    timers.current = [
      window.setTimeout(() => setStage("open"), 800),
      window.setTimeout(() => {
        celebrate({ confetti: 40, hearts: 14 });
        setStage("revealed");
      }, 1700),
    ];
  }

  return (
    <section id="surprise" className="section gift-section">
      <Reveal className="heading">
        <p className="eyebrow">a surprise inside</p>
        <h2>
          A Little Gift for <em>Myself</em>
        </h2>
        <p className="sub">Because I deserve something special too. ♡</p>
      </Reveal>

      <Reveal className={`gift-stage stage-${stage}`} delay={120}>
        <div className="gift-rays" aria-hidden="true">
          <span />
        </div>
        <Sparkle className="gift-spark gift-spark-1" />
        <Sparkle className="gift-spark gift-spark-2" />
        <Sparkle className="gift-spark gift-spark-3" />

        <div className="gift-float">
          <GiftBox />
        </div>

        <div className="gift-card" aria-live="polite">
          {stage === "revealed" && (
            <>
              <span className="gift-card-seal" aria-hidden="true">
                <Heart size={16} fill="currentColor" strokeWidth={0} />
              </span>
              {birthdayData.giftMessage.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="gift-card-sign">— from me, to me</p>
            </>
          )}
        </div>
      </Reveal>

      <div className="gift-actions">
        {stage === "idle" ? (
          <button className="btn btn-primary" onClick={openGift}>
            Open My Gift ♡
          </button>
        ) : (
          stage === "revealed" && (
            <button className="text-btn" onClick={() => setStage("idle")}>
              wrap it up again
            </button>
          )
        )}
      </div>
    </section>
  );
}
