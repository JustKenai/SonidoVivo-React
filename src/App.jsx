import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';

import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Administrador from './pages/Administrador';
import PanelAdmin from './pages/PanelAdmin';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/paneladmin" element={<PanelAdmin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;