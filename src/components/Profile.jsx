import { stack, skills } from '../data/projects';

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
          <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">SKILLS</div>
          <ul className="font-display text-xl md:text-2xl space-y-1 leading-tight">
            {skills.map((s) => (
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
            Math Minor<br />
            Class of 2027<br />
            Fayetteville, AR
          </p>
        </div>
      </div>

      <div className="scroll-reveal mt-16 md:mt-24">
        <div className="font-mono text-[10px] md:text-xs opacity-50 mb-5">CURRENTLY</div>
        <div className="font-display text-xl md:text-2xl leading-snug italic font-light max-w-5xl space-y-6">
          <p>
            Recently started my senior year of college. Over the summer I interned with <span className="text-[#C4FF4D] not-italic">Conference Technologies</span> in Bentonville, AR, and got the opportunity to travel all over the country — Hoboken, NJ; San Jose, CA; Mt. Pleasant, IA; St. Louis, MO. On those trips I shadowed technicians and field engineers installing state-of-the-art corporate AV equipment. The most rewarding part was being one of the last people on-site at a new install for <span className="text-[#C4FF4D] not-italic">Fortune 1</span>, making sure the network was live and every device was programmed properly and communicating over IP.
          </p>
          <p>
            I'm also iterating on <span className="text-[#C4FF4D] not-italic">MathIQ</span>. Next up is posting flyers at my campus math tutoring center with free Pro subscriptions, to bring in early users and the traffic and analytics that come with them.
          </p>
          <p>
            I practice <span className="text-[#C4FF4D] not-italic">LeetCode</span> daily — progress at{' '}
            <a
              href="https://leetcode.com/u/thoma-sH/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              className="text-[#C4FF4D] not-italic hover:underline"
            >
              leetcode.com/thoma-sH
            </a>
            . Learning a new algorithm, or a new way to orient my thoughts around a problem, is one of the highlights of my day.
          </p>
        </div>
      </div>
    </section>
  );
}
