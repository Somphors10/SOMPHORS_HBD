import { BookOpen, Coffee, Heart, Sparkles, Sprout } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";
import Reveal from "./Reveal.jsx";

const GOAL_ICONS = [BookOpen, Sprout, Sparkles, Coffee];
const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

export default function NewChapter() {
  const [ref, visible] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={`chapter-section ${visible ? "is-visible" : ""}`}
    >
      <div className="dawn" aria-hidden="true">
        <span className="sun" />
        <span className="dawn-cloud dawn-cloud-1" />
        <span className="dawn-cloud dawn-cloud-2" />
        <span className="dawn-cloud dawn-cloud-3" />
      </div>

      <Reveal className="chapter-head">
        <p className="eyebrow">the year ahead</p>
        <h2>
          Chapter <em>{birthdayData.dateShort}</em>
        </h2>
        <p className="chapter-line">A new chapter begins.</p>
      </Reveal>

      <ul className="goals">
        {birthdayData.chapterGoals.map((goal, index) => {
          const Icon = GOAL_ICONS[index] ?? Heart;
          return (
            <Reveal as="li" key={goal} className="goal" delay={index * 120}>
              <span className="goal-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <span className="goal-num">{NUMERALS[index] ?? index + 1}</span>
              <span className="goal-word">{goal}</span>
            </Reveal>
          );
        })}
      </ul>

      <Reveal as="p" className="chapter-note" delay={300}>
        I don't know exactly what the future holds, but I'm excited to find out.
      </Reveal>
    </section>
  );
}
