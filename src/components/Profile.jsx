import { stack } from '../data/projects';

export default function Profile({ onLinkEnter, onLinkLeave }) {
  return (
    <section id="profile" className="px-5 md:px-12 py-16 md:py-24 relative z-10">
      <div className="grid md:grid-cols-3 gap-12 md:gap-16">
        <div className="scroll-reveal">
          <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">STACK</div>
          <ul className="font-display text-2xl md:text-3xl space-y-1.5 leading-tight">
            {stack.map((s) => (
              <li
                key={s}
                onMouseEnter={onLinkEnter}
                onMouseLeave={onLinkLeave}
                className="hover:text-[#C4FF4D] hover:italic hover:translate-x-2 transition-all duration-300"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="scroll-reveal">
          <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">EDUCATION</div>
          <p className="font-display text-2xl md:text-3xl leading-tight">University of Arkansas</p>
          <p className="text-sm md:text-base opacity-80 mt-3 leading-relaxed">
            Computer Science<br />
            Class of 2027<br />
            Fayetteville, AR
          </p>
        </div>

        <div className="scroll-reveal">
          <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">CURRENTLY</div>
          <p className="font-display text-xl md:text-2xl leading-snug italic font-light">
            Building <span className="text-[#C4FF4D] not-italic">Lacuna</span>, iterating on previous projects, and continue to work towards my degree as a full-time student. I will graduate with a <span className="text-[#C4FF4D] not-italic">Math Minor</span> alongside my Bachelor's. Largely thanks to my incessant need for at least one math course every semester. Math has always been my favorite subject. I also work full-time as a <span className="text-[#C4FF4D] not-italic">Team Leader</span> at Club Car Wash. The job pushes me to know the way to success and show the way to my team.
            <br /><br />
            This summer: Audio Visual Integration intern at Conference Technologies Inc., Bentonville, AR.
          </p>
        </div>
      </div>
    </section>
  );
}
