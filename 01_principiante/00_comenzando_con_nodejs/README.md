# :computer: Empezando a trabajar con NodeJS

## :clipboard: Material

La presentación del curso está almacenada en la siguiente [liga](https://docs.google.com/presentation/d/1zoOPwCrpwpjyu3-AIWBFuZ7dw14zSUR5GUShWpXT1jQ/edit?usp=sharing)

El siguiente contenido abarca de las diapositivas 7 a la 20

## :books: Temas

### I. Definición

[Sobre NodeJS](https://NodeJS.org/en/about/)

### II. Ciclo de vida y Bucle de eventos

El siguiente código contiene diferentes funciones que corresponden a cada uno de los ciclos de vida durante la ejecución de un proyecto en NodeJS.

```js
const fs = require('fs');

console.log('start');

setTimeout(() => console.log('timeout finished'), 0);

fs.readFile('./resources/loremIpsum.txt', () => console.log('data returned'));

setImmediate(() => {
  console.log('executing setImmediate callback');
  setTimeout(() => console.log('second timeout finished'), 0);
});

console.log('end');
```

### III. Instalando NodeJS

[Descargue](https://NodeJS.org/es/download/) e [instale](https://nodejs.dev/en/learn/how-to-install-nodejs/) NodeJS siguiendo las instrucciones descritas en la documentación oficial

Una vez instalado, compruebe que todo este correcto ejecutando en una terminal los siguiente commandos y compruebe que no marque error.

```bash
node --version
npm --version
```

### IV. Node Shell

Para ejecutar código javascript en linea, use el siguiente comando para acceder al Node Shell

```bash
node
```

Se puede ejecutar código de un archivo `.js` usando el siguiente comando

```bash
node nombreDeMiArchivo.js
```

### V. `Hola mundo` en NodeJS

En coloque el siguiente código en un archivo `holaMundo.js`

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
  console.log(`Servidor escuchando en http://${hostname}:${port}/`);
});
```

Ejecute el archivo con el comando

```bash
node holaMundo.js
```

### VI. Gestores de paquetes

- [Documentación oficial de NPM](https://docs.npmjs.com/)
- [Documentación oficial de YARN](https://yarnpkg.com/getting-started)

Ejemplo de uso de un paquete

```js
const { faker } = require('@faker-js/faker');

const users = [];
for (let i = 0; i < 10; i += 1) {
  users.push({
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    registeredAt: faker.date.past(),
  });
}

console.log(users);
```

## :mag: Para saber más

- [Introducción a NodeJS](https://nodejs.dev/en/learn/introduction-to-nodejs/)
- [Bucle de eventos](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Diferencias entre NodeJS y el navegador](https://nodejs.dev/en/learn/differences-between-nodejs-and-the-browser/)
- [Ambientes de desarrollo](https://nodejs.dev/en/learn/nodejs-the-difference-between-development-and-production/)
- [Como leer variables de entorno](https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/)
- [Como usar NodeJS REPL](https://nodejs.dev/en/learn/how-to-use-the-nodejs-repl/)
- [Como leer argumentos enviados por la linea de comandos](https://nodejs.dev/en/learn/accept-input-from-the-command-line-in-nodejs/)
- [Introducción al gestor de paquetes](https://nodejs.dev/en/learn/an-introduction-to-the-npm-package-manager/)
