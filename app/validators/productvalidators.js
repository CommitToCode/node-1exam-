const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required()
});
