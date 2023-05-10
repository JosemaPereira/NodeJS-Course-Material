import express from 'express';
import request from 'supertest';
import { viewsDirname } from '../views/index.js';
import { MonitorRoute } from './monitor.routes.js';

const app = express();
app.set('views', viewsDirname);
app.set('view engine', 'pug');

MonitorRoute(app);

describe('monitor routes', () => {
  it('get /monitor', async () => {
    const res = await request(app).get('/monitor');
    expect(res.statusCode).toBe(200);
  });
});
