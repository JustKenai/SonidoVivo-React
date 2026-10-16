import { describe, expect, it } from 'vitest';
import { precioCLP, normalizar, estadoStock } from './formatos.js';

describe('precioCLP', () => {
  it('formatea un número como pesos chilenos con punto de miles', () => {
    // Se quitan los espacios por si el navegador/Node usa un espacio especial
    expect(precioCLP(599990).replace(/\s/g, '')).toBe('$599.990');
  });

  it('no muestra decimales', () => {
    expect(precioCLP(19990.9).replace(/\s/g, '')).toBe('$19.991');
  });
});

describe('normalizar', () => {
  it('quita tildes, pasa a minúsculas y recorta espacios', () => {
    expect(normalizar('  ÁRBOL Canción  ')).toBe('arbol cancion');
  });

  it('convierte valores que no son texto', () => {
    expect(normalizar(123)).toBe('123');
  });
});

describe('estadoStock', () => {
  it('indica "Agotado" cuando no hay unidades', () => {
    expect(estadoStock(0)).toEqual({ texto: 'Agotado', variante: 'danger' });
  });

  it('trata un stock negativo como agotado', () => {
    expect(estadoStock(-2).texto).toBe('Agotado');
  });

  it('avisa las últimas unidades cuando quedan 3 o menos', () => {
    expect(estadoStock(1)).toEqual({
      texto: '¡Últimas 1 unidades!',
      variante: 'warning',
    });
    expect(estadoStock(3).variante).toBe('warning');
  });

  it('indica "En Stock" cuando hay más de 3 unidades', () => {
    expect(estadoStock(4)).toEqual({ texto: 'En Stock', variante: 'success' });
    expect(estadoStock(50).variante).toBe('success');
  });
});
