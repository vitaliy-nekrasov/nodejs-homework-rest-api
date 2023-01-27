const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
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

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

const updateContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().integer(),
  }).min(1);

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

const updateStatusContactValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  }).min(1);

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
};
