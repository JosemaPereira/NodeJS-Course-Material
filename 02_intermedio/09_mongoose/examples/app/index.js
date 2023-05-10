import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  handleError,
  logError,
  configuration,
  dbConnection,
} from './middlewares/index.js';
import { defaultConfig } from './providers/index.js';
import {
  MonitorRoute,
  RootRoute,
  StateRoute,
  AboutRoute,
} from './routes/index.js';
import { constants } from 'http2';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { host, port } = defaultConfig;
const ttl = 10 * 1000;
app.use(configuration);
app.use(dbConnection);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'secretKey',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: ttl },
  }),
);

RootRoute(app);
StateRoute(app);
MonitorRoute(app);
AboutRoute(app);
app.use((_, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send();
});
app.use(logError);
app.use(handleError);

app.listen(port, () => {
  console.log(`App listen at http://${host}:${port}`);
});
