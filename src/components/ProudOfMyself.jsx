import { Heart, Laptop, Mountain, Sparkles, Sprout } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import Reveal from "./Reveal.jsx";

const ICONS = {
  sprout: Sprout,
  laptop: Laptop,
  mountain: Mountain,
  sparkles: Sparkles,
};

export default function ProudOfMyself() {
  return (
    <section id="growth" className="section proud-section">
      <div className="proud-layout">
        <Reveal className="proud-intro">
          <p className="eyebrow">this year</p>
          <h2>
            Things I'm <em>Proud</em> Of
          </h2>
          <p>Little victories that deserve to be remembered.</p>
          <span className="proud-script" aria-hidden="true">
            well done, me
          </span>
        </Reveal>

        <ol className="proud-list">
          {birthdayData.proudOf.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Heart;
            return (
              <Reveal
                as="li"
                key={item.title}
                className="proud-item"
                delay={index * 120}
              >
                <span className="proud-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="proud-icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>“{item.text}”</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
