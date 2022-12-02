import { RootServices } from '../services/index.js';
import { constants } from 'http2';

export const RootController = {
  get: async (req, res, next) => {
    try {
      const message = await RootServices.get(req);
      res.status(constants.HTTP_STATUS_OK).json(message);
    } catch (err) {
      next(err);
    }
  },
  post: async (req, res, next) => {
    try {
      const message = await RootServices.post();
      res.status(constants.HTTP_STATUS_CREATED).json(message);
    } catch (err) {
      next(err);
    }
  },
  put: async (req, res, next) => {
    try {
      const message = await RootServices.put();
      res.status(constants.HTTP_STATUS_OK).json(message);
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const message = await RootServices.post();
      res.status(constants.HTTP_STATUS_NO_CONTENT).json(message);
    } catch (err) {
      next(err);
    }
  },
};
