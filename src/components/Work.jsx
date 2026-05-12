import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';

function ProjectMeta({ meta }) {
  if (meta.status) {
    return (
      <>
        {meta.label} <span className={`text-[#C4FF4D] ${meta.glowing ? 'glow-dot' : ''}`}>●</span> {meta.status}
      </>
    );
  }
  return meta.label;
}

function ProjectRow({ project, isActive, onTap, onMouseEnter, onMouseLeave }) {
  const ref = useRef(null);

  // Apply .active via DOM rather than JSX so React's re-render doesn't
  // overwrite the .in-view class added by the global IntersectionObserver.
  useEffect(() => {
    if (!ref.current) return;
    ref.current.classList.toggle('active', isActive);
  }, [isActive]);

  const onClick = (e) => {
    if (window.matchMedia('(hover: none)').matches && !isActive) {
      e.preventDefault();
      onTap();
    }
  };

  return (
    <a
      ref={ref}
      href={`https://github.com/${project.repoPath}`}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className="grid md:grid-cols-12 gap-3 md:gap-6 project-row scroll-reveal no-underline text-inherit"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="md:col-span-2 font-mono text-[10px] md:text-xs opacity-50 num">→ {project.num}</div>
      <div className="md:col-span-7">
        <h3 className="font-display text-3xl md:text-6xl mb-3 md:mb-5">{project.title}</h3>
        <p className="opacity-80 leading-relaxed text-base md:text-xl max-w-xl">{project.description}</p>
        <div className="repo-hint mt-4 font-mono text-[10px] md:text-xs">
          <span className="dot" />github.com/{project.repoPath} ↗
        </div>
        <div className={`mobile-preview aspect-${project.previewAspect || 'desktop'}`}>
          <img src={project.previewSrc} alt="" draggable="false" />
        </div>
      </div>
      <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 md:text-right meta">
        <ProjectMeta meta={project.meta} />
      </div>
    </a>
  );
}

export default function Work({ onProjectEnter, onProjectLeave }) {
  const [activeNum, setActiveNum] = useState(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest('.project-row')) setActiveNum(null);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <section id="work" className="border-t border-white/10 px-5 md:px-12 py-16 md:py-24 relative z-10">
      <div className="font-mono text-[10px] md:text-xs opacity-50 mb-10 md:mb-16 flex justify-between scroll-reveal">
        <span>RECENT WORK</span>
        <span>A FEW PROJECTS</span>
      </div>

      <div className="space-y-10 md:space-y-14">
        {projects.map((p) => (
          <ProjectRow
            key={p.num}
            project={p}
            isActive={activeNum === p.num}
            onTap={() => setActiveNum(p.num)}
            onMouseEnter={() => onProjectEnter({ src: p.previewSrc, aspect: p.previewAspect })}
            onMouseLeave={onProjectLeave}
          />
        ))}

        <div className="grid md:grid-cols-12 gap-3 md:gap-6 opacity-50 scroll-reveal">
          <div className="md:col-span-2 font-mono text-[10px] md:text-xs">→ 06</div>
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
  );
}
