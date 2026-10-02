import birthdayData from "../data/birthdayData.js";

const COPIES = 5;

export default function Ribbons() {
  const themes = birthdayData.theme.split("•").map((item) => item.trim());
  const words = [
    "Happy Birthday to Me",
    birthdayData.dateShort,
    ...themes,
    birthdayData.koreanHero,
  ];

  return (
    <div className="ribbons" aria-hidden="true">
      <div className="ribbon ribbon-a">
        <div className="ribbon-track">
          {Array.from({ length: COPIES }, (_, copy) =>
            words.map((word, index) => (
              <span key={`${copy}-${index}`}>{word}</span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
