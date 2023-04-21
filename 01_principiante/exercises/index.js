const { createServer } = require('http');
const url = require('url');
const { main } = require('./app');

const port = 3000;

const requestListener = (req, res) => {
  const reqUrl = url.parse(req.url).pathname;
  switch (reqUrl) {
    case '/':
    case '/vehicles':
      main(res);
      break;
    default:
      res.writeHead(400).write('bad request');
      res.end();
  }
};

const server = createServer(requestListener);
server.listen(port);
