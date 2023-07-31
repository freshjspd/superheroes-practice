const { Power } = require('../db/models');

module.exports.getPowers = async (req, res, next) => {
  try {
    const foundPowers = await Power.findAll({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundPowers });
  } catch (err) {
    next(err);
  }
};
