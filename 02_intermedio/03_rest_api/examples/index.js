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
