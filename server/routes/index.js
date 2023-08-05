const { Router } = require('express');
const heroesRouter = require('./heroesRouter');
const powersRouter = require('./powersRouter');

const appRouter = Router();

appRouter.use('/heroes', heroesRouter);
appRouter.use('/powers', powersRouter);

module.exports = appRouter;
