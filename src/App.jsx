import React, { useEffect, useState, useRef } from 'react';

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorLabel, setCursorLabel] = useState(null);
  const [time, setTime] = useState('—:—:—');
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [hamiltonText, setHamiltonText] = useState('Hamilton.');
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const heroRef = useRef(null);
  const scrambleRef = useRef(null);
  const toastRef = useRef(null);

  // Mouse tracking + hero parallax tilt
  useEffect(() => {
    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        setHeroTilt({ x: dy * 5, y: dx * -7 });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Live Fayetteville time
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          timeZone: 'America/Chicago', hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const top = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (top / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveals + active section
  useEffect(() => {
    const reveals = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) => reveals.observe(el));

    const sectionsObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.45 }
    );
    ['intro', 'work', 'profile', 'about', 'thanks'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionsObs.observe(el);
    });

    return () => { reveals.disconnect(); sectionsObs.disconnect(); };
  }, []);

  const onLinkEnter = () => setCursorActive(true);
  const onLinkLeave = () => setCursorActive(false);

  const onProjectEnter = () => { setCursorActive(true); setCursorLabel('VIEW REPO'); };
  const onProjectLeave = () => { setCursorActive(false); setCursorLabel(null); };

  // First-load curtain
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setCurtainOpen(true); return; }
    const t = setTimeout(() => setCurtainOpen(true), 800);
    return () => clearTimeout(t);
  }, []);

  const copyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('t.hamilton0416@gmail.com');
      setToast(true);
      if (toastRef.current) clearTimeout(toastRef.current);
      toastRef.current = setTimeout(() => setToast(false), 1800);
    } catch {}
  };

  // Name scramble effect
  const scrambleHamilton = () => {
    if (scrambleRef.current) clearInterval(scrambleRef.current);
    const target = 'Hamilton.';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz░▒▓';
    let frame = 0;
    const total = 18;
    scrambleRef.current = setInterval(() => {
      const progress = frame / total;
      const next = target.split('').map((c, i) => {
        if (c === '.') return c;
        if (i / target.length < progress) return c;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      setHamiltonText(next);
      frame++;
      if (frame > total) {
        setHamiltonText(target);
        clearInterval(scrambleRef.current);
      }
    }, 35);
  };

  // Time dependent greeting
  const greeting = (() => {
    const h = parseInt(time.split(':')[0]);
    if (isNaN(h)) return 'HELLO';
    if (h >= 5 && h < 12) return 'MORNING';
    if (h >= 12 && h < 17) return 'AFTERNOON';
    if (h >= 17 && h < 21) return 'EVENING';
    return 'LATE';
  })();

  const sections = [
    { id: 'intro', label: 'INTRO' },
    { id: 'work', label: 'WORK' },
    { id: 'profile', label: 'PROFILE' },
    { id: 'about', label: 'ABOUT' },
    { id: 'thanks', label: 'THANKS' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=JetBrains+Mono:wght@400;500&display=swap');

        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Fraunces', serif; font-variation-settings: "SOFT" 50, "WONK" 1; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        @media (hover: hover) and (pointer: fine) {
          html, body, a, button, span, li { cursor: none !important; }
        }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .reveal { animation: fadeUp 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) forwards; opacity: 0; }
        .d1 { animation-delay: 0.1s; } .d2 { animation-delay: 0.25s; }
        .d3 { animation-delay: 0.4s; } .d4 { animation-delay: 0.55s; }

        .scroll-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s cubic-bezier(0.2, 0.7, 0.2, 1), transform 1s cubic-bezier(0.2, 0.7, 0.2, 1); }
        .scroll-reveal.in-view { opacity: 1; transform: translateY(0); }

        .grain::before { content: ''; position: fixed; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 3px 3px; pointer-events: none; mix-blend-mode: overlay; z-index: 2; }

        .project-row { position: relative; padding-bottom: 1.25rem; }
        .project-row::after { content: ''; position: absolute; bottom: 0; left: 0; height: 1px; width: 0; background: #C4FF4D; transition: width 0.7s cubic-bezier(0.2, 0.7, 0.2, 1); }
        .project-row:hover::after { width: 100%; }
        .project-row .num, .project-row h3, .project-row .meta { transition: color 0.4s, transform 0.4s, font-style 0.4s, opacity 0.4s; }
        .project-row:hover .num { color: #C4FF4D; opacity: 1; }
        .project-row:hover h3 { color: #C4FF4D; font-style: italic; }
        .project-row:hover .meta { transform: translateX(-6px); }

        .repo-hint { opacity: 0; transform: translateY(-6px); transition: opacity 0.55s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1); }
        .project-row:hover .repo-hint { opacity: 0.75; transform: translateY(0); }
        .repo-hint .dot { display: inline-block; width: 5px; height: 5px; border-radius: 9999px; background: #C4FF4D; margin-right: 8px; transform: translateY(-1px); }

        .curtain { position: fixed; inset: 0; z-index: 200; background: #0E0D0B; display: flex; align-items: center; justify-content: center; transform: translateY(0); transition: transform 1s cubic-bezier(0.76, 0, 0.24, 1) 0.35s; }
        .curtain.open { transform: translateY(-101%); pointer-events: none; }
        .curtain-text { font-family: 'Fraunces', serif; font-variation-settings: "SOFT" 50, "WONK" 1; font-weight: 300; font-style: italic; color: #F0EBDD; font-size: clamp(48px, 12vw, 140px); letter-spacing: -0.04em; line-height: 1; opacity: 1; transition: opacity 0.45s ease-out; }
        .curtain.open .curtain-text { opacity: 0; }
        .curtain-text .accent { color: #C4FF4D; }

        .toast { position: fixed; bottom: 32px; left: 50%; transform: translate(-50%, 12px); z-index: 150; padding: 10px 18px; background: #C4FF4D; color: #0E0D0B; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; border-radius: 9999px; opacity: 0; pointer-events: none; transition: opacity 0.3s, transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1); }
        .toast.show { opacity: 1; transform: translate(-50%, 0); }

        .cursor-pill { padding: 5px 11px; border-radius: 9999px; background: #C4FF4D; color: #0E0D0B; font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500; letter-spacing: 0.16em; white-space: nowrap; transform: translate(-50%, -50%); display: inline-flex; align-items: center; gap: 5px; animation: pillIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 4px 18px -4px rgba(196,255,77,0.55); }
        @keyframes pillIn { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.55) rotate(-8deg); } 100% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0); } }
        .cursor-pill .arrow { display: inline-block; animation: arrowNudge 1.3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes arrowNudge { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(2px, -2px); } }

        .wave > span { display: inline-block; transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .wave:hover > span { transform: translateY(-14px); }
        .wave:hover > span:nth-child(1)  { transition-delay: 0.00s; }
        .wave:hover > span:nth-child(2)  { transition-delay: 0.03s; }
        .wave:hover > span:nth-child(3)  { transition-delay: 0.06s; }
        .wave:hover > span:nth-child(4)  { transition-delay: 0.09s; }
        .wave:hover > span:nth-child(5)  { transition-delay: 0.12s; }
        .wave:hover > span:nth-child(6)  { transition-delay: 0.15s; }
        .wave:hover > span:nth-child(7)  { transition-delay: 0.18s; }
        .wave:hover > span:nth-child(8)  { transition-delay: 0.21s; }
        .wave:hover > span:nth-child(9)  { transition-delay: 0.24s; }
        .wave:hover > span:nth-child(10) { transition-delay: 0.27s; }
        .wave:hover > span:nth-child(11) { transition-delay: 0.30s; }
        .wave:hover > span:nth-child(12) { transition-delay: 0.33s; }
        .wave:hover > span:nth-child(13) { transition-delay: 0.36s; }
        .wave:hover > span:nth-child(14) { transition-delay: 0.39s; }

        @keyframes pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
        .pulse { animation: pulse 2s ease-in-out infinite; }

        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 80s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }

        /* respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
          .scroll-reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* first-load curtain */}
      <div className={`curtain ${curtainOpen ? 'open' : ''}`} aria-hidden="true">
        <span className="curtain-text">Thomas <span className="accent">Hamilton.</span></span>
      </div>

      {/* copy toast */}
      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
        copied ✓
      </div>

      <div className="min-h-screen bg-[#0E0D0B] text-[#F0EBDD] grain relative overflow-x-hidden">
        {/* scroll progress bar */}
        <div className="fixed top-0 left-0 right-0 h-px bg-white/5 z-[80]">
          <div className="h-full bg-[#C4FF4D] transition-[width] duration-100" style={{ width: `${scrollProgress}%` }} />
        </div>

        {/* custom cursor */}
        <div className="fixed top-0 left-0 pointer-events-none z-[300] hidden md:block" style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}>
          {cursorLabel ? (
            <div className="cursor-pill">{cursorLabel} <span className="arrow">↗</span></div>
          ) : (
            <div
              className="rounded-full bg-[#C4FF4D] -translate-x-1/2 -translate-y-1/2"
              style={{
                width: cursorActive ? 44 : 10,
                height: cursorActive ? 44 : 10,
                opacity: cursorActive ? 0.35 : 1,
                transition: 'width 0.35s cubic-bezier(0.2,0.7,0.2,1), height 0.35s cubic-bezier(0.2,0.7,0.2,1), opacity 0.35s',
              }}
            />
          )}
        </div>

        {/* mouse-tracking ambient glow */}
        <div
          className="fixed pointer-events-none hidden md:block z-0"
          style={{
            left: cursorPos.x, top: cursorPos.y,
            width: 600, height: 600,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(196,255,77,0.07) 0%, transparent 60%)',
            transition: 'left 0.45s ease-out, top 0.45s ease-out',
          }}
        />

        {/* sticky section indicator (right rail) */}
        <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4 items-end">
          {sections.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
                className="group flex items-center gap-3 justify-end"
              >
                <span className={`font-mono text-[9px] tracking-[0.25em] transition-opacity duration-300 ${isActive ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'}`}>
                  {s.label}
                </span>
                <span className={`block h-px transition-all duration-500 ${isActive ? 'w-10 bg-[#C4FF4D]' : 'w-3 bg-white/30 group-hover:w-6 group-hover:bg-white/60'}`} />
              </a>
            );
          })}
        </aside>

        {/* nav */}
        <nav className="px-5 md:px-12 py-5 flex justify-between items-center reveal d1 relative z-10">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] opacity-60 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4FF4D] pulse inline-block" />
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

        {/* hero */}
        <section id="intro" className="px-5 md:px-12 pt-10 md:pt-24 pb-20 md:pb-40 relative z-10">
          <div className="font-mono text-[10px] md:text-xs opacity-50 mb-6 reveal d1">Hello, I'm Thomas — CS student, University of Arkansas '27</div>
          <h1
            ref={heroRef}
            className="font-display text-[64px] md:text-[160px] leading-[0.88] tracking-[-0.04em] reveal d2"
            style={{
              transform: `perspective(1000px) rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
              transition: 'transform 0.4s ease-out',
              transformStyle: 'preserve-3d',
            }}
          >
            Thomas<br/>
            <span
              className="italic font-light text-[#C4FF4D] inline-block"
              onMouseEnter={() => { onLinkEnter(); scrambleHamilton(); }}
              onMouseLeave={onLinkLeave}
            >
              {hamiltonText}
            </span>
          </h1>
          <p className="mt-10 md:mt-14 max-w-xl text-lg md:text-2xl leading-relaxed opacity-90 reveal d3">
            I'm a Computer Science student at the University of Arkansas. I like building things; for class, for hackathons, or just to figure them out. A few are below.
          </p>
          <div className="mt-10 font-mono text-[10px] md:text-xs opacity-40 reveal d4">↓ scroll</div>
        </section>

        {/* work */}
        <section id="work" className="border-t border-white/10 px-5 md:px-12 py-16 md:py-24 relative z-10">
          <div className="font-mono text-[10px] md:text-xs opacity-50 mb-10 md:mb-16 flex justify-between scroll-reveal">
            <span>RECENT WORK</span>
            <span>A FEW PROJECTS</span>
          </div>

          <div className="space-y-10 md:space-y-14">
            <a href="https://github.com/thoma-sH/Lacuna" target="_blank" rel="noreferrer" className="grid md:grid-cols-12 gap-3 md:gap-6 project-row scroll-reveal no-underline text-inherit" onMouseEnter={onProjectEnter} onMouseLeave={onProjectLeave}>
              <div className="md:col-span-2 font-mono text-[10px] md:text-xs opacity-50 num">→ 01</div>
              <div className="md:col-span-7">
                <h3 className="font-display text-3xl md:text-6xl mb-3 md:mb-5">Lacuna</h3>
                <p className="opacity-80 leading-relaxed text-base md:text-xl max-w-xl">
                  A social media app I'm currently building. Still rough around the edges, still figuring it out.
                </p>
                <div className="repo-hint mt-4 font-mono text-[10px] md:text-xs">
                  <span className="dot" />github.com/thoma-sH/Lacuna ↗
                </div>
              </div>
              <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 md:text-right meta">
                SOCIAL <span className="text-[#C4FF4D]">●</span> IN PROGRESS
              </div>
            </a>

            <a href="https://github.com/thoma-sH/concert-companion" target="_blank" rel="noreferrer" className="grid md:grid-cols-12 gap-3 md:gap-6 project-row scroll-reveal no-underline text-inherit" onMouseEnter={onProjectEnter} onMouseLeave={onProjectLeave}>
              <div className="md:col-span-2 font-mono text-[10px] md:text-xs opacity-50 num">→ 02</div>
              <div className="md:col-span-7">
                <h3 className="font-display text-3xl md:text-6xl mb-3 md:mb-5">Concert Companion</h3>
                <p className="opacity-80 leading-relaxed text-base md:text-xl max-w-xl">
                  A 24-hour build from Hog Hacks 2026 — a companion app for live shows. We've kept iterating on it since.
                </p>
                <div className="repo-hint mt-4 font-mono text-[10px] md:text-xs">
                  <span className="dot" />github.com/thoma-sH/concert-companion ↗
                </div>
              </div>
              <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 md:text-right meta">HOG HACKS '26</div>
            </a>

            <a href="https://github.com/thoma-sH/javaminigame-Link_from_Paradigms" target="_blank" rel="noreferrer" className="grid md:grid-cols-12 gap-3 md:gap-6 project-row scroll-reveal no-underline text-inherit" onMouseEnter={onProjectEnter} onMouseLeave={onProjectLeave}>
              <div className="md:col-span-2 font-mono text-[10px] md:text-xs opacity-50 num">→ 03</div>
              <div className="md:col-span-7">
                <h3 className="font-display text-3xl md:text-6xl mb-3 md:mb-5">Java Mini-Game</h3>
                <p className="opacity-80 leading-relaxed text-base md:text-xl max-w-xl">
                  A Link-inspired adventure I built in Java for my Programming Paradigms class.
                </p>
                <div className="repo-hint mt-4 font-mono text-[10px] md:text-xs">
                  <span className="dot" />github.com/thoma-sH/javaminigame-Link_from_Paradigms ↗
                </div>
              </div>
              <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 md:text-right meta">
                COURSEWORK · JAVA ↗
              </div>
            </a>

            <a href="https://github.com/thoma-sH/photon-main" target="_blank" rel="noreferrer" className="grid md:grid-cols-12 gap-3 md:gap-6 project-row scroll-reveal no-underline text-inherit" onMouseEnter={onProjectEnter} onMouseLeave={onProjectLeave}>
              <div className="md:col-span-2 font-mono text-[10px] md:text-xs opacity-50 num">→ 04</div>
              <div className="md:col-span-7">
                <h3 className="font-display text-3xl md:text-6xl mb-3 md:mb-5">Photon</h3>
                <p className="opacity-80 leading-relaxed text-base md:text-xl max-w-xl">
                  A Python team project from my Software Engineering course — my first time contributing to a longer-running group codebase with Team 20.
                </p>
                <div className="repo-hint mt-4 font-mono text-[10px] md:text-xs">
                  <span className="dot" />github.com/thoma-sH/photon-main ↗
                </div>
              </div>
              <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 md:text-right meta">
                TEAM 20 · PYTHON ↗
              </div>
            </a>

            <div className="grid md:grid-cols-12 gap-3 md:gap-6 opacity-50 scroll-reveal">
              <div className="md:col-span-2 font-mono text-[10px] md:text-xs">→ 05</div>
              <div className="md:col-span-7">
                <h3 className="font-display text-3xl md:text-6xl italic font-light mb-3 md:mb-5">More, soon.</h3>
                <p className="leading-relaxed text-base md:text-lg max-w-xl">
                  More on the way as I keep exploring and learning. Thanks for checking back.
                </p>
              </div>
              <div className="md:col-span-3 font-mono text-[10px] md:text-xs md:text-right">
                COMING <span className="opacity-60 pulse inline-block">●</span>
              </div>
            </div>
          </div>
        </section>

        {/* ethos marquee */}
        <section className="border-t border-b border-white/10 py-6 md:py-8 overflow-hidden relative z-10" aria-hidden="true">
          <div className="marquee-track flex gap-8 md:gap-14 whitespace-nowrap font-display text-2xl md:text-4xl italic font-light opacity-25">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="flex-shrink-0">
                still learning · still curious · still building · <span className="text-[#C4FF4D]">·</span>&nbsp;
              </span>
            ))}
          </div>
        </section>

        {/* profile */}
        <section id="profile" className="px-5 md:px-12 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="scroll-reveal">
              <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">STACK</div>
              <ul className="font-display text-2xl md:text-3xl space-y-1.5 leading-tight">
                {['Java', 'JavaScript', 'Python', 'C++', 'Dart', 'HTML / CSS', 'Git'].map((s) => (
                  <li
                    key={s}
                    onMouseEnter={onLinkEnter}
                    onMouseLeave={onLinkLeave}
                    className="hover:text-[#C4FF4D] hover:italic hover:translate-x-2 transition-all duration-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="scroll-reveal">
              <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">EDUCATION</div>
              <p className="font-display text-2xl md:text-3xl leading-tight">University of Arkansas</p>
              <p className="text-sm md:text-base opacity-80 mt-3 leading-relaxed">
                Computer Science<br/>
                Class of 2027<br/>
                Fayetteville, AR
              </p>
            </div>

            <div className="scroll-reveal">
              <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">CURRENTLY</div>
              <p className="font-display text-xl md:text-2xl leading-snug italic font-light">
                Building <span className="text-[#C4FF4D] not-italic">Lacuna</span>, iterating on previous projects, and continue to work towards my degree as a full-time student. I will graduate with a <span className="text-[#C4FF4D] not-italic">Math Minor</span> alongside my Bachelor's. Largely thanks to my incessant need for at least one math course every semester. Math has always been my favorite subject. I also work full-time as a <span className="text-[#C4FF4D] not-italic">Team Leader</span> at Club Car Wash. The job pushes me to know the way to success and show the way to my team.
                <br/><br/>
                This summer: Audio Visual Integration intern at Conference Technologies Inc., Bentonville, AR.
              </p>
            </div>
          </div>
        </section>

        {/* about */}
        <section id="about" className="border-t border-white/10 px-5 md:px-12 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-12 gap-6 scroll-reveal">
            <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 mb-4 md:mb-0">VISION</div>
            <div className="md:col-span-9">
              <p className="font-display text-2xl md:text-5xl leading-[1.15] tracking-tight">
                Computers have had me curious for a long time; the software, the hardware, and the small ways they end up <span className="italic text-[#C4FF4D]">helping people</span>. A dream of mine is to <span className="italic text-[#C4FF4D]">do good</span> for others through use of technology and logic.
              </p>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer id="thanks" className="border-t border-white/10 px-5 md:px-12 py-12 md:py-20 relative z-10">
          <div className="font-display text-4xl md:text-8xl italic font-light leading-[0.95] mb-10 md:mb-14 scroll-reveal">
            <span className="wave inline-block">
              <span>T</span><span>h</span><span>a</span><span>n</span><span>k</span><span>s</span>&nbsp;<span>f</span><span>o</span><span>r</span>
            </span>
            <br/>
            <span className="wave inline-block">
              <span>s</span><span>t</span><span>o</span><span>p</span><span>p</span><span>i</span><span>n</span><span>g</span>&nbsp;<span>b</span><span>y</span><span>.</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] md:text-xs scroll-reveal">
            <a href="https://github.com/thoma-sH" target="_blank" rel="noreferrer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition">GITHUB →</a>
            <a href="https://www.linkedin.com/in/thoma-sH/" target="_blank" rel="noreferrer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition">LINKEDIN →</a>
            <a href="https://leetcode.com/u/thoma-sH/" target="_blank" rel="noreferrer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition">LEETCODE →</a>
            <button onClick={copyEmail} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition bg-transparent border-0 p-0 font-mono tracking-[0.2em] text-[11px] md:text-xs cursor-none">EMAIL →</button>
          </div>
          <div className="mt-12 md:mt-16 flex justify-between items-end font-mono text-[10px] opacity-30">
            <span>© 2026 — github.com/thoma-sH</span>
            <span>v0.3</span>
          </div>
        </footer>
      </div>
    </>
  );
}
