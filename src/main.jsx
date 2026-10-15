import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './componentes/Estilos.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)