export default function EthosMarquee() {
  return (
    <section
      className="border-t border-b border-white/10 py-6 md:py-8 overflow-hidden relative z-10"
      aria-hidden="true"
    >
      <div className="marquee-track flex gap-8 md:gap-14 whitespace-nowrap font-display text-2xl md:text-4xl italic font-light opacity-25">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="flex-shrink-0">
            still learning · still curious · still building · <span className="text-[#C4FF4D]">·</span>&nbsp;
          </span>
        ))}
      </div>
    </section>
  );
}
