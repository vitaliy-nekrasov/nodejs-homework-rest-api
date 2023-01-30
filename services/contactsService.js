const { Contacts } = require("../db/contactsSchema");

const listContactsService = async () => {
  const data = await Contacts.find({});
  return data;
};

const getContactByIdService = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

const removeContactService = async (contactId) => {
  const contact = Contacts.findByIdAndRemove(contactId);
  return contact;
};

const addContactService = async (object) => {
  const contact = new Contacts(object);
  await contact.save();
  return contact;
};

const updateContactService = async (contactId, body) => {
  const { name, email, phone } = body;
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  return updatedContact;
};

const updateStatusContactService = async (contactId, body) => {
  const { favorite } = body;
  const updatedStatusContact = await Contacts.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });
  return updatedStatusContact;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
