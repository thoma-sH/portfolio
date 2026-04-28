import { sections } from '../data/projects';

export default function SectionRail({ activeSection, onLinkEnter, onLinkLeave }) {
  return (
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
  );
}
