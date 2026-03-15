export default function ArchiveItem({ page, onSelect, isActive }) {

  const label = page.title.replace('📰 InfoBite – ', '');
  const parts = label.split(' ');
  const shortDate = parts.length >= 3
    ? `${parts[1]} ${parts[2].slice(0, 3)}`
    : label;

  return (
    <button
      onClick={() => onSelect(page.title)}
      className={`w-full grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_auto] gap-4 items-center px-6 py-5 text-left transition-colors ${isActive ? 'bg-white' : 'bg-[#f5f2eb] hover:bg-white'}`}>
      <span className="font-mono text-[0.68rem] tracking-wide text-[#999] uppercase whitespace-nowrap">{shortDate}</span>
      <span className="font-['Syne'] text-[0.92rem] font-semibold tracking-tight text-[#0d0d0d] truncate">{label}</span>
      <div className="hidden md:flex items-center gap-3">
        <span className="font-mono text-[0.62rem] tracking-wide text-[#999] uppercase">InfoBite</span>
        <span className="font-mono text-[0.6rem] px-1.5 py-0.5 border border-[#ddd9cf] text-[#999] uppercase tracking-wide">Digest</span>
      </div>
    </button>
  );
}