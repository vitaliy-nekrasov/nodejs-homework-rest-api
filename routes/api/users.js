const express = require("express");
const router = express.Router();

const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  changeAvatarController,
} = require("../../controllers/usersController");

const {
  usersValidation,
} = require("../../middlewares/usersValidationMiddleware");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const { uploadMiddleware } = require("../../middlewares/uploadMiddleware");

router.post("/signup", usersValidation, signupController);
router.post("/login", usersValidation, loginController);
router.get("/logout", authMiddleware, logoutController);
router.get("/current", authMiddleware, currentUserController);
router.patch("/subscription", authMiddleware, changeSubscriptionController);
router.patch(
  "/avatars",
  [authMiddleware, uploadMiddleware.single("avatar")],
  changeAvatarController
);

module.exports = router;
