export default function Cursor({ pos, active, label, preview }) {
  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[300] hidden md:block"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
    >
      {preview ? (
        <div className="cursor-preview">
          <img src={preview} alt="" draggable="false" />
          {label && (
            <div className="cursor-preview-label">
              {label} <span className="arrow">↗</span>
            </div>
          )}
        </div>
      ) : label ? (
        <div className="cursor-pill">
          {label} <span className="arrow">↗</span>
        </div>
      ) : (
        <div
          className="rounded-full bg-[#C4FF4D] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: active ? 44 : 10,
            height: active ? 44 : 10,
            opacity: active ? 0.35 : 1,
            transition: 'width 0.35s cubic-bezier(0.2,0.7,0.2,1), height 0.35s cubic-bezier(0.2,0.7,0.2,1), opacity 0.35s',
          }}
        />
      )}
    </div>
  );
}
