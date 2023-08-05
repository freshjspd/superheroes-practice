const createHttpError = require('http-errors');
const path = require('path');
const _ = require('lodash');
const { Hero } = require('./../db/models');
const { IMAGES_FOLDER } = require('./../constants');

module.exports.createHero = async (req, res, next) => {
  const { body, file } = req;

  if (file) {
    body.image = path.join(IMAGES_FOLDER, file.filename);
  }

  try {
    const createdHero = await Hero.create(body);

    if (!createdHero) {
      return next(createHttpError(500, 'Server Error'));
    }

    const preparedHaro = _.omit(createdHero.get(), ['createdAt', 'updatedAt']);

    res.status(201).send({ data: preparedHaro });
  } catch (err) {
    next(err);
  }
};

module.exports.getHeroes = async (req, res, next) => {
  try {
    const foundHeroes = await Hero.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundHeroes });
  } catch (err) {
    next(err);
  }
};

module.exports.updateHero = async (req, res, next) => {};

module.exports.deleteHero = async (req, res, next) => {};
