export default function Nav({ greeting, time, onLinkEnter, onLinkLeave }) {
  return (
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
  );
}
