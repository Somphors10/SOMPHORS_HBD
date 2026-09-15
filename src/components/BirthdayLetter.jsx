import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";

export default function BirthdayLetter() {
  const [ref, visible] = useInView();

  return (
    <section id="letter" className="section letter-section">
      <div className="section-heading">
        <p className="eyebrow">a note, just for me</p>
        <h2>{birthdayData.letterTitle}</h2>
      </div>

      <article
        ref={ref}
        className={`letter-card ${visible ? "is-visible" : ""}`}
      >
        <span className="wax-seal" aria-hidden="true">
          ♡
        </span>
        <p className="letter-greeting">{birthdayData.letterGreeting}</p>
        {birthdayData.letterBody.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="letter-sign">{birthdayData.letterSignOff}</p>
      </article>
    </section>
  );
}
