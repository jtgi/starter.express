const logger = require('../util/logger');
const HttpException = require('../http/HttpException');

module.exports = (req, res, next) => {
	logger.info('authorized', req.authorized);

	if (req.authorized) {
		next();
	} else {
		throw new HttpException(401, 'unauthorized');
	}
};