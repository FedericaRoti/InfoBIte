export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 h-14 bg-[#f5f2eb] border-b border-[#ddd9cf]">
      
      <a href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 bg-[#ff4d1c] flex items-center justify-center text-white text-xs font-bold">
          IB
        </div>
        <span className="font-bold text-base">
          Info<span className="text-[#ff4d1c]">Bite</span>
        </span>
      </a>

      <div className="flex items-center gap-6">
        <span className="text-xs text-[#999] tracking-widest uppercase font-mono">
          Tech · AI · Code
        </span>
        <div className="flex items-center gap-2 text-xs text-[#ff4d1c] font-mono">
          <span className="w-2 h-2 rounded-full bg-[#ff4d1c] animate-pulse"></span>
          aggiornato oggi
        </div>
      </div>

    </nav>
  );
}