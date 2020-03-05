const logger = require('../util/logger');

const accessLoggerMiddleware = (req, res, next) => {
	logger.info(`${new Date().toISOString()} ${req.ip} ${req.hostname} ${res.statusCode} ${req.method} ${req.url}`)
	next();
};

module.exports = accessLoggerMiddleware;