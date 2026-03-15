import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import '@fontsource/syne/400.css'
import '@fontsource/syne/600.css'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/dm-mono/300.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'
import '@fontsource/dm-sans/300.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
