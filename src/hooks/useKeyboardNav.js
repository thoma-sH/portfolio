import { useEffect } from 'react';

export function useKeyboardNav({ onNext, onPrev, onHelp, onEsc }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const k = e.key;
      if (k === 'j' || k === 'ArrowDown') { e.preventDefault(); onNext?.(); }
      else if (k === 'k' || k === 'ArrowUp') { e.preventDefault(); onPrev?.(); }
      else if (k === '?' || (e.shiftKey && k === '/')) { e.preventDefault(); onHelp?.(); }
      else if (k === 'Escape') onEsc?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNext, onPrev, onHelp, onEsc]);
}
