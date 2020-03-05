const logger = require('../util/logger');
const HttpException = require('../http/HttpException');

const errorHandlerMiddleware = (err, req, res, next) => {
  
	if (err instanceof HttpException) {
		logger.info(err);
		return res.status(err.statusCode).json({ error: err.message });
	}

	logger.error('unexpected error. message: %s', err.message, err);
	res.status(500).json({ error: err.message });
};

module.exports = errorHandlerMiddleware;