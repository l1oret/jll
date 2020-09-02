---
title: 'El del optional chaining operator o operador de encadenamiento opcional'
date: '2020-08-15'
description: 'O mas bien, el cuando decidí que era ya era hora de ponerse al día con novedades como las del optional chaining operator.'
---

O mas bien, el cuando decidí que era ya era hora de ponerse al día con propuestas como las del **optional chaining operator**. Después de haber empezado por el [nullish colaescing operator](/nullish-coalescing-operator-operador-fusion-nula) tenía mucho sentido seguir por ese camino y continuar con el optional chaining operator ya que su uso es complementario. Continuamente se generan [nuevas propuestas](https://github.com/tc39/proposals) para ser incorporadas a la especificación y yo estaba decido a estar al corriente de todas y cada una de ellas.

## ¿Qué es el optional chaining operator?

El optional chaining operator `?.` es un **operador de encadenamiento** como `.`, pero con una importante diferencia. El operador de encadenamiento opcional permite leer una propiedad de un objeto o de un conjunto de objetos conectados sin tener que validar expresamente si cada una de las propiedades intermedias son válidas. Lo cual no es posible con el operador de encadenamiento tradicional `.` ya que causaría un error.

```javascript
const blog = {
  titulo: `Out of the loop`,
  social: {
    twitter: `l1oret`
  }
};

console.log(blog.redes.facebook);
// → Uncaught TypeError: Cannot read property 'facebook' of undefined

console.log(blog.redes?.facebook);
// → undefined

console.log(blog.social?.twitter);
// → l1oret
```

Mediante el optional chaining operator se consigue un código más limpio y con menos posibilidad de error. Podemos usarlo de la siguientes formas.

```javascript
objeto?.propiedad
objeto?.[expresion]
array?.[indice]
funcion?.(argumentos)
```

## Casos de uso

Un caso de uso típico podría ser cuando obtenemos un campo de texto a partir de un selector y queremos acceder a una de sus propiedades.

```javascript
const inputFechaNacimiento = document.querySelector('input[name=fechaNacimiento]');
const fechaNacimiento = inputFechaNacimiento ? inputFechaNacimiento.value : undefined;
```

Si usamos `?.` quedaría de ls siguiente manera:

```javascript
const fechaNacimiento = document.querySelector('input[name=fechaNacimiento]')?.value;
```

Como veíamos al principio del artículo otro ejemplo sería cuando queremos acceder a una propiedad de un objeto.

```javascript
let edad = 25;

if(usuario && usuario.fechaNacimiento && usuario.fechaNacimiento.calcularEdad) {
  edad = usuario.fechaNacimiento.calcularEdad()
}
```

Que se refactorizaría así:

```javascript
let edad = usuario?.fechaNacimiento?.calcularEdad?.() ?? 25;
```

Otro ejemplo que podemos encontrar a menudo es cuando empleamos el operador condicional ternario.

```javascript
const titulo = usuario ? usuario.nombre : 'Nuevo registro';
```

El cual simplificaríamos como:

```javascript
const titulo = usuario?.nombre ?? 'Nuevo registro';
```

También podemos usar el encadenamiento opcional para acceder a una posición en concreto de un array.

```javascript
if(Array.isArray(db.usuarios) && db.usuarios.length > 5) {
  console.log(db.usuarios?.[4].nombreCompleto.primerApellido)
}
```

Que se convierte a:

```javascript
if(Array.isArray(db.usuarios)) {
  console.log(db.usuarios?.[4].nombreCompleto.primerApellido)
}
```

Es conveniente utilizar únicamente `?.` cuando sea necesario. Si sabemos a ciencia cierta que siempre que exista el usuario tendrá el objeto `nombreCompleto` y la propiedad `primerApellido` esta desaconsejado utilizar el encadenamiento opcional. Sin embargo, si tenemos claro que `db` va estar siempre definida, pero es posible que `usuarios` no y mucho menos `usuarios[4]` entonces ahí si que sería aconsejado utilizar `?.`.

Por último, otro caso de uso sería:

```javascript
delete db?.usuarios;
```

En este caso, únicamente sería eliminado el array de usuarios si el objeto `db` existe.

Como ves el uso del optional chaining operator y de su *bro* el [nullish colaescing operator](/nullish-coalescing-operator-operador-fusion-nula) es un *win-win*.