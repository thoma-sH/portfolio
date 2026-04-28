import { useRef, useState } from 'react';

export function useCopyEmail(email) {
  const [toast, setToast] = useState(false);
  const toastRef = useRef(null);

  const copy = async (e) => {
    e?.preventDefault?.();
    try {
      await navigator.clipboard.writeText(email);
      setToast(true);
      if (toastRef.current) clearTimeout(toastRef.current);
      toastRef.current = setTimeout(() => setToast(false), 1800);
    } catch {}
  };

  return { copy, toast };
}
