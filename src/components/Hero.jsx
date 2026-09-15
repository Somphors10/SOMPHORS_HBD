import birthdayData from "../data/birthdayData.js";
import { celebrate } from "../utils/celebrate.js";

const FLOATING = ["♡", "✦", "🪻", "˚₊‧", "🎀", "✨", "☁️"];

export default function Hero() {
  function openLetter() {
    celebrate({ confetti: 80, hearts: 22 });
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="home" className="hero">
      <p className="hero-side">birthday café · 13.10</p>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-date">{birthdayData.dateShort}</p>
          <p className="korean-line">{birthdayData.koreanHero}</p>
          <p className="script-line">Happy Birthday to Me</p>
          <h1>Today, I Celebrate Me. ♡</h1>
          <p className="hero-headline">{birthdayData.headline}</p>
          <p className="hero-theme">{birthdayData.theme}</p>
          <button className="btn-primary" onClick={openLetter}>
            Open My Birthday Letter 💌
          </button>
        </div>

        <div className="hero-art">
          <div className="hero-frame">
            <span className="hero-tape" />
            <img
              src="/images/hero-cake.png"
              alt="A vanilla lavender birthday cake"
            />
            <p className="hero-caption handwriting">lavender vanilla cake ♡</p>
          </div>

          {FLOATING.map((symbol, index) => (
            <span
              key={symbol}
              className={`hero-float hero-float-${index + 1}`}
              aria-hidden="true"
            >
              {symbol}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
