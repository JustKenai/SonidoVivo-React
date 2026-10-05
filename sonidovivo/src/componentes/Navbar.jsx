export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          <h1 className="h4 m-0">Sonido Vivo</h1>
        </a>

        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Productos
              </a>
            </li>
            <li className="nav-item">
              <button className="btn nav-link text-start" id="btn-abrir-carrito">
                Carrito (<span id="cart-counter">0</span>)
              </button>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Administrador
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}