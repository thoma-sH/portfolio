import { useRef, useState } from 'react';

export default function Nav({ greeting, time, onLinkEnter, onLinkLeave }) {
  const [particles, setParticles] = useState([]);
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef(null);

  const onDotClick = () => {
    clickCountRef.current += 1;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 1500);

    if (clickCountRef.current >= 4) {
      clickCountRef.current = 0;
      const burst = Array.from({ length: 14 }).map((_, i) => ({
        id: Date.now() + i,
        dx: (Math.random() - 0.5) * 240,
        dy: (Math.random() - 0.5) * 240 - 20,
        delay: i * 0.018,
      }));
      setParticles((prev) => [...prev, ...burst]);
      setTimeout(() => {
        setParticles((prev) => prev.slice(burst.length));
      }, 1300);
    }
  };

  return (
    <nav className="px-5 md:px-12 py-5 flex justify-between items-center reveal d1 relative z-10">
      <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] opacity-60 flex items-center gap-2">
        <span
          className="dot-wrapper"
          onClick={onDotClick}
          onMouseEnter={onLinkEnter}
          onMouseLeave={onLinkLeave}
          role="button"
          aria-label="Status indicator"
        >
          <span className="dot pulse" />
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </span>
        <span className="hidden sm:inline">{greeting} / </span>FAYETTEVILLE / <span className="text-[#C4FF4D] opacity-90 tabular-nums">{time}</span>
      </span>
      <a
        href="https://github.com/thoma-sH"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={onLinkEnter}
        onMouseLeave={onLinkLeave}
        className="font-mono text-[10px] md:text-xs tracking-[0.2em] opacity-60 hover:opacity-100 hover:text-[#C4FF4D] transition"
      >
        GITHUB ↗
      </a>
    </nav>
  );
}
