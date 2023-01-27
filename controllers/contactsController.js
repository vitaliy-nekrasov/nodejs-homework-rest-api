const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json({ contacts });
};

const getContactByIdController = async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    return res.status(404).json({
      message: `Contact with id = ${req.params.contactId} was not found`,
    });
  }
  return res.status(200).json({ contact: contactById });
};

const addContactController = async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (!newContact) {
    return res.status(404).json({
      message: `Contact with the same name is already in the database!`,
    });
  }
  return res
    .status(201)
    .json({ message: "Added new contact", contact: newContact });
};

const deleteContactController = async (req, res, next) => {
  const removeContactById = await removeContact(req.params.contactId);

  if (!removeContactById) {
    return res.status(404).json({
      message: `Contact with id = ${req.params.contactId} was not found`,
    });
  }

  return res.status(200).json({
    message: `Contact with id = ${req.params.contactId} was deleted`,
  });
};

const updateContactController = async (req, res, next) => {
  const updatingContact = await updateContact(req.params.contactId, req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (!updatingContact) {
    return res.status(404).json({
      message: `Contact with id = ${req.params.contactId} was not found`,
    });
  }
  return res.status(200).json({
    message: `Contact with id = ${req.params.contactId} was updated`,
    contact: updatingContact,
  });
};

const updateStatusContactController = async (req, res, next) => {
  const updatingContact = await updateStatusContact(
    req.params.contactId,
    req.body
  );
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (!updatingContact) {
    return res.status(404).json({
      message: `Contact with id = ${req.params.contactId} was not found`,
    });
  }
  return res.status(200).json({
    message: `Status of contact with id = ${req.params.contactId} was updated`,
    contact: updatingContact,
  });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
};
