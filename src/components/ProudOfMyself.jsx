import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";

export default function ProudOfMyself() {
  const [ref, visible] = useInView(0.15);

  return (
    <section id="growth" className="section growth-section">
      <div className="section-heading">
        <h2>Things I'm Proud Of ♡</h2>
      </div>

      <div ref={ref} className={`proud-grid ${visible ? "is-visible" : ""}`}>
        {birthdayData.proudOf.map((item, index) => (
          <article
            key={item.title}
            className="proud-card"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            <span className="proud-emoji">{item.emoji}</span>
            <h3>{item.title}</h3>
            <p>“{item.text}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}
