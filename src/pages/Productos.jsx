import { useReducer, useEffect } from 'react';
import { tiendaReducer } from '../store/tiendaReducer';
import { cargarTienda, guardarTienda } from '../services/storage';

export default function Productos() {
  const [estado, dispatch] = useReducer(tiendaReducer, null, cargarTienda);

  useEffect(() => {
    guardarTienda(estado);
  }, [estado]);

  return (
    <>
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Productos</h1>
          <span className="badge text-bg-primary">{estado.productos.length} productos</span>
        </div>
        
        {estado.aviso && (
          <div className={`alert alert-${estado.aviso.tipo} alert-dismissible fade show`} role="alert">
            {estado.aviso.texto}
            <button type="button" className="btn-close" onClick={() => dispatch({ type: 'CERRAR_AVISO' })}></button>
          </div>
        )}

        <div className="row g-4">
          {estado.productos.map((producto) => (
            <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
              <div className="card h-100 shadow-sm">
                <img 
                  src={producto.imagen} 
                  className="card-img-top p-3" 
                  alt={producto.nombre} 
                  style={{ height: '250px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{producto.nombre}</h5>
                  <p className="card-text text-muted mb-1">{producto.categoria}</p>
                  <p className="card-text text-secondary small mb-3">Stock disponible: <strong>{producto.stock}</strong></p>
                  <p className="card-text fs-4 fw-bold mt-auto">${Number(producto.precio).toLocaleString("es-CL")}</p>
                  
                  <button 
                    className={`btn w-100 mt-3 ${producto.stock > 0 ? 'btn-primary' : 'btn-secondary disabled'}`}
                    onClick={() => dispatch({ type: 'AGREGAR', id: producto.id })}
                    disabled={producto.stock === 0}
                  >
                    {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}