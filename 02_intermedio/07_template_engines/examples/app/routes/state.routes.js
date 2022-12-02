import express from 'express';
import { StateController } from '../controllers/index.js';

export const StateRoute = (app) => {
  const router = express.Router();
  app.use('/state', router);
  router.get('/cookie', StateController.setCookie);
  router.get('/cookie/delete', StateController.deleteCookie);
  router.get('/session', StateController.sessionManager);
};
