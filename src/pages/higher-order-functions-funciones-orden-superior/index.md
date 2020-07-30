---
title: 'El de las higher-order functions o funciones de orden superior'
date: '2020-05-02'
description: 'O mas bien, el de todo tiene un nombre, osea que mejor me voy aprendiendo que es eso de las higher-order functions.'
---

O mas bien, el de todo tiene un nombre, osea que mejor me voy aprendiendo que es eso de las **higher-order functions**. Y tal vez, ni tan siquiera era necesario que lo aprendiera porque es algo que habia usado cientos de veces. Pero la cuestión es que no tenía ni la mas remota idea de que una **función de orden superior** era exactamente esto. Increible que pueda parecer o no, para mi eran simplemente funciones que se pasaban, LOL.

## ¿Qué son las higher-order functions?

Como ya vimos en las primas hermanas de las [first-class functions](/first-class-functions), a la función o funciones que reciben como parámetro otra función, que devuelven una función o ambas, se les denomina **higher-order functions**. Habitualmente son utlizadas para abstraer, simplificar o evitar escribir código duplicado. Suele ser comun en un programa hacer cualquier operación un numero determinado de veces.

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
// → 0
// → 1
// → 2
```

Mediante una función podemos abstraer para que repita esa operación cualquiera el número de veces que consideremos necesario.

```javascript
function repetir(repeticiones) {
  for (let i = 0; i < repeticiones; i++) {
    console.log(i);
  }
}

repetir(3);
// → 0
// → 1
// → 2
```

Es una realidad que no es para nada habitual que queramos realizar siempre un `console.log` y en su lugar queremos ejecutar otra operación. Es ahí donde entran en juego las **higher-order functions**.

```javascript{7}
function repetir(repeticiones, accion) {
  for (let i = 0; i < repeticiones; i++) {
    accion(i);
  }
}

repetir(3, Math.sin);
// → 0
// → 0.8414709848078965
// → 0.9092974268256817
```

Por supuesto, no es obligatorio pasarle una función de JS, podemos pasarle cualquier función e incluso pasarle una funcion por valor creada en el momento.

```javascript
function repetir(repeticiones, accion) {
  for (let i = 0; i < repeticiones; i++) {
    accion(i);
  }
}

let acumulado = 0;
repetir(3, i => acumulado += i);
console.log(acumulado);
// → 3
```

Vamos a pasar ahora a un ejemplo algo mas complejo de una función que devuelve a partir de un array de nombres de ciudades, las ciudades que tienen nombre compuesto.

```javascript
const ciudadesNombreCompuesto = (ciudades) => {
  const ciudadesNombreCompuesto = [];

  for (let i = 0; i < ciudades.length; i++) {
    const ciudad = ciudades[i];
    if (ciudad.split(' ').length > 1) {
      ciudadesNombreCompuesto.push(ciudad);
    }
  }

  return ciudadesNombreCompuesto;
};

ciudadesNombreCompuesto([
  'Madrid',
  'Miami',
  'Nueva York',
  'Sidney',
  'Wellington',
]); // → ['Nueva York']
```

A partir de esa misma lista de ciudades, ahora queremos obtener todas las ciudades cuyo nombre empiece por 'M':

```javascript
const ciudadesEmpiezanM = (ciudades) => {
  const ciudadesEmpiezanM = [];

  for (let i = 0; i < ciudades.length; i++) {
    const ciudad = ciudades[i];
    if (ciudad.startsWith('M')) {
      ciudadesEmpiezanM.push(ciudad);
    }
  }

  return ciudadesEmpiezanM;
};

ciudadesEmpiezanM([
  'Madrid',
  'Miami',
  'Nueva York',
  'Sidney',
  'Wellington'
]);
// → ['Madrid', 'Miami']
```

Creo que salta a la vista que ambos scripts tienen código repetido. Se puede reconocer un patrón que pide a gritos ser convertido en una solución mas abstracta y general. Ambas funciones iteran sobre una lista de ciudades y le aplican un filtro para acabar obteniendo una lista filtrada con igual o menos ciudades que la lista original recibida.

Nuestras viejas conocidas del episodio de las [first-class functions](/first-class-functions) nos hacen mas fácil el proceso de abstracción. Por lo tanto, siguiendo un proceso parecido al del primer ejemplo vamos a empezar creando una función que abstraiga la iteración sobre la lista y que devuelva esa misma lista igual o reducida, en este caso, por ejemplo, a una cadena de texto de ciudades en mayúsculas.

```javascript{1,12}
const reduce = (ciudades, funcionRedutora, valorInicial) => {
  let acumulado = valorInicial;

  for (let i = 0; i < ciudades.length; i++) {
    const ciudad = ciudades[i];
    acumulado = funcionRedutora(acumulado, ciudad);
  }

  return acumulado;
};

reduce(
  // Lista de ciudades
  ['Madrid', 'Miami', 'Nueva York', 'Sidney', 'Wellington'],

  // Función redutora
  (acumulado, el) => acumulado + el.toUpperCase(),

  // Valor inicial
  ''
);
// → MADRIDMIAMINUEVA YORKSIDNEYWELLINGTON
```

Una vez tenemos la función para abstraer la iteración ya podemos centrarnos en crear el filtro, que es la única parte diferente del código superior. Para ello, crearemos una función de filtro que recibe un array (en este caso de ciudades) y la función por la cual queremos filtrar cada uno de los elementos del array. Hay que tener en cuenta que en este caso, lo que queremos es obtener una lista de igual o menor tamaño en lugar de un único valor. Por este motivo, la función `funcionRedutora` siempre y cuando se cumpla el filtro añadirá los elementos al array de acumlados.

```javascript{1,11,20,29}
const reduce = (array, funcionRedutora, valorInicial) => {
  let acumulado = valorInicial;

  for (let i = 0; i < array.length; i++) {
    acumulado = funcionRedutora(acumulado, array[i]);
  }

  return acumulado;
};

const filter = (array, filtro) =>
  reduce(
    array,
    (acumulado, el) => (filtro(el)
      ? acumulado.concat([el])
      : acumulado),
    []
  );

filter(
  // Lista de ciudades
  ['Madrid', 'Miami', 'Nueva York', 'Sidney', 'Wellington'],

  // Función filtro
  (ciudad) => ciudad.split(' ').length > 1
);
// → ['Nueva York']

filter(
  // Lista de ciudades
  ['Madrid', 'Miami', 'Nueva York', 'Sidney', 'Wellington'],

  // Función filtro
  (ciudad) => ciudad.startsWith('M')
);
// → ['Madrid', 'Miami']
```

Sin lugar a dudas las **higher-order functions** son una herramienta muy pontente a la hora de abstraer y simplificar el código.

Algunos ejemplos del propio lenguaje, como quizás hayas podido intuir son las funciones [`map()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/map), [`filter()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/filter) o [`reduce()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce).

```javascript{9,12,15}
const ciudades = [
  'Madrid',
  'Miami',
  'Nueva York',
  'Sidney',
  'Wellington'
];

ciudades.reduce((acumulado, el) => acumulado + el.toUpperCase(), '');
// → MADRIDMIAMINUEVA YORKSIDNEYWELLINGTON

ciudades.filter((ciudad) => ciudad.split(' ').length > 1);
// → ['Nueva York']

ciudades.filter((ciudad) => ciudad.startsWith('M'));
// → ['Madrid', 'Miami']
```