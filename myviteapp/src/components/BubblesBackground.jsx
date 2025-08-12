import React, { useMemo } from "react";

export default function BubblesBackground({
  count = 24,
  colors = ["#00B4EB ", "#50B748", "#0056A2"],
  minSize = 20,
  maxSize = 140,
}) {
  const bubbles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const left = Math.random() * 100;
      const top = Math.random() * 120 - 10;
      const duration = (Math.random() * 20 + 8).toFixed(2) + "s";
      const delay = (Math.random() * -20).toFixed(2) + "s";
      const opacity = (Math.random() * 0.5 + 0.25).toFixed(2);
      const bg = colors[Math.floor(Math.random() * colors.length)];
      const blur = Math.random() * 8;
      arr.push({ size, left, top, duration, delay, opacity, bg, blur });
    }
    return arr;
  }, [count, colors, minSize, maxSize]);

  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0) scale(1); }
          25% { transform: translateY(-8vh) translateX(4px) scale(1.02); }
          50% { transform: translateY(-16vh) translateX(-6px) scale(1.01); }
          75% { transform: translateY(-24vh) translateX(4px) scale(0.99); }
          100% { transform: translateY(-32vh) translateX(0) scale(1); }
        }
        .bubble {
          position: absolute;
          border-radius: 9999px;
          mix-blend-mode: screen;
          will-change: transform, opacity;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06) inset;
          backdrop-filter: blur(1px);
        }
        .bubble::after {
          content: "";
          position: absolute;
          left: 30%;
          top: 20%;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          transform: rotate(-18deg);
          filter: blur(2px);
        }
      `}</style>

      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            top: `${b.top}%`,
            background: b.bg,
            opacity: b.opacity,
            filter: `blur(${b.blur}px)`,
            animation: `floatUp ${b.duration} linear infinite`,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
