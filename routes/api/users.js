const express = require("express");
const router = express.Router();

const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
} = require("../../controllers/usersController");

const {
  usersValidation,
} = require("../../middlewares/usersValidationMiddleware");

const { usersMiddleware } = require("../../middlewares/usersMiddleware");

router.post("/signup", usersValidation, signupController);
router.post("/login", usersValidation, loginController);
router.get("/logout", usersMiddleware, logoutController);
router.get("/current", usersMiddleware, currentUserController);
router.patch("/subscription", usersMiddleware, changeSubscriptionController);

module.exports = router;
