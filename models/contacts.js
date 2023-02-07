const {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
} = require("../services/contactsService");

const listContacts = async (owner, page, limit, favorite) => {
  try {
    const data = await listContactsService(owner, page, limit, favorite);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId, owner) => {
  try {
    const contact = await getContactByIdService(contactId, owner);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId, owner) => {
  try {
    const contact = removeContactService(contactId, owner);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body, owner) => {
  try {
    const { name, email, phone, favorite } = body;
    const addedContact = await addContactService(
      {
        name,
        email,
        phone: phone.toString(),
        favorite,
      },
      owner
    );
    return addedContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body, owner) => {
  try {
    const updatedContact = await updateContactService(contactId, body, owner);
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (contactId, body, owner) => {
  try {
    const updatedContact = await updateStatusContactService(
      contactId,
      body,
      owner
    );
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
