# :computer: Modulo 3:  Rest API with express

## :book: Objetivo

- Crear un servidor usando Express
- Crear código base de las operaciones CRUD
- Acceder a las propiedades una petición

## :books: Temas

### I. Instalacion inicial

Para comenzar con un proyecto en Express necesitamos instalar el siguiente paquete en nuestro proyecto de node:

```bash
npm i express
```

Este paquete nos permite acceder a los métodos del framework y con ello poder iniciar un servidor de Node

Adicional a esto, instalaremos los paquetes `cors`, `body-parser` y `dotenv`

```bash
npm i cors body-parser dotenv
```

La función de los paquetes adicionales es el siguiente

- `cors`: Provee a Express un middleware con el cual puede habilitar CORS
- `body-parser`: Provee un middleware con el cual se pueden parsear peticiones entrantes antes de que accedan a los handlers
- `dotenv`: Paquete que nos permite cargar variables de entorno desde un archivo `.env` y colocarlos en la variable `process.env`

Adicional a esto, necesitamos un método en el cual nosotros podamos reiniciar el servidor de manera automática con cada cambio que nosotros agregamos. Para ello usaremos el paquete `nodemon`, el cual se instala como dependencia de desarrollo

```bash
npm install -D nodemon
```

Dentro de nuestros scripts añadiremos el siguiente para poder ejecutar el servidor usando `nodemon`

```json
    "dev": "nodemon index.js",
```

### II. Servidor simple

El siguiente código ejemplifica un servidor básico usando Express.

```js
// Importamos los paquetes
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// Creamos una instancia de aplicación usando express
const app = express();

// Añadimos middleware
app.use(cors());
app.use(bodyParser.json());

// Definimos una ruta a la que el servidor contestará
app.get('/', (req, res) => {
  res.send('Hola mundo');
});

// Colocamos nuestro server a esperar peticiones
app.listen(3000, () => {
  console.log(`App listen at http://localhost:3000`);
});
```

Para iniciar el servidor ejecutamos el comando

```bash
npm run dev
```

En este momento, al abrir un navegador la ruta `http://localhost:3000` nuestro servidor nos responderá con `Hola mundo`

### III. Patron Modelo-Servicio-Controlador

La estructura inicial coloca todo el contenido en el archivo `index.js`. Como buena practica de desarrollo es necesario separar responsabilidades y estructurar nuestro proyecto de manera que sea mas fácil acceder y modificar métodos o servicios.

El patron que se propondrá en este curso es el siguiente

```text
.
+---app
|   +---controllers
|   +---models
|   +---providers
|   +---routes
|   +---services
|   +---index.js
+---test
```

En donde:

- app: Directorio raíz del proyecto
  - controllers: Se encarga de orquestar los llamados a cada uno de los servicios internos
  - models: Representaciones y Schemas de las estructuras de datos
  - providers: Llamadas a recursos externos
  - routes: Define cada uno de los endpoints a los que el servidor responderá
  - services: Lógica de negocio
- test: Directorio raíz de los archivos de test

## :mag: Para saber más

- [Hola mundo en Express](https://expressjs.com/es/starter/hello-world.html)
- [Librería cors](https://www.npmjs.com/package/cors)
- [Librería body-parser](https://www.npmjs.com/package/body-parser)
- [Librería dotenv](https://www.npmjs.com/package/dotenv)