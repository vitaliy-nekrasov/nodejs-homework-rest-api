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

const { authMiddleware } = require("../../middlewares/authMiddleware");

router.post("/signup", usersValidation, signupController);
router.post("/login", usersValidation, loginController);
router.get("/logout", authMiddleware, logoutController);
router.get("/current", authMiddleware, currentUserController);
router.patch("/subscription", authMiddleware, changeSubscriptionController);

module.exports = router;
