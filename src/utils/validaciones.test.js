import { describe, expect, it } from 'vitest';
import {
  validarEmail,
  validarTexto,
  validarSeleccion,
  validarMensaje,
  validarPassword,
  validarProducto,
} from './validaciones.js';

describe('validarEmail', () => {
  it('exige el correo', () => {
    expect(validarEmail('')).toBe('El correo electrónico es obligatorio.');
    expect(validarEmail('   ')).toBe('El correo electrónico es obligatorio.');
    expect(validarEmail(undefined)).toBe('El correo electrónico es obligatorio.');
  });

  it('rechaza un correo con formato incorrecto', () => {
    expect(validarEmail('correo-malo')).toBe('Ingresa un correo electrónico válido.');
  });

  it('acepta un correo válido (devuelve null)', () => {
    expect(validarEmail('admin@sonidovivo.cl')).toBeNull();
  });
});

describe('validarTexto', () => {
  it('exige el campo y usa el nombre indicado en el mensaje', () => {
    expect(validarTexto('', 'El nombre')).toBe('El nombre es obligatorio.');
    expect(validarTexto('')).toBe('El campo es obligatorio.');
  });

  it('rechaza textos demasiado cortos', () => {
    expect(validarTexto('ab', 'El nombre')).toBe(
      'El nombre debe tener al menos 3 caracteres.',
    );
  });

  it('rechaza textos demasiado largos', () => {
    expect(validarTexto('a'.repeat(101), 'El nombre')).toBe(
      'El nombre no puede superar los 100 caracteres.',
    );
  });

  it('rechaza caracteres no permitidos', () => {
    expect(validarTexto('Juan @ <3', 'El nombre')).toBe(
      'El nombre contiene caracteres no permitidos.',
    );
  });

  it('acepta un texto válido con tildes', () => {
    expect(validarTexto('Juan Pérez', 'El nombre')).toBeNull();
  });
});

describe('validarSeleccion', () => {
  it('exige elegir una opción', () => {
    expect(validarSeleccion('')).toBe('Debes seleccionar una opción.');
  });

  it('permite un mensaje de error personalizado', () => {
    expect(validarSeleccion('', 'Elige un motivo')).toBe('Elige un motivo');
  });

  it('acepta una opción elegida', () => {
    expect(validarSeleccion('consulta')).toBeNull();
  });
});

describe('validarMensaje', () => {
  it('exige el mensaje', () => {
    expect(validarMensaje('')).toBe('El mensaje es obligatorio.');
  });

  it('rechaza mensajes demasiado cortos', () => {
    expect(validarMensaje('corto')).toBe(
      'El mensaje debe tener al menos 10 caracteres.',
    );
  });

  it('rechaza mensajes demasiado largos', () => {
    expect(validarMensaje('a'.repeat(501))).toBe(
      'El mensaje no puede superar los 500 caracteres.',
    );
  });

  it('rechaza caracteres no permitidos', () => {
    expect(validarMensaje('Hola <script> mundo')).toBe(
      'El mensaje contiene caracteres no permitidos.',
    );
  });

  it('acepta un mensaje válido, incluso con saltos de línea', () => {
    expect(validarMensaje('Quiero información del producto.')).toBeNull();
    expect(validarMensaje('Primera línea\nSegunda línea')).toBeNull();
  });
});

describe('validarPassword', () => {
  it('exige la contraseña', () => {
    expect(validarPassword('')).toBe('La contraseña es obligatoria.');
  });

  it('exige el largo mínimo (6 por defecto)', () => {
    expect(validarPassword('123')).toBe(
      'La contraseña debe tener al menos 6 caracteres.',
    );
  });

  it('permite cambiar el largo mínimo', () => {
    expect(validarPassword('1234567', 8)).toBe(
      'La contraseña debe tener al menos 8 caracteres.',
    );
  });

  it('acepta una contraseña válida', () => {
    expect(validarPassword('123456')).toBeNull();
  });
});

describe('validarProducto', () => {
  const valido = {
    nombre: 'Guitarra Acústica',
    categoria: 'Guitarras Acústicas',
    precio: '15000',
    stock: '5',
    imagen: 'https://example.com/guitarra.jpg',
  };

  it('no devuelve errores con un producto válido', () => {
    expect(validarProducto(valido)).toEqual({});
  });

  it('acepta stock "0" escrito desde el formulario', () => {
    expect(validarProducto({ ...valido, stock: '0' })).toEqual({});
  });

  it('informa todos los campos vacíos a la vez', () => {
    const errores = validarProducto({
      nombre: ' ',
      categoria: '',
      precio: '',
      stock: '',
      imagen: ' ',
    });
    expect(Object.keys(errores)).toEqual([
      'nombre',
      'categoria',
      'precio',
      'stock',
      'imagen',
    ]);
  });

  it('rechaza un precio igual o menor a cero', () => {
    expect(validarProducto({ ...valido, precio: '0' }).precio).toBe(
      'El precio debe ser mayor a 0',
    );
    expect(validarProducto({ ...valido, precio: '-5' }).precio).toBe(
      'El precio debe ser mayor a 0',
    );
  });

  it('rechaza un stock negativo', () => {
    expect(validarProducto({ ...valido, stock: '-1' }).stock).toBe(
      'El stock no puede ser negativo',
    );
  });
});
