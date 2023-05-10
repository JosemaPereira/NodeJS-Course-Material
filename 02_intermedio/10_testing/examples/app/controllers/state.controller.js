import { StateServices } from '../services/index.js';
import { constants } from 'http2';

const sessionName = 'counter';

export const StateController = {
  setCookie: (req, res, next) => {
    try {
      StateServices.setCookie(res);
      const message = { message: 'cookie settled' };
      res.status(constants.HTTP_STATUS_OK).json(message);
    } catch (err) {
      next(err);
    }
  },
  deleteCookie: (req, res, next) => {
    try {
      StateServices.deleteCookie(res);
      const message = { message: 'cookie deleted' };
      res.status(constants.HTTP_STATUS_OK).json(message);
    } catch (err) {
      next(err);
    }
  },
  sessionManager: (req, res, next) => {
    let message = '';
    try {
      if (req.session[sessionName]) {
        StateServices.updateSession(req, sessionName);
        message = `Counter ${req.session[sessionName]}`;
      } else {
        StateServices.createSession(req, sessionName);
        message = `Counter created`;
      }
      res.status(constants.HTTP_STATUS_OK).json({ message });
    } catch (err) {
      next(err);
    }
  },
};
