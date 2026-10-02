import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import Reveal from "./Reveal.jsx";

function accentLastWord(text) {
  const words = text.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <em>{last}</em>
    </>
  );
}

export default function BirthdayLetter() {
  const [stage, setStage] = useState("closed");
  const stageRef = useRef("closed");
  const timers = useRef([]);

  function open(delay = 0) {
    if (stageRef.current !== "closed") return;
    stageRef.current = "opening";
    timers.current.push(
      window.setTimeout(() => setStage("opening"), delay),
      window.setTimeout(() => {
        stageRef.current = "open";
        setStage("open");
      }, delay + 1200)
    );
  }

  useEffect(() => {
    // The hero button opens the letter after the page has scrolled here.
    const onOpenLetter = () => open(700);
    window.addEventListener("open-letter", onOpenLetter);
    return () => {
      window.removeEventListener("open-letter", onOpenLetter);
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const body = birthdayData.letterBody;
  const affirmations = body.filter((line) => /deserve/i.test(line));
  const paragraphs = body.filter((line) => !/deserve/i.test(line));

  return (
    <section id="letter" className="section letter-section">
      <Reveal className="heading">
        <p className="eyebrow">a note, just for me</p>
        <h2>{accentLastWord(birthdayData.letterTitle)}</h2>
      </Reveal>

      <div className={`letter-scene stage-${stage}`}>
        <div className="collapse envelope-collapse">
          <div>
            <Reveal className="envelope-holder">
              <button
                className="envelope"
                onClick={() => open()}
                disabled={stage !== "closed"}
                aria-expanded={stage === "open"}
                aria-controls="letter-paper"
                aria-label="Open my birthday letter"
              >
                <span className="env-back" />
                <span className="env-paper" />
                <span className="env-pocket" />
                <span className="env-flap" />
                <span className="env-seal">
                  <Heart size={24} fill="currentColor" strokeWidth={0} />
                </span>
                <span className="env-to">for: me ♡</span>
                <span className="env-stamp">{birthdayData.dateShort}</span>
              </button>
              <p className="env-hint">tap the seal to open ♡</p>
            </Reveal>
          </div>
        </div>

        <div className="collapse letter-collapse">
          <div>
            <div className="letter-pad">
              <article id="letter-paper" className="letter-paper">
                <span className="letter-tape letter-tape-l" aria-hidden="true" />
                <span className="letter-tape letter-tape-r" aria-hidden="true" />

                <p className="letter-greeting ink" style={{ "--i": 0 }}>
                  {birthdayData.letterGreeting}
                </p>

                {paragraphs.map((line, index) => (
                  <p
                    key={line}
                    className={`lp ink ${index === 0 ? "lp-lead" : ""}`}
                    style={{ "--i": index + 1 }}
                  >
                    {line}
                  </p>
                ))}

                {affirmations.length > 0 && (
                  <div
                    className="letter-affirm ink"
                    style={{ "--i": paragraphs.length + 1 }}
                  >
                    {affirmations.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                )}

                <p
                  className="letter-sign ink"
                  style={{ "--i": paragraphs.length + 2 }}
                >
                  <small>with love, from me</small>
                  {birthdayData.letterSignOff}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
