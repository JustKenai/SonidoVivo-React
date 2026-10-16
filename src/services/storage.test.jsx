import { describe, expect, it, vi } from 'vitest';
import {
  CLAVES,
  cargarSesion,
  cargarTienda,
  guardarSesion,
  guardarTienda,
  leerJSON,
} from './storage.jsx';
import { productosIniciales } from '../data/productosIniciales.js';

const producto = {
  id: 1,
  nombre: 'Guitarra',
  precio: 10000,
  stock: 5,
  categoria: 'Accesorios',
  imagen: 'https://example.com/guitarra.jpg',
};

describe('leerJSON', () => {
  it('devuelve la alternativa si la clave no existe', () => {
    expect(leerJSON('no-existe', 'alternativa')).toBe('alternativa');
  });

  it('devuelve el valor guardado ya convertido', () => {
    localStorage.setItem('clave', JSON.stringify({ a: 1 }));
    expect(leerJSON('clave', null)).toEqual({ a: 1 });
  });

  it('devuelve la alternativa si el JSON está dañado', () => {
    localStorage.setItem('clave', '{invalido');
    expect(leerJSON('clave', 'alternativa')).toBe('alternativa');
  });
});

describe('cargarTienda', () => {
  it('sin datos guardados usa los productos iniciales y un carrito vacío', () => {
    const estado = cargarTienda();
    expect(estado.productos).toHaveLength(productosIniciales.length);
    expect(estado.carrito).toEqual([]);
    expect(estado.aviso).toBeNull();
  });

  it('recupera el catálogo y el carrito después de guardar', () => {
    const inicial = cargarTienda();
    inicial.carrito = [{ id: 1, cantidad: 2 }];
    expect(guardarTienda(inicial)).toBe(true);
    expect(cargarTienda().carrito).toEqual([{ id: 1, cantidad: 2 }]);
  });

  it('se recupera de un JSON dañado volviendo a los datos iniciales', () => {
    localStorage.setItem(CLAVES.tienda, '{invalido');
    const estado = cargarTienda();
    expect(estado.productos).toHaveLength(productosIniciales.length);
    expect(estado.carrito).toEqual([]);
  });

  it('se recupera de una estructura inválida', () => {
    localStorage.setItem(
      CLAVES.tienda,
      JSON.stringify({ productos: 'incorrecto', carrito: null }),
    );
    const estado = cargarTienda();
    expect(estado.productos).toHaveLength(productosIniciales.length);
    expect(estado.carrito).toEqual([]);
  });

  it('descarta el catálogo guardado si un producto tiene datos inválidos', () => {
    localStorage.setItem(
      CLAVES.tienda,
      JSON.stringify({ productos: [{ ...producto, precio: 0 }], carrito: [] }),
    );
    expect(cargarTienda().productos).toHaveLength(productosIniciales.length);
  });

  it('descarta el catálogo guardado si hay ids repetidos', () => {
    localStorage.setItem(
      CLAVES.tienda,
      JSON.stringify({ productos: [producto, { ...producto }], carrito: [] }),
    );
    expect(cargarTienda().productos).toHaveLength(productosIniciales.length);
  });

  it('limpia del carrito filas repetidas, productos inexistentes y cantidades inválidas', () => {
    localStorage.setItem(
      CLAVES.tienda,
      JSON.stringify({
        productos: [producto, { ...producto, id: 2, nombre: 'Bajo' }],
        carrito: [
          { id: 1, cantidad: 2, extra: 'se descarta' },
          { id: 1, cantidad: 5 },
          { id: 99, cantidad: 1 },
          { id: 2, cantidad: -1 },
          { id: 2, cantidad: 1.5 },
        ],
      }),
    );
    expect(cargarTienda().carrito).toEqual([{ id: 1, cantidad: 2 }]);
  });

  it('recupera los datos guardados con las claves antiguas', () => {
    localStorage.setItem('catalogo_productos', JSON.stringify([producto]));
    localStorage.setItem(
      'sonidovivo-react-carrito',
      JSON.stringify([{ id: 1, cantidad: 1 }]),
    );
    const estado = cargarTienda();
    expect(estado.productos).toEqual([producto]);
    expect(estado.carrito).toEqual([{ id: 1, cantidad: 1 }]);
  });
});

describe('guardarTienda', () => {
  it('guarda solo productos y carrito, sin el aviso', () => {
    const estado = { ...cargarTienda(), aviso: { texto: 'Hola', tipo: 'info' } };
    guardarTienda(estado);
    const guardado = JSON.parse(localStorage.getItem(CLAVES.tienda));
    expect(Object.keys(guardado)).toEqual(['productos', 'carrito']);
  });

  it('devuelve false si el navegador rechaza la escritura', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Sin espacio');
    });
    expect(guardarTienda(cargarTienda())).toBe(false);
  });
});

describe('sesión del administrador', () => {
  it('no hay sesión si no se ha guardado nada', () => {
    expect(cargarSesion()).toBe(false);
  });

  it('guarda la sesión y luego la recupera', () => {
    expect(guardarSesion(true)).toBe(true);
    expect(localStorage.getItem(CLAVES.sesion)).toBe('true');
    expect(cargarSesion()).toBe(true);
  });

  it('cerrar sesión elimina el dato guardado', () => {
    guardarSesion(true);
    guardarSesion(null);
    expect(localStorage.getItem(CLAVES.sesion)).toBeNull();
    expect(cargarSesion()).toBe(false);
  });

  it('solo considera sesión válida el valor "true"', () => {
    localStorage.setItem(CLAVES.sesion, 'false');
    expect(cargarSesion()).toBe(false);
  });

  it('devuelve false si el navegador rechaza la escritura', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Sin espacio');
    });
    expect(guardarSesion(true)).toBe(false);
  });
});
