const express = require('express');
const logger = require('./src/util/logger');

const accessLoggerMiddleware = require('./src/middlewares/accessLoggerMiddleware');
const errorHandlerMiddleware = require('./src/middlewares/errorHandlerMiddleware');

const controller = require('./src/controllers/controller');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

// App routes
app.use(controller);

app.use(accessLoggerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => logger.info(`Hello World:${port}`));
