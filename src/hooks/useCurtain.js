import { useEffect, useState } from 'react';

export function useCurtain(delayMs = 800) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setOpen(true); return; }
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return open;
}
