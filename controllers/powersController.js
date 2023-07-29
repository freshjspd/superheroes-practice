const createHttpError = require('http-errors');

module.exports.getPowers = async (req, res, next) => {
  next(createHttpError(501, 'Not Implemented'));
};
