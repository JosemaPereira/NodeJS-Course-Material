# :bulb: Modulo 4: REST

## :book: Objetivo

- Explicar el concepto de una REST API
- Crear un cliente http
- Crear un servidor http

## :clipboard: Material

Consultar en la [presentación](https://docs.google.com/presentation/d/1zoOPwCrpwpjyu3-AIWBFuZ7dw14zSUR5GUShWpXT1jQ/edit?usp=sharing) las diapositivas 38 a la 42

## :books: Temas

### I. REST

Una REST API (también conocida como RESTful API) es una interfaz de programación de aplicaciones (API o API web) que se ajusta a las restricciones del estilo arquitectónico REST y permite la interacción con los servicios web RESTful. REST significa transferencia de estado representacional.

API: Una API es un conjunto de definiciones y protocolos para construir e integrar software de aplicación.

REST: REST es un conjunto de restricciones arquitectónicas, no un protocolo o un estándar. Cuando se realiza una solicitud de cliente a través de una API RESTful, transfiere una representación del estado del recurso al solicitante o punto final.

### II. Cliente HTTP/HTTPS

Los clientes HTTP/HTTPS nos permiten consultar recursos externos y poder usarlos dentro de nuestro proyecto.

Existen varios paquetes que nos proveen métodos para crear clientes, exploraremos la paquetería nativa [fetch](https://nodejs.org/api/globals.html#fetch) y una de terceros [axios](https://github.com/axios/axios).

El siguiente es un ejemplo de una llamada GET:

```js
const url = 'https://localhost:8080';

// Usando promesas
// Fetch
fetch(url)
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    return res.json()
  })
  .then((res) =>{
    console.log(res)
  })
  .catch((error) => {
    console.error(error);
  });

// Axios
const axios = require('axios');
axios
  .get(url)
  .then((res) => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
  })
  .catch((error) => {
    console.error(error);
  });

// Usando funciones asíncronas
// Fetch
const getRequestFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json()
    return data;
  } catch (e) {
    return e;
  }
}

getRequestFetch(url)
  .then(resp =>
    console.log(resp)
  ).catch(err => 
    console.error(err)
  )

// Axios
const getRequestAxios = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    return e;
  }
};
getRequestAxios(url)
  .then(resp =>
    console.log(resp)
  ).catch(err => 
    console.error(err)
  )
```

Axios también posee métodos para ejecutar llamadas POST, PUT y DELETE

### III. Servidor HTTP

Para que nuestro código pueda ser ejecutado mediante una petición http y funcionar como una RESTFul API, es necesario crear un servidor HTTP como se describe a continuación:

```js
const http = require('http');

const requestListener = (req, res) => {
  res.writeHead(200);
  res.end('Hello World!');
};

const server = http.createServer(requestListener);
server.listen(8080);
```

## :mag: Para saber más

- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch)
- [Axios](https://www.npmjs.com/package/axios)
- [Que es una REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api)
- [Creando un cliente HTTP](https://www.geeksforgeeks.org/how-to-make-http-requests-in-node-js/)

## :pencil2: Ejercicio

En base al código resultante del modulo 3, añadir las siguientes funcionalidades:

1. Crear un cliente http que obtenga un listado de vehículos usando el siguiente endpoint `https://myfakeapi.com/api/cars/`
2. Reducir la información obtenida de manera que solo exista un elemento para cada combinación de los campos `car` y `car_model`

```json
// Ejemplo
[
  {
    "car": "BMW",
    "car_model": "X5 M"
    ...
  },
    {
    "car": "Mitsubishi",
    "car_model": "Montero"
    ...
  },
    {
    "car": "BMW",
    "car_model": "X5 M"
    ...
  },
]

// Después de obtener combinaciones únicas el resultado sería
[
  {
    "car": "BMW",
    "car_model": "X5 M"
    ...
  },
    {
    "car": "Mitsubishi",
    "car_model": "Montero"
    ...
  },
]
```

3. Filtrar el listado de vehículos obtenidos del archivo csv, de modo que solo se mantengan aquellos que aparezcan en la lista de vehículos obtenido en paso 3.
4. Guardar este listado resultante en el archivo `vehicles.json`
5. Encapsular todo el proyecto para que funcione como un API, creando un servidor HTTP
6. Regresar como respuesta de la petición, el listado final de vehículos
