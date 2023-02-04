const { userSignupSchema } = require("../helpers/usersValidationSchema");

const usersValidation = (req, res, next) => {
  const validationResult = userSignupSchema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  next();
};

module.exports = { usersValidation };
