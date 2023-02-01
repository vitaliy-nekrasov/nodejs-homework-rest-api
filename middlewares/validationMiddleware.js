const {
  addContactSchema,
  updateContactSchema,
  toggleContactFavoriteSchema,
} = require("../helpers/validationSchemas");

const addContactValidation = (req, res, next) => {
  const validationResult = addContactSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

const updateContactValidation = (req, res, next) => {
  const validationResult = updateContactSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

const toggleContactFavoriteValidation = (req, res, next) => {
  const validationResult = toggleContactFavoriteSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  toggleContactFavoriteValidation,
};
