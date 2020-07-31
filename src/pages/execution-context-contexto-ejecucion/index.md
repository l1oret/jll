---
title: 'El del execution context o contexto de ejecución'
date: '2020-07-25'
description: 'O mas bien, el de cuando empecé a leer la especificación ECMAScript por el capítulo del execution context.'
---

O mas bien, el de cuando empecé a leer la especificación ECMAScript por el capítulo del execution context. No fue mi mejor idea, la especificación es dura de leer, hace falta motivación, en alquel momento me conformé con acabar ese capítulo. Entenderlo ya fue otra cosa, una lectura no fue ni mucho menos suficiente, para llegar a comprender al menos algo del documento. Pero bueno un comienzo es un comienzo.

## ¿Qué es el context execution?

El contexto de ejecución de una implementación de la [especificación ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm), como por ejemplo el [motor V8 de JavaScript](https://v8.dev) utilizado por Google Chrome o Node.js, se utiliza para realizar el seguimiento y evaluación del código en tiempo de ejecución. Para ser mas exactos, según el punto [8.3 Execution Context](https://tc39.es/ecma262/#sec-execution-contexts) del documento de la [especificación](https://tc39.es/ecma262/), un contexto de ejecución es:

> An execution context is a specification device that is used to track the runtime evaluation of code by an ECMAScript implementation. 

Partiendo de esa definición, podemos hacernos solo una ligera idea de lo que es en realidad es el contexto de ejecución y todo lo que implica. Sin embargo, si que hay algo que podemos extraer claramente y es que el contexto de ejecución esta directamente relacionado con el código que se esta ejecutando.

## Execution context stack y running execution context

Por lo tanto, siempre que se ejecute código JavaScript, se crearán desde uno a infinitos contextos de ejecución. Todos esos contextos que se creen se irán apilando dentro del [execution context stack](https://tc39.es/ecma262/#execution-context-stack). El funcionamiento de dicha pila se basa en una cola [LIFO](https://es.wikipedia.org/wiki/Last_in,_first_out), en la cuál el último contexto de ejecución en entrar es el primero en salir. Ese último contexto que entre a la pila, es decir, el que este mas arriba (según se mire) en la cola será siempre el [running execution context](https://tc39.es/ecma262/#running-execution-context). En caso de exisitir únicamente un contexto de ejecución en la pila, entonces ese sera el running execution context, ya que aunque sea el único de la pila seguirá estando el más alto en la cola.

```javascript{9}
function acumulador(n) {
  if(n == 1) {
      return 1
  }

  return n + acumulador(--n);
}

const acumulado = acumulador(3);

console.log(acumulado)
```
A partir del ejemplo anterior vamos a ver como se va llenando la pila del contexto de ejecución y como va cambiando el running execution context. Hay que tener en cuenta que no importa que sea una función recursiva, por cada llamada a la función `acumulador` se creará un nuevo contexto de ejecución.

```javascript{6,12,19,27,34,40,45}
// Antes de iniciarse la ejecución del script
let executionContextStack = [];

// Se inicia la ejecución el script
executionContextStack = [
  globalExecutionContext // Running execution context 
];

// Se llama y ejecuta acumulador(3)
executionContextStack = [
  globalExecutionContext,
  functionExecutionContext // Running execution context
];

// Se llama y ejecuta acumulador(2)
executionContextStack = [
  globalExecutionContext,
  functionExecutionContext // acumulador(3)
  functionExecutionContext // Running execution context
];

// Se llama y ejecuta acumulador(1)
executionContextStack = [
  globalExecutionContext,
  functionExecutionContext // acumulador(3)
  functionExecutionContext // acumulador(2)
  functionExecutionContext // Running execution context
];

// Termina de ejecutarse acmulador(1)
executionContextStack = [
  globalExecutionContext,
  functionExecutionContext // acumulador(3)
  functionExecutionContext // Running execution context
];

// Termina de ejecutarse acmulador(2)
executionContextStack = [
  globalExecutionContext,
  functionExecutionContext // Running execution context
];

// Termina de ejecutarse acmulador(3)
executionContextStack = [
  globalExecutionContext // Running execution context 
];

// Termina de ejecutarse el script
executionContextStack = [];
```

Es interesante recalcar los siguientes puntos acerca del **execution context stack**:
1. Es single threaded.
2. Es síncrono.
3. Contendra únicamente un global exectuion context.
4. Puodrá contener hasta infinitos function execution context.
5. Cada llamada a una función creara un nuevo contexto de ejecución, sin importar, tal y como mencionaba antes, si la llamada es asi misma o no.

## Execution context en detalle

El execution context, contiene los siguientes state components:

- Code evaluation state 
- Function
- Realm
- ScriptOrModule
- [VariableEnvironment](https://tc39.es/ecma262/#table-23)
- [LexicalEnvironment](https://tc39.es/ecma262/#table-23)

Los dos que más nos interesan y de los cualos vamos a hablar son el **LexicalEnvironment** y el **VariableEnvironment**, ambos componentes son [Environments Recors](https://tc39.es/ecma262/#sec-environment-records) del execution context. Pero antes de centranos en ellos, hay que tener en cuenta que ambos componentes estan directamente relacionados con las fases de creación del execution context. Cada vez que se crea un execution context se hace en dos fases:

1. Creation stage
2. Execution stage

La **creation stage** o **fase de creación** es cuando el context execution es creado pero aún no ha sido invocado. En ese momento en el VariableEnvironment se almacenan las variables y declaraciones de funciones. Todas las variables declaradas se inicializan con el valor `undefined`. Además, en esta fase se determina el valor de `this`. En este momento el LexicalEnvironment no es mas que una copia del VariableEnvironment.

Una vez se alcanza la **execution stage** o **fase de ejecución**, son asignados los valores a las variables y el LexicalEnvironment se utiliza para resolver los enlaces de las variables. El LexicalEnvironment contendrá un environment record y una referencia al outer lexical environment. A partir del siguiente código:

```javascript
var nombre = 'Jose';

function saludar() {
  var saludo = 'Hola';
  console.log(`${saludo} ${nombre}!`);
  // → Hola Jose!
}
```

El **LexicalEnvironment** del global execution context se asemejaría a lo siguiente:

```javascript
// Global execution context
globalEnvironment = {
  environmentRecord: {
    nombre: 'Jose'
  },
  outer: null
};
```

Y el del function execution context de la función `saludar`:

```javascript
// Function execution context
saludarEnvironment = {
  environmentRecord: {
    saludo: 'Hola'
  },
  outer: globalEnvironment
};
```

Esa referencia `outer` es la que nos permite, en este caso, poder leer el valor de la nombre desde del contexto de ejecución de la función `saludar`.