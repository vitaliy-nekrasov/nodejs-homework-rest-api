const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page, limit = 10, favorite } = req.query;
  const contacts = await listContacts(owner, page, limit, favorite);
  return res.status(200).json({ contacts });
};

const getContactByIdController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contactById = await getContactById(req.params.contactId, owner);
  if (!contactById) {
    return res.status(404).json({
      message: `Contact with id = ${req.params.contactId} was not found`,
    });
  }
  return res.status(200).json({ contact: contactById });
};

const addContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await addContact(req.body, owner);
  if (!newContact) {
    return res.status(404).json({
      message: `Contact was not found!`,
    });
  }
  return res
    .status(201)
    .json({ message: "Added new contact", contact: newContact });
};

const deleteContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const removeContactById = await removeContact(req.params.contactId, owner);

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
  const { _id: owner } = req.user;
  const updatingContact = await updateContact(
    req.params.contactId,
    req.body,
    owner
  );
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

const toggleContactFavorite = async (req, res, next) => {
  const { _id: owner } = req.user;
  const updatedContact = await updateStatusContact(
    req.params.contactId,
    req.body,
    owner
  );
  if (!updatedContact) {
    return res.status(404).json({
      message: `Contact with id = ${req.params.contactId} was not found`,
    });
  }
  return res.status(200).json(updatedContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  toggleContactFavorite,
};
