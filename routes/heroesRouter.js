const { Router } = require('express');
const { heroesController } = require('../controllers');

const heroesRouter = Router();

heroesRouter
  .route('/')
  .post(heroesController.createHero)
  .get(heroesController.getHeroes);

heroesRouter
  .route('/:heroId')
  .patch(heroesController.updateHero)
  .delete(heroesController.deleteHero);

module.exports = heroesRouter;
