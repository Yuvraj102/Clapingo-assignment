module.exports = function catchError(middleware) {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      console.log(`error caught: `, err);
    }
  };
};
