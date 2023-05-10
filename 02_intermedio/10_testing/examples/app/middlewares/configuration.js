import { defaultConfig } from '../providers/index.js';

export const configuration = (req, _res, next) => {
  req.config = defaultConfig;
  next();
};
