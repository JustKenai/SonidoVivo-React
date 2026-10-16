import { describe, expect, it } from 'vitest';
import {
  COSTO_ENVIO,
  crearEstado,
  detalleCarrito,
  resumenCarrito,
  tiendaReducer,
} from './tiendaReducer.jsx';

const producto = {
  id: 1,
  nombre: 'Guitarra',
  precio: 10000,
  stock: 2,
  categoria: 'Accesorios',
  imagen: 'https://example.com/guitarra.jpg',
};

// Cada prueba parte de un estado nuevo con un solo producto
const iniciar = () => crearEstado([{ ...producto }]);

describe('crearEstado', () => {
  it('crea el estado con productos, carrito vacío y sin aviso', () => {
    const estado = crearEstado([producto]);
    expect(estado).toEqual({ productos: [producto], carrito: [], aviso: null });
  });
});

describe('AGREGAR', () => {
  it('agrega un producto nuevo al carrito con cantidad 1', () => {
    const estado = tiendaReducer(iniciar(), { type: 'AGREGAR', id: 1 });
    expect(estado.carrito).toEqual([{ id: 1, cantidad: 1 }]);
    expect(estado.aviso).toEqual({
      texto: 'Guitarra agregado al carrito.',
      tipo: 'success',
    });
  });

  it('acumula la cantidad sin duplicar filas ni modificar el estado anterior', () => {
    const inicial = iniciar();
    const uno = tiendaReducer(inicial, { type: 'AGREGAR', id: 1 });
    const dos = tiendaReducer(uno, { type: 'AGREGAR', id: 1 });
    expect(dos.carrito).toEqual([{ id: 1, cantidad: 2 }]);
    expect(inicial.carrito).toEqual([]);
  });

  it('rechaza agregar más unidades que el stock disponible', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 2 }]);
    const estado = tiendaReducer(inicial, { type: 'AGREGAR', id: 1 });
    expect(estado.carrito).toEqual([{ id: 1, cantidad: 2 }]);
    expect(estado.aviso.tipo).toBe('warning');
  });

  it('rechaza productos sin stock o que no existen', () => {
    const sinStock = crearEstado([{ ...producto, stock: 0 }]);
    expect(tiendaReducer(sinStock, { type: 'AGREGAR', id: 1 }).carrito).toEqual([]);
    expect(tiendaReducer(iniciar(), { type: 'AGREGAR', id: 99 }).carrito).toEqual([]);
  });
});

describe('CANTIDAD', () => {
  it('cambia la cantidad de un producto del carrito', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 1 }]);
    const estado = tiendaReducer(inicial, { type: 'CANTIDAD', id: 1, cantidad: 2 });
    expect(estado.carrito).toEqual([{ id: 1, cantidad: 2 }]);
    expect(estado.aviso).toBeNull();
  });

  it('retira el producto si la cantidad llega a cero', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 1 }]);
    const estado = tiendaReducer(inicial, { type: 'CANTIDAD', id: 1, cantidad: 0 });
    expect(estado.carrito).toEqual([]);
  });

  it.each([-1, 1.5, 3, NaN])('rechaza la cantidad inválida %s', (cantidad) => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 1 }]);
    const estado = tiendaReducer(inicial, { type: 'CANTIDAD', id: 1, cantidad });
    expect(estado.carrito).toEqual([{ id: 1, cantidad: 1 }]);
    expect(estado.aviso.tipo).toBe('warning');
  });
});

describe('QUITAR y VACIAR', () => {
  it('QUITAR retira solo el producto indicado', () => {
    const inicial = crearEstado(
      [producto, { ...producto, id: 2, nombre: 'Bajo' }],
      [
        { id: 1, cantidad: 1 },
        { id: 2, cantidad: 1 },
      ],
    );
    const estado = tiendaReducer(inicial, { type: 'QUITAR', id: 1 });
    expect(estado.carrito).toEqual([{ id: 2, cantidad: 1 }]);
    expect(estado.aviso.tipo).toBe('info');
  });

  it('VACIAR deja el carrito sin productos', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 2 }]);
    const estado = tiendaReducer(inicial, { type: 'VACIAR' });
    expect(estado.carrito).toEqual([]);
    expect(estado.aviso.texto).toBe('El carrito quedó vacío.');
  });
});

describe('COMPRAR', () => {
  it('descuenta el stock y vacía el carrito', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 2 }]);
    const estado = tiendaReducer(inicial, { type: 'COMPRAR' });
    expect(estado.productos[0].stock).toBe(0);
    expect(estado.carrito).toEqual([]);
    expect(estado.aviso.tipo).toBe('success');
    // El estado original no se modifica
    expect(inicial.productos[0].stock).toBe(2);
  });

  it('no compra si el carrito está vacío', () => {
    const estado = tiendaReducer(iniciar(), { type: 'COMPRAR' });
    expect(estado.aviso).toEqual({
      texto: 'El carrito está vacío.',
      tipo: 'warning',
    });
  });

  it('rechaza toda la compra si una cantidad supera el stock', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 5 }]);
    const estado = tiendaReducer(inicial, { type: 'COMPRAR' });
    expect(estado.productos).toEqual(inicial.productos);
    expect(estado.carrito).toEqual(inicial.carrito);
    expect(estado.aviso.tipo).toBe('danger');
  });
});

describe('GUARDAR_PRODUCTO', () => {
  const nuevo = {
    nombre: 'Teclado',
    categoria: 'Teclados y Pianos',
    precio: '15000',
    stock: '4',
    imagen: 'https://example.com/teclado.jpg',
  };

  it('crea un producto con id nuevo y convierte precio y stock a número', () => {
    const estado = tiendaReducer(iniciar(), {
      type: 'GUARDAR_PRODUCTO',
      id: null,
      datos: nuevo,
    });
    expect(estado.productos).toHaveLength(2);
    expect(estado.productos[1]).toMatchObject({
      id: 2,
      nombre: 'Teclado',
      precio: 15000,
      stock: 4,
    });
    expect(estado.aviso.texto).toBe('Producto creado.');
  });

  it('asigna el id 1 cuando el catálogo está vacío', () => {
    const estado = tiendaReducer(crearEstado([]), {
      type: 'GUARDAR_PRODUCTO',
      id: null,
      datos: nuevo,
    });
    expect(estado.productos[0].id).toBe(1);
  });

  it('usa el id más alto + 1 aunque los ids no sean consecutivos', () => {
    const inicial = crearEstado([{ ...producto, id: 5 }]);
    const estado = tiendaReducer(inicial, {
      type: 'GUARDAR_PRODUCTO',
      id: null,
      datos: nuevo,
    });
    expect(estado.productos[1].id).toBe(6);
  });

  it('edita un producto existente manteniendo su id', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 2 }]);
    const estado = tiendaReducer(inicial, {
      type: 'GUARDAR_PRODUCTO',
      id: 1,
      datos: { ...producto, precio: 15000 },
    });
    expect(estado.productos).toHaveLength(1);
    expect(estado.productos[0]).toMatchObject({ id: 1, precio: 15000 });
    expect(estado.aviso.texto).toBe('Producto actualizado.');
    // El carrito consulta el precio nuevo
    expect(detalleCarrito(estado)[0].precio).toBe(15000);
    expect(resumenCarrito(estado).subtotal).toBe(30000);
  });

  it('rechaza datos inválidos y no cambia los productos', () => {
    const inicial = iniciar();
    const estado = tiendaReducer(inicial, {
      type: 'GUARDAR_PRODUCTO',
      id: null,
      datos: { ...nuevo, precio: '-1' },
    });
    expect(estado.productos).toEqual(inicial.productos);
    expect(estado.aviso).toEqual({
      texto: 'Revisa los datos del producto.',
      tipo: 'danger',
    });
  });

  it('avisa si se intenta editar un producto que ya no existe', () => {
    const estado = tiendaReducer(iniciar(), {
      type: 'GUARDAR_PRODUCTO',
      id: 99,
      datos: nuevo,
    });
    expect(estado.productos).toHaveLength(1);
    expect(estado.aviso).toEqual({
      texto: 'El producto ya no existe.',
      tipo: 'warning',
    });
  });
});

describe('ELIMINAR_PRODUCTO', () => {
  it('elimina el producto del catálogo y también del carrito', () => {
    const inicial = crearEstado([producto], [{ id: 1, cantidad: 1 }]);
    const estado = tiendaReducer(inicial, { type: 'ELIMINAR_PRODUCTO', id: 1 });
    expect(estado.productos).toEqual([]);
    expect(estado.carrito).toEqual([]);
    expect(estado.aviso.tipo).toBe('info');
  });
});

describe('CERRAR_AVISO y acciones desconocidas', () => {
  it('CERRAR_AVISO borra el aviso', () => {
    const conAviso = { ...iniciar(), aviso: { texto: 'Hola', tipo: 'info' } };
    expect(tiendaReducer(conAviso, { type: 'CERRAR_AVISO' }).aviso).toBeNull();
  });

  it('una acción desconocida devuelve el mismo estado', () => {
    const inicial = iniciar();
    expect(tiendaReducer(inicial, { type: 'NO_EXISTE' })).toBe(inicial);
  });
});

describe('detalleCarrito y resumenCarrito', () => {
  it('une cada fila del carrito con los datos de su producto', () => {
    const estado = crearEstado([producto], [{ id: 1, cantidad: 2 }]);
    expect(detalleCarrito(estado)).toEqual([{ ...producto, cantidad: 2 }]);
  });

  it('ignora filas del carrito cuyo producto ya no existe', () => {
    const estado = crearEstado([producto], [{ id: 99, cantidad: 1 }]);
    expect(detalleCarrito(estado)).toEqual([]);
  });

  it('calcula subtotal, envío, unidades y total', () => {
    const estado = crearEstado([producto], [{ id: 1, cantidad: 2 }]);
    expect(resumenCarrito(estado)).toEqual({
      subtotal: 20000,
      envio: COSTO_ENVIO,
      unidades: 2,
      total: 20000 + COSTO_ENVIO,
    });
  });

  it('no cobra envío si el carrito está vacío', () => {
    expect(resumenCarrito(iniciar())).toEqual({
      subtotal: 0,
      envio: 0,
      unidades: 0,
      total: 0,
    });
  });
});
