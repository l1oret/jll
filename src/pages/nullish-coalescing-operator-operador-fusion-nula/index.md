---
title: 'El del nullish coalescing operator o operador de fusión nula'
date: '2020-08-06'
description: 'O mas bien, el de cuando por LinkedIn vi un post del nullish coalescing operator y pensé ¿por qué yo no tenía ni de la existencia de esto?.'
---

O mas bien, el de cuando por LinkedIn vi un post del **nullish coalescing operator** y pensé ¿por qué yo no tenía ni de la existencia de esto?. Después de investigar un poco, puede ver que en aquel momento era solo una propuesta para entrar en la especificación y que tal vez y solo tal vez por eso motivo yo no tenia constancia de eso. Pero la verdad no era esa, el problema era que estaba completamente desconectado y por eso no me enteraba de esa novedad ni de otras novedades del lenguaje. Hoy, ya esta en la fase final, listo para ser incorporada a la especificación y [soportado por las versiones mas recientes de los principales navegadores](https://caniuse.com/#search=%3F%3F).

## ¿Qué es el nullish coalescing operator?

El nullish coalescing operator es un operador lógico `??` que devuelve el operando derecho siempre que el operando izquierdo sea `null` o `undefined`. En caso contrario devuelve el operando izquierdo.

```javascript
console.log(false ?? 'JavaScript');
// → false
console.log(0 ?? 100);
// → 0
console.log('' ?? 'TC39');
// → ''
console.log(NaN ?? 100);
// → NaN
console.log(null ?? 'ECMAScript');
// → 'ECMAScript'
console.log(undefined ?? 'ES6');
// → 'ES6'
```

Hasta la llegada a la especificación del operador `??` siempre que queríamos asociar un valor por defecto a una variable era normal utilizar el operador lógico **OR** `||`. Si comparamos ambos operadores vemos que hay diferencias significativas. En el operador `||` los valores del operando izquierdo son convertidos a `boolean` para ser evaluados y siempre que se reciba cualquier valor `falsy` como `0`, `''`, `NaN`, `null` o `undefined` se devolverá la expresión del operando derecho.

```javascript
console.log(false || 'JavaScript');
// → 'JavaScript'
console.log(0 || 100);
// → 100
console.log('' || 'TC39');
// → 'TC39'
console.log(NaN || 100);
// → 100
console.log(null || 'ECMAScript');
// → 'ECMAScript'
console.log(undefined || 'ES6');
// → 'ES6'
```

Ese comportamiento puede llevar a equívocos o resultados inesperados si consideramos como valores válidos los valores `falsy` como el `0` o la cadena vacía `''`. Ya que en esos casos el operador lógico siempre devolverá la expresión derecha.

```javascript
console.log(0 || 100);
// → 100
console.log('' || 'TC39');
// → 'TC39'
```

El operador de fusión nula corrige ese problema ya que únicamente determina como valores `falsy` a `null` y `undefined`.

```javascript
console.log(0 ?? 100);
// → 0
console.log('' ?? 'TC39');
// → ''
```

Hay que tener en cuenta que si se quiere [utilizar `??` juanto a los operadores lógicos](https://v8.dev/features/nullish-coalescing#mixing-and-matching-operators) **AND** `&&` o **OR** `||` es necesario añadir paréntesis para evitar errores.

```javascript
expresion && expresion ?? expresion;
expresion ?? expresion && expresion;
expresion || expresion ?? expresion;
expresion ?? expresion || expresion;
```

Las expresiones anteriores generarían un error `Uncaught SyntaxError: missing ) after argument list`. Lo correcto sería lo siguiente:

```javascript
(expresion && expresion) ?? expresion;
expresion && (expresion ?? expresion);

(expresion ?? expresion) && expresion;
expresion ?? (expresion && expresion);

(expresion || expresion) ?? expresion;
expresion || (expresion ?? expresion);

(expresion ?? expresion) || expresion;
expresion ?? (expresion || expresion);
```

También interesante es su uso en combinación con su *colega* el optional chaining operator `?.` que veremos próximamente.