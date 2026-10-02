import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import Reveal from "./Reveal.jsx";

const TILTS = [-4, 3, -2.5, 4.5, -3, 2];

// The string is a quadratic curve (0,10) → control (500,90) → (1000,10)
// drawn in a 100px-tall SVG, so we can find where each photo hangs on it.
function sagAt(t) {
  return (1 - t) ** 2 * 10 + 2 * t * (1 - t) * 90 + t ** 2 * 10;
}

export default function PhotoGallery() {
  const photos = birthdayData.photos;
  const count = photos.length;
  const [active, setActive] = useState(null);
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i) => (i + 1) % count);
      if (event.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, count]);

  function step(event, direction) {
    event.stopPropagation();
    setActive((i) => (i + direction + count) % count);
  }

  return (
    <section id="memories" className="section memories-section">
      <Reveal className="heading">
        <p className="eyebrow">polaroids on a string</p>
        <h2>
          Little Moments of <em>Me</em>
        </h2>
        <p className="sub">Memories that made me who I am ♡</p>
      </Reveal>

      <Reveal className="line-scroller" delay={150}>
        <div className="line-track">
          <svg
            className="line-string"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,10 Q500,90 1000,10" />
          </svg>
          <span className="line-nail line-nail-l" aria-hidden="true" />
          <span className="line-nail line-nail-r" aria-hidden="true" />

          {photos.map((photo, index) => {
            const t = (index + 0.5) / count;
            return (
              <button
                key={photo.image}
                className="hang"
                style={{
                  left: `${t * 100}%`,
                  top: `${sagAt(t)}px`,
                  "--tilt": `${TILTS[index % TILTS.length]}deg`,
                  "--sway-delay": `${index * -1.3}s`,
                }}
                onClick={() => setActive(index)}
                aria-label={`View photo: ${photo.caption}`}
              >
                <span className="hang-inner">
                  <span className="clip" aria-hidden="true" />
                  <figure className="polaroid">
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      loading="lazy"
                      style={{ objectPosition: photo.position }}
                    />
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>
      <p className="gallery-hint">
        <span className="hint-desktop">tap a photo to see it bigger ♡</span>
        <span className="hint-mobile">swipe to see more · tap to open ♡</span>
      </p>

      {isOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photos[active].caption}
          onClick={() => setActive(null)}
        >
          <button
            className="lb-btn lb-close"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <button
            className="lb-btn lb-prev"
            onClick={(event) => step(event, -1)}
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>
          <figure
            key={active}
            className="lb-figure"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={photos[active].image} alt={photos[active].caption} />
            <figcaption>{photos[active].caption}</figcaption>
          </figure>
          <button
            className="lb-btn lb-next"
            onClick={(event) => step(event, 1)}
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}
