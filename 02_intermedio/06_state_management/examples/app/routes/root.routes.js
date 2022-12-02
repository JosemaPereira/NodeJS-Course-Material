import express from 'express';
import { RootController } from '../controllers/index.js';

export const RootRoute = (app) => {
  const router = express.Router();
  app.use('/', router);
  router.get('/', RootController.get);
  router.post('/', RootController.post);
  router.put('/', RootController.put);
  router.delete('/', RootController.delete);
};
