import { connect } from 'mongoose';

export const dbConnection = async (req, res, next) => {
  try {
    await connect(req.config.dbConnectionSting);
    next();
  } catch (e) {
    next(e);
  }
};
