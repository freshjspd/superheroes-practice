const { Router } = require('express');

const heroesRouter = Router();

// TODO import
heroesRouter
  .route('/')
  .post(heroesController.createHero)
  .get(heroesController.getHeroes);

heroesRouter
  .route('/:heroId')
  .patch(heroesController.updateHero)
  .delete(heroesController.deleteHero);

module.exports = heroesRouter;
