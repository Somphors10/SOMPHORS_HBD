import birthdayData from "../data/birthdayData.js";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-love">Made with love, for myself ♡</p>
      <p>
        {birthdayData.dateShort} — My Special Day 🎂
      </p>
      <p className="korean-line">{birthdayData.koreanFooter}</p>
      <p className="script-line">Happy Birthday to Me ✨</p>
    </footer>
  );
}
