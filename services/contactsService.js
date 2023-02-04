const { Contacts } = require("../db/contactsSchema");

const listContactsService = async (owner) => {
  const data = await Contacts.find({ owner });
  return data;
};

const getContactByIdService = async (contactId, owner) => {
  const contact = await Contacts.findOne({ _id: contactId, owner });
  return contact;
};

const removeContactService = async (contactId, owner) => {
  const contact = Contacts.findOneAndRemove({ _id: contactId, owner });
  return contact;
};

const addContactService = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contacts({ name, email, phone, favorite, owner });
  await contact.save();
  return contact;
};

const updateContactService = async (contactId, body, owner) => {
  const { name, email, phone } = body;
  const updatedContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { name, email, phone },
    }
  );
  return updatedContact;
};

const updateStatusContactService = async (contactId, body, owner) => {
  const { favorite } = body;
  const updatedStatusContact = await Contacts.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { favorite },
    }
  );
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
