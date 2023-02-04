const express = require("express");
const router = express.Router();

const {
  signupController,
  loginController,
} = require("../../controllers/usersController");

const {
  usersValidation,
} = require("../../middlewares/usersValidationMiddleware");

router.post("/signup", usersValidation, signupController);
router.post("/login", usersValidation, loginController);

module.exports = router;
