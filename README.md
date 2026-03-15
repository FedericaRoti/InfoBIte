# 📰 InfoBite

Digest automatico di notizie tech, AI e codice. Ogni mattina alle 9, un workflow n8n raccoglie gli articoli più recenti da 8 feed RSS, li filtra e crea una pagina strutturata su Notion. Il frontend React legge i dati tramite Notion API e li presenta in un'interfaccia leggibile via browser.

**Live → [infobite-theta.vercel.app](https://infobite-theta.vercel.app)**

---

## Stack

| Layer | Tecnologia |
|---|---|
| Automazione | n8n (self-hosted su VPS Hostinger) |
| Storage | Notion API |
| Frontend | React + Vite + Tailwind CSS |
| Deploy | Vercel + Serverless Functions |

## Come funziona

1. **n8n** gira ogni mattina alle 9 — legge 8 feed RSS (CSS-Tricks, OpenAI, DeepMind, HuggingFace, GitHub, freeCodeCamp, Smashing Magazine, Class Central)
2. Filtra e normalizza gli articoli, costruisce i blocchi Notion
3. Crea una nuova pagina figlia sotto la pagina madre `InfoBite`
4. Il frontend chiama `/api/news` (serverless function Vercel) che legge la pagina del giorno da Notion e la restituisce come JSON
5. React renderizza gli articoli con `MainCard` + `Card` + archivio

## Struttura del progetto
```
infobite/
├── api/
│   └── news.js          # Serverless function — legge Notion API
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── MainCard.jsx  # Card articolo in evidenza
│   │   ├── Card.jsx      # Card articolo secondario
│   │   ├── ArchiveList.jsx
│   │   └── ArchiveItem.jsx
│   ├── hooks/
│   │   └── useNews.js    # Fetch dati + gestione stato
│   ├── pages/
│   │   └── Home.jsx
│   └── App.jsx
├── public/
│   └── favicon.svg
└── .env                  # NOTION_TOKEN + NOTION_PAGE_ID
```

## Setup locale
```bash
npm install
vercel dev   # avvia frontend + serverless function in locale
```

Variabili d'ambiente necessarie in `.env`:
```
NOTION_TOKEN=secret_...
NOTION_PAGE_ID=31e58cb7-b6ef-8144-ab81-e4bbe6a2c7ce
```

## Deploy

Il deploy è automatico ad ogni push su `main` tramite Vercel.

---

Progetto in produzione — non un esercizio.
