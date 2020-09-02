---
title: 'El de las pure functions o funciones puras'
date: '2020-09-02'
description: 'O mas bien, el de cuando quise aprender programación funcional y no pude porque aun necesitaba saber que eran las pure functions, los side-effects o la inmutabilidad.'
---

O mas bien, el de cuando empecé con la programación funcional sin saber que eran las **pure functions**, los side-effects o la inmutabilidad. Lo bien cierto, es que aunque no sabía todo lo necesario, estaba en el camino correcto, ya que la base ya la tenía. Y es que después de haber visto las [first-class functions](/first-class-functions-funciones-primera-clase) y las [higher-order
function](/higher-order-functions-funciones-orden-superior), seguir con las **funciones puras** era el paso mas lógico si quería adentrarme en la programación funcional.

## ¿Qué son las funciones puras?

Una función pura o pure function, es una función que dada una entrada retornará siempre la misma salida, además no provocará resultados inesperados o efectos colaterales.

```javascript
const suma = (a, b) => a + b;

console.log(suma(2, 2));
// → 4
```

Es decir, escribir `suma(2, 2)` es exactamente igual que escribir `4`, no habría diferencia alguna. Para unos parámetros de entrada concretos, una función pura **siempre devolverá lo mismo**.

Esto no sucede en absoluto con las funciones impuras.

```javascript
let a = 2;

const suma = (b) => a += b;

console.log(suma(2))
// → 4
console.log(suma(2))
// → 6
```

En este caso, vemos que a pesar de que el parámetro de entrada no varía en las dos llamadas a la función `suma` si que lo hace el valor resultante. Esta situación puede provocar resultados inesperados o **side-effects** en las llamadas a la función y generar errores, ya que para calcular el resultado depende de una variable que esta fuera del ámbito de la función.

Podríamos decir que de una **pure function** siempre podemos esperar **resultados consistentes** ya que dada una entrada nada afectará a la salida obtenida. En el caso de las **impure functions** obtendríamos **resultados inconsistentes** ya que no podemos saber si el resultado obtenido va a sufrir variaciones o no.

### Side-effects e inmutabilidad

Todo aquello que puede alterar el resultado de nuestra función y que no es utilizado para calcular la salida, es un **efecto colateral** o **side-effect**. Algunos side-effects son los siguientes:

1. Modificar las variables de entrada.
2. Llamadas por AJAX o `fetch`.
3. Modificar archivos de disco.
4. `new Date()`
5. Consultar objetos DOM.
6. `console.log()`.

Una función pura es **inmutable** y no alterará el estado de las variables de entrada. Mutar o alterar el estado de una variable de entrada alterará desde ese momento su valor para el resto del código de la aplicación que utilice esa variable, lo cual puede producir bugs y complicar las tareas de debug.

Un ejemplo de función impura que altera una propiedad de un objeto que puede o no ser compartido por el resto del código.

```javascript
const entrada = {
  titulo: 'El de las pure functions o funciones puras',
  autor: {
    nombre: ''
  }
}

const guardarAutorEntrada = (entrada, nombre) => {
  entrada.autor.nombre = nombre;
  return entrada
}

console.log(guardarAutorEntrada(entrada, '@l1oret'))
// → { autor: { nombre: '@l1oret' }, titulo: 'El de las pure functions o funciones puras'}

consoe.log(entrada)
// → { autor: { nombre: '@l1oret' }, titulo: 'El de las pure functions o funciones puras'}
```

Podría convertirse a función pura simplemente creando una copia del objeto de entrada.

```javascript{9}
const entrada = {
  titulo: 'El de las pure functions o funciones puras',
  autor: {
    nombre: ''
  }
}

const guardarAutorEntrada = (entrada, nombre) => {
  const copiaEntrada = JSON.parse(JSON.stringify(entrada));
  copiaEntrada.autor.nombre = nombre;
  return copiaEntrada
}

console.log(guardarAutorEntrada(entrada, '@l1oret'))
// → { autor: { nombre: '@l1oret' }, titulo: 'El de las pure functions o funciones puras'}

console.log(entrada)
// → { autor: { nombre: '' }, titulo: 'El de las pure functions o funciones puras'}
```

Ni que decir tiene que debido a lo predecibles que son, misma entrada misma salida, las pure functions son perfectas para realizar tets unitarios.