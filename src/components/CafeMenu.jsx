import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";

export default function CafeMenu() {
  const [ref, visible] = useInView(0.12);

  return (
    <section id="cafe" className="section cafe-section">
      <div className="section-heading">
        <p className="eyebrow">today's specials</p>
        <h2>My Birthday Café ☕</h2>
        <p>A little café made just for me ♡</p>
      </div>

      <div ref={ref} className={`menu-grid ${visible ? "is-visible" : ""}`}>
        {birthdayData.cafeItems.map((item) => (
          <article key={item.name} className="menu-card">
            <div className="menu-photo">
              <img src={item.image} alt={item.name} />
            </div>
            <p className="menu-korean">{item.korean}</p>
            <p className="menu-category">
              {item.emoji} {item.category}
            </p>
            <h3>{item.name}</h3>
            <p className="menu-quote">“{item.quote}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}
