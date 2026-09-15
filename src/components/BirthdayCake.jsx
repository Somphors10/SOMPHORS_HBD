import { useState } from "react";
import { celebrate } from "../utils/celebrate.js";

export default function BirthdayCake() {
  const [stage, setStage] = useState("idle");

  function makeWish() {
    if (stage !== "idle") return;
    setStage("flicker");
    window.setTimeout(() => setStage("blown"), 900);
    window.setTimeout(() => {
      celebrate({ confetti: 90, hearts: 24 });
      setStage("wished");
    }, 1600);
  }

  return (
    <section id="wish" className={`section cake-section stage-${stage}`}>
      <div className="section-heading">
        <h2>Make a Wish... 🎂</h2>
        <p>One more year. One more chapter. One more chance to dream. ✨</p>
      </div>

      <div className="cake-stage">
        <div className="cake" aria-hidden="true">
          <div className="candles">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className={`candle candle-${index + 1}`}>
                <span className="flame" />
                <span className="smoke" />
              </div>
            ))}
          </div>
          <div className="cake-top">
            <span className="berry" />
            <span className="berry berry-2" />
            <span className="berry berry-3" />
          </div>
          <div className="cake-frosting" />
          <div className="cake-ribbon" />
          <div className="cake-layer layer-1" />
          <div className="cake-layer layer-2" />
          <div className="cake-plate" />
        </div>
      </div>

      {stage === "wished" ? (
        <div className="wish-result">
          <p className="wish-made">My wish has been made. ✨💜</p>
          <p>I hope this year becomes a beautiful chapter of my story.</p>
        </div>
      ) : (
        <button className="btn-primary" onClick={makeWish}>
          Make My Wish ♡
        </button>
      )}
    </section>
  );
}
