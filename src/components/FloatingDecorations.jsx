const DECORATIONS = [
  { symbol: "♡", x: "8%", y: "18%", delay: "0s" },
  { symbol: "✦", x: "92%", y: "12%", delay: "1.2s" },
  { symbol: "˚₊‧", x: "86%", y: "42%", delay: "2s" },
  { symbol: "🪻", x: "6%", y: "58%", delay: "0.6s" },
  { symbol: "🎀", x: "94%", y: "72%", delay: "1.8s" },
  { symbol: "✨", x: "12%", y: "84%", delay: "2.4s" },
  { symbol: "☁️", x: "48%", y: "8%", delay: "0.9s" },
  { symbol: "♡", x: "72%", y: "88%", delay: "1.5s" },
  { symbol: "🌙", x: "28%", y: "94%", delay: "2.8s" },
  { symbol: "✦", x: "3%", y: "36%", delay: "3.1s" },
];

export default function FloatingDecorations() {
  return (
    <div className="float-layer" aria-hidden="true">
      {DECORATIONS.map((item, index) => (
        <span
          key={`${item.symbol}-${index}`}
          className="page-float"
          style={{
            left: item.x,
            top: item.y,
            animationDelay: item.delay,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
