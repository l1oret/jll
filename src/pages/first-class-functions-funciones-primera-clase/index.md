---
title: 'El de las first-class functions o funciones de primera clase'
date: '2020-04-20'
description: 'O mas bien, el de cuando decidí contribuir en MDN y empecé por las first-class functions.'
---

O mas bien, el de cuando decidí contribuir en [MDN](https://wiki.developer.mozilla.org/es/) y empecé por las **first-class functions**. Esta idea de contribuir en un proyecto open source ya la tenía hace tiempo y MDN me venía como anillo al dedo, ya que en ese momento no quería contribuir escribiendo código sino que quería colaborar de alguna otra manera. De hecho, opté por añadir traducciones o pequeñas modificaciones a contenido ya existente. [Mis contribuciones](https://wiki.developer.mozilla.org/es/profiles/l1oret), al menos de momento, son sin lugar a dudas escasas, pero estamos en ello.

## ¿Qué son las first-class functions?

Siempre y cuando una función se trate como cualquier otra variable, se dice que ese lenguaje tiene first-class functions y JS (a.k.a. JavaScript) no iba a ser menos. En el caso de JavaScript las funciones son first-class objects ya que pueden ser [almacenadas en una variable, un array y un objeto](#almacenadas-en-una-variable), pueden ser [pasadas como argumentos a una función](#pasadas-como-argumentos-en-una-función) y pueden ser [devueltas desde una función](#devueltas-desde-una-función).

### Almacenadas en una variable

```javascript{2-4,10,15}
// Variable
const diHola = function () {
  console.log('¡Hola!');
};

diHola(); // ¡Hola!

// Array
const saludos = [];
saludos.push(diHola);
console.log(saludos); // [f]
saludos[0](); // ¡Hola!

// Object
const saludo = { diHola };
console.log(saludo); // {diHola: f}
saludo.diHola(); // ¡Hola!
```

### Pasadas como argumentos en una función

```javascript{10}
function diHola() {
  return 'Hola ';
}

function saludar(saludo, nombre) {
  console.log(saludo(), nombre); // Hola JavaScript
}

// Pasamos `diHola` como argumento de la función saludar
saludar(diHola, 'JavaScript');
```

### Devueltas desde una función

```javascript{2-4}
function diHola() {
  return function () {
    console.log('¡Hola!');
  };
}
```

Para invocar a la función podemos hacerlo de dos maneras. Usando una variable o
con doble paréntesis.

```javascript
const saludar = diHola();
saludar(); // ¡Hola!
diHola()(); // ¡Hola!
```

A una función que devuelve una función se le llama habitualmente [higher-order
function](/higher-order-functions). Pero eso ya lo veremos en el siguiente episodio: [El de las higher-order functions o funciones de orden superior](/higher-order-functions). Por cierto, [este es la entrada en MDN de las funciones de primera de clase](https://developer.mozilla.org/es/docs/Glossary/Funcion_de_primera_clase).