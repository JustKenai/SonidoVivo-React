import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <h1 className="h4 m-0">Sonido Vivo</h1>
        </Link>

        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn nav-link text-start" to="/carrito">
                Carrito (<span id="cart-counter">0</span>)
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/administrador">
                Administrador
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}