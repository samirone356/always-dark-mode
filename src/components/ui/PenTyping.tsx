import { useEffect, useRef, useState } from "react";

type PenTypingProps = {
  lines: string[];
  className?: string;
  /** ms per character */
  speed?: number;
};

/**
 * Types the given lines out character-by-character when scrolled into view,
 * then draws a hand-written style underline beneath the last line.
 */
export function PenTyping({ lines, className = "", speed = 55 }: PenTypingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  const full = lines.join("\n");
  const done = started && count >= full.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      setCount(full.length);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [full.length]);

  useEffect(() => {
    if (!started || count >= full.length) return;
    const t = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(t);
  }, [started, count, full.length, speed]);

  const typed = full.slice(0, count).split("\n");

  return (
    <h2 ref={ref} className={`relative ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          <span>{typed[i] ?? ""}</span>
          {!done && typed.length - 1 === i && (
            <span className="ms-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-primary animate-pulse align-middle" />
          )}
          {/* keeps layout stable while typing */}
          <span aria-hidden className="invisible block h-0 overflow-hidden">
            {line}
          </span>
        </span>
      ))}

      {/* Pen-drawn underline */}
      <svg
        aria-hidden
        viewBox="0 0 300 12"
        preserveAspectRatio="none"
        className="mt-1 block h-3 w-[85%] text-primary"
      >
        <path
          d="M2 8C60 2 120 10 180 5C220 2 260 7 298 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDasharray: 320,
            strokeDashoffset: done ? 0 : 320,
            transition: "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <span className="sr-only">{full}</span>
    </h2>
  );
}
