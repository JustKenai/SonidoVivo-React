import '../componentes/Estilos.css'
import { productosIniciales } from '../data/productosIniciales.js' 

function Productos() {
  return (
    <>

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Productos</h1>
          <span className="badge text-bg-primary">{productosIniciales.length} productos</span>
        </div>
        
        <div className="row g-4">
          {productosIniciales.map((producto) => (
            <div className="col-12 col-md-6 col-lg-4" key={producto.id}>
              <div className="card h-100 shadow-sm">
                <img 
                  src={producto.imagen} 
                  className="card-img-top" 
                  alt={producto.nombre} 
                  style={{ height: '250px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text text-muted">{producto.categoria}</p>
                  <p className="card-text fs-4 fw-bold mt-auto">${producto.precio}</p>
                  
                  <button className="btn btn-primary w-100 mt-3">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
    </>
  )
}

export default Productos