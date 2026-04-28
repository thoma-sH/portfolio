export default function Footer({ onLinkEnter, onLinkLeave, onCopyEmail }) {
  return (
    <footer id="thanks" className="border-t border-white/10 px-5 md:px-12 py-12 md:py-20 relative z-10">
      <div className="font-display text-4xl md:text-8xl italic font-light leading-[0.95] mb-10 md:mb-14 scroll-reveal">
        <span className="wave inline-block">
          <span>T</span><span>h</span><span>a</span><span>n</span><span>k</span><span>s</span>&nbsp;<span>f</span><span>o</span><span>r</span>
        </span>
        <br />
        <span className="wave inline-block">
          <span>s</span><span>t</span><span>o</span><span>p</span><span>p</span><span>i</span><span>n</span><span>g</span>&nbsp;<span>b</span><span>y</span><span>.</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] md:text-xs scroll-reveal">
        <a href="https://github.com/thoma-sH" target="_blank" rel="noreferrer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition">GITHUB →</a>
        <a href="https://www.linkedin.com/in/thoma-sH/" target="_blank" rel="noreferrer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition">LINKEDIN →</a>
        <a href="https://leetcode.com/u/thoma-sH/" target="_blank" rel="noreferrer" onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition">LEETCODE →</a>
        <button onClick={onCopyEmail} onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave} className="opacity-70 hover:opacity-100 hover:text-[#C4FF4D] transition bg-transparent border-0 p-0 font-mono tracking-[0.2em] text-[11px] md:text-xs cursor-none">EMAIL →</button>
      </div>
      <div className="mt-12 md:mt-16 flex justify-between items-end font-mono text-[10px] opacity-30">
        <span>© 2026 — github.com/thoma-sH</span>
        <span>v0.3</span>
      </div>
    </footer>
  );
}
