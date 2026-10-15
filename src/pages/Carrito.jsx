import '../componentes/Estilos.css'

function Carrito() {
  return (
    <>

      <main className="container py-5">
        <div className="mb-4">
          <h1 className="fw-bold">
            🛒 Carrito de compras
          </h1>
          <p className="text-muted">
            Revisa los productos antes de realizar tu compra.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white">
                <h2 className="h5 mb-0">Productos seleccionados</h2>
              </div>

              <div className="card-body">
                <div id="productosCarrito"></div>

                <div id="carritoVacio" className="text-center py-5 d-none">
                  <div className="fs-1">🛒</div>
                  <h3 className="h5 mt-3">Tu carrito está vacío</h3>
                  <p className="text-muted">Agrega algunos productos para comenzar.</p>
                  <a href="/productos" className="btn btn-primary">
                    Ver productos
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white">
                <h2 className="h5 mb-0">Resumen de compra</h2>
              </div>

              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Productos:</span>
                  {}
                  <strong id="totalUnidades">0</strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <strong id="subtotal">$0</strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total:</span>
                  <strong id="total" className="fs-4">$0</strong>
                </div>

                <button id="btnComprar" className="btn btn-success w-100 mb-2" disabled>
                  Finalizar compra
                </button>

                <button id="btnVaciar" className="btn btn-outline-danger w-100" disabled>
                  Vaciar carrito
                </button>

                <a href="/productos" className="btn btn-outline-primary w-100 mt-2">
                  Seguir comprando
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default Carrito