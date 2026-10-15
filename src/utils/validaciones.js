const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEX_TEXTO_GENERAL = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s.,!?¿¡'-]+$/;
const REGEX_MENSAJE_MULTILINEA = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s.,!?¿¡'"\-():;\n\r]+$/;

export function validarEmail(valor) {
  if (!valor || valor.trim() === "") return "El correo electrónico es obligatorio.";
  if (!REGEX_EMAIL.test(valor.trim())) return "Ingresa un correo electrónico válido.";
  return null;
}

export function validarTexto(valor, nombreCampo = "El campo", min = 3, max = 100) {
  if (!valor || valor.trim() === "") return `${nombreCampo} es obligatorio.`;
  if (valor.length < min) return `${nombreCampo} debe tener al menos ${min} caracteres.`;
  if (valor.length > max) return `${nombreCampo} no puede superar los ${max} caracteres.`;
  if (!REGEX_TEXTO_GENERAL.test(valor)) return `${nombreCampo} contiene caracteres no permitidos.`;
  return null;
}

export function validarSeleccion(valor, mensajeError = "Debes seleccionar una opción.") {
  if (!valor || valor === "") return mensajeError;
  return null;
}

export function validarMensaje(valor, min = 10, max = 500) {
  if (!valor || valor.trim() === "") return "El mensaje es obligatorio.";
  if (valor.length < min) return `El mensaje debe tener al menos ${min} caracteres.`;
  if (valor.length > max) return `El mensaje no puede superar los ${max} caracteres.`;
  if (!REGEX_MENSAJE_MULTILINEA.test(valor)) return "El mensaje contiene caracteres no permitidos.";
  return null;
}

export function validarPassword(valor, min = 6) {
  if (!valor || valor.trim() === "") return "La contraseña es obligatoria.";
  if (valor.length < min) return `La contraseña debe tener al menos ${min} caracteres.`;
  return null;
}

export function validarProducto(form) {
  const errores = {};
  if (!form.nombre.trim()) errores.nombre = 'El nombre es obligatorio';
  if (!form.categoria) errores.categoria = 'La categoría es obligatoria';
  if (!form.precio || Number(form.precio) <= 0) errores.precio = 'El precio debe ser mayor a 0';
  if (!form.stock || Number(form.stock) < 0) errores.stock = 'El stock no puede ser negativo';
  if (!form.imagen.trim()) errores.imagen = 'La URL de la imagen es obligatoria';
  return errores;
}