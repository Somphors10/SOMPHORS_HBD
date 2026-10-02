import birthdayData from "../data/birthdayData.js";
import Reveal from "./Reveal.jsx";
import Sparkle from "./Sparkle.jsx";

export default function CafeMenu() {
  return (
    <section id="cafe" className="section cafe-section">
      <Reveal className="menu-sheet">
        <header className="menu-head">
          <p className="eyebrow">today's specials</p>
          <h2>My Birthday Café</h2>
          <p className="menu-est">
            <Sparkle className="menu-spark" /> est. {birthdayData.dateShort} ·
            served with love <Sparkle className="menu-spark" />
          </p>
        </header>

        <div className="menu-items">
          {birthdayData.cafeItems.map((item, index) => (
            <Reveal
              as="article"
              key={item.name}
              className="menu-item"
              delay={index * 140}
            >
              <div className="menu-arch">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <p className="menu-no">
                No. {String(index + 1).padStart(2, "0")}
                <span className="menu-kr">{item.korean}</span>
              </p>
              <h3>{item.name}</h3>
              <p className="menu-cat">{item.category}</p>
              <p className="menu-quote">“{item.quote}”</p>
              <p className="menu-price">
                <span>{item.note} ♡</span>
              </p>
            </Reveal>
          ))}
        </div>

        <p className="menu-foot">A little café made just for me ♡</p>
      </Reveal>
    </section>
  );
}
