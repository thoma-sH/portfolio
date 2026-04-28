import { useRef, useState } from 'react';

const PHASE_BURST = {
  morning:   { count: 16, spreadX: 260, spreadY: 260, offsetY: -20, lifetimeMs: 1300 },
  afternoon: { count: 14, spreadX: 320, spreadY: 320, offsetY: -10, lifetimeMs: 1050 },
  evening:   { count: 16, spreadX: 220, spreadY: 110, offsetY: -10, lifetimeMs: 1850 },
  late:      { count: 22, spreadX: 110, spreadY: 30,  offsetY: 0,   lifetimeMs: 2900 },
};

export default function Nav({ greeting, time, phase, onLinkEnter, onLinkLeave, onTrigger }) {
  const [particles, setParticles] = useState([]);
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef(null);

  const onNavClick = (e) => {
    if (e.target.closest('a, button')) return;

    clickCountRef.current += 1;
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 1500);

    if (clickCountRef.current >= 2) {
      clickCountRef.current = 0;
      const nextPhase = onTrigger?.() || phase || 'morning';
      const cfg = PHASE_BURST[nextPhase] || PHASE_BURST.morning;
      const burst = Array.from({ length: cfg.count }).map((_, i) => ({
        id: Date.now() + i,
        dx: (Math.random() - 0.5) * cfg.spreadX,
        dy: (Math.random() - 0.5) * cfg.spreadY + cfg.offsetY,
        delay: i * 0.018,
        phase: nextPhase,
      }));
      setParticles((prev) => [...prev, ...burst]);
      setTimeout(() => {
        setParticles((prev) => prev.slice(burst.length));
      }, cfg.lifetimeMs);
    }
  };

  return (
    <nav
      onClick={onNavClick}
      className="px-5 md:px-12 py-5 flex justify-between items-center reveal d1 relative z-10"
    >
      <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] opacity-60 flex items-center gap-2">
        <span className="dot-wrapper">
          <span className="dot pulse" />
          {particles.map((p) => (
            <span
              key={p.id}
              className={`particle ${p.phase}`}
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
