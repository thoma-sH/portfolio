export default function ScrollProgress({ progress }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-px bg-white/5 z-[80]">
      <div
        className="h-full bg-[#C4FF4D] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
