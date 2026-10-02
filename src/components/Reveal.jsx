import { useInView } from "../utils/useInView.js";

export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useInView(0.12);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
