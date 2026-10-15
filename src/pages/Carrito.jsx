import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tiendaReducer, detalleCarrito, resumenCarrito } from '../store/tiendaReducer';
import { cargarTienda, guardarTienda } from '../services/storage';

export default function Carrito() {
  const [estado, dispatch] = useReducer(tiendaReducer, null, cargarTienda);

  useEffect(() => {
    guardarTienda(estado);
  }, [estado]);

  const detalle = detalleCarrito(estado);
  const resumen = resumenCarrito(estado);

  return (
    <>
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold mb-0">Carrito de Compras</h1>
          <span className="badge bg-dark fs-6 py-2 px-3">
            {resumen.unidades} {resumen.unidades === 1 ? 'producto' : 'productos'}
          </span>
        </div>

        {estado.aviso && (
          <div className={`alert alert-${estado.aviso.tipo} alert-dismissible fade show`} role="alert">
            {estado.aviso.texto}
            <button type="button" className="btn-close" onClick={() => dispatch({ type: 'CERRAR_AVISO' })}></button>
          </div>
        )}

        {detalle.length === 0 ? (
          <div className="card shadow-sm border-0 text-center py-5">
            <div className="card-body">
              <h3 className="text-muted mb-3">Tu carrito está vacío</h3>
              <p className="text-muted mb-4">Explora nuestro catálogo y descubre instrumentos y accesorios para ti.</p>
              <Link to="/productos" className="btn btn-primary px-4 py-2">
                Ver Catálogo
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col" style={{ width: '160px' }}>Cantidad</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col" className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detalle.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img 
                                src={item.imagen} 
                                alt={item.nombre} 
                                style={{ width: '55px', height: '55px', objectFit: 'cover' }} 
                                className="rounded border"
                              />
                              <div>
                                <h6 className="fw-semibold mb-0">{item.nombre}</h6>
                                <small className="text-muted">{item.categoria}</small>
                              </div>
                            </div>
                          </td>
                          <td className="fw-semibold">${Number(item.precio).toLocaleString("es-CL")}</td>
                          <td>
                            <div className="input-group input-group-sm">
                              <button 
                                className="btn btn-outline-secondary" 
                                onClick={() => dispatch({ type: 'CANTIDAD', id: item.id, cantidad: item.cantidad - 1 })}
                              >
                                -
                              </button>
                              <input 
                                type="number" 
                                className="form-control text-center" 
                                value={item.cantidad} 
                                min="0"
                                max={item.stock}
                                onChange={(e) => dispatch({ type: 'CANTIDAD', id: item.id, cantidad: parseInt(e.target.value) || 0 })}
                              />
                              <button 
                                className="btn btn-outline-secondary" 
                                onClick={() => dispatch({ type: 'CANTIDAD', id: item.id, cantidad: item.cantidad + 1 })}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="fw-bold">${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                          <td className="text-center">
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => dispatch({ type: 'QUITAR', id: item.id })}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-3">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => dispatch({ type: 'VACIAR' })}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="fw-bold mb-3">Resumen de la Orden</h4>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal:</span>
                  <span className="fw-semibold">${resumen.subtotal.toLocaleString("es-CL")}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Envío estimado:</span>
                  <span className="fw-semibold">${resumen.envio.toLocaleString("es-CL")}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total a Pagar:</span>
                  <span className="fw-bold fs-5 text-primary">${resumen.total.toLocaleString("es-CL")}</span>
                </div>
                <button 
                  className="btn btn-success w-100 py-2 fw-bold shadow-sm"
                  onClick={() => dispatch({ type: 'COMPRAR' })}
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}