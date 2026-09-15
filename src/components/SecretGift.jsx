import { useState } from "react";
import birthdayData from "../data/birthdayData.js";
import { celebrate } from "../utils/celebrate.js";

export default function SecretGift() {
  const [stage, setStage] = useState("idle");

  function openGift() {
    if (stage !== "idle") return;
    setStage("shake");
    window.setTimeout(() => setStage("unwrap"), 700);
    window.setTimeout(() => setStage("open"), 1500);
    window.setTimeout(() => {
      celebrate({ confetti: 60, hearts: 24 });
      setStage("revealed");
    }, 2300);
  }

  return (
    <section id="surprise" className="section gift-section">
      <div className="section-heading">
        <h2>A Little Gift for Myself 🎁</h2>
        <p>Because I deserve something special too. ♡</p>
      </div>

      <div className={`gift-wrap stage-${stage}`}>
        <div className="gift-box" aria-hidden="true">
          <div className="gift-lid">
            <div className="gift-bow" />
          </div>
          <div className="gift-body">
            <span className="ribbon-v" />
            <span className="ribbon-h" />
          </div>
        </div>

        {stage === "revealed" && (
          <div className="gift-message">
            {birthdayData.giftMessage.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
      </div>

      {stage === "idle" && (
        <button className="btn-primary" onClick={openGift}>
          Open My Gift ♡
        </button>
      )}
    </section>
  );
}
