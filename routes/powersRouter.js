const { Router } = require('express');

const powersRouter = Router();

// TODO import
powersRouter.get('/', powersController.getPowers);

module.exports = powersRouter;
