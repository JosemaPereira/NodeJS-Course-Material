import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { constants } from 'http2';
import {
  configuration,
  dbConnection,
  handleError,
  logError,
} from './middlewares/index.js';
import { defaultConfig } from './providers/index.js';
import {
  AboutRoute,
  MonitorRoute,
  RootRoute,
  StateRoute,
} from './routes/index.js';
import { viewsDirname } from './views/index.js';

const app = express();

const { host, port } = defaultConfig;
const ttl = 10 * 1000;
app.use(configuration);
app.use(dbConnection);

app.set('views', viewsDirname);
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
