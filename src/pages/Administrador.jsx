import { useState } from 'react';

const vacio = { email: '', password: '' };

function validarLogin(campos) {
  const errores = {};
  if (!campos.email) {
    errores.email = 'El correo electrónico es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(campos.email)) {
    errores.email = 'El correo electrónico no es válido';
  }
  if (!campos.password) {
    errores.password = 'La contraseña es obligatoria';
  }
  return errores;
}

export default function AccesoAdministrador() {
  const [campos, setCampos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const [errorLogin, setErrorLogin] = useState(false);

  function actualizar(evento) {
    const { name, value } = evento.target;
    const siguientes = { ...campos, [name]: value };
    setCampos(siguientes);
    setTocados((actual) => ({ ...actual, [name]: true }));
    setErrores((actual) => ({
      ...actual,
      [name]: validarLogin(siguientes)[name]
    }));
    setErrorLogin(false);
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = validarLogin(campos);
    setErrores(nuevos);
    setTocados({ email: true, password: true });

    if (!Object.keys(nuevos).length) {
      if (campos.email === 'admin@sonidovivo.cl' && campos.password === '123456') {
        setErrorLogin(false);
        alert('Ingreso exitoso al panel de administrador');
      } else {
        setErrorLogin(true);
      }
    }
  }

  return (
    <>
      
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card p-4 shadow-sm border-0">
              <h2 className="text-center mb-4 fw-bold">Acceso Administrador</h2>

              {errorLogin && (
                <div className="alert alert-danger" role="alert">
                  Credenciales incorrectas. Intenta nuevamente.
                </div>
              )}

              <form onSubmit={enviar} noValidate>
                <div className="mb-3">
                  <label htmlFor="adminEmail" className="form-label fw-semibold">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className={`form-control ${tocados.email && errores.email ? 'is-invalid' : ''} ${tocados.email && !errores.email ? 'is-valid' : ''}`}
                    id="adminEmail" 
                    name="email"
                    placeholder="admin@sonidovivo.cl"
                    value={campos.email}
                    onChange={actualizar}
                  />
                  {tocados.email && errores.email && (
                    <div className="invalid-feedback">{errores.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="adminPassword" className="form-label fw-semibold">Contraseña</label>
                  <input 
                    type="password" 
                    className={`form-control ${tocados.password && errores.password ? 'is-invalid' : ''} ${tocados.password && !errores.password ? 'is-valid' : ''}`}
                    id="adminPassword" 
                    name="password"
                    placeholder="••••••••"
                    value={campos.password}
                    onChange={actualizar}
                  />
                  {tocados.password && errores.password && (
                    <div className="invalid-feedback">{errores.password}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                  Ingresar al Panel
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}