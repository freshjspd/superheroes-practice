const { Router } = require('express');
const { powersController } = require('../controllers');

const powersRouter = Router();

powersRouter.get('/', powersController.getPowers);

module.exports = powersRouter;
