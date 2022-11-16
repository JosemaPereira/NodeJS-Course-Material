import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { defaultConfig } from './providers/index.js';
import { RootRoute } from './routes/index.js';
import { logError, handleError } from './middlewares/index.js';

const app = express();

const { host, port } = defaultConfig;

app.use(cors());

app.use(bodyParser.json());

RootRoute(app);

app.use(logError);
app.use(handleError);

app.listen(port, () => {
  console.log(`App listen at http://${host}:${port}`);
});
