export default function About() {
  return (
    <section id="about" className="border-t border-white/10 px-5 md:px-12 py-16 md:py-24 relative z-10">
      <div className="grid md:grid-cols-12 gap-6 scroll-reveal">
        <div className="md:col-span-3 font-mono text-[10px] md:text-xs opacity-50 mb-4 md:mb-0">VISION</div>
        <div className="md:col-span-9">
          <p className="font-display text-2xl md:text-5xl leading-[1.15] tracking-tight">
            Computers have had me curious for a long time; the software, the hardware, and the small ways they end up <span className="italic text-[#C4FF4D]">helping people</span>. A dream of mine is to <span className="italic text-[#C4FF4D]">do good</span> for others through the use of technology.
          </p>
        </div>
      </div>
    </section>
  );
}
