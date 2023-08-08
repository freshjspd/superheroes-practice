const { Router } = require('express');
const { heroesController } = require('../controllers');
const { upload } = require('../middleware');

const heroesRouter = Router();

heroesRouter
  .route('/')
  .post(upload.uploadHeroFile, heroesController.createHero) // Multipart/form-data
  // .post(heroesController.createHero) // Application-json
  .get(heroesController.getHeroes);

heroesRouter
  .route('/:heroId')
  .patch(heroesController.updateHero)
  .delete(heroesController.deleteHero);

module.exports = heroesRouter;
