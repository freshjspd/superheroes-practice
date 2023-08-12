const createHttpError = require('http-errors');
const path = require('path');
const _ = require('lodash');
const { Hero, Power, sequelize } = require('./../db/models');
const { IMAGES_FOLDER } = require('./../constants');

module.exports.createHero = async (req, res, next) => {
  const { body, file } = req;

  if (file) {
    body.image = path.join(IMAGES_FOLDER, file.filename);
  }

  if (!body.superpowers) {
    body.superpowers = [];
  }

  const t = await sequelize.transaction();
  try {
    const createdHero = await Hero.create(body, { transaction: t });
    const createdHeroPowers = await createdHero.setPowers(body.superpowers, {
      transaction: t,
    });
    t.commit();
    const preparedHero = _.omit(createdHero.get(), ['createdAt', 'updatedAt']);

    preparedHero.superpowers = body.superpowers.map(s => Number(s));
    res.status(200).send({ data: preparedHero });
  } catch (err) {
    t.rollback();
    next(err);
  }
};

module.exports.getHeroes = async (req, res, next) => {
  try {
    const foundHeroes = await Hero.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Power,
        attributes: {
          exclude: ['description', 'fullDescription', 'createdAt', 'updatedAt'],
        },
        through: { attributes: [] },
      },
    });

    const singleFoundHeroes = {};
    foundHeroes.forEach(i => {
      singleFoundHeroes[i.id] = i;
      singleFoundHeroes[i.id].superpowers = [];
    });
    foundHeroes.forEach(i => {
      i['Powers.id'] &&
        singleFoundHeroes[i.id].superpowers.push(i['Powers.id']);
      delete i['Powers.id'];
    });

    res.status(200).send({ data: Object.values(singleFoundHeroes) });
  } catch (err) {
    next(err);
  }
};

module.exports.updateHero = async (req, res, next) => {
  const {
    body,
    params: { heroId },
  } = req;

  try {
    const [updatedHeroCount, [updatedHero]] = await Hero.update(body, {
      where: {
        id: heroId,
      },
      raw: true,
      returning: true,
    });

    if (!updatedHeroCount) {
      return next(createError(404, 'Hero Not Found'));
    }
    res.status(200).send({ data: updatedHero });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHero = async (req, res, next) => {
  const {
    params: { heroId },
  } = req;

  try {
    const deletedHeroCount = await Hero.destroy({
      where: {
        id: heroId,
      },
    });

    if (!deletedHeroCount) {
      return next(createError(404, 'Hero Not Found'));
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
