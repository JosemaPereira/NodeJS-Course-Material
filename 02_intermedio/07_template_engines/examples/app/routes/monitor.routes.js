import express from 'express';
import { MonitorController } from '../controllers/index.js';

export const MonitorRoute = (app) => {
  const router = express.Router();

  app.use('/monitor', router);
  router.get('/', MonitorController.getStats);
};
