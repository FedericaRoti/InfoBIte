import { useState, useEffect } from 'react'
import { useNews } from '../hooks/useNews'
import MainCard from '../components/MainCard'
import Card from '../components/Card'
import ArchiveList from '../components/ArchiveList'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [activeFilter, setActiveFilter] = useState('Tutti')
  const { data, loading, error } = useNews(selectedDate)

  const articles = data?.articles || []
  const mainArticle = articles[0]
  const restArticles = articles.slice(1)
  const dayLabel = data?.date?.replace('📰 InfoBite – ', '') || ''

  // Fade-up on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('opacity-100', 'translate-y-0'), i * 100)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [data])

  // Gestione filtri
  const handleFilter = (filter) => {
    setActiveFilter(filter)
    if (filter === 'Tutti' || filter === 'Oggi') {
      setSelectedDate(null) // carica l'ultimo digest
    }
    // 'Archivio' mostra la sezione archivio — scroll smooth
    if (filter === 'Archivio') {
      document.getElementById('archivio')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const filters = ['Tutti', 'Oggi', 'Archivio']

  return (
    <div className="bg-[#f5f2eb] min-h-screen">
      <Navbar />
      <header>

        {/* Hero Banner */}
        <section
          className="bg-[#0a1628] px-8 py-16 relative overflow-hidden"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 21px)'
          }}
        >
          <div className="max-w-300 mx-auto relative">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[0.68rem] text-[#ff4d1c] uppercase tracking-[0.15em]">Daily Digest</span>
              <div className="w-10 h-px bg-white/20"></div>
              <span className="font-mono text-[0.68rem] text-white/40 tracking-[0.08em]">{dayLabel}</span>
            </div>
            {/* Title */}
            <h1
              className="font-['Syne'] font-extrabold leading-[0.92] tracking-tight text-white mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
            >
              Le notizie
              <span className="block text-[#ff4d1c]">tech</span>
              <span className="block" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
                che contano.
              </span>
            </h1>
            {/* Meta */}
            <div className="flex items-center gap-8 flex-wrap">
              <div className="flex flex-col gap-1">
                <span className="font-['Syne'] text-2xl font-bold text-white leading-none">8</span>
                <span className="font-mono text-[0.65rem] text-white/40 uppercase tracking-widest">Fonti</span>
              </div>
              <div className="w-px h-10 bg-white/15"></div>
              <div className="flex flex-col gap-1">
                <span className="font-['Syne'] text-2xl font-bold text-white leading-none">24h</span>
                <span className="font-mono text-[0.65rem] text-white/40 uppercase tracking-widest">Aggiornamento</span>
              </div>
              <div className="w-px h-10 bg-white/15"></div>
              <p className="text-[0.88rem] text-white/50 leading-relaxed max-w-xs">
                Un digest automatico di notizie tech, AI e codice — filtrate e consegnate ogni mattina alle 9.
              </p>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <section className="bg-[#ff4d1c] py-12 overflow-hidden">
          <div className="flex gap-12 w-max animate-ticker">
            {[...Array(2)].map((_, rep) =>
              ['Artificial Intelligence', 'Web Development', 'Open Source', 'Startup', 'Cloud & DevOps', 'JavaScript', 'Machine Learning', 'Security'].map((item, i) => (
                <div
                  key={`${rep}-${i}`}
                  className="flex items-center gap-3 font-mono text-[0.72rem] text-white uppercase tracking-[0.08em] whitespace-nowrap">
                  <span className="opacity-50">✦</span> {item}
                </div>
              ))
            )}
          </div>
        </section>

      </header>

      <main>
        {/* Filtri */}
        <div className="max-w-300 mx-auto px-8 pt-8 flex items-center gap-2 flex-wrap fade-up opacity-0 translate-y-4 transition-all duration-500">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`font-mono text-[0.72rem] uppercase tracking-[0.06em] px-4 py-1.5 border transition-all duration-200
                ${activeFilter === f
                  ? 'bg-[#0d0d0d] border-[#0d0d0d] text-white'
                  : 'bg-transparent border-[#ddd9cf] text-[#999] hover:border-[#ff4d1c] hover:text-[#ff4d1c]'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <section className="max-w-300 mx-auto px-8 py-8">
          {loading && <p className="font-mono text-sm text-[#999]">Caricamento...</p>}
          {error && <p className="font-mono text-sm text-[#ff4d1c]">Errore: {error}</p>}

          {!loading && !error && (
            <>
              <div className="flex items-baseline justify-between mb-6 pb-4 border-b-2 border-[#0d0d0d] fade-up opacity-0 translate-y-4 transition-all duration-500">
                <span className="font-['Syne'] text-[0.75rem] font-bold uppercase tracking-[0.12em]">Notizie di oggi</span>
                <span className="font-mono text-[0.68rem] text-[#999]">{articles.length} articoli · 09:00</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#ddd9cf] mb-12 fade-up opacity-0 translate-y-4 transition-all duration-500">
                <MainCard article={mainArticle} />
                {restArticles.map((article, i) => (
                  <Card key={i} article={article} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Archivio */}
        <section id="archivio" className="max-w-300 mx-auto px-8 pb-16 fade-up opacity-0 translate-y-4 transition-all duration-500">
          <ArchiveList
            archive={data?.archive}
            currentDate={data?.date}
            onSelect={(title) => {
              setSelectedDate(title)
              setActiveFilter('Tutti')
            }}
          />
        </section>
      </main>

      <Footer />
    </div>
  )
}