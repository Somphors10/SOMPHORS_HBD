import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";

export default function BirthdayDate() {
  const [ref, visible] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={`section date-section ${visible ? "is-visible" : ""}`}
    >
      <div className="calendar-card">
        <p className="calendar-month">{birthdayData.monthName}</p>
        <div className="calendar-stack">
          <span>{birthdayData.day}</span>
          <span>{birthdayData.month}</span>
          <span>{birthdayData.year}</span>
        </div>
        <h2>{birthdayData.dateFull}</h2>
        <p>A day worth remembering ♡</p>
        <p className="korean-line">{birthdayData.koreanDate}</p>
      </div>
    </section>
  );
}
