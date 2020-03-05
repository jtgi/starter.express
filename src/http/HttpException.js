class HttpException {
	constructor(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
	}
}

module.exports = HttpException;