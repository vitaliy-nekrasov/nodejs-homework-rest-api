const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = await contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getContacts = await contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    if (contacts.length === getContacts.length) {
      return null;
    }
    fs.writeFile(contactsPath, JSON.stringify(getContacts), "utf-8");
    return getContacts;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();

    const newContact = {
      id: uniqid(),
      name,
      email,
      phone: phone.toString(),
    };

    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();

    const index = await contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    return contacts[index];
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
