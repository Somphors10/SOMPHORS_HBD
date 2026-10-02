import { useEffect, useState } from "react";
import birthdayData from "../data/birthdayData.js";

const LINKS = [
  ["#letter", "Letter"],
  ["#memories", "Moments"],
  ["#cafe", "Café"],
  ["#surprise", "Gift"],
  ["#wish", "Wish"],
];

export default function Nav() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <header className={`nav ${progress > 0.01 ? "is-scrolled" : ""}`}>
        <a href="#home" className="nav-brand">
          <span className="brand-mark">{birthdayData.dateShort}</span>
          <span className="brand-name">birthday café</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
