const express = require("express");
const router = express.Router();

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", getContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", addContactValidation, addContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", updateContactValidation, updateContactController);

router.patch(
  "/:contactId/favorite",
  updateStatusContactValidation,
  updateStatusContactController
);

module.exports = router;
