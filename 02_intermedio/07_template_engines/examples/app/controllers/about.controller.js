export const AboutController = {
  getPage: (_, res, next) => {
    try {
      res.render('pages/about/index');
    } catch (err) {
      next(err);
    }
  },
};
