const express = require('express');
const appRouter = require('./routes');
const { errorHandlers } = require('./middleware');
const { STATIC_FOLDER } = require('./constants');

const app = express();

app.use(express.static(STATIC_FOLDER));

app.use(express.json());

app.use('/api', appRouter);

app.use(errorHandlers.errorHandler);

module.exports = app;
