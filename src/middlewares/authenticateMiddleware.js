const logger = require('../util/logger');
const jwtUtil = require('../util/jwt');
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
	const auth = req.get('Authorization');
	if (!auth || !auth.includes('Bearer ')) {
		logger.debug('authorization invalid: %s', auth, {});
		return next();
	}

	const token = auth.replace('Bearer ', '');

	if (!jwtUtil.verify(token, secret)) {
		logger.info('invalid jwt passed');
		return next();
	}

	// verify jwt isn't malformed by application standards :)

	if (jwtUtil.isExpired(token)) {
		return next();
	}

	const decodedJwt = jwtUtil.decode(token);

	logger.info('user %s is authorized, expires at %s',decodedJwt.data.username, decodedJwt.data.exp);
	req.username = decodedJwt.data.username;
	req.authorized = true;
	next();
};