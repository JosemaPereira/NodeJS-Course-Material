# :bulb: Modulo 2: Module system

## :book: Objetivo

- Comprender el sistema de módulos de NodeJS
- Crear y utilizar módulos propios

## :clipboard: Material

Consultar en la [presentación](https://docs.google.com/presentation/d/1zoOPwCrpwpjyu3-AIWBFuZ7dw14zSUR5GUShWpXT1jQ/edit?usp=sharing) las diapositivas 28 a 32

## :books: Temas

### I. Creación de módulos

Para crear un modulo se necesita añadir las funciones al modulo de sistema

```js
const getParseDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let date = today.getDate();
  date = date < 10 ? `0${date}` : date;

  return `${year}-${month}-${date}`;
};

const logLine = (date, type, message) => `${date} [${type}] ${message}\n`;

module.exports = { getParseDate, logLine };
```

### II. Importación de módulos

Para importar un modulo y acceder a todos sus métodos, se usa la siguiente sintaxis

```js
const myModule = require('./myModule');

console.log(`La fecha actual es ${myModule.getParseDate()}`);
```

Se puede importar un solo método del modulo

```js
const { getParseDate } = require('./myModule');

console.log(`La fecha actual es ${getParseDate()}`);
```

## :mag: Para saber más

- [Exponiendo funcionalidades usando exports](https://www.freecodecamp.org/news/module-exports-how-to-export-in-node-js-and-javascript/)

## :pencil2: Ejercicio

En base al código resultante del modulo 1 realizar la modularización del proyecto, por ejemplo:

1. index.js
2. constants.js
3. logger.js
4. dates.js
5. vehicles.js

La propuesta de los módulos es libre
