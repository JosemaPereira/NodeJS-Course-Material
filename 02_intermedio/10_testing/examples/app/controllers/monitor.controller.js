import { MonitorServices } from '../services/index.js';
import { constants } from 'http2';

export const MonitorController = {
  getStats: (req, res, next) => {
    try {
      const { date } = MonitorServices.getDate();
      const headers = MonitorServices.getHeaders(req);
      const { sessionID } = req;
      res.render('pages/monitor/index', { date, sessionID, headers });
    } catch (err) {
      next(err);
    }
  },
};
