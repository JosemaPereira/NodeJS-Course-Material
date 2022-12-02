import { createServer } from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
  console.log(`Servidor escuchando en http://${hostname}:${port}/`);
});
