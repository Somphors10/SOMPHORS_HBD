import { useState } from "react";
import { Sparkles } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import Reveal from "./Reveal.jsx";

export default function Fortune() {
  const [drawn, setDrawn] = useState(null);
  const [flipping, setFlipping] = useState(false);

  function draw() {
    if (flipping) return;
    setFlipping(true);
    setDrawn(null);

    window.setTimeout(() => {
      const list = birthdayData.fortunes;
      const next = list[Math.floor(Math.random() * list.length)];
      setDrawn(next);
      setFlipping(false);
    }, 650);
  }

  return (
    <section id="fortune" className="section fortune-section">
      <Reveal className="fortune-card">
        <p className="eyebrow">café fortune</p>
        <h2>
          Draw a Little <em>Wish</em>
        </h2>
        <p className="sub">A soft message for today, just for me.</p>

        <div
          className={`fortune-ticket ${flipping ? "is-flipping" : ""} ${drawn ? "is-drawn" : ""}`}
        >
          <div className="ticket-inner">
            <div className="ticket-face ticket-front">
              <Sparkles size={28} strokeWidth={1.4} />
              <p>tap to open</p>
              <span>13.10 café · fortune of the day</span>
            </div>
            <div className="ticket-face ticket-back">
              <p className="ticket-label">today's fortune</p>
              <p className="ticket-text">{drawn ?? "…"}</p>
              <span className="ticket-seal">♡</span>
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={draw} disabled={flipping}>
          {drawn ? "Draw another ♡" : "Open my fortune ♡"}
        </button>
      </Reveal>
    </section>
  );
}
