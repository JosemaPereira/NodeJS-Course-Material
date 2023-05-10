import express from 'express';
import { AboutController } from '../controllers/index.js';

export const AboutRoute = (app) => {
  const router = express.Router();

  app.use('/about', router);
  router.get('/', AboutController.getPage);
};
