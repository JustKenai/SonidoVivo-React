import { useState } from 'react';

const productoVacio = {
  id: '',
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  imagen: ''
};

export default function PanelAdministrador() {
  const [busqueda, setBusqueda] = useState('');
  const [form, setForm] = useState(productoVacio);
  const [productos, setProductos] = useState([]);

  const actualizarFormulario = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    console.log("Producto a guardar:", form);
  };

  return (
    <>

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="fw-bold mb-0">Gestión de Inventario</h1>
            <p className="text-muted mb-0">Administra catálogo, existencias e imágenes de productos</p>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-primary" 
              data-bs-toggle="modal" 
              data-bs-target="#modalProducto" 
              id="btnNuevoProducto"
              onClick={() => setForm(productoVacio)}
            >
              + Agregar Nuevo Producto
            </button>
            <button className="btn btn-outline-danger" id="btnCerrarSesion">
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <input 
              type="text" 
              id="filtroAdmin" 
              className="form-control" 
              placeholder="Buscar por nombre o categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-md-4 text-md-end d-flex align-items-center justify-content-md-end">
            <span className="badge bg-dark fs-6 py-2 px-3" id="badgeTotalProductos">
              {productos.length} productos
            </span>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Img</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Precio</th>
                  <th scope="col" style={{ width: '180px' }}>Stock</th>
                  <th scope="col" className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody id="tablaAdminCuerpo">
                {productos.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <div className="modal fade" id="modalProducto" tabIndex="-1" aria-labelledby="modalProductoLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="modalProductoLabel">
                {form.id ? 'Editar Producto' : 'Agregar Producto'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              <form id="formAdminProducto" onSubmit={guardarProducto} noValidate>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label htmlFor="prodNombre" className="form-label fw-semibold">Nombre del producto</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="prodNombre" 
                      name="nombre"
                      placeholder="Ej: Fender Stratocaster" 
                      value={form.nombre}
                      onChange={actualizarFormulario}
                      required 
                    />
                    <div id="errorProdNombre" className="invalid-feedback"></div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="prodCategoria" className="form-label fw-semibold">Categoría</label>
                    <select 
                      className="form-select" 
                      id="prodCategoria" 
                      name="categoria"
                      value={form.categoria}
                      onChange={actualizarFormulario}
                      required
                    >
                      <option value="">Selecciona...</option>
                      <option value="Guitarras Acústicas">Guitarras Acústicas</option>
                      <option value="Guitarras Eléctricas">Guitarras Eléctricas</option>
                      <option value="Bajos Eléctricos">Bajos Eléctricos</option>
                      <option value="Baterías">Baterías</option>
                      <option value="Teclados y Pianos">Teclados y Pianos</option>
                      <option value="Amplificadores">Amplificadores</option>
                      <option value="Micrófonos">Micrófonos</option>
                      <option value="Pedales de Efectos">Pedales de Efectos</option>
                      <option value="Accesorios">Accesorios</option>
                      <option value="Estudio y Grabación">Estudio y Grabación</option>
                    </select>
                    <div id="errorProdCategoria" className="invalid-feedback"></div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="prodPrecio" className="form-label fw-semibold">Precio ($ CLP)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="prodPrecio" 
                      name="precio"
                      min="100" 
                      placeholder="Ej: 199990" 
                      value={form.precio}
                      onChange={actualizarFormulario}
                      required 
                    />
                    <div id="errorProdPrecio" className="invalid-feedback"></div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="prodStock" className="form-label fw-semibold">Stock Inicial</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="prodStock" 
                      name="stock"
                      min="0" 
                      placeholder="Ej: 10" 
                      value={form.stock}
                      onChange={actualizarFormulario}
                      required 
                    />
                    <div id="errorProdStock" className="invalid-feedback"></div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="prodImagen" className="form-label fw-semibold">URL de la Imagen</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      id="prodImagen" 
                      name="imagen"
                      placeholder="https://ejemplo.com/foto.jpg" 
                      value={form.imagen}
                      onChange={actualizarFormulario}
                      required 
                    />
                    <div id="errorProdImagen" className="invalid-feedback"></div>
                  </div>

                  <div className="col-12 text-center my-2">
                    <p className="small text-muted mb-1">Vista previa:</p>
                    <img 
                      id="previewImagen" 
                      src={form.imagen || "https://placehold.co/150x150?text=Sin+Imagen"} 
                      alt="Vista previa" 
                      className="border rounded" 
                      style={{ width: '110px', height: '110px', objectFit: 'cover' }} 
                    />
                  </div>
                </div>

                <div className="modal-footer px-0 pb-0 mt-4">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-primary" id="btnGuardarProd">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}