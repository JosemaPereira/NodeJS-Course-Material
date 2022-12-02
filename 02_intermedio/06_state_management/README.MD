# :computer: Modulo 6:  State Management

## :book: Objetivo

- Identificar que es el estado y como manejarlo
- Conocer el concepto de cookie y de sesión

## :books: Temas

### Estado de una aplicación

Se le conoce como estado de una aplicación al proceso de mantener persistencia de datos entre diferentes puntos flujos información. Un estado se puede también describir como la collection de datos preservador que conforman una sesión.

Existen dos maneras de preservar la información del estado de la aplicación. Del lado del cliente se usan las cookies y del lado del servidor se usan las sesiones.

### Cookies

Una cookie es un pequeño archivo de texto que se guarda en la computadora del usuario. El tamaño máximo de archivo para una cookie es de 4 KB. Cuando un usuario visita un sitio web por primera vez, el sitio envía paquetes de datos a la computadora del usuario en forma de una cookie.

La información almacenada en las cookies no es segura ya que se mantiene en el lado del cliente en un formato de texto que cualquiera puede ver.

El siguiente código contiene un ejemplo de como crear y borrar una cookie usando el paquete [cookie-parser](https://www.npmjs.com/package/cookie-parser)

```js
import express from 'express'
import cookieParser from 'cookie-parser';

const app = express();
const cookieName= 'MyCookie';

app.use(cookieParser());

app.get('/', (req, res) =>{
  res.cookie(cookieName, 'Cookie de Wizeline');
  res.end('Se creo cookie')
})

app.get('/delete', (req, res) => {
  res.clearCookie(cookieName)
})
```

### Session

Una sesión se utiliza para guardar información en el servidor momentáneamente para que pueda utilizarse en varias páginas del sitio web. La sesión del usuario comienza cuando el usuario inicia sesión en una aplicación y finaliza cuando el usuario cierra la sesión del programa.

Los valores de sesión son mucho más seguros, ya que se guardan en formato binario o encriptado y solo se pueden decodificar en el servidor. Cuando el usuario apaga la máquina o cierra sesión en el programa, los valores de la sesión se eliminan automáticamente. Debemos guardar los valores en la base de datos para conservarlos para siempre.

El siguiente código contiene un ejemplo de como crear y actualizar una session usando el paquete [express-session](https://www.npmjs.com/package/express-session)

```js
import express from 'express';
import session from 'express-session';

const app = express();
const ttl = 10 * 1000;

app.use(
  session({
    secret: 'secretKey',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: ttl },
  }),
);

app.get('/', (req, res) =>{
  if(req.session.counter){
    req.session.counter ++;
    res.end(`Contador ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.end('Contador creado');
  }
})

```

## :mag: Para saber más

- [Diferencias entre cookie y session](https://www.geeksforgeeks.org/difference-between-session-and-cookies/)