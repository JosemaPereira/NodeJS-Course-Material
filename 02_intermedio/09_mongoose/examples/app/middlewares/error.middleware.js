import { constants } from 'http2';

export const logError = (err, req, res, next) => {
  process.stdout.write(err + '\n');
  next(err);
};

export const handleError = (err, req, res, next) => {
  res
    .status(err.status || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .json({ error: err.message });
};
