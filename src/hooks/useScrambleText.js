import { useRef, useState } from 'react';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz░▒▓';

export function useScrambleText(target, options = {}) {
  const { chars = DEFAULT_CHARS, frames = 18, frameMs = 35 } = options;
  const [text, setText] = useState(target);
  const intervalRef = useRef(null);

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let frame = 0;
    intervalRef.current = setInterval(() => {
      const progress = frame / frames;
      const next = target.split('').map((c, i) => {
        if (c === '.') return c;
        if (i / target.length < progress) return c;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      setText(next);
      frame++;
      if (frame > frames) {
        setText(target);
        clearInterval(intervalRef.current);
      }
    }, frameMs);
  };

  return [text, scramble];
}
