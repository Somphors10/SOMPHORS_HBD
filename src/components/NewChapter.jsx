import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";

export default function NewChapter() {
  const [ref, visible] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={`section chapter-section ${visible ? "is-visible" : ""}`}
    >
      <div className="chapter-sky" aria-hidden="true">
        <span className="chapter-moon" />
        <span className="chapter-star chapter-star-1">✦</span>
        <span className="chapter-star chapter-star-2">✧</span>
        <span className="chapter-star chapter-star-3">✦</span>
        <span className="chapter-star chapter-star-4">˚₊‧</span>
        <span className="chapter-star chapter-star-5">✨</span>
        <span className="chapter-cloud chapter-cloud-1" />
        <span className="chapter-cloud chapter-cloud-2" />
      </div>

      <p className="chapter-kicker">the year ahead</p>
      <h2>Chapter {birthdayData.dateShort}</h2>
      <p className="chapter-line">A new chapter begins.</p>

      <ul className="chapter-goals">
        {birthdayData.chapterGoals.map((goal) => (
          <li key={goal}>♡ {goal}</li>
        ))}
      </ul>

      <p className="chapter-note">
        I don't know exactly what the future holds, but I'm excited to find out.
      </p>
    </section>
  );
}
