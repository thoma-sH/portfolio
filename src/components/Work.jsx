import { projects } from '../data/projects';

function ProjectMeta({ meta }) {
  if (meta.status) {
    return (
      <>
        {meta.label} <span className="text-[#C4FF4D]">●</span> {meta.status}
      </>
    );
  }
  return meta.label;
}

function ProjectRow({ project, onProjectEnter, onProjectLeave }) {
  return (
    <a
      href={`https://github.com/${project.repoPath}`}
      target="_blank"
      rel="noreferrer"
      className="grid md:grid-cols-12 gap-3 md:gap-6 project-row scroll-reveal no-underline text-inherit"
      onMouseEnter={() => onProjectEnter({ src: project.previewSrc, aspect: project.previewAspect })}
      onMouseLeave={onProjectLeave}
    >
      <div className="md:col-span-2 font-mono text-[10px] md:text-xs opacity-50 num">→ {project.num}</div>
      <div className="md:col-span-7">
        <h3 className="font-display text-3xl md:text-6xl mb-3 md:mb-5">{project.title}</h3>
        <p className="opacity-80 leading-relaxed text-base md:text-xl max-w-xl">{project.description}</p>
        <div className="repo-hint mt-4 font-mono text-[10px] md:text-xs">
          <span className="dot" />github.com/{project.repoPath} ↗
        </div>
      </div>
      <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 md:text-right meta">
        <ProjectMeta meta={project.meta} />
      </div>
    </a>
  );
}

export default function Work({ onProjectEnter, onProjectLeave }) {
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
            onProjectEnter={onProjectEnter}
            onProjectLeave={onProjectLeave}
          />
        ))}

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
  );
}
