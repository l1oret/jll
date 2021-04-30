---
title: 'El del hoisting o hoisting'
date: '2020-11-15'
description: 'O mas bien, el de que es eso del hoisting y porque cada definición que encontraba era diferente a la anterior.'
---

O mas bien, el de que es eso del **hoisting** y porque cada definición que encontraba era diferente a la anterior. Conforme iba leyendo acerca del tema me topaba con términos como _"weird part"_, _"JavaScript trick"_ o puede generar problemas. Todo eso no hizo mas que aumentar mis dudas acerca de lo que leía y me dio a entender que tenía que ir a una fuente más fiable de información, la [especificación](https://tc39.es/ecma262/).

Y la verdad, mientras consultaba la especificación, no pude encontrar ni una sola referencia al término hoisting como tal, ni una definición, nada en absoluto. Lo cual me hizo preguntarme qué era el hoisting en realidad y si existía o no.

## ¿Qué es el hoisting?

El **hoisting** en un concepto utilizado para explicar o referirse a cómo funcionan en JavaScript los [contextos de ejecución](/execution-context-contexto-ejecucion/) o al menos una parte de su funcionamiento.

[Como ya vimos](/execution-context-contexto-ejecucion/#el-execution-context-en-detalle), cada vez que se crea un contexto de ejecución se hace en dos fases, una de creación y otra de ejecución. En esa primera de fase, la de creación, es cuando las variables y funciones declaradas son asignadas en memoria. Todas las variables declaradas se inicializan con el valor `undefined`.

Hasta que no se alcanza la fase de ejecución no son asignados los valores a las variables. En esa segunda fase cuando se alcanza la primera línea del código del ejemplo, a la variable declarada `blog` aún no se le ha asignado el valor `Out of the loop`, sin embargo como en la fase de creación se almacenó en memoria como `undefined` no genera un error cuando se ejecuta el script.

```JavaScript
console.log(blog);
// → undefined
var blog = `Out of the loop`;
```

Al ejecutar el código del ejemplo vemos que no genera ningún error y que además nos muestra por la consola `undefined`. En la fase de creación del contexto de ejecución se inicializó la variable declarada `blog` como `undefined`, por lo que cuando llega la fase de ejecución esta tiene asignado el valor `undefined` y por ese motivo no genera ningún error.

Algo parecido sucede con las funciones, en la mencionada primera fase son almacenadas en memoria y por lo tanto no importa el lugar en que las declaremos.

```JavaScript
saludar();

function saludar() {
  console.log(`¡Hola Out of the loop!`);
}
```

A este funcionamiento de inicialización de funciones y variables declaradas dentro de las fases del creación del contexto de ejecución es lo que se conoce habitualmente como **hoisting**.