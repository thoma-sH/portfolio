import { useEffect, useRef, useState } from 'react';
import { useMouseTracking } from './hooks/useMouseTracking';
import { useFayettevilleTime } from './hooks/useFayettevilleTime';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useActiveSection } from './hooks/useActiveSection';
import { useCurtain } from './hooks/useCurtain';
import { useScrambleText } from './hooks/useScrambleText';
import { useCopyEmail } from './hooks/useCopyEmail';
import { useCursorState } from './hooks/useCursorState';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { projects, sections } from './data/projects';

import Cursor from './components/Cursor';
import Curtain from './components/Curtain';
import Toast from './components/Toast';
import AmbientGlow from './components/AmbientGlow';
import ScrollProgress from './components/ScrollProgress';
import SectionRail from './components/SectionRail';
import ShortcutsOverlay from './components/ShortcutsOverlay';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import EthosMarquee from './components/EthosMarquee';
import Profile from './components/Profile';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  const heroRef = useRef(null);

  const { cursorPos, heroTilt, velocity } = useMouseTracking(heroRef);
  const { time, greeting } = useFayettevilleTime();
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection();
  const curtainOpen = useCurtain(800);
  const [hamiltonText, scrambleHamilton] = useScrambleText('Hamilton.');
  const { copy: copyEmail, toast } = useCopyEmail('t.hamilton0416@gmail.com');
  const cursor = useCursorState();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Preload preview gifs so hover is instant
  useEffect(() => {
    projects.forEach((p) => {
      if (p.previewSrc) {
        const img = new Image();
        img.src = p.previewSrc;
      }
    });
  }, []);

  // Keyboard navigation
  const goToSection = (delta) => {
    const idx = sections.findIndex((s) => s.id === activeSection);
    const nextIdx = Math.max(0, Math.min(sections.length - 1, idx + delta));
    document.getElementById(sections[nextIdx].id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useKeyboardNav({
    onNext: () => goToSection(+1),
    onPrev: () => goToSection(-1),
    onHelp: () => setShortcutsOpen((s) => !s),
    onEsc: () => setShortcutsOpen(false),
  });

  return (
    <>
      <Curtain open={curtainOpen} />
      <Toast show={toast}>copied ✓</Toast>
      <ShortcutsOverlay
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
        onLinkEnter={cursor.onLinkEnter}
        onLinkLeave={cursor.onLinkLeave}
      />

      <div className="min-h-screen bg-[#0E0D0B] text-[#F0EBDD] grain relative overflow-x-hidden">
        <ScrollProgress progress={scrollProgress} />
        <Cursor
          pos={cursorPos}
          active={cursor.active}
          label={cursor.label}
          preview={cursor.preview}
          velocity={velocity}
        />
        <AmbientGlow pos={cursorPos} />
        <SectionRail
          activeSection={activeSection}
          onLinkEnter={cursor.onLinkEnter}
          onLinkLeave={cursor.onLinkLeave}
        />

        <Nav
          greeting={greeting}
          time={time}
          onLinkEnter={cursor.onLinkEnter}
          onLinkLeave={cursor.onLinkLeave}
        />
        <Hero
          ref={heroRef}
          tilt={heroTilt}
          hamiltonText={hamiltonText}
          onScramble={scrambleHamilton}
          onLinkEnter={cursor.onLinkEnter}
          onLinkLeave={cursor.onLinkLeave}
        />
        <Work
          onProjectEnter={cursor.onProjectEnter}
          onProjectLeave={cursor.onProjectLeave}
        />
        <EthosMarquee />
        <Profile
          onLinkEnter={cursor.onLinkEnter}
          onLinkLeave={cursor.onLinkLeave}
        />
        <About />
        <Footer
          onLinkEnter={cursor.onLinkEnter}
          onLinkLeave={cursor.onLinkLeave}
          onCopyEmail={copyEmail}
        />
      </div>
    </>
  );
}
