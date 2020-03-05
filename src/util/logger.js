const winston = require('winston');
const join = require('path').join;
const logDir = process.env.LOG_DIR || './logs';

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL,
	format: winston.format.combine( 
		winston.format.splat(),
		winston.format.simple()
	),
	defaultMeta: {
		service: process.env.SERVICE_NAME
	},
	transports: [
		new winston.transports.File({ filename: join(logDir, 'error.log'), level: 'error'}),
		new winston.transports.File({ filename: join(logDir, 'all.log')}),
		new winston.transports.File({ filename: join(logDir, 'access.log')}),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple()
	}));
}

module.exports = logger;