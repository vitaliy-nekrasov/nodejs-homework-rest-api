const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    res.status(404).json({
      message: `User with id = ${req.params.contactId} was not found`,
    });
  }
  res.status(200).json({ contact: contactById });
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().min(3).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details[0].message);
  }

  const newContact = await addContact(req.body);
  res.status(201).json({ contact: newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
