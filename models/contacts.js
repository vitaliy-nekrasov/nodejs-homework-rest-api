// const fs = require("fs/promises");
// const path = require("path");
const { Contacts } = require("../db/contactsSchema");

// const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await Contacts.find({});
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contacts.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contact = Contacts.findByIdAndRemove(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone, favorite } = body;
    const newContact = {
      name,
      email,
      phone: phone.toString(),
      favorite,
    };
    const contact = new Contacts(newContact);
    await contact.save();
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    await Contacts.findByIdAndUpdate(contactId, {
      $set: { name, email, phone },
    });
    const updatedContact = await getContactById(contactId);
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
};
