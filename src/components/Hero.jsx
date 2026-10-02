import { Heart, Mail } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import { celebrate } from "../utils/celebrate.js";
import Sparkle from "./Sparkle.jsx";

export default function Hero() {
  const themes = birthdayData.theme.split("•").map((item) => item.trim());

  function openLetter() {
    celebrate({ confetti: 80, hearts: 22 });
    window.dispatchEvent(new Event("open-letter"));
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="home" className="hero">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="hero-bignum">{birthdayData.dateShort}</span>
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">{birthdayData.dateFull} · Birthday Café</p>
          <p className="hero-script">Happy Birthday to Me</p>
          <h1>
            <span>Today,</span>
            <span>
              I Celebrate <em>Me.</em>
            </span>
          </h1>
          <p className="hero-korean">{birthdayData.koreanHero}</p>
          <ul className="hero-theme">
            {themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={openLetter}>
              Open My Birthday Letter <Mail size={18} strokeWidth={1.8} />
            </button>
            <a className="btn btn-ghost" href="#memories">
              See my moments
            </a>
          </div>
        </div>

        <div className="hero-art">
          <span className="arch-outline" aria-hidden="true" />
          <div className="arch">
            <img
              src="/images/hero-cake.png"
              alt="A vanilla lavender birthday cake"
            />
          </div>

          <figure className="hero-polaroid">
            <span className="tape" aria-hidden="true" />
            <img src="/images/photo3.png" alt="Me, smiling" />
            <figcaption>
              <span className="polaroid-en">
                that's me <span className="polaroid-heart">♡</span>
              </span>
              <span className="polaroid-divider" aria-hidden="true">
                <i />✦<i />
              </span>
              <span className="polaroid-ko">바로 나예요</span>
            </figcaption>
          </figure>

          <div className="badge" aria-hidden="true">
            <svg className="badge-ring" viewBox="0 0 120 120">
              <defs>
                <path
                  id="badge-circle"
                  d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                />
              </defs>
              <text>
                <textPath
                  href="#badge-circle"
                  textLength="272"
                  lengthAdjust="spacing"
                >
                  HAPPY BIRTHDAY TO ME ✦ {birthdayData.dateShort} ✦
                </textPath>
              </text>
            </svg>
            <Heart size={26} fill="currentColor" strokeWidth={0} />
          </div>

          <Sparkle className="spark spark-1" />
          <Sparkle className="spark spark-2" />
          <Sparkle className="spark spark-3" />
        </div>
      </div>

      <a href="#letter" className="scroll-cue">
        <span>scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
