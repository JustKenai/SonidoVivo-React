import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './componentes/Estilos.css'
import Inicio from './pages/Inicio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Inicio />
  </StrictMode>,
)