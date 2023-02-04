const express = require("express");
const router = express.Router();

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  toggleContactFavorite,
} = require("../../controllers/contactsController");

const {
  addContactValidation,
  updateContactValidation,
  toggleContactFavoriteValidation,
} = require("../../middlewares/validationMiddleware");

const { usersMiddleware } = require("../../middlewares/usersMiddleware");

router.use(usersMiddleware);

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", addContactValidation, addContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", updateContactValidation, updateContactController);

router.patch(
  "/:contactId/favorite",
  toggleContactFavoriteValidation,
  toggleContactFavorite
);

module.exports = router;
