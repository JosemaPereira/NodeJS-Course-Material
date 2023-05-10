import express from 'express';
import { RootController } from '../controllers/index.js';

export const RootRoute = (app) => {
  const router = express.Router();
  app.use('/root', router);
  router.get('/', RootController.get);
  router.get('/:id', RootController.getById);
  router.post('/', RootController.post);
  router.put('/:id', RootController.put);
  router.delete('/:id', RootController.delete);
};
