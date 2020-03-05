const express = require('express');

const accessLoggerMiddleware = require('./src/middlewares/accessLoggerMiddleware');
const errorHandlerMiddleware = require('./src/middlewares/errorHandlerMiddleware');

const controller = require('./src/controllers/controller');

const app = express();

app.use(express.json());

// App routes
app.use(controller);

app.use(accessLoggerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = {
  app
};
