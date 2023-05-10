import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { handleError, logError } from './middlewares/index.js';
import { defaultConfig } from './providers/index.js';
import { RootRoute, StateRoute } from './routes/index.js';

const app = express();

const { host, port } = defaultConfig;
const ttl = 10 * 1000;

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
app.use(logError);
app.use(handleError);

app.listen(port, () => {
  console.log(`App listen at http://${host}:${port}`);
});
