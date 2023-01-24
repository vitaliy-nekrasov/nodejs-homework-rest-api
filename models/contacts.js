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
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = await JSON.parse(data);
    const contactById = await contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;

    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = await JSON.parse(data);

    // if (contacts.map((contact) => contact.name).includes(name)) {
    //   console.log(`Sorry, this contact already exists`.red);
    //   return;
    // }

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

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
