const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().integer(),
}).min(1);

const toggleContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).min(1);

module.exports = {
  addContactSchema,
  updateContactSchema,
  toggleContactFavoriteSchema,
};
