export default function AmbientGlow({ pos }) {
  return (
    <div
      className="fixed pointer-events-none hidden md:block z-0"
      style={{
        left: pos.x,
        top: pos.y,
        width: 600,
        height: 600,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(196,255,77,0.07) 0%, transparent 60%)',
        transition: 'left 0.45s ease-out, top 0.45s ease-out',
      }}
    />
  );
}
