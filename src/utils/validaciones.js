import { normalizar } from './formatos.js';

export function validarContacto(campos) {
  const errores = {};
  
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(campos.email.trim())) {
    errores.email = 'Ingresa un correo electrónico válido.';
  }
  
  if (!/^[a-zA-Z0-9\s.,!?'-]{5,100}$/.test(campos.asunto.trim())) {
    errores.asunto = 'El asunto debe tener entre 5 y 100 caracteres válidos.';
  }
  
  if (!/^[a-zA-Z0-9\s.,!?'"()\n-:;]{10,500}$/.test(campos.mensaje.trim())) {
    errores.mensaje = 'El mensaje debe tener entre 10 y 500 caracteres válidos.';
  }

  return errores;
}

export function validarProducto(datos, productos, idActual = null) {
  const errores = {};

  if (datos.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  } else if (
    productos.some(
      (p) => p.id !== idActual && normalizar(p.nombre) === normalizar(datos.nombre)
    )
  ) {
    errores.nombre = 'Ya existe un instrumento con ese nombre.';
  }

  if (datos.categoria.trim().length < 3) {
    errores.categoria = 'Ingresa una categoría válida.';
  }

  if (!datos.precio || isNaN(datos.precio) || Number(datos.precio) <= 0) {
    errores.precio = 'El precio debe ser un número mayor a 0.';
  }

  if (datos.stock === '' || !Number.isInteger(Number(datos.stock)) || Number(datos.stock) < 0) {
    errores.stock = 'El stock debe ser un entero mayor o igual a 0.';
  }

  if (!datos.imagen.trim().startsWith('http')) {
    errores.imagen = 'Ingresa una URL de imagen válida (http/https).';
  }

  return errores;
}