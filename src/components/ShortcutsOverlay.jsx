const SHORTCUTS = [
  { keys: ['↓', 'J'], label: 'Next section' },
  { keys: ['↑', 'K'], label: 'Previous section' },
  { keys: ['?'], label: 'Toggle this' },
  { keys: ['ESC'], label: 'Close' },
];

export default function ShortcutsOverlay({ open, onClose, onLinkEnter, onLinkLeave }) {
  return (
    <div
      className={`shortcuts-overlay ${open ? 'open' : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div className="shortcuts-card" onClick={(e) => e.stopPropagation()}>
        <div className="shortcuts-header">
          <span className="font-mono text-[10px] tracking-[0.25em] opacity-50">SHORTCUTS</span>
          <button
            className="shortcuts-close"
            onClick={onClose}
            onMouseEnter={onLinkEnter}
            onMouseLeave={onLinkLeave}
            aria-label="Close shortcuts"
          >
            ×
          </button>
        </div>
        <ul className="shortcuts-list">
          {SHORTCUTS.map((s) => (
            <li key={s.label}>
              <span className="shortcuts-keys">
                {s.keys.map((k, i) => (
                  <kbd key={i}>{k}</kbd>
                ))}
              </span>
              <span className="shortcuts-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
