# :bulb: Modulo 1: Manipulación de archivos I/O sync & async

## :book: Objetivo

- Diferenciar entre la ejecución síncrona y asíncrona
- Crear funciones promesa y async/await
- Explorar y poner en practica los métodos de manipulación de archivos

## :clipboard: Material

Consultar en la [presentación](https://docs.google.com/presentation/d/1zoOPwCrpwpjyu3-AIWBFuZ7dw14zSUR5GUShWpXT1jQ/edit?usp=sharing) las diapositivas 21 a la 27

## :books: Temas

### I. Funciones síncronas

El siguiente es un ejemplo de una ejecución síncrona

```js
const myTimer = () => {
  setTimeout(() => {
    console.log('Tiempo terminado');
  }, 3000);
};

console.log('Inicio del programa');
myTimer();
console.log('Fin del programa');
```

### II. Funciones asíncronas

#### 1. Promesa simple

El ejemplo anterior se puede convertir en una promesa añadiendo lo siguiente

```js
const myTimerPromise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Tiempo terminado');
    resolve();
  }, 3000);
});

console.log('Inicio del programa');
myTimerPromise.then(() => {
  console.log('Fin del programa');
});
```

#### 2. Promesa con retorno fallido

Para marcar una ejecución de promesa como fallida o con errores, se usa la siguiente estructura

```js
const subTask = (message) =>
  new Promise((resolve, reject) => {
    if (message === '' || message === undefined) {
      reject(new Error(`Mensaje incorrecto: ${message}`));
    }
    resolve('Mensaje correcto');
  });

subTask('Mensaje')
  .then((message) => console.log({ message }))
  .catch((err) => console.log({ err }));

subTask()
  .then((message) => console.log({ message }))
  .catch((err) => console.error(`Error en la sub tarea ${err}`));
```

#### 3. Encadenamiento de promesas

Se pueden encadenar promesas para que al término de una de ellas se ejecute la siguiente

```js
const firstTask = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('Primera tarea');
      resolve();
    }, 1000);
  });

const secondTask = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log('Segunda tarea');
      resolve('Llamada a la tercera tarea');
    }, 2000);
  });

const thirdTask = (message) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, 3000);
  });

firstTask()
  .then(secondTask)
  .then(thirdTask)
  .finally(() => console.log('Terminaron tareas'));
```

El manejo de errores en un encadenamiento de promesas se realiza de la siguiente forma

```js
firstTask()
  .then(subTask)
  .then(secondTask)
  .then(thirdTask)
  .catch((err) => console.log(`Error en las tareas: ${err}`))
  .finally(() => console.log('Terminaron tareas'));
```

#### 4. Funciones Async/Await

Se usan las palabras reservadas `async` y `await` para poder ejecutar una promesa como una función asíncrona

```js
const subTask = (message) =>
  new Promise((resolve, reject) => {
    if (message === '' || message === undefined) {
      reject(new Error('Mensaje incorrecto'));
    }
    resolve('Mensaje correcto');
  });

const main = async (message) => {
  try {
    const response = await subTask(message);
    console.log({ response });
  } catch (e) {
    console.log(e.toString());
  }
};

main('Mensaje');
main('');
```

### III. Manipulación de archivos

CRUD es el acrónimo para las cuatro operaciones básicas que se pueden realizar en archivos.

- Create (Crear)
- Read (Leer)
- Update (Actualizar)
- Delete (Borrar)

Se realizan estas operaciones gracias al modulo `fs`.

Para el desarrollo de este ejemplo, trabajaremos con las siguientes lineas

```js
const fs = require('fs');

const fsProm = fs.promises;
const testFolder = './resources/';
const fileName = 'loremIpsum.txt';
const newFileName = 'demoFile.txt';
const filePath = `${testFolder}${fileName}`;
const newFilePath = `${testFolder}${newFileName}`;
```

#### 1. Create (Crear)

```js
const content = 'Curso de Node JS Junior';
// Forma síncrona
fs.writeFileSync(newFilePath, content);

// Forma asíncrona
const createAsync = async (file, content) => {
  try {
    await fsProm.writeFile(file, content);
  } catch (e) {
    console.log(e);
  }
};
createAsync(fileName, content);
```

#### 2. Read (Leer)

```js
// Forma síncrona
const data = fs.readFileSync(filePath, 'utf-8');
console.log({ data });

// Forma asíncrona
const readAsync = async (file) => {
  try {
    const data = await fsProm.readFile(file, { encoding: 'utf-8' });
    console.log({ data });
  } catch (e) {
    console.log(e);
  }
};
readAsync(filePath);
```

#### 3. Update (Actualizar)

Añade contenido al final del archivo

```js
const newContent = '\nNueva linea añadida por Wizeline Academy';

// Forma síncrona
fs.appendFileSync(filePath, newContent);

// Forma asíncrona
const updateAsync = async (file, content) => {
  try {
    await fsProm.appendFile(file, content);
  } catch (e) {
    console.log(e);
  }
};
updateAsync(filePath, newContent);
```

Edita el contenido del archivo y lo almacena en el mismo

```js
// Forma síncrona
const data = fs.readFileSync(filePath, 'utf-8');
const newData = `Nuevo header \n${data}\nNuevo footer`;
fs.writeFileSync(filePath, newData);

// Forma asíncrona
const updateAsync = async (file) => {
  try {
    const data = await fsProm.readFile(file, { encoding: 'utf-8' });
    const newData = `Nuevo header \n${data}\nNuevo footer`;
    await fsProm.writeFile(file, newData);
  } catch (e) {
    console.log(e);
  }
};
updateAsync(filePath);
```

#### 4. Delete (Borrar)

```js
// Forma síncrona
fs.unlinkSync(filePath);

// Forma asíncrona
const deleteAsync = async (file) => {
  try {
    await fsProm.unlink(file);
  } catch (e) {
    console.log(e);
  }
};
deleteAsync(newFilePath);
```

## :mag: Para saber más

- [Callbacks](https://nodejs.dev/en/learn/javascript-asynchronous-programming-and-callbacks/)
- [Entendiendo las promesas de JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Async & Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Diferencias entre promesas y async/await](https://www.geeksforgeeks.org/difference-between-promise-and-async-await-in-node-js/)
- [Rutas de archivos](https://nodejs.dev/en/learn/nodejs-file-paths/)
- [Trabajar con directorios](https://nodejs.dev/en/learn/working-with-folders-in-nodejs/)

## :pencil2: Ejercicio

Usando el [archivo CSV](../resources/consumoGasolina2018.csv), que contiene información relacionada con el consumo de gasolina de una serie de vehículos, realizar un proyecto en NodeJS que realize lo siguiente:

1. Leer el archivo csv
2. Crear un array de objetos de tipo vehículo (El objeto vehículo es de libre interpretación)
3. Crear un archivo `vehiculos.json` que contenga dicho array
4. Obtener los registros de todos lo vehículos de marca FORD e imprimir la cantidad de elementos encontrados
5. Cree un archivo `service.log` en donde se almacenen los siguientes eventos en el momento que se ejecuten
   1. Inicio del programa
   2. Final del programa
   3. Errores
