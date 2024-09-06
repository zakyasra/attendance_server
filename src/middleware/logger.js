const log = (req, res, next) => {
  console.log(`Hit endpoint ${req.url} with mothod: ${req.method}`);
  next();
};

module.exports = log;
