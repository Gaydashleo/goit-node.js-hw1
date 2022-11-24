const {v4: uuidv4} = require("uuid");

const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
    return contacts;
}
  
async function getContactByID(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId.toString());
    return result;
}
  
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const newContacts = contacts.filter((contact) => contact.id !== contactId.toString());
  await updateContacts(newContacts);
    return contacts[index];
}

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await updateContacts(contacts);
    return newContact;
}


module.exports = {
  listContacts,
  getContactByID,
  removeContact, 
  addContact,
};