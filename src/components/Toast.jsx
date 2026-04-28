export default function Toast({ show, children }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
      {children}
    </div>
  );
}
