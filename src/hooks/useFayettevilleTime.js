import { useEffect, useState } from 'react';

export function useFayettevilleTime() {
  const [time, setTime] = useState('—:—:—');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          timeZone: 'America/Chicago', hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const greeting = (() => {
    const h = parseInt(time.split(':')[0]);
    if (isNaN(h)) return 'HELLO';
    if (h >= 5 && h < 12) return 'MORNING';
    if (h >= 12 && h < 17) return 'AFTERNOON';
    if (h >= 17 && h < 21) return 'EVENING';
    return 'LATE';
  })();

  return { time, greeting };
}
