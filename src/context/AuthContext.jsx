import { createContext, useContext, useEffect, useState } from 'react';
import { cargarSesion, guardarSesion } from '../services/storage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(cargarSesion);
  const [errorGuardado, setErrorGuardado] = useState(false);

  useEffect(() => {
    const exito = guardarSesion(sesion);
    setErrorGuardado(!exito);
  }, [sesion]);

  function ingresar(email, contrasena) {
    if (email.trim().toLowerCase() !== 'admin@sonidovivo.cl' || contrasena !== 'admin123') {
      return false;
    }

    const usuarioAutenticado = {
      nombre: 'Administrador SonidoVivo',
      email: 'admin@sonidovivo.cl',
      rol: 'admin',
      logueado: true,
    };

    setSesion(usuarioAutenticado);
    return true;
  }

  const cerrarSesion = () => {
    setSesion(null);
  };

  return (
    <AuthContext.Provider
      value={{
        sesion,
        ingresar,
        cerrarSesion,
        errorGuardado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.');
  }
  return contexto;
}