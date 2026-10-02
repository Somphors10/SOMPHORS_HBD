import birthdayData from "../data/birthdayData.js";
import Sparkle from "./Sparkle.jsx";

const COPIES = 6;

function Track({ words }) {
  return (
    <div className="ribbon-track">
      {Array.from({ length: COPIES }, (_, copy) =>
        words.map((word, index) => (
          <span key={`${copy}-${index}`}>
            {word}
            <Sparkle className="ribbon-spark" />
          </span>
        ))
      )}
    </div>
  );
}

export default function Ribbons() {
  const themes = birthdayData.theme.split("•").map((item) => item.trim());

  return (
    <div className="ribbons" aria-hidden="true">
      <div className="ribbon ribbon-b">
        <Track
          words={[
            birthdayData.koreanHero,
            birthdayData.dateShort,
            birthdayData.koreanDate,
            birthdayData.dateShort,
          ]}
        />
      </div>
      <div className="ribbon ribbon-a">
        <Track words={["Happy Birthday to Me", ...themes]} />
      </div>
    </div>
  );
}
