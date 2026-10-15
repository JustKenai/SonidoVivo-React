import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { tiendaReducer } from "../store/tiendaReducer";
import { cargarTienda, guardarTienda, cargarSesion, guardarSesion } from "../services/storage";

const productoVacio = {
  id: '',
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  imagen: ''
};

export default function PanelAdmin() {
  const navigate = useNavigate();
  const [estado, dispatch] = useReducer(tiendaReducer, null, cargarTienda);
  const [busqueda, setBusqueda] = useState('');
  const [form, setForm] = useState(productoVacio);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (!cargarSesion()) {
      navigate("/administrador");
    }
  }, [navigate]);

  useEffect(() => {
    guardarTienda(estado);
  }, [estado]);

  const cerrarSesion = () => {
    guardarSesion(null);
    navigate("/administrador");
  };

  const actualizarFormulario = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrores({ ...errores, [name]: '' });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim() || form.nombre.length < 3) nuevosErrores.nombre = "Nombre inválido (min 3 caracteres)";
    if (!form.categoria) nuevosErrores.categoria = "Selecciona una categoría";
    if (!form.precio || Number(form.precio) <= 0) nuevosErrores.precio = "Precio debe ser mayor a 0";
    if (form.stock === '' || Number(form.stock) < 0) nuevosErrores.stock = "Stock inválido";
    if (!form.imagen.trim()) nuevosErrores.imagen = "Ingresa URL de imagen";
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    dispatch({ 
      type: 'GUARDAR_PRODUCTO', 
      datos: form, 
      id: form.id || null 
    });
    
    setMostrarModal(false);
  };

  const abrirNuevo = () => {
    setForm(productoVacio);
    setErrores({});
    setMostrarModal(true);
  };

  const abrirEditar = (prod) => {
    setForm(prod);
    setErrores({});
    setMostrarModal(true);
  };

  const eliminarProducto = (id, nombre) => {
    if (window.confirm(`¿Deseas eliminar "${nombre}" del catálogo?`)) {
      dispatch({ type: 'ELIMINAR_PRODUCTO', id });
    }
  };

  const sumarStock = (id) => {
    const producto = estado.productos.find(p => p.id === id);
    if (producto) {
      dispatch({ type: 'GUARDAR_PRODUCTO', datos: { ...producto, stock: Number(producto.stock) + 1 }, id });
    }
  };

  const restarStock = (id) => {
    const producto = estado.productos.find(p => p.id === id);
    if (producto && producto.stock > 0) {
      dispatch({ type: 'GUARDAR_PRODUCTO', datos: { ...producto, stock: Number(producto.stock) - 1 }, id });
    }
  };

  const cambiarStock = (id, valor) => {
    const nuevoStock = Math.max(0, parseInt(valor) || 0);
    const producto = estado.productos.find(p => p.id === id);
    if (producto) {
      dispatch({ type: 'GUARDAR_PRODUCTO', datos: { ...producto, stock: nuevoStock }, id });
    }
  };

  const productosFiltrados = estado.productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="fw-bold mb-0">Gestión de Inventario</h1>
            <p className="text-muted mb-0">Administra catálogo, existencias e imágenes de productos</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={abrirNuevo}>
              + Agregar Nuevo Producto
            </button>
            <button className="btn btn-outline-danger" onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
          </div>
        </div>

        {estado.aviso && (
          <div className={`alert alert-${estado.aviso.tipo} alert-dismissible fade show`} role="alert">
            {estado.aviso.texto}
            <button type="button" className="btn-close" onClick={() => dispatch({ type: 'CERRAR_AVISO' })}></button>
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Buscar por nombre o categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-md-4 text-md-end d-flex align-items-center justify-content-md-end">
            <span className="badge bg-dark fs-6 py-2 px-3">
              {productosFiltrados.length} de {estado.productos.length} productos
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
              <tbody>
                {productosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No se encontraron productos.
                    </td>
                  </tr>
                )}
                {productosFiltrados.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre} 
                        style={{ width: '45px', height: '45px', objectFit: 'cover' }} 
                        className="rounded border"
                      />
                    </td>
                    <td className="fw-semibold">{producto.nombre}</td>
                    <td>
                      <span className="badge bg-secondary">{producto.categoria}</span>
                    </td>
                    <td className="fw-bold">${Number(producto.precio).toLocaleString("es-CL")}</td>
                    <td>
                      <div className="input-group input-group-sm" style={{ maxWidth: '140px' }}>
                        <button className="btn btn-outline-secondary" onClick={() => restarStock(producto.id)}>-</button>
                        <input 
                          type="number" 
                          className="form-control text-center" 
                          value={producto.stock} 
                          min="0"
                          onChange={(e) => cambiarStock(producto.id, e.target.value)}
                        />
                        <button className="btn btn-outline-secondary" onClick={() => sumarStock(producto.id)}>+</button>
                      </div>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => abrirEditar(producto)}>Editar</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProducto(producto.id, producto.nombre)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {mostrarModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    {form.id ? `Editar: ${form.nombre}` : 'Agregar Nuevo Producto'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setMostrarModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={guardarProducto} noValidate>
                    <div className="row g-3">
                      <div className="col-md-8">
                        <label className="form-label fw-semibold">Nombre del producto</label>
                        <input 
                          type="text" 
                          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} 
                          name="nombre"
                          value={form.nombre}
                          onChange={actualizarFormulario}
                        />
                        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Categoría</label>
                        <select 
                          className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                          name="categoria"
                          value={form.categoria}
                          onChange={actualizarFormulario}
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
                        {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Precio ($ CLP)</label>
                        <input 
                          type="number" 
                          className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                          name="precio"
                          value={form.precio}
                          onChange={actualizarFormulario}
                        />
                        {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Stock Inicial</label>
                        <input 
                          type="number" 
                          className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                          name="stock"
                          value={form.stock}
                          onChange={actualizarFormulario}
                        />
                        {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">URL de la Imagen</label>
                        <input 
                          type="url" 
                          className={`form-control ${errores.imagen ? 'is-invalid' : ''}`}
                          name="imagen"
                          value={form.imagen}
                          onChange={actualizarFormulario}
                        />
                        {errores.imagen && <div className="invalid-feedback">{errores.imagen}</div>}
                      </div>

                      <div className="col-12 text-center my-2">
                        <p className="small text-muted mb-1">Vista previa:</p>
                        <img 
                          src={form.imagen || "https://placehold.co/150x150?text=Sin+Imagen"} 
                          alt="Vista previa" 
                          className="border rounded" 
                          style={{ width: '110px', height: '110px', objectFit: 'cover' }} 
                        />
                      </div>
                    </div>

                    <div className="modal-footer px-0 pb-0 mt-4">
                      <button type="button" className="btn btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
                      <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}