import { useEffect, useState } from "react";
import birthdayData from "../data/birthdayData.js";
import { useInView } from "../utils/useInView.js";

const MONTH = Number(birthdayData.month);
const DAY = Number(birthdayData.day);

function getCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, MONTH - 1, DAY);
  const end = new Date(year, MONTH - 1, DAY + 1);

  if (now >= start && now < end) return { today: true };

  const target = now >= end ? new Date(year + 1, MONTH - 1, DAY) : start;
  const diff = target - now;
  return {
    today: false,
    units: [
      ["days", Math.floor(diff / 86400000)],
      ["hours", Math.floor(diff / 3600000) % 24],
      ["minutes", Math.floor(diff / 60000) % 60],
      ["seconds", Math.floor(diff / 1000) % 60],
    ],
  };
}

export default function BirthdayDate() {
  const [ref, visible] = useInView(0.2);
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    const id = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const weekday = new Date(
    Number(birthdayData.year),
    MONTH - 1,
    DAY
  ).toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="date-band">
      <section
        ref={ref}
        className={`section date-section ${visible ? "is-visible" : ""}`}
      >
        <div className="date-layout">
          <div className="calendar">
            <div className="cal-rings" aria-hidden="true">
              <span />
              <span />
            </div>
            <div className="cal-head">
              <strong>{birthdayData.monthName}</strong>
              {birthdayData.year}
            </div>
            <div className="cal-body">
              <span className="cal-day">
                {birthdayData.day}
                <svg className="cal-circle" viewBox="0 0 200 140" aria-hidden="true">
                  <path d="M104,16 C40,10 8,44 14,78 C20,116 72,132 118,126 C170,118 196,88 188,56 C180,22 132,8 88,14 C70,17 56,22 46,30" />
                </svg>
              </span>
              <span className="cal-weekday">{weekday}</span>
              <span className="cal-note">my special day ♡</span>
            </div>
          </div>

          <div className="date-copy">
            <p className="eyebrow">
              {countdown.today ? "it's finally here" : "counting down to"}
            </p>
            <h2>{birthdayData.dateFull}</h2>
            <p className="sub">A day worth remembering ♡</p>
            <p className="date-korean">{birthdayData.koreanDate}</p>

            {countdown.today ? (
              <p className="today-banner">It's today — happy birthday, me!</p>
            ) : (
              <div className="countdown" role="timer" aria-live="off">
                {countdown.units.map(([label, value]) => (
                  <div key={label} className="cd-unit">
                    <span className="cd-num">
                      {String(value).padStart(2, "0")}
                    </span>
                    <span className="cd-label">{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
