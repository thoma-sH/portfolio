export default function Cursor({ pos, active, label, preview, velocity }) {
  const transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
  const vx = velocity?.x ?? 0;
  const vy = velocity?.y ?? 0;
  const imgStyle = {
    transform: `translate(${vx * 0.5}px, ${vy * 0.5}px) rotate(${vx * 0.18}deg)`,
    transition: 'transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)',
  };

  return (
    <>
      {preview && (
        <div
          className="cursor-preview-wrap fixed top-0 left-0 pointer-events-none z-[290] hidden md:block"
          style={{ transform }}
        >
          <div className={`cursor-preview aspect-${preview.aspect || 'desktop'}`} key={preview.src}>
            <img src={preview.src} alt="" draggable="false" style={imgStyle} />
            {label && (
              <div className="cursor-preview-label">
                {label} <span className="arrow">↗</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div
        className="fixed top-0 left-0 pointer-events-none z-[300] hidden md:block"
        style={{ transform }}
      >
        {!preview && (
          label ? (
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
          )
        )}
      </div>
    </>
  );
}
