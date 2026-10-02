import Sparkle from "./Sparkle.jsx";

/* Just a few quiet accents — enough atmosphere, not a crowd. */
const DECORATIONS = [
  { type: "sparkle", x: "6%", y: "22%", size: 12, delay: 0 },
  { type: "heart", x: "94%", y: "18%", size: 12, delay: 1.4 },
  { type: "sparkle", x: "92%", y: "72%", size: 10, delay: 2.2 },
  { type: "dot", x: "5%", y: "78%", size: 5, delay: 0.8 },
];

function Heart({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.5s-7.3-4.5-9.3-8.9C1.3 8.3 3.3 4.5 6.8 4.5c2 0 3.4 1.1 4.2 2.4.8-1.3 2.2-2.4 4.2-2.4 3.5 0 5.5 3.8 4.1 7.1-2 4.4-7.3 8.9-7.3 8.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function FloatingDecorations() {
  return (
    <div className="float-layer" aria-hidden="true">
      {DECORATIONS.map((item, index) => (
        <span
          key={index}
          className={`page-float page-float-${item.type}`}
          style={{
            left: item.x,
            top: item.y,
            "--size": `${item.size}px`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.type === "sparkle" && <Sparkle />}
          {item.type === "heart" && <Heart size={item.size} />}
        </span>
      ))}
    </div>
  );
}
