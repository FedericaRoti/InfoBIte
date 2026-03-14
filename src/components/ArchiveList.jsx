import ArchiveItem from './ArchiveItem';

export default function ArchiveList({ archive, currentDate, onSelect }) {
  if (!archive?.length) return null;

  return (
    <div className="mt-16">
      <div className="flex items-baseline justify-between mb-6 pb-4 border-b-2 border-[#0d0d0d]">
        <span className="font-['Syne'] text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#0d0d0d]">Archivio</span>
        <span className="font-mono text-[0.68rem] text-[#999]">Ultimi {archive.length} giorni</span>
      </div>
      <div className="flex flex-col gap-px bg-[#ddd9cf]">
        {archive.map(page => (
          <ArchiveItem
            key={page.id}
            page={page}
            onSelect={onSelect}
            isActive={page.title === currentDate}
          />
        ))}
      </div>
    </div>
  );
}