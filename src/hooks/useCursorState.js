import { useState } from 'react';

export function useCursorState() {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState(null);
  const [preview, setPreview] = useState(null);

  const onLinkEnter = () => setActive(true);
  const onLinkLeave = () => setActive(false);

  const onProjectEnter = (previewSrc) => {
    setActive(true);
    setLabel('VIEW REPO');
    if (previewSrc) setPreview(previewSrc);
  };
  const onProjectLeave = () => {
    setActive(false);
    setLabel(null);
    setPreview(null);
  };

  return { active, label, preview, onLinkEnter, onLinkLeave, onProjectEnter, onProjectLeave };
}
