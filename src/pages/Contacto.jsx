import { useState } from 'react';
import Navbar from '../componentes/Navbar';
import Footer from '../componentes/Footer';

const vacio = { nombre: '', email: '', asunto: '', mensaje: '' };

function validarContacto(campos) {
  const errores = {};
  if (!campos.nombre) errores.nombre = 'El nombre es obligatorio';
  if (!campos.email) {
    errores.email = 'El correo electrónico es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(campos.email)) {
    errores.email = 'El correo electrónico no es válido';
  }
  if (!campos.asunto) errores.asunto = 'Selecciona un motivo de contacto';
  if (!campos.mensaje) errores.mensaje = 'El mensaje es obligatorio';
  return errores;
}

export default function Contacto() {
  const [campos, setCampos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [enviado, setEnviado] = useState(false);

  function actualizar(evento) {
    const { name, value } = evento.target;
    const siguientes = { ...campos, [name]: value };
    setCampos(siguientes);
    setTocados((actual) => ({ ...actual, [name]: true }));
    setErrores((actual) => ({
      ...actual,
      [name]: validarContacto(siguientes)[name]
    }));
    setEnviado(false);
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = validarContacto(campos);
    setErrores(nuevos);
    setTocados({ nombre: true, email: true, asunto: true, mensaje: true });
    if (!Object.keys(nuevos).length) {
      setEnviado(true);
      setCampos(vacio);
      setTocados({});
    }
  }

  return (
    <>
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <h1 className="fw-bold">Contáctanos 📬</h1>
              <p className="text-muted">¿Tienes alguna duda sobre nuestros instrumentos o servicios? Escríbenos.</p>
            </div>

            <div className="row g-4">
              <div className="col-md-5">
                <div className="card p-4 h-100 shadow-sm border-0 bg-light">
                  <h4 className="fw-bold mb-3">Información de la Tienda</h4>
                  <p className="mb-2"><strong>📍 Dirección:</strong> 2354 Álvarez, Viña del Mar, Valparaíso</p>
                  <p className="mb-2"><strong>🕒 Horario:</strong> Lun a Sáb: 10:00 - 19:30 hrs</p>
                  <p className="mb-2"><strong>📞 Teléfono:</strong> +56 32 212 3456</p>
                  <p className="mb-4"><strong>✉️ Correo:</strong> contacto@sonidovivo.cl</p>

                  <hr />

                  <h5 className="fw-bold mb-2">Servicios Técnicos</h5>
                  <p className="small text-muted mb-0">
                    Realizamos mantención, calibración y reparación de guitarras, bajos y otros instrumentos de cuerda.
                  </p>
                </div>
              </div>

              <div className="col-md-7">
                <div className="card p-4 shadow-sm border-0">
                  {enviado && (
                    <div className="alert alert-success" role="alert">
                      ¡Gracias por contactarnos! Tu mensaje fue enviado con éxito.
                    </div>
                  )}

                  <form onSubmit={enviar} noValidate>
                    <div className="mb-3">
                      <label htmlFor="nombreContacto" className="form-label fw-semibold">Nombre completo</label>
                      <input 
                        type="text" 
                        className={`form-control ${tocados.nombre && errores.nombre ? 'is-invalid' : ''} ${tocados.nombre && !errores.nombre ? 'is-valid' : ''}`} 
                        id="nombreContacto" 
                        name="nombre"
                        placeholder="Ej: Juan Pérez"
                        value={campos.nombre}
                        onChange={actualizar}
                      />
                      {tocados.nombre && errores.nombre && (
                        <div className="invalid-feedback">{errores.nombre}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="emailContacto" className="form-label fw-semibold">Correo electrónico</label>
                      <input 
                        type="email" 
                        className={`form-control ${tocados.email && errores.email ? 'is-invalid' : ''} ${tocados.email && !errores.email ? 'is-valid' : ''}`} 
                        id="emailContacto" 
                        name="email"
                        placeholder="nombre@ejemplo.com"
                        value={campos.email}
                        onChange={actualizar}
                      />
                      {tocados.email && errores.email && (
                        <div className="invalid-feedback">{errores.email}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="asuntoContacto" className="form-label fw-semibold">Motivo de contacto</label>
                      <select 
                        className={`form-select ${tocados.asunto && errores.asunto ? 'is-invalid' : ''} ${tocados.asunto && !errores.asunto ? 'is-valid' : ''}`} 
                        id="asuntoContacto"
                        name="asunto"
                        value={campos.asunto}
                        onChange={actualizar}
                      >
                        <option value="">Selecciona una opción...</option>
                        <option value="consulta">Consulta de catálogo / stock</option>
                        <option value="reparacion">Servicio técnico / Reparaciones</option>
                        <option value="pedidos">Estado de compra / pedido</option>
                        <option value="otro">Otro</option>
                      </select>
                      {tocados.asunto && errores.asunto && (
                        <div className="invalid-feedback">{errores.asunto}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="mensajeContacto" className="form-label fw-semibold">Mensaje</label>
                      <textarea 
                        className={`form-control ${tocados.mensaje && errores.mensaje ? 'is-invalid' : ''} ${tocados.mensaje && !errores.mensaje ? 'is-valid' : ''}`} 
                        id="mensajeContacto" 
                        name="mensaje"
                        rows="4" 
                        placeholder="Escribe tu consulta aquí..."
                        value={campos.mensaje}
                        onChange={actualizar}
                      ></textarea>
                      {tocados.mensaje && errores.mensaje && (
                        <div className="invalid-feedback">{errores.mensaje}</div>
                      )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2">
                      Enviar Mensaje
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}