export default function Card({ article }) {
  if (!article) return null;

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 p-6 bg-[#f5f2eb] hover:bg-white transition-colors group"
    >
      <div className="flex items-center gap-2">
        <div className="w-1.25 h-1.25 rounded-full bg-[#ff4d1c] shrink-0"></div>
        <span className="font-mono text-[0.65rem] tracking-widest uppercase text-[#999]">
          {article.fonte}
        </span>
      </div>
      <span className="self-start font-mono text-[0.6rem] tracking-wider uppercase px-2 py-1 bg-[#ff4d1c] text-white">
        Tech
      </span>
      <h2 className="font-['Syne'] text-[1rem] font-bold leading-snug tracking-tight text-[#0d0d0d]">
        {article.titolo}
      </h2>
      <p className="text-[0.85rem] text-[#555] leading-relaxed flex-1 line-clamp-3">
        {article.anteprima}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-[#ddd9cf] mt-auto">
        <span className="font-mono text-[0.65rem] tracking-wide text-[#999]">
          {article.orario}
        </span>
        <span className="text-[#999] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#ff4d1c] transition-all">
          ↗
        </span>
      </div>
    </a>
  );
}