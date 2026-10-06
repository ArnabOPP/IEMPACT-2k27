import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Global styles first so component CSS can override the shared primitives
import './index.css'
import App from './App.jsx'

// Liquid refraction (SVG backdrop filter) only renders in Chromium
const isChromium = navigator.userAgentData?.brands?.some(
  (b) => b.brand === 'Chromium',
)
if (isChromium) document.documentElement.classList.add('liquid')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
