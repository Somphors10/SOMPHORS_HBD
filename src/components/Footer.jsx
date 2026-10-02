import { ArrowUp } from "lucide-react";
import birthdayData from "../data/birthdayData.js";
import Sparkle from "./Sparkle.jsx";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-script">Happy Birthday to Me</p>
      <p className="footer-date">{birthdayData.dateShort} — My Special Day</p>
      <p className="footer-korean">{birthdayData.koreanFooter}</p>

      <div className="footer-rule" aria-hidden="true">
        <Sparkle className="footer-spark" />
      </div>

      <p className="footer-love">Made with love, for myself ♡</p>
      <a href="#home" className="to-top">
        <ArrowUp size={16} strokeWidth={1.6} /> back to the beginning
      </a>
    </footer>
  );
}
