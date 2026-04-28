import { useEffect, useState } from 'react';
import { sections } from '../data/projects';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

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
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) sectionsObs.observe(el);
    });

    return () => { reveals.disconnect(); sectionsObs.disconnect(); };
  }, []);

  return activeSection;
}
