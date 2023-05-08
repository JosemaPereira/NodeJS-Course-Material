import { MonitorServices } from '../services/index.js';

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
