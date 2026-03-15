export default function MainCard({ article }) {
  if (!article) return null;

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-1 md:col-span-2 flex flex-col gap-3 p-8 bg-[#0a1628] text-white hover:bg-[#111d35] transition-colors group"
    >
      <div className="flex items-center gap-2">
        <div className="w-1.25 h-1.25 rounded-full bg-[#ff4d1c] shrink-0"></div>
        <span className="font-mono text-[0.65rem] tracking-widest uppercase text-white/40">
          {article.fonte}
        </span>
      </div>
      <span className="self-start font-mono text-[0.6rem] tracking-wider uppercase px-2 py-1 bg-[#ffe500] text-[#0d0d0d]">
        Tech
      </span>
      <h2 className="font-['Syne'] text-[1.6rem] font-bold leading-tight tracking-tight">
        {article.titolo}
      </h2>
      <p className="text-[0.85rem] text-white/55 leading-relaxed flex-1">
        {article.anteprima}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
        <span className="font-mono text-[0.65rem] tracking-wide text-white/30">
          {article.orario}
        </span>
        <span className="text-white/40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
          ↗
        </span>
      </div>
    </a>
  );
}