---
title: 'El del context execution o contexto de ejecución'
date: '2020-07-25'
description: 'O mas bien, el de cuando empecé a leer la especificación ECMAScript por el capítulo del execution context.'
---

El contexto de ejecución de una implementación de la especificación [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm), como por ejemplo el [motor V8 de JavaScript](https://v8.dev) utilizado por Google Chrome o Node.js, se utiliza para realizar el seguimiento y evaluación del código en tiempo de ejecución. Para ser mas exactos, según el punto [8.3 Execution Context](https://tc39.es/ecma262/#sec-execution-contexts) del documento de la [especificación](https://tc39.es/ecma262/), un contexto de ejecución es:

> An execution context is a specification device that is used to track the runtime evaluation of code by an ECMAScript implementation. 

Partiendo de esa definición, podemos hacernos solo una ligera idea de lo que es en realidad es el contexto de ejecución y todo lo que implica. <strike>Ya que si leemos la sección entera de la especificación podemos ver que es un agente el que sabe cual es el contexto activo, contiene la pila de contextos de ejecución, la cola de trabajos pendientes y la cola de Promises pendientes, pero todo eso esta más allá del alcance de éste artículo.</strike> Sin embargo, si que hay algo que podemos extraer claramente y es que el contexto de ejecución esta directamente relacionado con el código que se esta ejecutando.

## Execution context stack y running execution context

Por lo tanto, siempre que se ejecute código JavaScript, se crearán desde uno a infinitos contextos de ejecución. Todos esos contextos que se creen se irán apilando dentro del [execution context stack](https://tc39.es/ecma262/#execution-context-stack). El funcionamiento de dicha pila se basa en una cola [LIFO](https://es.wikipedia.org/wiki/Last_in,_first_out), en la cuál el último contexto de ejecución en entrar es el primero en salir. Ese último contexto que entre a la pila, es decir, el que este mas arriba en la cola será siempre el [running execution context](https://tc39.es/ecma262/#running-execution-context). En caso de exisitir únicamente un contexto de ejecución en la pila, entonces ese sera el running execution context, ya que aunque sea el único de la pila seguirá estando el más alto en la cola.

```JavaScript{9}
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

<video controls>
  <source src="/execution-context/execution-context-stack.webm" type="video/webm">
  <source src="/execution-context/execution-context-stack.ogg" type="video/ogg">
  <source src="/execution-context/execution-context-stack.mp4" type="video/mp4">
  Tu navegador no implementa el elemento <code>video</code>.
</video>

Es interesante recalcar los siguientes puntos acerca del execution context stack:
- Es single threaded.
- Es síncrona.
- Contendra únicamente un global exectuion context.
- Puodrá contener hasta infinitos function execution context.
- Cada llamada a una función creara un nuevo contexto de ejecución, sin importar, tal y como mencionaba antes, si la llamada es asi misma o no.

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

La creation stage o fase de creación es cuando el context execution es creado pero aún no ha sido invocado. En ese momento en el VariableEnvironment se almacenan las variables y declaraciones de funciones. Todas las variables declaradas se inicializan con el valor `undefined`. Además, en esta fase se determina el valor de `this`. En este momento el LexicalEnvironment no es mas que una copia del VariableEnvironment.

Una vez se alcanza la execution stage o fase de ejecución, son asignados los valores a las variables y el LexicalEnvironment se utiliza para resolver los enlaces de las variables. El LexicalEnvironment contendrá un environment record y una referencia al outer lexical environment. A partir del siguiente código:

```javascript
var nombre = 'Jose';

function saludar() {
  var saludo = 'Hola';
  console.log(`${saludo} ${nombre}!`); // Hola Jose!
}
```

El LexicalEnvironment del global execution context se asemejaría a lo siguiente:

```javascript
// Global execution context
globalEnvironment = {
  environmentRecord: {
    x: 10
  },
  outer: null
};
```

Y el del function execution context de la función `saludar`:

```javascript
// Function execution context
saludarEnvironment = {
  environmentRecord: {
    y: 20
  },
  outer: globalEnvironment
};
```

_Seguir leyendo:_

- [The ECMAScript “Executable Code and Execution Contexts” chapter explained](https://medium.com/@g.smellyshovel/the-ecmascript-executable-code-and-execution-contexts-chapter-explained-fa6e098e230f#27f0)
- [Understanding Execution Context and Execution Stack in Javascript](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
- [Execution context, Scope chain and JavaScript internals](https://medium.com/@happymishra66/execution-context-in-javascript-319dd72e8e2c#:~:text=Execution%20context%20(EC)%20is%20defined,to%20at%20a%20particular%20time.)
- [Understanding JavaScript Execution Context and How It Relates to Scope and the this Context](https://levelup.gitconnected.com/learn-javascript-fundamentals-scope-context-execution-context-9fe8673b3164)
- [What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)
- [Lexical Environment — The hidden part to understand Closures](https://medium.com/@5066aman/lexical-environment-the-hidden-part-to-understand-closures-71d60efac0e0)