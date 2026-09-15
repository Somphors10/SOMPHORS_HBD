import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";

export default function PhotoGallery() {
  const [ref, visible] = useInView(0.12);

  return (
    <section id="memories" className="section memories-section">
      <div className="section-heading">
        <h2>Little Moments of Me 📷</h2>
        <p>Memories that made me who I am ♡</p>
      </div>

      <div
        ref={ref}
        className={`polaroid-gallery ${visible ? "is-visible" : ""}`}
      >
        {birthdayData.photos.map((photo, index) => (
          <figure key={photo.image} className={`polaroid polaroid-${index + 1}`}>
            <span className="tape" />
            <span className="sticker" aria-hidden="true">
              {["🪻", "♡", "✦", "☁️", "🎀"][index]}
            </span>
            <img src={photo.image} alt={photo.caption} />
            <figcaption className="handwriting">{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
