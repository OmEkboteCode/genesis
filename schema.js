const Joi = require("joi");

module.exports.repositorySchema = Joi.object({
  repository: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    language: Joi.string().required(),
    visibility: Joi.string().required(),
    owner: Joi.string(),
  }),
});
