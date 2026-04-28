import { forwardRef } from 'react';

const Hero = forwardRef(function Hero(
  { tilt, hamiltonText, onScramble, onLinkEnter, onLinkLeave },
  ref
) {
  return (
    <section id="intro" className="px-5 md:px-12 pt-10 md:pt-24 pb-20 md:pb-40 relative z-10">
      <div className="font-mono text-[10px] md:text-xs opacity-50 mb-6 reveal d1">
        Hello, I'm Thomas — CS student, University of Arkansas '27
      </div>
      <h1
        ref={ref}
        className="font-display text-[64px] md:text-[160px] leading-[0.88] tracking-[-0.04em] reveal d2"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        Thomas<br />
        <span
          className="italic font-light text-[#C4FF4D] inline-block"
          onMouseEnter={() => { onLinkEnter(); onScramble(); }}
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
  );
});

export default Hero;
