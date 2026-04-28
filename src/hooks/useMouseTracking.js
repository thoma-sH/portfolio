import { useEffect, useRef, useState } from 'react';

const clamp = (v, max) => Math.max(-max, Math.min(max, v));

export function useMouseTracking(heroRef) {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const resetTimer = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      setVelocity({ x: clamp(dx, 30), y: clamp(dy, 30) });

      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setVelocity({ x: 0, y: 0 }), 120);

      if (heroRef?.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dxR = (e.clientX - cx) / rect.width;
        const dyR = (e.clientY - cy) / rect.height;
        setHeroTilt({ x: dyR * 5, y: dxR * -7 });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, [heroRef]);

  return { cursorPos, heroTilt, velocity };
}
