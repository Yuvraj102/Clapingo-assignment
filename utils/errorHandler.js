module.exports = function Handler(err, req, res, next) {
  res.json({
    error: err.message,
  });
};
