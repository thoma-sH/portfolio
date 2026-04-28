import { useEffect, useState } from 'react';

export function useMouseTracking(heroRef) {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      if (heroRef?.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        setHeroTilt({ x: dy * 5, y: dx * -7 });
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [heroRef]);

  return { cursorPos, heroTilt };
}
