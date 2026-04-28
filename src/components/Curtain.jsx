export default function Curtain({ open }) {
  return (
    <div className={`curtain ${open ? 'open' : ''}`} aria-hidden="true">
      <span className="curtain-text">
        Thomas <span className="accent">Hamilton.</span>
      </span>
    </div>
  );
}
